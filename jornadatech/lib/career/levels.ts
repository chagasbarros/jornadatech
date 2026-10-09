// Escala da autoavaliação. Fica separada do catálogo para que Client Components
// possam importá-la sem levar o JSON de carreiras para o navegador.

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
