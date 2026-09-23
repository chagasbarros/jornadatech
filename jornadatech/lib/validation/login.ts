import { z } from "zod";

export const OTP_LENGTH = 6;

export const emailSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email("Informe um e-mail válido.")),
});

export const verifyCodeSchema = emailSchema.extend({
  code: z
    .string()
    .trim()
    .length(OTP_LENGTH, "Código inválido.")
    .regex(/^\d+$/, "Código inválido."),
});
