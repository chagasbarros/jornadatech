// Catálogo único de competências e perfis profissionais.
// Os ids de competência são compartilhados entre os perfis e a autoavaliação.
//
// TODO: curadoria — os valores de w (peso), m (proficiência mínima) e
// d (prioridade de mercado) abaixo são provisórios e devem ser revisados
// pela equipe de conteúdo.

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

export const PROFICIENCY_LEVELS = [
  { level: 0, label: "Nunca tive contato" },
  { level: 1, label: "Conheço o conceito" },
  { level: 2, label: "Faço com ajuda" },
  { level: 3, label: "Faço sozinho, consultando referências" },
  { level: 4, label: "Faço com autonomia e segurança" },
  { level: 5, label: "Consigo ensinar e orientar outras pessoas" },
] as const;

export const MIN_LEVEL = 0;
export const MAX_LEVEL = 5;

export const SKILLS: Skill[] = [
  { id: "logica", name: "Lógica de programação", kind: "TECH" },
  { id: "html-css", name: "HTML / CSS", kind: "TECH" },
  { id: "javascript", name: "JavaScript", kind: "TECH" },
  { id: "linguagem-backend", name: "Linguagem back-end (ex.: Java, Python, C#)", kind: "TECH" },
  { id: "banco-dados", name: "Banco de dados e SQL", kind: "TECH" },
  { id: "git", name: "Versionamento de código (Git)", kind: "TECH" },
  { id: "modelagem", name: "Modelagem de sistemas (UML, requisitos)", kind: "TECH" },
  { id: "metodologias-ageis", name: "Metodologias ágeis (Scrum, Kanban)", kind: "TECH" },
  { id: "redes", name: "Fundamentos de redes", kind: "TECH" },
  { id: "sistemas-operacionais", name: "Sistemas operacionais e Linux", kind: "TECH" },
  { id: "nuvem", name: "Computação em nuvem", kind: "TECH" },
  { id: "seguranca", name: "Fundamentos de segurança da informação", kind: "TECH" },
  { id: "testes", name: "Testes de software", kind: "TECH" },
  { id: "comunicacao", name: "Comunicação", kind: "BEHAVIORAL" },
  { id: "trabalho-equipe", name: "Trabalho em equipe", kind: "BEHAVIORAL" },
  { id: "resolucao-problemas", name: "Resolução de problemas", kind: "BEHAVIORAL" },
  { id: "organizacao", name: "Organização e gestão do tempo", kind: "BEHAVIORAL" },
  { id: "lideranca", name: "Liderança", kind: "BEHAVIORAL" },
  { id: "atencao-detalhes", name: "Atenção aos detalhes", kind: "BEHAVIORAL" },
  { id: "aprendizado", name: "Aprendizado contínuo", kind: "BEHAVIORAL" },
];

export const PROFILES: Profile[] = [
  {
    id: "desenvolvimento",
    title: "Desenvolvimento de Software",
    description:
      "Construir sites, aplicativos e sistemas — a base de quem programa no dia a dia.",
    skills: [
      { skillId: "logica", w: 0.2, m: 4, d: 3 },
      { skillId: "javascript", w: 0.2, m: 4, d: 3 },
      { skillId: "html-css", w: 0.1, m: 3, d: 2 },
      { skillId: "banco-dados", w: 0.15, m: 3, d: 2 },
      { skillId: "git", w: 0.1, m: 3, d: 3 },
      { skillId: "resolucao-problemas", w: 0.15, m: 4, d: 3 },
      { skillId: "trabalho-equipe", w: 0.1, m: 3, d: 2 },
    ],
  },
  {
    id: "analise",
    title: "Análise de Sistemas",
    description:
      "Entender problemas, desenhar soluções e planejar como os sistemas devem ser construídos.",
    skills: [
      { skillId: "modelagem", w: 0.25, m: 4, d: 2 },
      { skillId: "banco-dados", w: 0.15, m: 3, d: 2 },
      { skillId: "logica", w: 0.1, m: 3, d: 2 },
      { skillId: "metodologias-ageis", w: 0.15, m: 3, d: 3 },
      { skillId: "comunicacao", w: 0.2, m: 4, d: 3 },
      { skillId: "resolucao-problemas", w: 0.15, m: 4, d: 3 },
    ],
  },
  {
    id: "gestao",
    title: "Gestão de Projetos em TI",
    description:
      "Organizar recursos, definir prazos e garantir que os projetos sejam entregues com sucesso.",
    skills: [
      { skillId: "metodologias-ageis", w: 0.25, m: 4, d: 3 },
      { skillId: "comunicacao", w: 0.2, m: 4, d: 3 },
      { skillId: "lideranca", w: 0.2, m: 4, d: 2 },
      { skillId: "organizacao", w: 0.2, m: 4, d: 2 },
      { skillId: "modelagem", w: 0.15, m: 2, d: 1 },
    ],
  },
  {
    id: "infraestrutura",
    title: "Redes e Infraestrutura",
    description:
      "Manter sistemas no ar, automatizar processos e cuidar da infraestrutura que sustenta tudo.",
    skills: [
      { skillId: "redes", w: 0.25, m: 4, d: 3 },
      { skillId: "sistemas-operacionais", w: 0.25, m: 4, d: 3 },
      { skillId: "nuvem", w: 0.2, m: 3, d: 3 },
      { skillId: "seguranca", w: 0.1, m: 3, d: 2 },
      { skillId: "resolucao-problemas", w: 0.2, m: 4, d: 2 },
    ],
  },
  {
    id: "seguranca",
    title: "Segurança da Informação",
    description:
      "Proteger dados e sistemas contra ameaças e garantir a integridade das informações.",
    skills: [
      { skillId: "seguranca", w: 0.3, m: 4, d: 3 },
      { skillId: "redes", w: 0.2, m: 4, d: 3 },
      { skillId: "sistemas-operacionais", w: 0.15, m: 3, d: 2 },
      { skillId: "logica", w: 0.1, m: 3, d: 2 },
      { skillId: "atencao-detalhes", w: 0.15, m: 4, d: 2 },
      { skillId: "aprendizado", w: 0.1, m: 4, d: 2 },
    ],
  },
  {
    id: "qualidade",
    title: "Qualidade de Software",
    description:
      "Testar, encontrar falhas e garantir que o que foi construído funciona como esperado.",
    skills: [
      { skillId: "testes", w: 0.3, m: 4, d: 3 },
      { skillId: "logica", w: 0.15, m: 3, d: 2 },
      { skillId: "javascript", w: 0.1, m: 2, d: 2 },
      { skillId: "atencao-detalhes", w: 0.2, m: 4, d: 2 },
      { skillId: "comunicacao", w: 0.15, m: 3, d: 2 },
      { skillId: "git", w: 0.1, m: 3, d: 2 },
    ],
  },
];

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
