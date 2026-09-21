import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CODE_LENGTH, MAX_ATTEMPTS, hashCode } from "@/lib/otp";
import { SESSION_COOKIE_NAME, createSession } from "@/lib/session";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GENERIC_ERROR = "Código inválido ou expirado. Peça um novo código.";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email =
    typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const code = typeof body?.code === "string" ? body.code.trim() : "";

  if (!EMAIL_REGEX.test(email) || code.length !== CODE_LENGTH) {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });
  }

  const loginCode = await prisma.loginCode.findFirst({
    where: { userId: user.id, consumedAt: null },
    orderBy: { createdAt: "desc" },
  });

  if (!loginCode || loginCode.expiresAt < new Date()) {
    return NextResponse.json({ error: GENERIC_ERROR }, { status: 400 });
  }

  if (loginCode.attempts >= MAX_ATTEMPTS) {
    return NextResponse.json(
      { error: "Muitas tentativas. Peça um novo código." },
      { status: 400 },
    );
  }

  if (hashCode(code) !== loginCode.codeHash) {
    await prisma.loginCode.update({
      where: { id: loginCode.id },
      data: { attempts: { increment: 1 } },
    });
    const attemptsLeft = MAX_ATTEMPTS - (loginCode.attempts + 1);
    return NextResponse.json(
      {
        error:
          attemptsLeft > 0
            ? `Código incorreto. Você tem mais ${attemptsLeft} tentativa(s).`
            : "Muitas tentativas. Peça um novo código.",
      },
      { status: 400 },
    );
  }

  await prisma.loginCode.update({
    where: { id: loginCode.id },
    data: { consumedAt: new Date() },
  });

  const { token, expiresAt } = await createSession(user.id);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });

  return response;
}
