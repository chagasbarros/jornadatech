import "server-only";
import type { z } from "zod";
import type { User } from "@prisma/client";
import { afterSave, type Step } from "./journey";

export type ActionResult = { error: string } | undefined;

/** Primeira mensagem de erro do Zod, para exibir no formulário. */
export function firstIssue(error: z.ZodError): ActionResult {
  return { error: error.issues[0]?.message ?? "Dados inválidos." };
}

/**
 * Dados para gravar no User depois de salvar uma etapa, e para onde redirecionar.
 * Use `data` no mesmo $transaction que grava a etapa.
 */
export function journeyUpdate(user: User, saved: Exclude<Step, "DONE">) {
  const next = afterSave(user, saved);
  return {
    data: {
      currentStep: next.currentStep,
      completedAt: user.completedAt ?? (next.completed ? new Date() : null),
    },
    redirectTo: next.redirectTo,
  };
}
