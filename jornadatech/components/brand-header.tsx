import Link from "next/link";
import { LogOut } from "lucide-react";
import { signOut } from "@/app/login/actions";

export function BrandHeader({ children }: { children?: React.ReactNode }) {
  return (
    <header className="border-b border-[#D7DDD8] bg-[#F8F7F3]/90 backdrop-blur print:hidden">
      <div className="h-1 bg-grad-deco" aria-hidden />
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0B5A48] text-sm font-semibold text-[#F8F7F3] font-[family-name:var(--font-display)]">
            TC
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            Jornada Tech
          </span>
        </Link>
        <div className="flex items-center gap-4">
          {children}
          <form action={signOut}>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#456A70] transition-colors hover:text-[#123F45]"
            >
              <LogOut className="h-3.5 w-3.5" aria-hidden />
              Sair
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
