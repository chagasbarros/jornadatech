import "server-only";
import type { User } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { getProfile } from "./catalog";
import { analyzeGap } from "./gap-analysis";

export async function getAssessments(userId: string) {
  const rows = await prisma.skillAssessment.findMany({ where: { userId } });
  return Object.fromEntries(rows.map((r) => [r.skillId, r.level]));
}

/** Perfil-alvo do aluno + análise de lacunas, ou null se ainda não escolheu. */
export async function getCareerAnalysis(user: User) {
  const profile = getProfile(user.targetProfileId);
  if (!profile) return null;
  const assessments = await getAssessments(user.id);
  return { profile, analysis: analyzeGap(profile, assessments) };
}
