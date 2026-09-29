// Sorteio do Evento Conexão. Funções puras — testadas em raffle.test.ts.
import { randomInt } from "node:crypto";

export const SITE_URL = "https://www.jornadatech.app.br";

/** Data do sorteio, exibida no dashboard, no email e na página inicial. */
export const RAFFLE_DRAW_DATE = "20/10/2026";

/** Código de participação: 4 dígitos, com zeros à esquerda (0000–9999). */
export function generateRaffleCode(): string {
  return randomInt(0, 10_000).toString().padStart(4, "0");
}
