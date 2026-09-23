import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireStep } from "@/lib/auth";
import { getCareerAnalysis } from "@/lib/career/data";
import { GapSummary, skillName } from "@/components/gap-summary";
import CanvasForm from "./canvas-form";

export default async function CanvasPage() {
  const user = await requireStep("CANVAS");
  const career = await getCareerAnalysis(user);
  if (!career) redirect("/field-interest");

  const canvas = await prisma.careerCanvas.findUnique({
    where: { userId: user.id },
  });
  const suggested = career.analysis.track.map((g) => skillName(g.skillId));

  return (
    <CanvasForm
      editing={Boolean(user.completedAt)}
      summary={<GapSummary {...career} />}
      suggested={suggested}
      initial={{
        objective: canvas?.objective ?? "",
        // Sem canvas salvo, começa com a trilha sugerida. Depois disso a
        // lista é do aluno e nunca é sobrescrita automaticamente.
        skillsToDevelop: canvas?.skillsToDevelop ?? suggested,
        networking: canvas?.networking ?? "",
        experiences: canvas?.experiences ?? "",
        portfolio: canvas?.portfolio ?? "",
      }}
    />
  );
}
