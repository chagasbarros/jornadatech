import nodemailer from "nodemailer";
import { CODE_TTL_MINUTES } from "./otp";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT ?? 587),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendLoginCodeEmail(to: string, code: string) {
  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
    to,
    subject: "Seu código de acesso — Jornada Tech",
    text: `Seu código de acesso é ${code}. Ele expira em ${CODE_TTL_MINUTES} minutos. Se você não pediu esse código, ignore este e-mail.`,
    html: `
      <div style="font-family: sans-serif; max-width: 420px; margin: 0 auto;">
        <p style="color:#16231C;font-size:15px;">Use o código abaixo para entrar na Jornada Tech:</p>
        <p style="font-size:32px;font-weight:700;letter-spacing:6px;color:#2F6B45;margin:16px 0;">${code}</p>
        <p style="color:#6C7A6F;font-size:13px;">Ele expira em ${CODE_TTL_MINUTES} minutos. Se você não pediu esse código, ignore este e-mail.</p>
      </div>
    `,
  });
}
