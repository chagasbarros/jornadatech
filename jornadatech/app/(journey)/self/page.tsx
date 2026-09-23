import { prisma } from "@/lib/prisma";
import { requireStep } from "@/lib/auth";
import SelfForm from "./self-form";

export default async function SelfPage() {
  const user = await requireStep("SELF");
  const profile = await prisma.selfProfile.findUnique({
    where: { userId: user.id },
  });

  return (
    <SelfForm
      editing={Boolean(user.completedAt)}
      initial={{
        semester: profile?.semester ?? null,
        motivation: profile?.motivation ?? "",
        curiosities: profile?.curiosities ?? [],
      }}
    />
  );
}
