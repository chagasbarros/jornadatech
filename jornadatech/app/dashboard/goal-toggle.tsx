"use client";

import { useOptimistic, useTransition } from "react";
import { Check } from "lucide-react";
import { toggleGoal } from "./actions";

export function GoalToggle({ goalId, done }: { goalId: string; done: boolean }) {
  const [optimisticDone, setOptimisticDone] = useOptimistic(done);
  const [, startTransition] = useTransition();

  return (
    <button
      type="button"
      aria-pressed={optimisticDone}
      aria-label={optimisticDone ? "Desmarcar meta" : "Marcar meta como concluída"}
      onClick={() =>
        startTransition(async () => {
          setOptimisticDone(!optimisticDone);
          await toggleGoal({ goalId, done: !optimisticDone });
        })
      }
      className={
        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors " +
        (optimisticDone
          ? "border-[#0B5A48] bg-[#0B5A48] text-[#F8F7F3]"
          : "border-[#B7C4BE] hover:border-[#0B5A48]")
      }
    >
      {optimisticDone && <Check className="h-3 w-3" aria-hidden />}
    </button>
  );
}
