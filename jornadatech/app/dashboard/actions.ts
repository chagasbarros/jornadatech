"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";

const toggleSchema = z.object({ goalId: z.string().min(1), done: z.boolean() });

export async function toggleGoal(input: { goalId: string; done: boolean }) {
  const user = await requireUser();
  const parsed = toggleSchema.safeParse(input);
  if (!parsed.success) return;

  // Filtra pelo dono: um goalId de outro aluno não altera nada.
  await prisma.actionGoal.updateMany({
    where: { id: parsed.data.goalId, userId: user.id },
    data: { done: parsed.data.done },
  });
  revalidatePath("/dashboard");
}
