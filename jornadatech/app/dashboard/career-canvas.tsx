import Link from "next/link";
import type { ReactNode } from "react";
import {
  Award,
  Briefcase,
  CalendarDays,
  Code,
  CodeXml,
  Compass,
  Flag,
  Globe,
  GraduationCap,
  Handshake,
  Lightbulb,
  ListChecks,
  MountainSnow,
  PencilLine,
  Rocket,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import type {
  ActionGoal,
  CareerCanvas as CanvasData,
  SelfProfile,
} from "@prisma/client";
import { MAX_LEVEL, getSkill, type Profile } from "@/lib/career/catalog";
import type { GapAnalysis, Recommendation } from "@/lib/career/gap-analysis";
import { skillName } from "@/components/gap-summary";
import { CURIOSITIES, SEMESTERS } from "@/lib/validation/self";
import { GoalToggle } from "./goal-toggle";

// Canvas de Carreira com os 10 blocos do projeto
// (public/documentacao-canvas-carreira.pdf), no visual de public/modelo-do-canvas.jpeg.

const RECOMMENDATION_SHORT: Record<Recommendation, string> = {
  COURSE: "Curso estruturado",
  PROJECT: "Projeto prático",
  PRACTICE: "Prática dirigida",
};

// Prioridade pela recomendação: curso (gap ≥ 3) é alta; prática (gap 1) é baixa.
const PRIORITY: Record<Recommendation, { label: string; className: string; dot: string }> = {
  COURSE: { label: "Alta", className: "bg-[#FDEEE3] text-[#B4533A]", dot: "bg-[#F58E52]" },
  PROJECT: { label: "Média", className: "bg-[#FBF1DC] text-[#6B5516]", dot: "bg-[#E9B24D]" },
  PRACTICE: { label: "Baixa", className: "bg-[#EAF2EF] text-[#0B5A48]", dot: "bg-[#0B5A48]" },
};

const SEMESTER_LABEL: Record<string, string> = Object.fromEntries(
  SEMESTERS.map((s) => [s.id, s.title]),
);

// Grade de 10 colunas (desktop e impressão). No celular os blocos seguem a ordem do DOM.
const SPAN = {
  2: "lg:col-span-2 print:col-span-2",
  4: "lg:col-span-4 print:col-span-4",
  5: "lg:col-span-5 print:col-span-5",
};

type Tom = "verde" | "roxo" | "laranja";

const TOM: Record<Tom, string> = {
  verde: "bg-[#E7F1EE] text-[#0B5A48]",
  roxo: "bg-[#EEEAF4] text-[#4A4165]",
  laranja: "bg-[#FDEEE3] text-[#D06A30]",
};

/** Canto decorativo roxo com um traço laranja, como nos cards do modelo. */
function Canto({ lado }: { lado: "esquerda" | "direita" }) {
  const pos =
    lado === "esquerda" ? "-left-12 rotate-[18deg]" : "-right-12 -rotate-[18deg]";
  return (
    <span aria-hidden className="pointer-events-none">
      <span
        className={`absolute -bottom-10 h-16 w-28 rounded-[50%] bg-[#4A4165]/85 ${pos}`}
      />
      <span
        className={`absolute -bottom-8 h-16 w-28 rounded-[50%] border-t-[3px] border-[#F58E52] ${pos}`}
      />
    </span>
  );
}

function Bloco({
  num,
  icone: Icone,
  titulo,
  pergunta,
  href,
  span,
  canto,
  children,
}: {
  num: string;
  icone: LucideIcon;
  titulo: string;
  pergunta: string;
  href: string;
  span: string;
  canto?: "esquerda" | "direita";
  children: ReactNode;
}) {
  return (
    <section
      className={`relative flex flex-col overflow-hidden rounded-2xl border border-[#D7DDD8] bg-white p-4 shadow-card break-inside-avoid ${span}`}
    >
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0B5A48] text-[12px] font-bold text-white ring-2 ring-[#C5E3D9]">
          {num}
        </span>
        <h3 className="min-w-0 flex-1 font-[family-name:var(--font-display)] text-[16px] font-semibold leading-tight text-[#123F45]">
          {titulo}
        </h3>
        <span className="group/acoes relative flex h-6 w-6 shrink-0 items-center justify-center">
          <Icone
            className="h-4 w-4 text-[#0B5A48] transition-opacity group-hover/acoes:opacity-0"
            aria-hidden
          />
          <Link
            href={href}
            aria-label={`Editar ${titulo}`}
            title="Editar"
            className="absolute inset-0 flex items-center justify-center rounded-full text-[#0B5A48] opacity-0 transition-opacity hover:bg-[#EAF2EF] focus-visible:opacity-100 group-hover/acoes:opacity-100 print:hidden"
          >
            <PencilLine className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </span>
      </div>
      <p className="mt-1.5 text-[11.5px] leading-snug text-[#5F7F84]">
        {pergunta}
      </p>
      <div className="relative mt-3 flex flex-1 flex-col text-[12.5px] leading-relaxed">
        {children}
      </div>
      {canto && <Canto lado={canto} />}
    </section>
  );
}

/** Linha com ícone em círculo, título e texto — os subitens dos cards do modelo. */
function Item({
  icone: Icone,
  tom = "verde",
  titulo,
  children,
}: {
  icone: LucideIcon;
  tom?: Tom;
  titulo: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${TOM[tom]}`}
      >
        <Icone className="h-4 w-4" aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[12.5px] font-bold text-[#123F45]">{titulo}</p>
        <div className="text-[#2A5359]">{children}</div>
      </div>
    </div>
  );
}

function Vazio({ href }: { href: string }) {
  return (
    <p className="text-[12.5px] text-[#8FA3A6]">
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
    <p className="whitespace-pre-line">{valor}</p>
  ) : (
    <Vazio href={href} />
  );
}

function Nivel({ valor, cor }: { valor: number; cor: string }) {
  return (
    <span
      className="flex shrink-0 gap-1"
      role="img"
      aria-label={`Nível ${valor} de ${MAX_LEVEL}`}
    >
      {Array.from({ length: MAX_LEVEL }, (_, i) => (
        <span
          key={i}
          className={`h-2 w-2 rounded-full ${i < valor ? cor : "bg-[#E3E8E5]"}`}
        />
      ))}
    </span>
  );
}

function Metas({ goals, href }: { goals: ActionGoal[]; href: string }) {
  if (goals.length === 0) return <Vazio href={href} />;
  return (
    <ul className="grid gap-x-4 gap-y-3 sm:grid-cols-2 print:grid-cols-2">
      {goals.map((g) => (
        <li
          key={g.id}
          className="flex items-start gap-2.5 border-l-2 border-[#D7DDD8] pl-3"
        >
          <GoalToggle goalId={g.id} done={g.done} />
          <div className="min-w-0 flex-1">
            <p
              className={
                "font-semibold leading-snug " +
                (g.done ? "text-[#8FA3A6] line-through" : "text-[#123F45]")
              }
            >
              {g.objective}
              {g.suggested && (
                <span className="ml-1.5 rounded bg-[#EAF2EF] px-1.5 py-0.5 align-[1px] text-[9.5px] font-bold uppercase tracking-wide text-[#0B5A48]">
                  Sugerida
                </span>
              )}
            </p>
            <p className="text-[12px] text-[#2A5359]">{g.action}</p>
            <p className="text-[11px] text-[#5F7F84]">
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
  const compat = Math.round(analysis.compatibility);
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
  const curiosidades = selfProfile?.curiosities ?? [];

  return (
    <section
      aria-labelledby="canvas-titulo"
      className="rounded-[28px] bg-[#F8F7F3] print:[zoom:0.62] print:[-webkit-print-color-adjust:exact] print:[print-color-adjust:exact]"
    >
      {/* Cabeçalho */}
      <header className="relative overflow-hidden rounded-3xl bg-grad-brand px-5 py-5 text-white shadow-card md:px-7">
        <span
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 h-44 w-72 rounded-[50%] bg-[#F58E52]/20"
        />
        <div className="relative flex flex-wrap items-center gap-5">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#073D35] ring-4 ring-[#F6B06A]/70">
              <CodeXml className="h-6 w-6" aria-hidden />
            </span>
            <div className="min-w-0">
              <h2
                id="canvas-titulo"
                className="font-[family-name:var(--font-display)] text-[24px] font-semibold leading-tight md:text-[28px]"
              >
                Resultado do seu Plano de Carreira
              </h2>
              <p className="mt-0.5 text-[13px] text-[#E7F1EE]">
                Canvas de Carreira · Projeto de Extensão ADS
              </p>
            </div>
          </div>

          <dl className="grid w-full grid-cols-3 divide-x divide-white/20 rounded-2xl border border-white/20 bg-[#073D35]/40 text-[12px] sm:flex sm:w-auto">
            <div className="flex items-center gap-2.5 px-3 py-2.5 sm:px-4">
              <GraduationCap className="hidden h-5 w-5 shrink-0 text-[#C5E3D9] sm:block" aria-hidden />
              <div>
                <dt className="text-[#C5E3D9]">Semestre</dt>
                <dd className="font-semibold">
                  {(selfProfile && SEMESTER_LABEL[selfProfile.semester]) ?? "—"}
                </dd>
              </div>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-2.5 sm:px-4">
              <CalendarDays className="hidden h-5 w-5 shrink-0 text-[#C5E3D9] sm:block" aria-hidden />
              <div>
                <dt className="text-[#C5E3D9]">Atualizado em</dt>
                <dd className="font-semibold">{atualizado ?? "—"}</dd>
              </div>
            </div>
            <div className="flex items-center gap-2.5 px-3 py-2.5 sm:px-4">
              <ListChecks className="hidden h-5 w-5 shrink-0 text-[#C5E3D9] sm:block" aria-hidden />
              <div>
                <dt className="text-[#C5E3D9]">Metas</dt>
                <dd className="font-semibold">
                  {concluidas} de {goals.length}
                </dd>
              </div>
            </div>
          </dl>

          <div className="flex w-full items-center gap-3 rounded-2xl border border-white/20 bg-[#073D35]/60 py-2.5 pl-4 pr-2.5 sm:w-auto">
            <Target className="h-6 w-6 text-[#F6B06A]" aria-hidden />
            <div className="text-[12px]">
              <p className="text-[#C5E3D9]">Área-alvo</p>
              <p className="text-[14px] font-semibold">{profile.title}</p>
            </div>
            <span className="rounded-xl bg-white px-3 py-1.5 font-[family-name:var(--font-display)] text-[20px] font-semibold text-[#4A4165]">
              {compat}%
            </span>
          </div>
        </div>
      </header>

      <div className="mt-4 grid gap-3 lg:grid-cols-10 print:grid-cols-10">
        {/* Linha 1 */}
        <Bloco
          num="01"
          icone={UserRound}
          titulo="Quem sou eu?"
          pergunta="Quais são meus interesses e características?"
          href="/self"
          span={SPAN[2]}
          canto="esquerda"
        >
          <div className="space-y-4 pb-6">
            <Item icone={Lightbulb} titulo="O que me motiva">
              <Texto valor={selfProfile?.motivation} href="/self" />
            </Item>
            <Item icone={GraduationCap} tom="roxo" titulo="Momento no curso">
              {(selfProfile && SEMESTER_LABEL[selfProfile.semester]) ?? (
                <Vazio href="/self" />
              )}
            </Item>
          </div>
        </Bloco>

        <Bloco
          num="02"
          icone={Compass}
          titulo="Áreas de interesse"
          pergunta="Quais áreas despertam o meu interesse?"
          href="/self"
          span={SPAN[2]}
        >
          <ul className="space-y-2">
            {CURIOSITIES.map((c) => {
              const marcada = curiosidades.includes(c);
              return (
                <li key={c} className="flex items-center gap-2.5">
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                      marcada
                        ? "border-[#0B5A48] bg-[#0B5A48] text-white"
                        : "border-[#B7C4BE] bg-white"
                    }`}
                    aria-hidden
                  >
                    {marcada && (
                      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5">
                        <path
                          d="M2.5 6.2 5 8.5l4.5-5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                  <span className={marcada ? "text-[#123F45]" : "text-[#5F7F84]"}>
                    {c}
                    <span className="sr-only">
                      {marcada ? " (marcada)" : " (não marcada)"}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </Bloco>

        {/* Destaque: área profissional compatível (resultado da análise) */}
        <section
          className={`relative flex flex-col overflow-hidden rounded-2xl border border-[#0B5A48] bg-grad-brand p-4 text-white shadow-card break-inside-avoid ${SPAN[2]}`}
        >
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-[#F6B06A]/70">
              <Target className="h-4 w-4" aria-hidden />
            </span>
            <h3 className="flex-1 font-[family-name:var(--font-display)] text-[16px] font-semibold leading-tight">
              Área profissional compatível
            </h3>
            <Link
              href="/field-interest"
              aria-label="Trocar de área"
              className="-mr-1 shrink-0 rounded-full p-1 text-[#C5E3D9] transition-colors hover:bg-white/10 print:hidden"
            >
              <PencilLine className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/30 bg-white/10">
              <CodeXml className="h-5 w-5" aria-hidden />
            </span>
            <p className="min-w-0 hyphens-auto font-[family-name:var(--font-display)] text-[18px] font-semibold leading-tight">
              {profile.title}
            </p>
          </div>

          <p className="mt-4 text-[12px] text-[#E7F1EE]">Compatibilidade</p>
          <div className="mt-1 flex items-center gap-3">
            <div className="h-3 flex-1 overflow-hidden rounded-full bg-[#073D35]/60">
              <div
                className="h-full rounded-full bg-grad-compat"
                style={{ width: `${compat}%` }}
              />
            </div>
            <span className="font-[family-name:var(--font-display)] text-[26px] font-semibold leading-none">
              {compat}%
            </span>
          </div>
          <p className="mt-3 text-[12px] leading-relaxed text-[#E7F1EE]">
            Com base na sua autoavaliação, você apresenta {compat}% de
            compatibilidade com o perfil de {profile.title}.
          </p>

          <div className="mt-auto pt-4">
            <div className="rounded-xl bg-white p-3 text-[#123F45]">
              <p className="text-[11.5px] font-bold">
                Competências no nível esperado
              </p>
              <div className="mt-2 flex items-center gap-2.5">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#E3E8E5]">
                  <div
                    className="h-full rounded-full bg-[#0B5A48]"
                    style={{
                      width: `${
                        analysis.gaps.length
                          ? (atuais.length / analysis.gaps.length) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
                <span className="text-[12px] font-bold">
                  {atuais.length} de {analysis.gaps.length}
                </span>
              </div>
            </div>
          </div>
        </section>

        <Bloco
          num="03"
          icone={TrendingUp}
          titulo="Competências atuais"
          pergunta="Quais competências eu já possuo?"
          href="/self-evaluation"
          span={SPAN[2]}
        >
          {atuais.length === 0 ? (
            <p className="text-[#8FA3A6]">
              Nenhuma competência no nível mínimo ainda.
            </p>
          ) : (
            <ul className="space-y-2.5">
              {atuais.map((g) => {
                const muito = g.a >= 4;
                const tecnica = getSkill(g.skillId)?.kind !== "BEHAVIORAL";
                return (
                  <li key={g.skillId} className="flex items-center gap-2.5">
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${TOM.verde}`}
                    >
                      {tecnica ? (
                        <Code className="h-3.5 w-3.5" aria-hidden />
                      ) : (
                        <UsersRound className="h-3.5 w-3.5" aria-hidden />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold leading-snug text-[#123F45]">
                        {skillName(g.skillId)}
                      </span>
                      <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
                        <Nivel
                          valor={g.a}
                          cor={muito ? "bg-[#0B5A48]" : "bg-[#73519A]"}
                        />
                        <span className="whitespace-nowrap text-[10px] text-[#5F7F84]">
                          {muito ? "Muito desenvolvida" : "Em desenvolvimento"}
                        </span>
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
          <div className="mt-auto space-y-1 pt-4 text-[10.5px] text-[#5F7F84]">
            <p className="flex items-center gap-2">
              <Nivel valor={5} cor="bg-[#0B5A48]" /> Muito desenvolvida (4–5)
            </p>
            <p className="flex items-center gap-2">
              <Nivel valor={3} cor="bg-[#73519A]" /> Em desenvolvimento (3)
            </p>
          </div>
        </Bloco>

        <Bloco
          num="04"
          icone={Rocket}
          titulo="Competências a desenvolver"
          pergunta="O que preciso aprender para evoluir?"
          href="/canvas"
          span={SPAN[2]}
          canto="esquerda"
        >
          {newSuggestions && (
            <Link
              href="/canvas"
              className="mb-3 flex items-center gap-2 rounded-lg bg-[#C5E3D9]/40 px-2.5 py-1.5 text-[11.5px] font-medium text-[#073D35] print:hidden"
            >
              <Sparkles className="h-3.5 w-3.5 shrink-0" aria-hidden />
              Há novas sugestões de competências
            </Link>
          )}
          {!canvas || canvas.skillsToDevelop.length === 0 ? (
            <Vazio href="/canvas" />
          ) : (
            <ul className="divide-y divide-[#D7DDD8] pb-6">
              {canvas.skillsToDevelop.map((nome) => {
                const g = gapByName.get(nome);
                const prioridade = g?.recommendation
                  ? PRIORITY[g.recommendation]
                  : null;
                return (
                  <li
                    key={nome}
                    className="flex items-center gap-2.5 py-2 first:pt-0"
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${TOM.roxo}`}
                    >
                      <Award className="h-3.5 w-3.5" aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold leading-snug text-[#123F45]">
                        {nome}
                      </span>
                      {g?.recommendation && prioridade && (
                        <span className="mt-0.5 flex items-center justify-between gap-2 text-[10.5px] text-[#5F7F84]">
                          <span className="min-w-0">
                            {RECOMMENDATION_SHORT[g.recommendation]}
                          </span>
                          <span
                            className={`flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${prioridade.className}`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${prioridade.dot}`}
                            />
                            {prioridade.label}
                          </span>
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </Bloco>

        {/* Linha 2 */}
        <Bloco
          num="05"
          icone={Target}
          titulo="Objetivo profissional"
          pergunta="Onde quero chegar na área de tecnologia?"
          href="/canvas"
          span={SPAN[2]}
          canto="direita"
        >
          {canvas?.objective ? (
            <p className="font-[family-name:var(--font-display)] text-[16px] leading-snug text-[#123F45]">
              {canvas.objective}
            </p>
          ) : (
            <Vazio href="/canvas" />
          )}
          <div className="mt-auto pt-4">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-grad-brand text-white">
              <MountainSnow className="h-7 w-7" aria-hidden />
            </span>
          </div>
        </Bloco>

        <Bloco
          num="06"
          icone={Briefcase}
          titulo="Experiências e projetos"
          pergunta="O que posso fazer para ganhar experiência?"
          href="/canvas"
          span={SPAN[4]}
        >
          <Item icone={Briefcase} titulo="Projetos, estágios e cursos">
            <Texto valor={canvas?.experiences} href="/canvas" />
          </Item>
        </Bloco>

        <Bloco
          num="07"
          icone={Globe}
          titulo="Portfólio"
          pergunta="Como vou demonstrar minhas competências?"
          href="/canvas"
          span={SPAN[2]}
        >
          <Item icone={Globe} tom="roxo" titulo="Meu portfólio">
            <Texto valor={canvas?.portfolio} href="/canvas" />
          </Item>
          <p className="mt-auto flex gap-2 rounded-xl border border-[#F6C9A6] bg-[#FDEEE3] p-2.5 text-[11.5px] leading-snug text-[#8A4A1F]">
            <Lightbulb className="h-4 w-4 shrink-0 text-[#F58E52]" aria-hidden />
            <span>
              <strong>Dica:</strong> um portfólio bem estruturado aumenta suas
              chances de conseguir oportunidades na área.
            </span>
          </p>
        </Bloco>

        <Bloco
          num="08"
          icone={UsersRound}
          titulo="Network"
          pergunta="Com quem ou quais comunidades preciso me conectar?"
          href="/canvas"
          span={SPAN[2]}
        >
          <Item icone={Handshake} titulo="Minhas conexões">
            <Texto valor={canvas?.networking} href="/canvas" />
          </Item>
        </Bloco>

        {/* Linha 3 */}
        <Bloco
          num="09"
          icone={Flag}
          titulo="Metas de curto prazo"
          pergunta="O que farei nos próximos meses?"
          href="/action-plan"
          span={SPAN[5]}
          canto="esquerda"
        >
          <div className="pb-4">
            <Metas
              goals={goals.filter((g) => g.horizon === "SHORT")}
              href="/action-plan"
            />
          </div>
        </Bloco>

        <Bloco
          num="10"
          icone={Rocket}
          titulo="Metas de médio prazo"
          pergunta="Onde quero estar futuramente?"
          href="/action-plan"
          span={SPAN[5]}
          canto="direita"
        >
          <div className="pb-4">
            <Metas
              goals={goals.filter((g) => g.horizon === "MEDIUM")}
              href="/action-plan"
            />
          </div>
        </Bloco>
      </div>

      {/* Rodapé */}
      <footer className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-grad-brand px-5 py-3 text-[12px] text-[#E7F1EE]">
        <span className="flex items-center gap-2.5">
          <CodeXml className="h-4 w-4" aria-hidden />
          Plano de Carreira · Jornada Tech
        </span>
        <span className="font-[family-name:var(--font-display)] italic">
          Seu futuro na tecnologia começa com as escolhas de hoje.
        </span>
      </footer>
    </section>
  );
}
