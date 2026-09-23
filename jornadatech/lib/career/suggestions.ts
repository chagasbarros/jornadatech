import { getSkill } from "./catalog";
import {
  SUGGESTED_ACTIONS_LIMIT,
  type GapAnalysis,
  type Recommendation,
} from "./gap-analysis";

export type SuggestedGoal = {
  horizon: "SHORT" | "MEDIUM";
  objective: string;
  action: string;
  deadline: string;
  indicator: string;
  done: boolean;
  suggested: boolean;
};

const TEMPLATES: Record<
  Recommendation,
  Pick<SuggestedGoal, "horizon" | "deadline" | "indicator"> & {
    action: (skill: string) => string;
  }
> = {
  COURSE: {
    horizon: "MEDIUM",
    deadline: "8 semanas",
    action: (s) => `Fazer um curso estruturado de ${s}`,
    indicator: "Curso concluído e +2 níveis na próxima autoavaliação",
  },
  PROJECT: {
    horizon: "SHORT",
    deadline: "6 semanas",
    action: (s) => `Criar um projeto de portfólio aplicando ${s}`,
    indicator: "Projeto publicado no portfólio",
  },
  PRACTICE: {
    horizon: "SHORT",
    deadline: "3 semanas",
    action: (s) => `Praticar ${s} com exercícios dirigidos ou mentoria`,
    indicator: "+1 nível na próxima autoavaliação",
  },
};

/** Primeira ação do plano para as lacunas mais urgentes da trilha. */
export function suggestGoals(analysis: GapAnalysis): SuggestedGoal[] {
  return analysis.track
    .slice(0, SUGGESTED_ACTIONS_LIMIT)
    .flatMap((g) => {
      if (!g.recommendation) return [];
      const skill = getSkill(g.skillId)?.name ?? g.skillId;
      const t = TEMPLATES[g.recommendation];
      return {
        horizon: t.horizon,
        objective: `Desenvolver ${skill}`,
        action: t.action(skill),
        deadline: t.deadline,
        indicator: t.indicator,
        done: false,
        suggested: true,
      };
    });
}
