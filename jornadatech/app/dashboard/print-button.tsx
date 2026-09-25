"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-1.5 rounded-full border border-[#D7DDD8] px-4 py-2 text-[13px] font-semibold text-[#2A5359] transition-colors hover:border-[#B7C4BE] print:hidden"
    >
      <Printer className="h-3.5 w-3.5" aria-hidden />
      Imprimir plano
    </button>
  );
}
