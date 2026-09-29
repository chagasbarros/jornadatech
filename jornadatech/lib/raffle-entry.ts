import "server-only";
import { after } from "next/server";
import { Prisma, type User } from "@prisma/client";
import { prisma } from "./prisma";
import { sendRaffleCodeEmail } from "./email";
import { generateRaffleCode } from "./raffle";

const MAX_ATTEMPTS = 20;

function isUniqueViolation(error: unknown) {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  );
}

/**
 * Participação do aluno que concluiu a jornada: cria o código (único) na
 * primeira vez e agenda o envio do email enquanto ele não tiver sido enviado.
 * Retorna null se a jornada ainda não foi concluída.
 */
export async function ensureRaffleEntry(user: User) {
  if (!user.completedAt) return null;

  let entry = await prisma.raffleEntry.findUnique({
    where: { userId: user.id },
  });

  for (let i = 0; !entry && i < MAX_ATTEMPTS; i++) {
    try {
      entry = await prisma.raffleEntry.create({
        data: { userId: user.id, code: generateRaffleCode() },
      });
    } catch (error) {
      if (!isUniqueViolation(error)) throw error;
      // Ou outra requisição já criou a participação, ou o código já é de
      // outra pessoa (aí o laço tenta outro).
      entry = await prisma.raffleEntry.findUnique({
        where: { userId: user.id },
      });
    }
  }
  if (!entry) throw new Error("Não foi possível gerar o código do sorteio.");

  if (!entry.emailSentAt) {
    const { code } = entry;
    after(() => sendOnce(user, code));
  }
  return entry;
}

/** Marca o envio antes de mandar, para requisições simultâneas não duplicarem o email. */
async function sendOnce(user: User, code: string) {
  const claimed = await prisma.raffleEntry.updateMany({
    where: { userId: user.id, emailSentAt: null },
    data: { emailSentAt: new Date() },
  });
  if (claimed.count === 0) return;

  try {
    await sendRaffleCodeEmail(user.email, code);
  } catch (error) {
    // Libera para nova tentativa no próximo acesso ao dashboard.
    await prisma.raffleEntry.update({
      where: { userId: user.id },
      data: { emailSentAt: null },
    });
    console.error("Falha ao enviar o código do sorteio:", error);
  }
}
