"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { ensureRaffleEntry } from "@/lib/raffle-entry";
import { firstIssue, journeyUpdate, type ActionResult } from "@/lib/steps";
import { actionPlanSchema, type ActionPlanInput } from "@/lib/validation/career";

export async function saveActionPlan(
  input: ActionPlanInput,
): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = actionPlanSchema.safeParse(input);
  if (!parsed.success) return firstIssue(parsed.error);

  const { goals, feedback } = parsed.data;
  // Na primeira conclusão o questionário é obrigatório; depois, editar o plano não o pede.
  if (!user.completedAt && !feedback) {
    return { error: "Responda ao questionário para concluir a jornada." };
  }
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

  // Concluir a jornada inscreve o aluno no sorteio (código enviado por email).
  await ensureRaffleEntry({ ...user, ...journey.data });

  redirect(journey.redirectTo);
}
