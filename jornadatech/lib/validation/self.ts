import { z } from "zod";

export const SEMESTERS = [
  { id: "semestre-1", title: "1º semestre" },
  { id: "semestre-2", title: "2º semestre" },
  { id: "semestre-3", title: "3º semestre" },
  { id: "semestre-4", title: "4º semestre" },
  { id: "semestre-5", title: "5º semestre" },
] as const;

export const CURIOSITIES = [
  "Desenvolvimento de software",
  "Análise de Sistemas",
  "Gestão de projetos em TI",
  "Redes e infraestrutura",
  "Segurança da informação",
  "Testes e qualidade",
] as const;

export const selfSchema = z.object({
  semester: z.enum(SEMESTERS.map((s) => s.id), "Escolha o seu semestre."),
  motivation: z
    .string()
    .trim()
    .min(1, "Conte o que te motiva a estudar tecnologia.")
    .max(1000),
  curiosities: z.array(z.enum(CURIOSITIES)).max(CURIOSITIES.length),
});

export type SelfInput = z.infer<typeof selfSchema>;
