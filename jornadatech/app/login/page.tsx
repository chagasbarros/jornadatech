"use client";

import Link from "next/link";
import { Fraunces, Manrope } from "next/font/google";
import { Mail, ArrowRight, ArrowLeft, GraduationCap } from "lucide-react";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
});

// Este arquivo usa "use client" por causa do estado de mostrar/ocultar senha,
// por isso não exporta `metadata` diretamente — defina o título/descrição
// desta rota no layout pai (app/login/layout.tsx) caso precise de SEO aqui.

export default function LoginPage() {
  return (
    <div
      className={`${fraunces.variable} ${manrope.variable} font-[family-name:var(--font-body)] grid min-h-screen bg-[#F6F2E7] text-[#16231C] md:grid-cols-[1fr_1fr] lg:grid-cols-[0.9fr_1.1fr]`}
    >
      {/* ---------- Painel do formulário ---------- */}
      <div className="flex flex-col justify-between px-6 py-8 md:px-14 md:py-12">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#2F6B45] text-sm font-semibold text-[#F6F2E7] font-[family-name:var(--font-display)]">
              TC
            </span>
            <span className="text-[15px] font-semibold tracking-tight">
              Jornada Tech
            </span>
          </Link>

          <Link
            href="/"
            className="hidden items-center gap-1.5 text-[13px] font-medium text-[#4B5B52] transition-colors hover:text-[#16231C] sm:flex"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden />
            Voltar para a home
          </Link>
        </div>

        <div className="mx-auto w-full max-w-sm py-12">
          <h1 className="font-[family-name:var(--font-display)] text-[32px] text-center leading-[1.1] tracking-tight text-[#16231C]">
            Bem-vindo
          </h1>
          <p className="mt-3 text-[15px] text-center leading-relaxed text-[#4B5B52]">
            Entre para descobrir sua trilha e acompanhar sua compatibilidade com
            a carreira escolhida.
          </p>

          <form className="mt-9 space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-[13px] font-medium text-[#354238]"
              >
                E-mail
              </label>
              <div className="relative">
                <Mail
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6C7A6F]"
                  aria-hidden
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="voce@exemplo.com"
                  className="w-full rounded-xl border border-[#DCE6DA] bg-white/60 py-3 pl-11 pr-4 text-[15px] text-[#16231C] placeholder:text-[#8C978F] outline-none transition-colors focus:border-[#2F6B45] focus:ring-2 focus:ring-[#BFE3CE]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#2F6B45] py-3.5 text-[15px] font-semibold text-[#F6F2E7] transition-colors hover:bg-[#26582F]"
            >
              Entrar
              <ArrowRight className="h-4 w-4" aria-hidden />
            </button>
          </form>
        </div>

        <p className="text-center text-[12px] text-[#8C978F] md:text-left">
          Projeto de extensão em parceria com o curso de Análise e
          Desenvolvimento de Sistemas
        </p>
      </div>

      {/* ---------- Painel visual (identidade da landing) ---------- */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-[#0E2A20] px-14 py-12 text-[#EAF3EC] md:flex">
        <div className="flex items-center gap-2 text-[13px] text-[#9FC2AC]">
          <GraduationCap className="h-4 w-4" aria-hidden />
          Jornada Tech - Trilha de Desenvolvimento Web
        </div>

        <div>
          <p className="font-[family-name:var(--font-display)] text-[28px] italic leading-snug text-[#EAF3EC] lg:text-[32px]">
            A trilha me mostrou o que priorizar em vez de eu tentar aprender
            tudo ao mesmo tempo.
          </p>

          {/* Mesmo mockup de compatibilidade usado na landing, em versão compacta */}
          <div className="mt-10 rounded-[24px] border border-white/10 bg-white/[0.04] p-6">
            <p className="text-[12px] text-[#9FC2AC]">
              Compatibilidade com Desenvolvedor Front-end Jr.
            </p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-[40px] leading-none text-[#6FA37E]">
              70%
            </p>

            <div className="mt-6 space-y-4">
              {[
                { nome: "Comunicação", atual: 60, alvo: 60 },
                { nome: "HTML / CSS", atual: 60, alvo: 80 },
                { nome: "JavaScript", atual: 40, alvo: 80 },
              ].map((c) => (
                <div key={c.nome}>
                  <div className="mb-1.5 flex items-center justify-between text-[12px] text-[#C7D6CC]">
                    <span>{c.nome}</span>
                  </div>
                  <div className="relative h-2 rounded-full bg-white/10">
                    <div
                      className="absolute inset-y-0 left-0 rounded-full border-r-2 border-white/30"
                      style={{ width: `${c.alvo}%` }}
                    />
                    <div
                      className="absolute inset-y-0 left-0 rounded-full bg-[#6FA37E]"
                      style={{ width: `${c.atual}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="text-[12px] text-[#7E9788]">
          MVP acadêmico · dados de exemplo
        </p>
      </div>
    </div>
  );
}
