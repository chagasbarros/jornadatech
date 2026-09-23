"use client";

import { Printer } from "lucide-react";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-1.5 rounded-full border border-[#DCE6DA] px-4 py-2 text-[13px] font-semibold text-[#354238] transition-colors hover:border-[#B9C9BE] print:hidden"
    >
      <Printer className="h-3.5 w-3.5" aria-hidden />
      Imprimir plano
    </button>
  );
}
