import { z } from "zod";
import { MAX_LEVEL, MIN_LEVEL, PROFILES } from "@/lib/career/catalog";

export const fieldInterestSchema = z.object({
  profileId: z.enum(PROFILES.map((p) => p.id), "Escolha uma área."),
});

export const selfEvaluationSchema = z.object({
  levels: z.record(z.string(), z.number().int().min(MIN_LEVEL).max(MAX_LEVEL)),
});

const text = (max: number) => z.string().trim().max(max);

export const canvasSchema = z.object({
  objective: text(300).min(1, "Descreva seu objetivo profissional."),
  skillsToDevelop: z.array(text(80).min(1)).max(15),
  networking: text(2000),
  experiences: text(2000),
  portfolio: text(2000),
});

export const HORIZONS = [
  { id: "SHORT", label: "Curto prazo" },
  { id: "MEDIUM", label: "Médio prazo" },
] as const;

export const goalSchema = z.object({
  horizon: z.enum(["SHORT", "MEDIUM"]),
  objective: text(200).min(1, "Toda meta precisa de um objetivo."),
  action: text(300).min(1, "Toda meta precisa de uma ação."),
  deadline: text(60).min(1, "Toda meta precisa de um prazo."),
  indicator: text(200).min(1, "Toda meta precisa de um indicador."),
  done: z.boolean(),
  suggested: z.boolean(),
});

export const SUGGESTIONS_FIT = [
  { id: "YES", label: "Sim" },
  { id: "PARTIAL", label: "Em parte" },
  { id: "NO", label: "Não" },
] as const;

export const HARDEST_STEPS = [
  { id: "SELF", label: "Quem sou eu" },
  { id: "FIELD_INTEREST", label: "Área de interesse" },
  { id: "SELF_EVALUATION", label: "Autoavaliação" },
  { id: "CANVAS", label: "Canvas" },
  { id: "ACTION_PLAN", label: "Plano de ação" },
  { id: "NONE", label: "Nenhuma" },
] as const;

const scale = (min: number, max: number, message: string) =>
  z.number(message).int(message).min(min, message).max(max, message);

/** Questionário de fechamento, obrigatório na primeira conclusão da jornada. */
export const feedbackSchema = z.object({
  satisfaction: scale(1, 5, "Diga o que achou da experiência."),
  clarity: scale(1, 5, "Diga quão claro está o seu próximo passo."),
  suggestionsFit: z.enum(
    SUGGESTIONS_FIT.map((o) => o.id),
    "Diga se as competências sugeridas fazem sentido.",
  ),
  hardestStep: z.enum(
    HARDEST_STEPS.map((o) => o.id),
    "Escolha a etapa mais difícil (ou Nenhuma).",
  ),
  nextAction: text(300).min(10, "Descreva sua próxima ação (mínimo de 10 caracteres)."),
  recommend: scale(0, 10, "Diga se recomendaria a um colega."),
});

export const actionPlanSchema = z.object({
  goals: z.array(goalSchema).min(1, "Adicione pelo menos uma meta.").max(20),
  feedback: feedbackSchema.nullable(),
});

export type CanvasInput = z.infer<typeof canvasSchema>;
export type GoalInput = z.infer<typeof goalSchema>;
export type FeedbackInput = z.infer<typeof feedbackSchema>;
export type ActionPlanInput = z.infer<typeof actionPlanSchema>;
