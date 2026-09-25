import Link from "next/link";
import type { ReactNode } from "react";
import { PencilLine, Sparkles } from "lucide-react";
import type {
  ActionGoal,
  CareerCanvas as CanvasData,
  SelfProfile,
} from "@prisma/client";
import { MAX_LEVEL, getSkill, type Profile } from "@/lib/career/catalog";
import type { GapAnalysis, Recommendation } from "@/lib/career/gap-analysis";
import { PRIORITY_BADGE, skillName } from "@/components/gap-summary";
import { SEMESTERS } from "@/lib/validation/self";
import { GoalToggle } from "./goal-toggle";

// Canvas de Carreira com os 10 blocos do projeto
// (public/documentacao-canvas-carreira.pdf).

const RECOMMENDATION_SHORT: Record<Recommendation, string> = {
  COURSE: "Curso estruturado",
  PROJECT: "Projeto prático",
  PRACTICE: "Prática dirigida",
};

const SEMESTER_LABEL = Object.fromEntries(
  SEMESTERS.map((s) => [s.id, s.title]),
);

// Posição na grade de 5 colunas × 3 linhas (desktop e impressão). No celular os
// blocos seguem a ordem do DOM, de 01 a 10.
const AREA = {
  quem: "lg:col-start-1 lg:row-start-1 print:col-start-1 print:row-start-1",
  areas: "lg:col-start-1 lg:row-start-2 print:col-start-1 print:row-start-2",
  atuais:
    "lg:col-start-2 lg:row-start-1 lg:row-span-2 print:col-start-2 print:row-start-1 print:row-span-2",
  objetivo:
    "lg:col-start-3 lg:row-start-1 lg:row-span-2 print:col-start-3 print:row-start-1 print:row-span-2",
  desenv:
    "lg:col-start-4 lg:row-start-1 lg:row-span-2 print:col-start-4 print:row-start-1 print:row-span-2",
  exper: "lg:col-start-5 lg:row-start-1 print:col-start-5 print:row-start-1",
  portf: "lg:col-start-5 lg:row-start-2 print:col-start-5 print:row-start-2",
  network: "lg:col-start-1 lg:row-start-3 print:col-start-1 print:row-start-3",
  curto:
    "lg:col-start-2 lg:col-span-2 lg:row-start-3 print:col-start-2 print:col-span-2 print:row-start-3",
  medio:
    "lg:col-start-4 lg:col-span-2 lg:row-start-3 print:col-start-4 print:col-span-2 print:row-start-3",
};

function Bloco({
  num,
  titulo,
  pergunta,
  href,
  area,
  destaque = false,
  children,
}: {
  num: string;
  titulo: string;
  pergunta: string;
  href: string;
  area: string;
  destaque?: boolean;
  children: ReactNode;
}) {
  return (
    <section
      className={`flex flex-col rounded-2xl border p-4 break-inside-avoid ${area} ${
        destaque
          ? "border-[#0B5A48] bg-grad-brand text-[#F8F7F3] shadow-card"
          : "border-[#D7DDD8] bg-white/70 shadow-card"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="flex items-start gap-2 font-[family-name:var(--font-display)] text-[15px] font-semibold leading-snug">
          <span
            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-[family-name:var(--font-body)] text-[10.5px] font-bold ${
              destaque
                ? "bg-white/15 text-[#F8F7F3] ring-1 ring-[#F6B06A]/70"
                : "bg-[#0B5A48] text-white"
            }`}
          >
            {num}
          </span>
          <span className="pt-0.5">{titulo}</span>
        </h3>
        <Link
          href={href}
          aria-label={`Editar ${titulo}`}
          className={`shrink-0 rounded-full p-1 transition-colors print:hidden ${
            destaque
              ? "text-[#C5E3D9] hover:bg-white/10"
              : "text-[#8FA3A6] hover:bg-[#EAF2EF] hover:text-[#0B5A48]"
          }`}
        >
          <PencilLine className="h-3.5 w-3.5" aria-hidden />
        </Link>
      </div>
      <p
        className={`mt-0.5 mb-3 text-[12px] italic ${
          destaque ? "text-[#C5E3D9]" : "text-[#5F7F84]"
        }`}
      >
        {pergunta}
      </p>
      <div className="flex flex-1 flex-col text-[13px] leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function Vazio({ href }: { href: string }) {
  return (
    <p className="text-[13px] text-[#8FA3A6]">
      Ainda não preenchido.{" "}
      <Link
        href={href}
        className="font-semibold text-[#0B5A48] underline-offset-2 hover:underline print:hidden"
      >
        Preencher
      </Link>
    </p>
  );
}

function Texto({ valor, href }: { valor: string | undefined; href: string }) {
  return valor?.trim() ? (
    <p className="whitespace-pre-line text-[#2A5359]">{valor}</p>
  ) : (
    <Vazio href={href} />
  );
}

function Rotulo({ children }: { children: ReactNode }) {
  return (
    <p className="mb-1.5 text-[10.5px] font-bold uppercase tracking-wide text-[#5F7F84]">
      {children}
    </p>
  );
}

function Nivel({ valor }: { valor: number }) {
  return (
    <span
      className="flex shrink-0 gap-1"
      role="img"
      aria-label={`Nível ${valor} de ${MAX_LEVEL}`}
    >
      {Array.from({ length: MAX_LEVEL }, (_, i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full ${
            i < valor ? "bg-[#0B5A48]" : "bg-[#E3E8E5]"
          }`}
        />
      ))}
    </span>
  );
}

function Metas({ goals, href }: { goals: ActionGoal[]; href: string }) {
  if (goals.length === 0) return <Vazio href={href} />;
  return (
    <ul className="divide-y divide-dashed divide-[#D7DDD8]">
      {goals.map((g) => (
        <li key={g.id} className="flex items-start gap-2.5 py-2 first:pt-0">
          <GoalToggle goalId={g.id} done={g.done} />
          <div className="min-w-0 flex-1">
            <p
              className={
                "font-semibold " +
                (g.done ? "text-[#8FA3A6] line-through" : "text-[#123F45]")
              }
            >
              {g.objective}
              {g.suggested && (
                <span className="ml-1.5 rounded bg-[#EAF2EF] px-1.5 py-0.5 align-[1px] text-[10px] font-bold uppercase tracking-wide text-[#0B5A48]">
                  Sugerida
                </span>
              )}
            </p>
            <p className="text-[#2A5359]">{g.action}</p>
            <p className="text-[12px] text-[#5F7F84]">
              {g.deadline} · Indicador: {g.indicator}
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function CareerCanvas({
  profile,
  analysis,
  canvas,
  selfProfile,
  goals,
  newSuggestions,
}: {
  profile: Profile;
  analysis: GapAnalysis;
  canvas: CanvasData | null;
  selfProfile: SelfProfile | null;
  goals: ActionGoal[];
  newSuggestions: boolean;
}) {
  const atuais = analysis.gaps
    .filter((g) => g.assessed && g.a >= g.m)
    .sort((x, y) => y.a - x.a);
  // skillsToDevelop guarda nomes; itens do catálogo ganham nível e recomendação.
  const gapByName = new Map(
    analysis.gaps.map((g) => [skillName(g.skillId), g]),
  );
  const concluidas = goals.filter((g) => g.done).length;
  const atualizado = canvas?.updatedAt.toLocaleDateString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });

  return (
    <section aria-labelledby="canvas-titulo" className="print:[zoom:0.72]">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2
            id="canvas-titulo"
            className="font-[family-name:var(--font-display)] text-[22px] leading-tight tracking-tight"
          >
            Canvas de Carreira
          </h2>
          <p className="mt-1 text-[13px] text-[#456A70]">
            {[
              selfProfile && SEMESTER_LABEL[selfProfile.semester],
              atualizado && `atualizado em ${atualizado}`,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-[12px] font-semibold">
          <span className="rounded-full border border-[#D7DDD8] bg-white/70 px-3 py-1.5">
            Área-alvo: {profile.title}
          </span>
          <span className="rounded-full border border-[#D7DDD8] bg-white/70 px-3 py-1.5">
            Metas: {concluidas} de {goals.length}
          </span>
          <span className="flex items-center gap-2 rounded-full bg-grad-brand px-3 py-1.5 text-[#F8F7F3]">
            Compatibilidade
            <span className="font-[family-name:var(--font-display)] text-[15px]">
              {Math.round(analysis.compatibility)}%
            </span>
            <span className="h-1.5 w-14 overflow-hidden rounded-full bg-[#073D35]/60">
              <span
                className="block h-full rounded-full bg-grad-compat"
                style={{ width: `${Math.round(analysis.compatibility)}%` }}
              />
            </span>
          </span>
        </div>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[1.05fr_1fr_1.1fr_1fr_1.05fr] print:grid-cols-[1.05fr_1fr_1.1fr_1fr_1.05fr]">
        <Bloco
          num="01"
          titulo="Quem sou eu?"
          pergunta="Quais são meus interesses e características?"
          href="/self"
          area={AREA.quem}
        >
          <Texto valor={selfProfile?.motivation} href="/self" />
        </Bloco>

        <Bloco
          num="02"
          titulo="Objetivo profissional"
          pergunta="Onde quero chegar?"
          href="/canvas"
          area={AREA.objetivo}
          destaque
        >
          {canvas?.objective ? (
            <p className="font-[family-name:var(--font-display)] text-[20px] leading-snug">
              {canvas.objective}
            </p>
          ) : (
            <p className="text-[#C5E3D9]">Ainda não preenchido.</p>
          )}
        </Bloco>

        <Bloco
          num="03"
          titulo="Áreas de interesse"
          pergunta="Quais áreas profissionais despertam meu interesse?"
          href="/self"
          area={AREA.areas}
        >
          {selfProfile && selfProfile.curiosities.length > 0 && (
            <>
              <Rotulo>Tenho curiosidade por</Rotulo>
              <div className="mb-3 flex flex-wrap gap-1.5">
                {selfProfile.curiosities.map((c) => (
                  <span
                    key={c}
                    className="rounded-full bg-[#EAF2EF] px-2.5 py-0.5 text-[12px] font-semibold text-[#0B5A48]"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </>
          )}
          <Rotulo>Área escolhida</Rotulo>
          <div>
            <span className="inline-block rounded-full bg-[#0B5A48] px-2.5 py-0.5 text-[12px] font-semibold text-[#F8F7F3]">
              {profile.title}
            </span>
          </div>
        </Bloco>

        <Bloco
          num="04"
          titulo="Competências atuais"
          pergunta="O que já sei fazer?"
          href="/self-evaluation"
          area={AREA.atuais}
        >
          {atuais.length === 0 ? (
            <p className="text-[#8FA3A6]">
              Nenhuma competência no nível mínimo ainda.
            </p>
          ) : (
            <ul className="space-y-1.5">
              {atuais.map((g) => (
                <li
                  key={g.skillId}
                  className="flex items-center justify-between gap-2 rounded-lg border border-[#D7DDD8] bg-[#FBFCFA] px-2.5 py-1.5"
                >
                  <span className="min-w-0">
                    <span className="block leading-snug">
                      {skillName(g.skillId)}
                    </span>
                    <span className="block text-[10px] uppercase tracking-wide text-[#5F7F84]">
                      {getSkill(g.skillId)?.kind === "BEHAVIORAL"
                        ? "Comportamental"
                        : "Técnica"}
                    </span>
                  </span>
                  <Nivel valor={g.a} />
                </li>
              ))}
            </ul>
          )}
          <p className="mt-auto pt-3 text-[11px] text-[#8FA3A6]">
            Competências de {profile.title} em que você já atinge o nível
            mínimo, pela autoavaliação.
          </p>
        </Bloco>

        <Bloco
          num="05"
          titulo="Competências a desenvolver"
          pergunta="O que preciso aprender?"
          href="/canvas"
          area={AREA.desenv}
        >
          {newSuggestions && (
            <Link
              href="/canvas"
              className="mb-3 flex items-center gap-2 rounded-lg bg-[#C5E3D9]/40 px-2.5 py-1.5 text-[12px] font-medium text-[#073D35] print:hidden"
            >
              <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden />
              Há novas sugestões de competências
            </Link>
          )}
          {!canvas || canvas.skillsToDevelop.length === 0 ? (
            <Vazio href="/canvas" />
          ) : (
            <ol className="divide-y divide-dashed divide-[#D7DDD8]">
              {canvas.skillsToDevelop.map((nome, i) => {
                const g = gapByName.get(nome);
                return (
                  <li key={nome} className="flex gap-2 py-1.5 first:pt-0">
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${
                        g?.recommendation
                          ? PRIORITY_BADGE[g.recommendation]
                          : "bg-[#C5E3D9]/70 text-[#073D35]"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex justify-between gap-2">
                        <span className="leading-snug">{nome}</span>
                        {g && g.gap > 0 && (
                          <span className="shrink-0 text-[12px] text-[#5F7F84]">
                            {g.a} → {g.m}
                          </span>
                        )}
                      </span>
                      {g?.recommendation && (
                        <span className="block text-[11.5px] font-semibold text-[#0B5A48]">
                          {RECOMMENDATION_SHORT[g.recommendation]}
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ol>
          )}
        </Bloco>

        <Bloco
          num="06"
          titulo="Experiências e projetos"
          pergunta="O que posso fazer para ganhar experiência?"
          href="/canvas"
          area={AREA.exper}
        >
          <Texto valor={canvas?.experiences} href="/canvas" />
        </Bloco>

        <Bloco
          num="07"
          titulo="Portfólio"
          pergunta="Como vou demonstrar minhas competências?"
          href="/canvas"
          area={AREA.portf}
        >
          <Texto valor={canvas?.portfolio} href="/canvas" />
        </Bloco>

        <Bloco
          num="08"
          titulo="Networking"
          pergunta="Com quem ou quais comunidades preciso me conectar?"
          href="/canvas"
          area={AREA.network}
        >
          <Texto valor={canvas?.networking} href="/canvas" />
        </Bloco>

        <Bloco
          num="09"
          titulo="Metas de curto prazo"
          pergunta="O que farei nos próximos meses?"
          href="/action-plan"
          area={AREA.curto}
        >
          <Metas
            goals={goals.filter((g) => g.horizon === "SHORT")}
            href="/action-plan"
          />
        </Bloco>

        <Bloco
          num="10"
          titulo="Metas de médio prazo"
          pergunta="Onde quero estar futuramente?"
          href="/action-plan"
          area={AREA.medio}
        >
          <Metas
            goals={goals.filter((g) => g.horizon === "MEDIUM")}
            href="/action-plan"
          />
        </Bloco>
      </div>
    </section>
  );
}
