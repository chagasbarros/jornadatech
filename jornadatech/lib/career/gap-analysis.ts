import type { Profile, ProfileSkill } from "./catalog";

export const TRACK_LIMIT = 5;
export const SUGGESTED_ACTIONS_LIMIT = 3;

export type Recommendation = "COURSE" | "PROJECT" | "PRACTICE";

export const RECOMMENDATION_LABELS: Record<Recommendation, string> = {
  COURSE: "Curso estruturado ou trilha de estudo formal",
  PROJECT: "Projeto prático aplicado",
  PRACTICE: "Prática dirigida ou mentoria pontual",
};

export type SkillGap = {
  skillId: string;
  /** Peso normalizado (soma 1 no perfil). */
  w: number;
  m: number;
  d: number;
  /** Nota do aluno; 0 quando ele não avaliou a competência. */
  a: number;
  assessed: boolean;
  /** Níveis faltando: max(0, m − a). */
  gap: number;
  gapNorm: number;
  urgency: number;
  recommendation: Recommendation | null;
};

export type GapAnalysis = {
  /** 0 a 100. */
  compatibility: number;
  /** Todas as competências do perfil, na ordem do catálogo. */
  gaps: SkillGap[];
  /** Lacunas priorizadas, limitadas a TRACK_LIMIT. */
  track: SkillGap[];
  /** Competências do perfil que o aluno ainda não avaliou. */
  unassessed: string[];
};

/** Classifica pelo número de níveis faltando (não pelo gap normalizado). */
export function recommendationFor(gap: number): Recommendation | null {
  if (gap >= 3) return "COURSE";
  if (gap === 2) return "PROJECT";
  if (gap === 1) return "PRACTICE";
  return null;
}

function normalizeWeights(skills: ProfileSkill[]): number[] {
  const total = skills.reduce((sum, s) => sum + s.w, 0);
  return skills.map((s) => (total > 0 ? s.w / total : 0));
}

/** Urgência desc; desempate por w desc, d desc, id asc. */
export function compareByUrgency(x: SkillGap, y: SkillGap): number {
  return (
    y.urgency - x.urgency ||
    y.w - x.w ||
    y.d - x.d ||
    x.skillId.localeCompare(y.skillId)
  );
}

export function analyzeGap(
  profile: Profile,
  assessments: Record<string, number>,
): GapAnalysis {
  const weights = normalizeWeights(profile.skills);

  const gaps = profile.skills.map((s, i): SkillGap => {
    const assessed = s.skillId in assessments;
    const a = assessed ? assessments[s.skillId] : 0;
    const gap = Math.max(0, s.m - a);
    const gapNorm = gap / s.m;
    return {
      skillId: s.skillId,
      w: weights[i],
      m: s.m,
      d: s.d,
      a,
      assessed,
      gap,
      gapNorm,
      urgency: gapNorm * weights[i] * s.d,
      recommendation: recommendationFor(gap),
    };
  });

  const compatibility =
    100 * gaps.reduce((sum, g) => sum + g.w * Math.min(g.a / g.m, 1), 0);

  const track = gaps
    .filter((g) => g.urgency > 0)
    .sort(compareByUrgency)
    .slice(0, TRACK_LIMIT);

  return {
    compatibility,
    gaps,
    track,
    unassessed: gaps.filter((g) => !g.assessed).map((g) => g.skillId),
  };
}
