import { createHash, randomInt } from "crypto";

export const CODE_LENGTH = 6;
export const CODE_TTL_MINUTES = 10;
export const MAX_ATTEMPTS = 5;
export const RESEND_COOLDOWN_SECONDS = 60;

export function generateCode() {
  return Array.from({ length: CODE_LENGTH }, () => randomInt(0, 10)).join("");
}

export function hashCode(code: string) {
  return createHash("sha256").update(code).digest("hex");
}
