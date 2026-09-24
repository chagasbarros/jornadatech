// Catálogo único de competências e perfis profissionais.
// Os ids de competência são compartilhados entre os perfis e a autoavaliação.
//
// Curadoria: public/curadoria-competencias.pdf (revisão de 2026-09).
// Decisão da revisão: dentro de cada perfil, todas as competências têm o mesmo
// peso, a mesma proficiência mínima e a mesma prioridade (ver equalSkills).

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
  // Técnicas — desenvolvimento
  { id: "logica", name: "Lógica de programação", kind: "TECH" },
  { id: "html-css", name: "HTML / CSS", kind: "TECH" },
  { id: "javascript", name: "JavaScript", kind: "TECH" },
  {
    id: "linguagem-backend",
    name: "Linguagem back-end (ex.: Java, Python, C#)",
    kind: "TECH",
  },
  { id: "banco-dados", name: "Banco de dados e SQL", kind: "TECH" },
  { id: "git", name: "Versionamento de código (Git)", kind: "TECH" },
  {
    id: "apis",
    name: "APIs e integração entre sistemas (REST, JSON)",
    kind: "TECH",
  },
  // Técnicas — análise e gestão
  {
    id: "requisitos",
    name: "Levantamento e análise de requisitos",
    kind: "TECH",
  },
  { id: "modelagem", name: "Modelagem de sistemas (UML)", kind: "TECH" },
  {
    id: "modelagem-processos",
    name: "Modelagem de processos de negócio (BPMN)",
    kind: "TECH",
  },
  {
    id: "prototipacao",
    name: "Prototipação de telas (wireframes, Figma)",
    kind: "TECH",
  },
  {
    id: "metodologias-ageis",
    name: "Metodologias ágeis (Scrum, Kanban)",
    kind: "TECH",
  },
  {
    id: "planejamento-projetos",
    name: "Planejamento de projetos (escopo, cronograma, custos, riscos)",
    kind: "TECH",
  },
  {
    id: "ferramentas-gestao",
    name: "Ferramentas de gestão (Jira, Trello, MS Project)",
    kind: "TECH",
  },
  {
    id: "indicadores",
    name: "Indicadores e relatórios de acompanhamento",
    kind: "TECH",
  },
  // Técnicas — infraestrutura e segurança
  {
    id: "redes",
    name: "Fundamentos de redes (TCP/IP, roteamento, Wi-Fi)",
    kind: "TECH",
  },
  {
    id: "sistemas-operacionais",
    name: "Sistemas operacionais (Linux e Windows)",
    kind: "TECH",
  },
  { id: "nuvem", name: "Computação em nuvem (AWS, Azure)", kind: "TECH" },
  {
    id: "virtualizacao",
    name: "Virtualização e containers (VMware, Docker)",
    kind: "TECH",
  },
  {
    id: "automacao-scripts",
    name: "Scripts e automação (Bash, PowerShell, Python)",
    kind: "TECH",
  },
  {
    id: "suporte-tecnico",
    name: "Suporte técnico e gestão de serviços (help desk, ITIL)",
    kind: "TECH",
  },
  {
    id: "seguranca",
    name: "Fundamentos de segurança da informação",
    kind: "TECH",
  },
  {
    id: "vulnerabilidades",
    name: "Análise de vulnerabilidades e testes de invasão",
    kind: "TECH",
  },
  {
    id: "resposta-incidentes",
    name: "Monitoramento e resposta a incidentes (logs, SIEM)",
    kind: "TECH",
  },
  {
    id: "normas-legislacao",
    name: "Normas e legislação (LGPD, ISO 27001)",
    kind: "TECH",
  },
  // Técnicas — qualidade
  {
    id: "testes",
    name: "Testes de software (tipos de teste, casos de teste, registro de bugs)",
    kind: "TECH",
  },
  {
    id: "automacao-testes",
    name: "Automação de testes (Cypress, Selenium, Playwright)",
    kind: "TECH",
  },
  { id: "testes-api", name: "Testes de API (Postman, Insomnia)", kind: "TECH" },
  // Comportamentais
  { id: "comunicacao", name: "Comunicação", kind: "BEHAVIORAL" },
  {
    id: "resolucao-problemas",
    name: "Resolução de problemas",
    kind: "BEHAVIORAL",
  },
  { id: "atencao-detalhes", name: "Atenção aos detalhes", kind: "BEHAVIORAL" },
  { id: "aprendizado", name: "Aprendizado contínuo", kind: "BEHAVIORAL" },
  {
    id: "pensamento-critico",
    name: "Pensamento crítico e curiosidade",
    kind: "BEHAVIORAL",
  },
  {
    id: "negociacao",
    name: "Negociação e relacionamento com clientes",
    kind: "BEHAVIORAL",
  },
  {
    id: "organizacao",
    name: "Organização e gestão do tempo",
    kind: "BEHAVIORAL",
  },
  { id: "lideranca", name: "Liderança", kind: "BEHAVIORAL" },
  {
    id: "resiliencia",
    name: "Resiliência e trabalho sob pressão",
    kind: "BEHAVIORAL",
  },
  { id: "etica", name: "Ética profissional", kind: "BEHAVIORAL" },
];

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

export const PROFILES: Profile[] = [
  {
    id: "desenvolvimento",
    title: "Desenvolvimento de Software",
    description:
      "Construir sites, aplicativos e sistemas — a base de quem programa no dia a dia.",
    skills: equalSkills([
      "logica",
      "html-css",
      "javascript",
      "linguagem-backend",
      "banco-dados",
      "git",
      "apis",
      "resolucao-problemas",
      "pensamento-critico",
      "aprendizado",
    ]),
  },
  {
    id: "analise",
    title: "Analista de Sistemas",
    description:
      "Entender o problema do negócio e desenhar a solução antes de ela ser construída.",
    skills: equalSkills([
      "requisitos",
      "modelagem",
      "modelagem-processos",
      "prototipacao",
      "banco-dados",
      "logica",
      "metodologias-ageis",
      "comunicacao",
      "resolucao-problemas",
      "negociacao",
    ]),
  },
  {
    id: "gestao",
    title: "Gestão de Projetos em TI",
    description:
      "Organizar pessoas, prazos e recursos para que os projetos sejam entregues.",
    skills: equalSkills([
      "metodologias-ageis",
      "planejamento-projetos",
      "ferramentas-gestao",
      "requisitos",
      "indicadores",
      "comunicacao",
      "lideranca",
      "organizacao",
      "negociacao",
    ]),
  },
  {
    id: "infraestrutura",
    title: "Infraestrutura",
    description:
      "Manter redes, servidores e serviços funcionando — a base que sustenta tudo.",
    skills: equalSkills([
      "redes",
      "sistemas-operacionais",
      "nuvem",
      "virtualizacao",
      "automacao-scripts",
      "suporte-tecnico",
      "seguranca",
      "resolucao-problemas",
      "comunicacao",
      "resiliencia",
    ]),
  },
  {
    id: "seguranca",
    title: "Segurança da Informação",
    description: "Proteger dados e sistemas contra ataques e vazamentos.",
    skills: equalSkills([
      "seguranca",
      "redes",
      "sistemas-operacionais",
      "automacao-scripts",
      "vulnerabilidades",
      "resposta-incidentes",
      "normas-legislacao",
      "atencao-detalhes",
      "aprendizado",
      "etica",
    ]),
  },
  {
    id: "qualidade",
    title: "QA",
    description: "Testar o software e garantir que ele funciona como esperado.",
    skills: equalSkills([
      "testes",
      "automacao-testes",
      "testes-api",
      "logica",
      "banco-dados",
      "git",
      "metodologias-ageis",
      "atencao-detalhes",
      "comunicacao",
      "pensamento-critico",
    ]),
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
