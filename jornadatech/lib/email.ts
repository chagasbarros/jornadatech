import "server-only";
import nodemailer from "nodemailer";
import { RAFFLE_DRAW_DATE, SITE_URL } from "./raffle";

function transport() {
  const { SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS } =
    process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 465),
    secure: SMTP_SECURE !== "false",
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });
}

/** Envia o código do sorteio. Lança erro se o SMTP não estiver configurado. */
export async function sendRaffleCodeEmail(to: string, code: string) {
  const smtp = transport();
  if (!smtp) throw new Error("SMTP não configurado (SMTP_HOST/USER/PASS).");

  const text = [
    "Parabéns por concluir seu Canvas de Carreira no Jornada Tech!",
    "",
    `Seu código de participação no sorteio do Evento Conexão é: ${code}`,
    "",
    `O sorteio acontece em ${RAFFLE_DRAW_DATE}. O resultado será divulgado no site oficial (${SITE_URL}), e os ganhadores receberão um email com as informações para resgatar o prêmio.`,
    "",
    "Guarde este código.",
    "Equipe Jornada Tech",
  ].join("\n");

  const html = `<div style="font-family:Arial,sans-serif;color:#123F45;max-width:520px">
  <h2 style="color:#0B5A48">Você está no sorteio do Evento Conexão!</h2>
  <p>Parabéns por concluir seu Canvas de Carreira no Jornada Tech.</p>
  <p>Seu código de participação:</p>
  <p style="font-size:36px;font-weight:bold;letter-spacing:8px;color:#0B5A48;margin:8px 0">${code}</p>
  <p>O sorteio acontece em <strong>${RAFFLE_DRAW_DATE}</strong>. O resultado será divulgado no
  <a href="${SITE_URL}" style="color:#0B5A48">site oficial do Jornada Tech</a>, e os ganhadores
  receberão um email com as informações para resgatar o prêmio.</p>
  <p>Guarde este código.<br>Equipe Jornada Tech</p>
</div>`;

  await smtp.sendMail({
    from: process.env.SMTP_FROM ?? process.env.SMTP_USER,
    to,
    subject: `Seu código do sorteio: ${code}`,
    text,
    html,
  });
}
