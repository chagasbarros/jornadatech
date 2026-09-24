import type { Metadata } from "next";
import {
  ArrowRight,
  BookOpen,
  Check,
  CircleX,
  Footprints,
  GraduationCap,
  Hammer,
  MapPin,
  Menu,
  MapIcon,
  Rocket,
  Target,
  Ticket,
  X,
} from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

// Landing page, baseada em public/exemplo-de-chamadas.pdf.
// A versão anterior está guardada em app/_landing-antiga/page.tsx (fora do roteamento).

export const metadata: Metadata = {
  title: "Jornada Tech — não deixe sua carreira acontecer por acaso",
  description:
    "Descubra onde você está, onde quer chegar e qual é o seu próximo passo. Monte seu plano de carreira em tecnologia e concorra a um ingresso do Evento Conexão.",
};

const desculpas = [
  "Vou descobrir depois.",
  "Quando eu me formar, eu vejo.",
  "Qualquer oportunidade serve.",
];

const perguntas = [
  {
    numero: "01",
    icon: MapPin,
    titulo: "Onde estou?",
    texto: "Conheça seu momento profissional.",
    noApp: "Etapa “Quem sou eu”",
  },
  {
    numero: "02",
    icon: Target,
    titulo: "Onde quero chegar?",
    texto: "Defina objetivos.",
    noApp: "Escolha do perfil profissional",
  },
  {
    numero: "03",
    icon: BookOpen,
    titulo: "O que preciso aprender?",
    texto: "Identifique conhecimentos e habilidades.",
    noApp: "Autoavaliação de competências",
  },
  {
    numero: "04",
    icon: Hammer,
    titulo: "O que preciso praticar?",
    texto: "Transforme conhecimento em experiência.",
    noApp: "Canvas de Carreira",
  },
  {
    numero: "05",
    icon: Footprints,
    titulo: "Qual é meu próximo passo?",
    texto: "Crie ações concretas.",
    noApp: "Plano de ação com prazos",
  },
];

const entregamos = ["Clareza", "Planejamento", "Preparação", "Ação"];

const display = "font-[family-name:var(--font-display)]";

function CtaPrimario({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href="/login"
      className={`inline-flex items-center gap-2 rounded-full bg-[#2F6B45] px-7 py-3.5 text-[15px] font-semibold text-[#F6F2E7] transition-colors hover:bg-[#26582F] ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4" aria-hidden />
    </Link>
  );
}

/** Jovem diante de vários caminhos digitais (substitui a arte do Canva). */
function IlustracaoCaminhos() {
  const destinos = [
    { x: 40, y: 60 },
    { x: 120, y: 30 },
    { x: 200, y: 18 },
    { x: 280, y: 30 },
    { x: 360, y: 60 },
  ];
  return (
    <svg
      viewBox="0 0 400 340"
      className="h-auto w-full"
      role="img"
      aria-label="Uma pessoa diante de vários caminhos que se abrem em direções diferentes"
    >
      {destinos.map((d, i) => (
        <path
          key={i}
          d={`M200 250 C 200 180, ${d.x} 150, ${d.x} ${d.y + 14}`}
          fill="none"
          stroke={i === 2 ? "#2F6B45" : "#BFD6C5"}
          strokeWidth={i === 2 ? 4 : 3}
          strokeDasharray={i === 2 ? undefined : "6 8"}
          strokeLinecap="round"
        />
      ))}
      {destinos.map((d, i) => (
        <g key={`n${i}`}>
          <circle
            cx={d.x}
            cy={d.y}
            r={i === 2 ? 14 : 10}
            fill={i === 2 ? "#2F6B45" : "#F6F2E7"}
            stroke={i === 2 ? "#2F6B45" : "#9FC2AC"}
            strokeWidth="3"
          />
          {i !== 2 && (
            <text
              x={d.x}
              y={d.y + 4}
              textAnchor="middle"
              fontSize="11"
              fontWeight="700"
              fill="#6FA37E"
            >
              ?
            </text>
          )}
        </g>
      ))}
      <path
        d="M194 11 l6 6 l10 -12"
        transform="translate(-4 6)"
        fill="none"
        stroke="#F6F2E7"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* pessoa, vista de costas */}
      <ellipse cx="200" cy="322" rx="46" ry="8" fill="#DCE6DA" />
      <circle cx="200" cy="248" r="17" fill="#16231C" />
      <path
        d="M168 322 C 168 285, 178 270, 200 270 C 222 270, 232 285, 232 322 Z"
        fill="#16231C"
      />
      <path
        d="M176 300 C 170 292, 170 280, 180 276"
        fill="none"
        stroke="#2F6B45"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Pessoa caminhando em direção a uma cidade tecnológica (CTA final). */
function IlustracaoCidade() {
  const predios = [
    { x: 30, w: 44, h: 120 },
    { x: 80, w: 36, h: 170 },
    { x: 122, w: 52, h: 140 },
    { x: 180, w: 40, h: 200 },
    { x: 226, w: 56, h: 150 },
    { x: 288, w: 38, h: 185 },
    { x: 332, w: 46, h: 125 },
  ];
  const base = 230;
  return (
    <svg
      viewBox="0 0 400 320"
      className="h-auto w-full"
      role="img"
      aria-label="Uma pessoa caminhando por uma estrada em direção a uma cidade iluminada"
    >
      {predios.map((p, i) => (
        <g key={i}>
          <rect
            x={p.x}
            y={base - p.h}
            width={p.w}
            height={p.h}
            rx="3"
            fill="#16382B"
            stroke="#2F6B45"
          />
          {Array.from({ length: Math.floor(p.h / 22) }).map((_, row) =>
            [0, 1].map((col) => (
              <rect
                key={`${row}-${col}`}
                x={p.x + 8 + col * (p.w / 2 - 4)}
                y={base - p.h + 12 + row * 22}
                width={p.w / 2 - 14}
                height="8"
                rx="1"
                fill={(row + col + i) % 3 === 0 ? "#BFE3CE" : "#24503C"}
              />
            )),
          )}
        </g>
      ))}
      <rect x="0" y={base} width="400" height="90" fill="#0E2A20" />
      <path d={`M150 ${base} L250 ${base} L330 320 L70 320 Z`} fill="#1B4332" />
      <path
        d={`M200 ${base + 6} L200 316`}
        stroke="#6FA37E"
        strokeWidth="3"
        strokeDasharray="10 10"
      />
      {/* pessoa caminhando */}
      <circle cx="232" cy="262" r="7" fill="#EAF3EC" />
      <path
        d="M232 270 L232 290 M232 290 L226 304 M232 290 L239 303 M232 276 L225 285 M232 276 L240 283"
        stroke="#EAF3EC"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Barra flutuante "2 em 1": plano de carreira + sorteio do ingresso.
 * Fechar é só CSS (checkbox + peer), sem JavaScript.
 */
function BarraFlutuante() {
  return (
    <>
      <input
        type="checkbox"
        id="fechar-barra"
        className="peer/barra sr-only"
        aria-label="Fechar destaque"
      />
      <aside
        aria-label="Benefícios de completar o Canvas"
        className="fixed inset-x-3 bottom-3 z-40 peer-checked/barra:hidden md:inset-x-auto md:bottom-6 md:left-1/2 md:w-[min(920px,calc(100%-3rem))] md:-translate-x-1/2"
      >
        <div className="relative flex flex-col gap-3 rounded-3xl bg-[#0E2A20] p-4 pr-11 text-[#EAF3EC] shadow-[0_18px_50px_-12px_rgba(14,42,32,0.75)] ring-2 ring-[#9FD3B2]/70 md:flex-row md:items-center md:gap-5 md:rounded-full md:py-3 md:pl-3 md:pr-14">
          {/* Selo "2 em 1" pulsando */}
          <div className="flex items-center gap-3 md:contents">
            <span className="relative flex h-12 w-12 shrink-0 items-center justify-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#F2C14E]/50" />
              <span
                className={`relative flex h-12 w-12 flex-col items-center justify-center rounded-full bg-[#F2C14E] leading-none text-[#0E2A20] ${display}`}
              >
                <span className="text-[18px] font-bold">2</span>
                <span className="text-[9px] font-bold uppercase tracking-wide">
                  em 1
                </span>
              </span>
            </span>
            <p className="text-[14px] font-semibold leading-snug md:hidden">
              Complete seu Canvas e leve dois benefícios
            </p>
          </div>

          <div className="flex flex-1 flex-col gap-2 text-[13px] sm:flex-row sm:items-center md:text-[14px]">
            <span className="hidden font-semibold md:inline">
              Complete seu Canvas e leve:
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5">
              <MapIcon
                className="h-4 w-4 shrink-0 text-[#9FD3B2]"
                aria-hidden
              />
              Seu plano de carreira
            </span>
            <span className="hidden text-[#9FD3B2] sm:inline" aria-hidden>
              +
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#F2C14E]/15 px-3 py-1.5 text-[#F8DC94]">
              <Ticket className="h-4 w-4 shrink-0" aria-hidden />
              Chance de ganhar ingresso do Evento Conexão
            </span>
          </div>

          <Link
            href="/login"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#9FD3B2] px-6 py-3 text-[15px] font-bold text-[#0E2A20] transition-colors hover:bg-[#BFE3CE]"
          >
            Quero os dois
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>

          <label
            htmlFor="fechar-barra"
            aria-hidden
            className="absolute right-3 top-3 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-[#9FC2AC] hover:bg-white/10 hover:text-white md:top-1/2 md:-translate-y-1/2"
          >
            <X className="h-4 w-4" />
          </label>
        </div>
      </aside>
    </>
  );
}

export default function Home() {
  return (
    <div className="bg-[#F6F2E7] pb-44 text-[#16231C] antialiased sm:pb-36 md:pb-28">
      {/* ---------- Navegação ---------- */}
      <header className="sticky top-0 z-50 border-b border-[#DCE6DA] bg-[#F6F2E7]/90 backdrop-blur">
        <input type="checkbox" id="nav-toggle-v2" className="peer hidden" />

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full bg-[#2F6B45] text-sm font-semibold text-[#F6F2E7] ${display}`}
            >
              JT
            </span>
            <span className="text-[15px] font-semibold tracking-tight">
              Jornada Tech
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-[15px] text-[#354238] md:flex">
            <a href="#por-que" className="hover:text-[#16231C]">
              Por que planejar
            </a>
            <a href="#perguntas" className="hover:text-[#16231C]">
              Como funciona
            </a>
            <a href="#sorteio" className="hover:text-[#16231C]">
              Evento Conexão
            </a>
          </nav>

          <Link
            href="/login"
            className="hidden rounded-full bg-[#2F6B45] px-5 py-2.5 text-[14px] font-semibold text-[#F6F2E7] transition-colors hover:bg-[#26582F] md:inline-flex"
          >
            Quero meu plano
          </Link>

          <label
            htmlFor="nav-toggle-v2"
            aria-label="Abrir menu"
            className="flex cursor-pointer items-center justify-center rounded-full p-2 md:hidden"
          >
            <Menu className="h-6 w-6" aria-hidden />
          </label>
        </div>

        {/* Menu mobile — controlado só por CSS (peer), sem JavaScript */}
        <div className="hidden flex-col gap-1 border-t border-[#DCE6DA] px-6 py-4 peer-checked:flex md:hidden">
          <label
            htmlFor="nav-toggle-v2"
            aria-label="Fechar menu"
            className="mb-2 flex cursor-pointer items-center justify-end"
          >
            <X className="h-5 w-5" aria-hidden />
          </label>
          <a href="#por-que" className="py-2 text-[15px] text-[#354238]">
            Por que planejar
          </a>
          <a href="#perguntas" className="py-2 text-[15px] text-[#354238]">
            Como funciona
          </a>
          <a href="#sorteio" className="py-2 text-[15px] text-[#354238]">
            Evento Conexão
          </a>
          <Link
            href="/login"
            className="mt-2 rounded-full bg-[#2F6B45] px-5 py-2.5 text-center text-[14px] font-semibold text-[#F6F2E7]"
          >
            Quero meu plano
          </Link>
        </div>
      </header>

      <main>
        {/* ---------- Conceito / hero ---------- */}
        <section className="py-16 md:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-[1.15fr_1fr]">
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#2F6B45]">
                Não deixe sua carreira acontecer por acaso
              </p>
              <h1
                className={`mt-5 text-[40px] leading-[1.05] tracking-tight md:text-[60px] ${display}`}
              >
                Se você não planeja sua carreira,{" "}
                <em className="text-[#2F6B45]">
                  alguém vai planejar por você.
                </em>
              </h1>
              <p className="mt-6 max-w-md text-[18px] leading-relaxed text-[#4B5B52]">
                Seu diploma pode abrir uma porta. Seu plano de carreira ajuda
                você a decidir{" "}
                <strong className="text-[#16231C]">
                  qual porta quer abrir
                </strong>
                .
              </p>
              <CtaPrimario className="mt-9">
                Quero construir meu plano
              </CtaPrimario>
            </div>
            <div className="mx-auto w-full max-w-md">
              <IlustracaoCaminhos />
            </div>
          </div>
        </section>

        {/* ---------- Tela 1 — O impacto ---------- */}
        <section className="border-t border-[#DCE6DA] bg-white/40 py-20">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2
              className={`text-[32px] leading-tight tracking-tight md:text-[44px] ${display}`}
            >
              E se você estiver estudando para uma carreira que ainda não sabe
              como construir?
            </h2>
            <p
              className={`mt-8 text-[26px] italic text-[#2F6B45] md:text-[30px] ${display}`}
            >
              Você tem um plano?
            </p>
            <a
              href="#perguntas"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#2F6B45] px-7 py-3.5 text-[15px] font-semibold text-[#2F6B45] transition-colors hover:bg-[#2F6B45] hover:text-[#F6F2E7]"
            >
              Descubra por onde começar
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </section>

        {/* ---------- Tela 2 — Criar a necessidade ---------- */}
        <section id="por-que" className="border-t border-[#DCE6DA] py-20">
          <div className="mx-auto max-w-6xl px-6">
            <h2
              className={`max-w-2xl text-[32px] leading-tight tracking-tight md:text-[44px] ${display}`}
            >
              Ter um sonho é bom. <br className="hidden md:block" />
              Ter um plano é melhor.
            </h2>

            <ul className="mt-12 grid gap-5 md:grid-cols-3">
              {desculpas.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-3 rounded-2xl border border-[#E8D9D2] bg-white/60 p-6"
                >
                  <CircleX
                    className="mt-1 h-5 w-5 shrink-0 text-[#B4533A]"
                    aria-hidden
                  />
                  <span className={`text-[20px] italic ${display}`}>“{d}”</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Tela 3 — A frase de venda ---------- */}
        <section className="bg-[#0E2A20] py-24 text-[#EAF3EC] md:py-32">
          <div className="mx-auto max-w-5xl px-6">
            <h2
              className={`text-[38px] leading-[1.08] tracking-tight md:text-[64px] ${display}`}
            >
              Não espere a oportunidade aparecer.{" "}
              <em className="text-[#9FD3B2]">Prepare-se para ela.</em>
            </h2>
            <p className="mt-10 border-l-2 border-[#6FA37E] pl-6 text-[18px] font-semibold uppercase leading-snug tracking-wide text-[#C7D6CC] md:text-[20px]">
              Planejar hoje é dar direção ao seu amanhã.
            </p>
          </div>
        </section>

        {/* ---------- Tela 4 — As 5 perguntas (estrada) ---------- */}
        <section id="perguntas" className="py-20 md:py-28">
          <div className="mx-auto max-w-6xl px-6">
            <div className="max-w-xl">
              <h2
                className={`text-[32px] leading-tight tracking-tight md:text-[44px] ${display}`}
              >
                Seu plano começa com 5 perguntas
              </h2>
              <p className="mt-4 text-[16px] leading-relaxed text-[#4B5B52]">
                O Jornada Tech guia você por cada uma delas, uma tela de cada
                vez — sem exigir conhecimento técnico prévio.
              </p>
            </div>

            <div className="relative mt-16">
              {/* A estrada: vertical no celular, horizontal no desktop */}
              <div
                aria-hidden
                className="absolute bottom-0 left-[22px] top-0 w-3 rounded-full bg-[#16231C] md:bottom-auto md:left-0 md:right-0 md:top-[10px] md:h-3 md:w-auto"
              >
                <div className="absolute inset-y-2 left-1/2 w-0 -translate-x-1/2 border-l-2 border-dashed border-[#F6F2E7] md:inset-x-3 md:inset-y-auto md:left-0 md:top-1/2 md:w-auto md:-translate-y-1/2 md:translate-x-0 md:border-l-0 md:border-t-2" />
              </div>

              <ol className="relative grid gap-10 md:grid-cols-5 md:gap-6">
                {perguntas.map((p) => {
                  const Icon = p.icon;
                  return (
                    <li
                      key={p.numero}
                      className="relative flex gap-5 md:flex-col md:gap-0"
                    >
                      <span className="relative z-10 flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full border-4 border-[#F6F2E7] bg-[#2F6B45] md:-mt-3 md:h-[56px] md:w-[56px]">
                        <Icon className="h-5 w-5 text-[#F6F2E7]" aria-hidden />
                      </span>
                      <div className="md:mt-5">
                        <span
                          className={`text-[15px] text-[#6FA37E] ${display}`}
                        >
                          {p.numero}
                        </span>
                        <h3 className="mt-1 text-[18px] font-semibold leading-snug">
                          {p.titulo}
                        </h3>
                        <p className="mt-1 text-[14px] leading-relaxed text-[#4B5B52]">
                          {p.texto}
                        </p>
                        <p className="mt-3 inline-block rounded-full bg-[#BFE3CE]/60 px-3 py-1 text-[12px] font-medium text-[#26582F]">
                          {p.noApp}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </section>

        {/* ---------- Tela 6 — O grande argumento ---------- */}
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2
              className={`text-[34px] leading-[1.1] tracking-tight md:text-[52px] ${display}`}
            >
              Um plano de carreira não prevê o futuro.{" "}
              <span className="text-[#2F6B45]">
                Ele prepara você para construí-lo.
              </span>
            </h2>

            <ul className="mt-10 flex flex-wrap justify-center gap-3">
              {entregamos.map((e) => (
                <li
                  key={e}
                  className="flex items-center gap-2 rounded-full bg-[#2F6B45] px-5 py-2.5 text-[15px] font-semibold text-[#F6F2E7]"
                >
                  <Check className="h-4 w-4 shrink-0" aria-hidden />
                  {e}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Sorteio: Evento Conexão ---------- */}
        <section
          id="sorteio"
          className="border-t border-[#DCE6DA] bg-white/40 py-16"
        >
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center md:flex-row md:text-left">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#BFE3CE]/70">
              <Ticket className="h-7 w-7 text-[#26582F]" aria-hidden />
            </span>
            <div>
              <h2
                className={`text-[24px] leading-tight tracking-tight md:text-[30px] ${display}`}
              >
                Complete seu Canvas e concorra a um ingresso do Evento Conexão
              </h2>
              <p className="mt-2 text-[15px] leading-relaxed text-[#4B5B52]">
                Quem preencher o Canvas até o fim entra automaticamente no
                sorteio.
              </p>
            </div>
          </div>
        </section>

        {/* ---------- Tela 7 — CTA final ---------- */}
        <section className="bg-[#0E2A20] pt-20 text-[#EAF3EC] md:pt-28">
          <div className="mx-auto grid max-w-6xl items-end gap-12 px-6 md:grid-cols-2">
            <div className="pb-4 md:pb-28">
              <h2
                className={`text-[36px] leading-[1.08] tracking-tight md:text-[52px] ${display}`}
              >
                E você, já planejou o próximo passo da sua carreira?
              </h2>
              <p className="mt-6 max-w-md text-[17px] leading-relaxed text-[#C7D6CC]">
                Não espere terminar a formação.{" "}
                <strong className="text-[#EAF3EC]">
                  Comece seu plano hoje.
                </strong>
              </p>
              <Link
                href="/login"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#9FD3B2] px-7 py-3.5 text-[15px] font-semibold text-[#0E2A20] transition-colors hover:bg-[#BFE3CE]"
              >
                <Rocket className="h-4 w-4" aria-hidden />
                Quero meu plano de carreira
              </Link>
            </div>
            <div className="mx-auto w-full max-w-md">
              <IlustracaoCidade />
            </div>
          </div>
        </section>
      </main>

      <BarraFlutuante />

      {/* ---------- Footer ---------- */}
      <footer className="border-t border-[#DCE6DA] py-12">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <span
              className={`flex h-7 w-7 items-center justify-center rounded-full bg-[#2F6B45] text-[12px] font-semibold text-[#F6F2E7] ${display}`}
            >
              JT
            </span>
            <span className="text-[14px] font-medium text-[#354238]">
              Jornada Tech
            </span>
            <span
              className={`ml-2 text-[14px] italic text-[#6C7A6F] ${display}`}
            >
              Não deixe sua carreira acontecer por acaso.
            </span>
          </div>

          <div className="flex items-center gap-2 text-[13px] text-[#6C7A6F]">
            <GraduationCap className="h-4 w-4" aria-hidden />
            <span>Projeto de extensão do Curso de ADS.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
