import { z } from "zod";
import { COURSES, getCourse } from "@/lib/career/courses";

const MAX_SEMESTERS = Math.max(...COURSES.map((c) => c.semesters));

export const SEMESTERS = Array.from({ length: MAX_SEMESTERS }, (_, i) => ({
  id: `semestre-${i + 1}`,
  title: `${i + 1}º semestre`,
}));

/** Semestres que o curso oferece (ADS tem 5; SI e CC, 8). */
export function semestersFor(courseId: string | null | undefined) {
  return SEMESTERS.slice(0, getCourse(courseId)?.semesters ?? 0);
}

export const CURIOSITIES = [
  "Desenvolvimento de software",
  "Análise de Sistemas",
  "Gestão de projetos em TI",
  "Redes e infraestrutura",
  "Segurança da informação",
  "Testes e qualidade",
  "Dados e inteligência artificial",
  "Banco de dados e BI",
  "Produto e negócios",
  "Pesquisa acadêmica",
] as const;

export const selfSchema = z
  .object({
    course: z.enum(COURSES.map((c) => c.id), "Escolha o seu curso."),
    semester: z.enum(SEMESTERS.map((s) => s.id), "Escolha o seu semestre."),
    motivation: z
      .string()
      .trim()
      .min(1, "Conte o que te motiva a estudar tecnologia.")
      .max(1000),
    curiosities: z.array(z.enum(CURIOSITIES)).max(CURIOSITIES.length),
  })
  .refine(
    (v) => semestersFor(v.course).some((s) => s.id === v.semester),
    { message: "Escolha o seu semestre.", path: ["semester"] },
  );

export type SelfInput = z.infer<typeof selfSchema>;
