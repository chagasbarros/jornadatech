"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { getProfile } from "@/lib/career/catalog";
import { firstIssue, journeyUpdate, type ActionResult } from "@/lib/steps";
import { selfEvaluationSchema } from "@/lib/validation/career";

export async function saveSelfEvaluation(input: {
  levels: Record<string, number>;
}): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = selfEvaluationSchema.safeParse(input);
  if (!parsed.success) return firstIssue(parsed.error);

  const profile = getProfile(user.targetProfileId);
  if (!profile) redirect("/field-interest");

  // Só aceita competências do perfil do aluno, e exige todas.
  const levels = parsed.data.levels;
  const missing = profile.skills.some((s) => !(s.skillId in levels));
  if (missing) return { error: "Avalie todas as competências." };

  const journey = journeyUpdate(user, "SELF_EVALUATION");
  await prisma.$transaction([
    ...profile.skills.map(({ skillId }) =>
      prisma.skillAssessment.upsert({
        where: { userId_skillId: { userId: user.id, skillId } },
        create: { userId: user.id, skillId, level: levels[skillId] },
        update: { level: levels[skillId] },
      }),
    ),
    prisma.user.update({ where: { id: user.id }, data: journey.data }),
  ]);

  redirect(journey.redirectTo);
}
