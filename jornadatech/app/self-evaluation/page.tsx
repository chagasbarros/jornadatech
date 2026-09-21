"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";

type Competencia = { id: string; nome: string };

// Lista de exemplo — a curadoria de conteúdo por área é trabalho futuro da
// equipe do projeto (ver seção 7 do documento de conceito).
const CATEGORIAS: { id: string; titulo: string; itens: Competencia[] }[] = [
  {
    id: "tecnicas",
    titulo: "Competências técnicas",
    itens: [
      { id: "logica", nome: "Lógica de programação" },
      { id: "html-css", nome: "HTML / CSS" },
      {
        id: "linguagem",
        nome: "Uma linguagem de programação (ex.: JavaScript, Python, Java)",
      },
      { id: "banco-dados", nome: "Banco de dados" },
      { id: "git", nome: "Versionamento de código (Git)" },
      { id: "nuvem", nome: "Fundamentos de redes e nuvem" },
    ],
  },
  {
    id: "comportamentais",
    titulo: "Competências comportamentais",
    itens: [
      { id: "comunicacao", nome: "Comunicação" },
      { id: "trabalho-equipe", nome: "Trabalho em equipe" },
      { id: "resolucao-problemas", nome: "Resolução de problemas" },
      { id: "organizacao", nome: "Organização e gestão do tempo" },
      { id: "aprendizado", nome: "Aprendizado contínuo" },
      { id: "adaptabilidade", nome: "Adaptabilidade" },
    ],
  },
];

const TOTAL_COMPETENCIAS = CATEGORIAS.reduce(
  (soma, cat) => soma + cat.itens.length,
  0,
);

function EscalaProficiencia({
  valor,
  onChange,
}: {
  valor: number | null;
  onChange: (v: number) => void;
}) {
  return (
    <div
      className="flex items-center gap-1.5"
      role="radiogroup"
      aria-label="Nível de proficiência, de 0 a 5"
    >
      {[0, 1, 2, 3, 4, 5].map((n) => {
        const ativo = valor === n;
        return (
          <button
            key={n}
            type="button"
            role="radio"
            aria-checked={ativo}
            onClick={() => onChange(n)}
            className={
              "flex h-8 w-8 items-center justify-center rounded-full border text-[13px] font-semibold transition-colors " +
              (ativo
                ? "border-[#2F6B45] bg-[#2F6B45] text-[#F6F2E7]"
                : "border-[#DCE6DA] bg-white/50 text-[#354238] hover:border-[#B9C9BE]")
            }
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}

export default function AutoavaliacaoPage() {
  const [valores, setValores] = useState<Record<string, number>>({});

  const avaliadas = Object.keys(valores).length;
  const podeContinuar = avaliadas === TOTAL_COMPETENCIAS;
  const progresso = useMemo(
    () => Math.round((avaliadas / TOTAL_COMPETENCIAS) * 100),
    [avaliadas],
  );

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-[family-name:var(--font-display)] text-[28px] leading-tight tracking-tight text-[#16231C] md:text-[34px] mt-10">
        Avalie suas competências técnicas e comportamentais
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-[#4B5B52]">
        Zero significa nunca pratiquei e 5 significa domino bem.
      </p>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-[13px] font-medium text-[#354238]">
          <span>
            {avaliadas} de {TOTAL_COMPETENCIAS} competências avaliadas
          </span>
          <span className="text-[#8C978F]">{progresso}%</span>
        </div>
        <div className="h-2 rounded-full bg-[#EDE9DC]">
          <div
            className="h-2 rounded-full bg-[#6FA37E] transition-all"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>

      <div className="mt-10 space-y-4">
        {CATEGORIAS.map((categoria, idx) => (
          <details
            key={categoria.id}
            open={idx === 0}
            className="group rounded-2xl border border-[#DCE6DA] bg-white/40"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4">
              <span className="text-[15px] font-semibold text-[#16231C]">
                {categoria.titulo}
              </span>
              <ChevronDown
                className="h-4 w-4 text-[#6C7A6F] transition-transform group-open:rotate-180"
                aria-hidden
              />
            </summary>

            <div className="space-y-5 border-t border-[#DCE6DA] px-5 py-5">
              {categoria.itens.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <label className="max-w-[16rem] text-[14px] text-[#354238]">
                    {item.nome}
                  </label>
                  <EscalaProficiencia
                    valor={valores[item.id] ?? null}
                    onChange={(v) =>
                      setValores((atual) => ({ ...atual, [item.id]: v }))
                    }
                  />
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>

      <div className="mt-14 flex items-center justify-between">
        <Link
          href="/field-interest"
          className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#4B5B52] transition-colors hover:text-[#16231C]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Voltar
        </Link>
        <Link
          href={podeContinuar ? "/canvas" : "#"}
          aria-disabled={!podeContinuar}
          className={
            "inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold transition-colors " +
            (podeContinuar
              ? "bg-[#2F6B45] text-[#F6F2E7] hover:bg-[#26582F]"
              : "pointer-events-none bg-[#EDE9DC] text-[#8C978F]")
          }
        >
          Ver meu resultado
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
