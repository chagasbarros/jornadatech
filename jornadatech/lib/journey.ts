// Regras de navegação da jornada. Funções puras — usadas por lib/auth.ts
// e pelas Server Actions, e testadas em journey.test.ts.

export const STEPS = [
  "SELF",
  "FIELD_INTEREST",
  "SELF_EVALUATION",
  "CANVAS",
  "ACTION_PLAN",
  "DONE",
] as const;

export type Step = (typeof STEPS)[number];

export const STEP_PATHS: Record<Step, string> = {
  SELF: "/self",
  FIELD_INTEREST: "/field-interest",
  SELF_EVALUATION: "/self-evaluation",
  CANVAS: "/canvas",
  ACTION_PLAN: "/action-plan",
  DONE: "/dashboard",
};

export const STEP_LABELS: Record<Exclude<Step, "DONE">, string> = {
  SELF: "Quem sou eu",
  FIELD_INTEREST: "Área de interesse",
  SELF_EVALUATION: "Autoavaliação",
  CANVAS: "Canvas",
  ACTION_PLAN: "Plano de ação",
};

export type JourneyState = {
  currentStep: Step;
  completedAt: Date | null;
};

function indexOf(step: Step) {
  return STEPS.indexOf(step);
}

export function nextStep(step: Step): Step {
  return STEPS[Math.min(indexOf(step) + 1, STEPS.length - 1)];
}

/** Para onde o aluno vai ao entrar no app. */
export function homePath(state: JourneyState): string {
  return state.completedAt ? STEP_PATHS.DONE : STEP_PATHS[state.currentStep];
}

/**
 * Retorna o caminho para redirecionar, ou null se o aluno pode ver a etapa.
 * Primeiro acesso: pode voltar a etapas feitas, mas não pular a atual.
 * Após concluir: qualquer etapa pode ser editada.
 */
export function stepRedirect(state: JourneyState, step: Step): string | null {
  if (state.completedAt) return null;
  if (step === "DONE") return STEP_PATHS[state.currentStep];
  return indexOf(step) > indexOf(state.currentStep)
    ? STEP_PATHS[state.currentStep]
    : null;
}

/**
 * Depois de salvar uma etapa: qual `currentStep` gravar e para onde ir.
 * Primeiro acesso segue o fluxo; após concluir volta ao dashboard.
 */
export function afterSave(
  state: JourneyState,
  saved: Exclude<Step, "DONE">,
): { currentStep: Step; completed: boolean; redirectTo: string } {
  if (state.completedAt) {
    return {
      currentStep: state.currentStep,
      completed: true,
      redirectTo: STEP_PATHS.DONE,
    };
  }

  const next = nextStep(saved);
  // Voltar e salvar uma etapa anterior não faz o aluno perder o progresso.
  const currentStep =
    indexOf(next) > indexOf(state.currentStep) ? next : state.currentStep;

  return {
    currentStep,
    completed: next === "DONE",
    redirectTo: STEP_PATHS[next],
  };
}
