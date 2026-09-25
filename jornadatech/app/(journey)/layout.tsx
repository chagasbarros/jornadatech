import { requireUser } from "@/lib/auth";
import { BrandHeader } from "@/components/brand-header";
import { JourneyStepper } from "./journey-stepper";

// A checagem de acesso de cada etapa fica em requireStep() na página;
// layouts não re-renderizam em toda navegação.
export default async function JourneyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#123F45]">
      <BrandHeader>
        <JourneyStepper editing={Boolean(user.completedAt)} />
      </BrandHeader>
      <main className="px-6 pb-16">{children}</main>
    </div>
  );
}
