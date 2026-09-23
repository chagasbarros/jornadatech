"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { getCareerAnalysis } from "@/lib/career/data";
import { firstIssue, journeyUpdate, type ActionResult } from "@/lib/steps";
import { canvasSchema } from "@/lib/validation/career";

export async function saveCanvas(input: {
  objective: string;
  skillsToDevelop: string[];
  networking: string;
  experiences: string;
  portfolio: string;
}): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = canvasSchema.safeParse(input);
  if (!parsed.success) return firstIssue(parsed.error);

  // A sugestão é recalculada no servidor, nunca vem do cliente.
  const career = await getCareerAnalysis(user);
  if (!career) redirect("/field-interest");
  const suggestedSkills = career.analysis.track.map((g) => g.skillId);

  const data = {
    ...parsed.data,
    skillsToDevelop: [...new Set(parsed.data.skillsToDevelop)],
    suggestedSkills,
  };

  const journey = journeyUpdate(user, "CANVAS");
  await prisma.$transaction([
    prisma.careerCanvas.upsert({
      where: { userId: user.id },
      create: { userId: user.id, ...data },
      update: data,
    }),
    prisma.user.update({ where: { id: user.id }, data: journey.data }),
  ]);

  redirect(journey.redirectTo);
}
