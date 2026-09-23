"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { firstIssue, journeyUpdate, type ActionResult } from "@/lib/steps";
import { fieldInterestSchema } from "@/lib/validation/career";

export async function saveFieldInterest(input: {
  profileId: string;
}): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = fieldInterestSchema.safeParse(input);
  if (!parsed.success) return firstIssue(parsed.error);

  // Trocar de perfil mantém as notas já dadas; competências novas contam
  // como 0 até o aluno avaliá-las.
  const journey = journeyUpdate(user, "FIELD_INTEREST");
  await prisma.user.update({
    where: { id: user.id },
    data: { targetProfileId: parsed.data.profileId, ...journey.data },
  });

  redirect(journey.redirectTo);
}
