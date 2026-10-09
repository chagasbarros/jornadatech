"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { courseHasProfile } from "@/lib/career/catalog";
import { firstIssue, journeyUpdate, type ActionResult } from "@/lib/steps";
import { selfSchema } from "@/lib/validation/self";

// Entrada não confiável: o formato é validado pelo Zod.
export async function saveSelf(input: {
  course: string;
  semester: string;
  motivation: string;
  curiosities: string[];
}): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = selfSchema.safeParse(input);
  if (!parsed.success) return firstIssue(parsed.error);

  // Trocar de curso desfaz a escolha de carreira que não pertence ao novo curso.
  const keepsProfile =
    !user.targetProfileId ||
    courseHasProfile(parsed.data.course, user.targetProfileId);

  const journey = journeyUpdate(user, "SELF");
  await prisma.$transaction([
    prisma.selfProfile.upsert({
      where: { userId: user.id },
      create: { userId: user.id, ...parsed.data },
      update: parsed.data,
    }),
    prisma.user.update({
      where: { id: user.id },
      data: {
        ...journey.data,
        ...(keepsProfile ? {} : { targetProfileId: null }),
      },
    }),
  ]);

  // Após concluir a jornada, o aluno volta ao painel — mas antes precisa
  // escolher uma carreira do novo curso.
  redirect(keepsProfile ? journey.redirectTo : "/field-interest");
}
