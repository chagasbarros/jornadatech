import { requireStep } from "@/lib/auth";
import FieldInterestForm from "./field-interest-form";

export default async function FieldInterestPage() {
  const user = await requireStep("FIELD_INTEREST");
  return (
    <FieldInterestForm
      editing={Boolean(user.completedAt)}
      initialProfileId={user.targetProfileId}
    />
  );
}
