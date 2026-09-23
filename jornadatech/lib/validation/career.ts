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

export const actionPlanSchema = z.object({
  goals: z.array(goalSchema).min(1, "Adicione pelo menos uma meta.").max(20),
  feedback: z
    .object({
      nextAction: text(300),
      satisfaction: z.number().int().min(1).max(5).nullable(),
    })
    .nullable(),
});

export type CanvasInput = z.infer<typeof canvasSchema>;
export type GoalInput = z.infer<typeof goalSchema>;
export type ActionPlanInput = z.infer<typeof actionPlanSchema>;
