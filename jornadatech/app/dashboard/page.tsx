import Link from "next/link";
import { redirect } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  NotebookPen,
  PlusCircle,
  RefreshCcw,
  Sparkles,
  UserRound,
  ListTodo,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { requireStep } from "@/lib/auth";
import { getCareerAnalysis } from "@/lib/career/data";
import { BrandHeader } from "@/components/brand-header";
import { GapSummary, skillName } from "@/components/gap-summary";
import { HORIZONS } from "@/lib/validation/career";
import { GoalToggle } from "./goal-toggle";
import { PrintButton } from "./print-button";

const HORIZON_LABEL = Object.fromEntries(HORIZONS.map((h) => [h.id, h.label]));

function sameItems(a: string[], b: string[]) {
  return a.length === b.length && a.every((x) => b.includes(x));
}

export default async function PainelPage() {
  const user = await requireStep("DONE");
  const career = await getCareerAnalysis(user);
  if (!career) redirect("/field-interest");

  const [canvas, goals] = await Promise.all([
    prisma.careerCanvas.findUnique({ where: { userId: user.id } }),
    prisma.actionGoal.findMany({
      where: { userId: user.id },
      orderBy: { position: "asc" },
    }),
  ]);

  const { profile, analysis } = career;
  const trackIds = analysis.track.map((g) => g.skillId);
  const newSuggestions =
    canvas !== null && !sameItems(trackIds, canvas.suggestedSkills);
  const concluidas = goals.filter((g) => g.done).length;

  return (
    <div className="min-h-screen bg-[#F6F2E7] text-[#16231C]">
      <BrandHeader>
        <PrintButton />
      </BrandHeader>

      <main className="mx-auto max-w-5xl px-6 py-12 md:py-16 print:py-0">
        <h1 className="font-[family-name:var(--font-display)] text-[30px] leading-tight tracking-tight text-[#16231C] md:text-[36px]">
          Seu plano de carreira
        </h1>
        <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-[#4B5B52] print:hidden">
          Acompanhe sua evolução e edite qualquer parte do seu Canvas de
          Carreira, sem refazer tudo do início.
        </p>

        {analysis.unassessed.length > 0 && (
          <Link
            href="/self-evaluation"
            className="mt-6 flex items-center gap-3 rounded-2xl border border-[#E8D9A8] bg-[#FBF3DA] p-4 text-[14px] text-[#6B5516] print:hidden"
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

        <div className="mt-8">
          <GapSummary profile={profile} analysis={analysis} />
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
          {/* Canvas */}
          <section className="rounded-[28px] border border-[#DCE6DA] bg-white/50 p-6 md:p-7">
            <div className="flex items-center justify-between">
              <h2 className="text-[13px] font-medium text-[#6C7A6F]">
                Canvas de Carreira
              </h2>
              <Link
                href="/canvas"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2F6B45] hover:text-[#26582F] print:hidden"
              >
                <NotebookPen className="h-3.5 w-3.5" aria-hidden />
                Editar
              </Link>
            </div>

            {newSuggestions && (
              <Link
                href="/canvas"
                className="mt-4 flex items-center gap-2 rounded-xl bg-[#BFE3CE]/40 px-3 py-2 text-[12px] font-medium text-[#26582F] print:hidden"
              >
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                Há novas sugestões de competências a desenvolver
              </Link>
            )}

            <dl className="mt-5 space-y-4 text-[14px]">
              <div>
                <dt className="font-semibold text-[#16231C]">Objetivo</dt>
                <dd className="mt-1 text-[#354238]">{canvas?.objective}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[#16231C]">
                  Competências a desenvolver
                </dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                  {canvas?.skillsToDevelop.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-[#DCE6DA] bg-white/70 px-3 py-1 text-[12px] font-medium text-[#354238]"
                    >
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
              {[
                ["Networking", canvas?.networking],
                ["Experiências e projetos", canvas?.experiences],
                ["Portfólio", canvas?.portfolio],
              ].map(
                ([titulo, valor]) =>
                  valor && (
                    <div key={titulo}>
                      <dt className="font-semibold text-[#16231C]">{titulo}</dt>
                      <dd className="mt-1 whitespace-pre-line text-[#354238]">
                        {valor}
                      </dd>
                    </div>
                  ),
              )}
            </dl>
          </section>

          {/* Plano de ação */}
          <section className="rounded-[28px] border border-[#DCE6DA] bg-white/50 p-6 md:p-7">
            <div className="flex items-center justify-between">
              <h2 className="text-[13px] font-medium text-[#6C7A6F]">
                Plano de ação
              </h2>
              <span className="text-[13px] font-semibold text-[#16231C]">
                {concluidas} de {goals.length}
              </span>
            </div>

            <ul className="mt-4 space-y-4">
              {goals.map((g) => (
                <li key={g.id} className="flex items-start gap-2.5">
                  <GoalToggle goalId={g.id} done={g.done} />
                  <div className="text-[13px] leading-snug">
                    <p
                      className={
                        "font-semibold " +
                        (g.done
                          ? "text-[#8C978F] line-through"
                          : "text-[#16231C]")
                      }
                    >
                      {g.objective}
                    </p>
                    <p className="mt-0.5 text-[#354238]">{g.action}</p>
                    <p className="mt-0.5 text-[12px] text-[#6C7A6F]">
                      {HORIZON_LABEL[g.horizon]} · {g.deadline} · Indicador:{" "}
                      {g.indicator}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              href="/action-plan"
              className="mt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2F6B45] transition-colors hover:text-[#26582F] print:hidden"
            >
              <ListTodo className="h-3.5 w-3.5" aria-hidden />
              Editar plano
            </Link>
          </section>
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
              className="flex items-center justify-between rounded-2xl border border-[#DCE6DA] bg-white/50 p-5 transition-colors hover:border-[#B9C9BE]"
            >
              <span className="flex items-center gap-3 text-[14px] font-semibold text-[#16231C]">
                <Icon className="h-4 w-4 text-[#26582F]" aria-hidden />
                {label}
              </span>
              <ArrowRight className="h-4 w-4 text-[#8C978F]" aria-hidden />
            </Link>
          ))}
        </div>

        <p className="mt-8 hidden text-[11px] text-[#8C978F] print:block">
          Jornada Tech · {user.email} · Área: {profile.title} · Trilha:{" "}
          {trackIds.map(skillName).join(", ") || "sem lacunas"}
        </p>
      </main>
    </div>
  );
}
