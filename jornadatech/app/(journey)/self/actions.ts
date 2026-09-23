"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { firstIssue, journeyUpdate, type ActionResult } from "@/lib/steps";
import { selfSchema } from "@/lib/validation/self";

// Entrada não confiável: o formato é validado pelo Zod.
export async function saveSelf(input: {
  semester: string;
  motivation: string;
  curiosities: string[];
}): Promise<ActionResult> {
  const user = await requireUser();
  const parsed = selfSchema.safeParse(input);
  if (!parsed.success) return firstIssue(parsed.error);

  const journey = journeyUpdate(user, "SELF");
  await prisma.$transaction([
    prisma.selfProfile.upsert({
      where: { userId: user.id },
      create: { userId: user.id, ...parsed.data },
      update: parsed.data,
    }),
    prisma.user.update({ where: { id: user.id }, data: journey.data }),
  ]);

  redirect(journey.redirectTo);
}
