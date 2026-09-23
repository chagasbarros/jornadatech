"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { firstIssue, journeyUpdate, type ActionResult } from "@/lib/steps";
import { actionPlanSchema, type ActionPlanInput } from "@/lib/validation/career";

export async function saveActionPlan(
  input: ActionPlanInput,
): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = actionPlanSchema.safeParse(input);
  if (!parsed.success) return firstIssue(parsed.error);

  const { goals, feedback } = parsed.data;
  const journey = journeyUpdate(user, "ACTION_PLAN");

  await prisma.$transaction([
    prisma.actionGoal.deleteMany({ where: { userId: user.id } }),
    prisma.actionGoal.createMany({
      data: goals.map((g, position) => ({ ...g, position, userId: user.id })),
    }),
    ...(feedback
      ? [
          prisma.journeyFeedback.upsert({
            where: { userId: user.id },
            create: { userId: user.id, ...feedback },
            update: feedback,
          }),
        ]
      : []),
    prisma.user.update({ where: { id: user.id }, data: journey.data }),
  ]);

  redirect(journey.redirectTo);
}
