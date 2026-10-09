// Catálogo único de competências e perfis profissionais.
// Os ids de competência são compartilhados entre os perfis e a autoavaliação.
//
// Curadoria: docs/carreiras_tecnologia.json (CBO, Referenciais SBC, DCN, O*NET, ESCO).
// Cada curso lista 8 carreiras; cada carreira tem 7 competências técnicas e
// 4 comportamentais. O id da competência é o slug do texto: textos idênticos em
// carreiras diferentes são a mesma competência (a nota é reaproveitada), e
// alterar um texto no JSON muda o id — as notas antigas ficam órfãs no banco.
//
// Decisão da revisão: dentro de cada perfil, todas as competências têm o mesmo
// peso, a mesma proficiência mínima e a mesma prioridade (ver equalSkills).

import data from "@/docs/carreiras_tecnologia.json";
import { getCourse } from "./courses";

export { MAX_LEVEL, MIN_LEVEL, PROFICIENCY_LEVELS } from "./levels";

export type SkillKind = "TECH" | "BEHAVIORAL";

export type Skill = {
  id: string;
  name: string;
  kind: SkillKind;
};

export type ProfileSkill = {
  skillId: string;
  /** Peso dentro do perfil. Normalizado no cálculo (w_i / Σw). */
  w: number;
  /** Proficiência mínima esperada, 1 a 5. */
  m: number;
  /** Prioridade de mercado, 1 a 3. */
  d: number;
};

export type Profile = {
  id: string;
  title: string;
  description: string;
  skills: ProfileSkill[];
};

/** Proficiência mínima comum a todas as competências: "Faço sozinho, consultando referências". */
export const DEFAULT_MIN_LEVEL = 3;
/** Prioridade de mercado comum a todas as competências. */
export const DEFAULT_MARKET_PRIORITY = 2;

/** Competências de um perfil com peso, mínimo e prioridade iguais. */
function equalSkills(skillIds: string[]): ProfileSkill[] {
  return skillIds.map((skillId) => ({
    skillId,
    w: 1 / skillIds.length,
    m: DEFAULT_MIN_LEVEL,
    d: DEFAULT_MARKET_PRIORITY,
  }));
}

/** "Métodos ágeis (Scrum, Kanban)" → "metodos-ageis-scrum-kanban". */
export function skillSlug(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type CareerEntry = (typeof data.cursos)[number]["carreiras"][number];

const careers = new Map<string, CareerEntry>();
for (const course of data.cursos) {
  for (const career of course.carreiras) {
    if (!careers.has(career.id)) careers.set(career.id, career);
  }
}

const skillMap = new Map<string, Skill>();
function addSkills(names: string[], kind: SkillKind): string[] {
  return names.map((name) => {
    const id = skillSlug(name);
    if (!skillMap.has(id)) skillMap.set(id, { id, name, kind });
    return id;
  });
}

export const PROFILES: Profile[] = [...careers.values()].map((c) => ({
  id: c.id,
  title: c.nome,
  description: c.resumo,
  skills: equalSkills([
    ...addSkills(c.competencias_tecnicas, "TECH"),
    ...addSkills(c.competencias_comportamentais, "BEHAVIORAL"),
  ]),
}));

/** Técnicas primeiro, na ordem em que aparecem no JSON. */
export const SKILLS: Skill[] = [
  ...[...skillMap.values()].filter((s) => s.kind === "TECH"),
  ...[...skillMap.values()].filter((s) => s.kind === "BEHAVIORAL"),
];

/** Ids das carreiras de cada curso, na ordem do JSON. */
export const COURSE_PROFILE_IDS: Record<string, string[]> = Object.fromEntries(
  data.cursos.map((c) => [c.id, c.carreiras.map((k) => k.id)]),
);

const skillsById = new Map(SKILLS.map((s) => [s.id, s]));
const profilesById = new Map(PROFILES.map((p) => [p.id, p]));

export function getSkill(id: string): Skill | undefined {
  return skillsById.get(id);
}

export function getProfile(id: string | null | undefined): Profile | undefined {
  return id ? profilesById.get(id) : undefined;
}

/** Competências do perfil, na ordem do catálogo (técnicas primeiro). */
export function getProfileSkills(profile: Profile): Skill[] {
  const ids = new Set(profile.skills.map((s) => s.skillId));
  return SKILLS.filter((s) => ids.has(s.id));
}

/** Carreiras que o aluno do curso pode escolher. */
export function getCourseProfiles(courseId: string | null | undefined): Profile[] {
  if (!getCourse(courseId)) return [];
  return (COURSE_PROFILE_IDS[courseId!] ?? []).map((id) => profilesById.get(id)!);
}

export function courseHasProfile(
  courseId: string | null | undefined,
  profileId: string | null | undefined,
): boolean {
  return Boolean(courseId && profileId && COURSE_PROFILE_IDS[courseId]?.includes(profileId));
}
