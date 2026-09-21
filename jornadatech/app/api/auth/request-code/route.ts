import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendLoginCodeEmail } from "@/lib/mailer";
import {
  CODE_TTL_MINUTES,
  RESEND_COOLDOWN_SECONDS,
  generateCode,
  hashCode,
} from "@/lib/otp";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { error: "Informe um e-mail válido." },
      { status: 400 },
    );
  }

  const user = await prisma.user.upsert({
    where: { email },
    create: { email },
    update: {},
  });

  const lastCode = await prisma.loginCode.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  if (lastCode) {
    const secondsSinceLast =
      (Date.now() - lastCode.createdAt.getTime()) / 1000;
    if (secondsSinceLast < RESEND_COOLDOWN_SECONDS) {
      return NextResponse.json(
        {
          error: "Aguarde um pouco antes de pedir um novo código.",
          retryAfterSeconds: Math.ceil(
            RESEND_COOLDOWN_SECONDS - secondsSinceLast,
          ),
        },
        { status: 429 },
      );
    }
  }

  const code = generateCode();
  const expiresAt = new Date(Date.now() + CODE_TTL_MINUTES * 60 * 1000);

  const loginCode = await prisma.loginCode.create({
    data: {
      userId: user.id,
      codeHash: hashCode(code),
      expiresAt,
    },
  });

  try {
    await sendLoginCodeEmail(email, code);
  } catch (error) {
    await prisma.loginCode.delete({ where: { id: loginCode.id } });
    console.error("Falha ao enviar e-mail de login:", error);
    return NextResponse.json(
      { error: "Não foi possível enviar o e-mail. Tente novamente." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    expiresInSeconds: CODE_TTL_MINUTES * 60,
    resendCooldownSeconds: RESEND_COOLDOWN_SECONDS,
  });
}
