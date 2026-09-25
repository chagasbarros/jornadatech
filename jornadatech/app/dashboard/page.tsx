import Link from "next/link";
import { redirect } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  PlusCircle,
  RefreshCcw,
  UserRound,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireStep } from "@/lib/auth";
import { getCareerAnalysis } from "@/lib/career/data";
import { BrandHeader } from "@/components/brand-header";
import { GapSummary, skillName } from "@/components/gap-summary";
import { CareerCanvas } from "./career-canvas";
import { PrintButton } from "./print-button";

function sameItems(a: string[], b: string[]) {
  return a.length === b.length && a.every((x) => b.includes(x));
}

export default async function PainelPage() {
  const user = await requireStep("DONE");
  const career = await getCareerAnalysis(user);
  if (!career) redirect("/field-interest");

  const [canvas, goals, selfProfile] = await Promise.all([
    prisma.careerCanvas.findUnique({ where: { userId: user.id } }),
    prisma.actionGoal.findMany({
      where: { userId: user.id },
      orderBy: { position: "asc" },
    }),
    prisma.selfProfile.findUnique({ where: { userId: user.id } }),
  ]);

  const { profile, analysis } = career;
  const trackIds = analysis.track.map((g) => g.skillId);
  const newSuggestions =
    canvas !== null && !sameItems(trackIds, canvas.suggestedSkills);

  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#123F45] print:min-h-0">
      {/* Impressão: só o Canvas, em uma página A4 paisagem. */}
      <style>{"@page { size: A4 landscape; margin: 8mm; }"}</style>
      <BrandHeader>
        <PrintButton />
      </BrandHeader>

      <main className="mx-auto max-w-7xl px-6 py-12 md:py-16 print:py-0">
        <h1 className="font-[family-name:var(--font-display)] text-[30px] print:hidden leading-tight tracking-tight text-[#123F45] md:text-[36px]">
          Seu plano de carreira
        </h1>
        <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-[#456A70] print:hidden">
          Acompanhe sua evolução e edite qualquer parte do seu Canvas de
          Carreira, sem refazer tudo do início.
        </p>

        {analysis.unassessed.length > 0 && (
          <Link
            href="/self-evaluation"
            className="mt-6 flex items-center gap-3 rounded-2xl border border-[#F6C9A6] bg-[#FDEEE3] p-4 text-[14px] text-[#8A4A1F] print:hidden"
          >
            <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
            <span className="flex-1">
              Avalie {analysis.unassessed.length}{" "}
              {analysis.unassessed.length === 1
                ? "nova competência"
                : "novas competências"}{" "}
              de {profile.title}. Até lá, elas contam como nível 0.
            </span>
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        )}

        <div className="mt-8 print:mt-0">
          <CareerCanvas
            profile={profile}
            analysis={analysis}
            canvas={canvas}
            selfProfile={selfProfile}
            goals={goals}
            newSuggestions={newSuggestions}
          />
        </div>

        <div className="mt-8 print:hidden">
          <GapSummary profile={profile} analysis={analysis} />
        </div>

        {/* Ações rápidas */}
        <div className="mt-4 grid gap-4 sm:grid-cols-3 print:hidden">
          {[
            { href: "/self-evaluation", icon: RefreshCcw, label: "Refazer autoavaliação" },
            { href: "/field-interest", icon: PlusCircle, label: "Trocar de área" },
            { href: "/self", icon: UserRound, label: "Editar “Quem sou eu”" },
          ].map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center justify-between rounded-2xl border border-[#D7DDD8] bg-white/50 p-5 transition-colors hover:border-[#B7C4BE]"
            >
              <span className="flex items-center gap-3 text-[14px] font-semibold text-[#123F45]">
                <Icon className="h-4 w-4 text-[#073D35]" aria-hidden />
                {label}
              </span>
              <ArrowRight className="h-4 w-4 text-[#8FA3A6]" aria-hidden />
            </Link>
          ))}
        </div>

        <p className="mt-1.5 hidden text-[9px] leading-tight text-[#8FA3A6] print:block">
          Jornada Tech · {user.email} · Área: {profile.title} · Trilha:{" "}
          {trackIds.map(skillName).join(", ") || "sem lacunas"}
        </p>
      </main>
    </div>
  );
}
