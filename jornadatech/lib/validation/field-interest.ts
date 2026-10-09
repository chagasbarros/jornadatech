import { z } from "zod";
import { PROFILES } from "@/lib/career/catalog";

// Separado de career.ts porque importa o catálogo (com o JSON de carreiras),
// e career.ts é usado por Client Components.
export const fieldInterestSchema = z.object({
  profileId: z.enum(PROFILES.map((p) => p.id), "Escolha uma área."),
});
