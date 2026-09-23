import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireStep } from "@/lib/auth";
import { getCareerAnalysis } from "@/lib/career/data";
import { suggestGoals } from "@/lib/career/suggestions";
import ActionPlanForm from "./action-plan-form";

export default async function ActionPlanPage() {
  const user = await requireStep("ACTION_PLAN");
  const career = await getCareerAnalysis(user);
  if (!career) redirect("/field-interest");

  const goals = await prisma.actionGoal.findMany({
    where: { userId: user.id },
    orderBy: { position: "asc" },
    select: {
      horizon: true,
      objective: true,
      action: true,
      deadline: true,
      indicator: true,
      done: true,
      suggested: true,
    },
  });

  return (
    <ActionPlanForm
      editing={Boolean(user.completedAt)}
      initialGoals={goals.length > 0 ? goals : suggestGoals(career.analysis)}
    />
  );
}
