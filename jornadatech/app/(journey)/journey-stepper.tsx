"use client";

import { usePathname } from "next/navigation";
import { STEP_LABELS, STEP_PATHS, STEPS } from "@/lib/journey";

const JOURNEY_STEPS = STEPS.filter((s) => s !== "DONE");

export function JourneyStepper({ editing }: { editing: boolean }) {
  const pathname = usePathname();
  const index = JOURNEY_STEPS.findIndex((s) => STEP_PATHS[s] === pathname);
  if (index < 0) return null;

  if (editing) {
    return (
      <span className="text-[13px] text-[#5F7F84]">
        Editando: {STEP_LABELS[JOURNEY_STEPS[index]]}
      </span>
    );
  }

  return (
    <span className="text-[13px] text-[#5F7F84]">
      Etapa {index + 1} de {JOURNEY_STEPS.length} ·{" "}
      {STEP_LABELS[JOURNEY_STEPS[index]]}
    </span>
  );
}
