import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireStep } from "@/lib/auth";
import { getCourseProfiles } from "@/lib/career/catalog";
import { getCourse } from "@/lib/career/courses";
import FieldInterestForm from "./field-interest-form";

export default async function FieldInterestPage() {
  const user = await requireStep("FIELD_INTEREST");
  const self = await prisma.selfProfile.findUnique({
    where: { userId: user.id },
    select: { course: true },
  });
  const course = getCourse(self?.course);
  if (!course) redirect("/self");

  return (
    <FieldInterestForm
      editing={Boolean(user.completedAt)}
      initialProfileId={user.targetProfileId}
      courseName={course.name}
      careers={getCourseProfiles(course.id).map(({ id, title, description }) => ({
        id,
        title,
        description,
      }))}
    />
  );
}
