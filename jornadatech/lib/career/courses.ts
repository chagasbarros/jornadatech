// Cursos atendidos. Os ids são os mesmos de docs/carreiras_tecnologia.json;
// as carreiras de cada curso vêm do catálogo (getCourseProfiles).
// Módulo leve, sem o JSON, para poder ser usado em Client Components.

export const COURSES = [
  { id: "ads", name: "Análise e Desenvolvimento de Sistemas", semesters: 5 },
  { id: "si", name: "Sistemas de Informação", semesters: 8 },
  { id: "cc", name: "Ciência da Computação", semesters: 8 },
] as const;

export type Course = (typeof COURSES)[number];
export type CourseId = Course["id"];

export function getCourse(id: string | null | undefined): Course | undefined {
  return COURSES.find((c) => c.id === id);
}
