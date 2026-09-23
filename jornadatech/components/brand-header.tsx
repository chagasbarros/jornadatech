import Link from "next/link";
import { LogOut } from "lucide-react";
import { signOut } from "@/app/login/actions";

export function BrandHeader({ children }: { children?: React.ReactNode }) {
  return (
    <header className="border-b border-[#DCE6DA] bg-[#F6F2E7]/90 backdrop-blur print:hidden">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2F6B45] text-sm font-semibold text-[#F6F2E7] font-[family-name:var(--font-display)]">
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
              className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#4B5B52] transition-colors hover:text-[#16231C]"
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
