import { redirect } from "next/navigation";
import { requireStep } from "@/lib/auth";
import { getProfile, getProfileSkills } from "@/lib/career/catalog";
import { getAssessments } from "@/lib/career/data";
import SelfEvaluationForm from "./self-evaluation-form";

export default async function SelfEvaluationPage() {
  const user = await requireStep("SELF_EVALUATION");
  const profile = getProfile(user.targetProfileId);
  if (!profile) redirect("/field-interest");

  const assessments = await getAssessments(user.id);
  const skills = getProfileSkills(profile);

  return (
    <SelfEvaluationForm
      editing={Boolean(user.completedAt)}
      profileTitle={profile.title}
      skills={skills}
      initialLevels={Object.fromEntries(
        skills
          .filter((s) => s.id in assessments)
          .map((s) => [s.id, assessments[s.id]]),
      )}
    />
  );
}
