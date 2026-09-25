"use client";

import { useState, useTransition } from "react";
import { ChevronDown } from "lucide-react";
import { StepFooter } from "@/components/step-footer";
import { PROFICIENCY_LEVELS, type Skill } from "@/lib/career/catalog";
import { saveSelfEvaluation } from "./actions";

const CATEGORIAS = [
  { kind: "TECH", titulo: "Competências técnicas" },
  { kind: "BEHAVIORAL", titulo: "Competências comportamentais" },
] as const;

function EscalaProficiencia({
  nome,
  valor,
  onChange,
}: {
  nome: string;
  valor: number | null;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div
        className="flex items-center gap-1.5"
        role="radiogroup"
        aria-label={`Nível de proficiência em ${nome}, de 0 a 5`}
      >
        {PROFICIENCY_LEVELS.map(({ level, label }) => {
          const ativo = valor === level;
          return (
            <button
              key={level}
              type="button"
              role="radio"
              aria-checked={ativo}
              title={label}
              onClick={() => onChange(level)}
              className={
                "flex h-8 w-8 items-center justify-center rounded-full border text-[13px] font-semibold transition-colors " +
                (ativo
                  ? "border-[#0B5A48] bg-[#0B5A48] text-[#F8F7F3]"
                  : "border-[#D7DDD8] bg-white/50 text-[#2A5359] hover:border-[#B7C4BE]")
              }
            >
              {level}
            </button>
          );
        })}
      </div>
      <p className="mt-1.5 h-4 text-[12px] text-[#5F7F84]">
        {valor !== null && PROFICIENCY_LEVELS[valor].label}
      </p>
    </div>
  );
}

type Props = {
  editing: boolean;
  profileTitle: string;
  skills: Skill[];
  initialLevels: Record<string, number>;
};

export default function SelfEvaluationForm({
  editing,
  profileTitle,
  skills,
  initialLevels,
}: Props) {
  const [valores, setValores] = useState<Record<string, number>>(initialLevels);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const total = skills.length;
  const avaliadas = skills.filter((s) => s.id in valores).length;
  const podeContinuar = avaliadas === total;
  const progresso = total ? Math.round((avaliadas / total) * 100) : 0;

  function salvar() {
    setError(null);
    startTransition(async () => {
      const result = await saveSelfEvaluation({ levels: valores });
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-[family-name:var(--font-display)] text-[28px] leading-tight tracking-tight text-[#123F45] md:text-[34px] mt-10">
        Avalie suas competências técnicas e comportamentais
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-[#456A70]">
        Estas são as competências exigidas em{" "}
        <span className="font-semibold text-[#123F45]">{profileTitle}</span>.
        Seja honesto: o resultado só é útil se refletir onde você está hoje.
      </p>

      <details className="mt-5 rounded-2xl border border-[#D7DDD8] bg-white/40 px-5 py-3 text-[13px] text-[#456A70]">
        <summary className="cursor-pointer font-medium text-[#2A5359]">
          O que significa cada nível?
        </summary>
        <ul className="mt-3 space-y-1">
          {PROFICIENCY_LEVELS.map(({ level, label }) => (
            <li key={level}>
              <span className="font-semibold text-[#123F45]">{level}</span> —{" "}
              {label}
            </li>
          ))}
        </ul>
      </details>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-[13px] font-medium text-[#2A5359]">
          <span>
            {avaliadas} de {total} competências avaliadas
          </span>
          <span className="text-[#8FA3A6]">{progresso}%</span>
        </div>
        <div className="h-2 rounded-full bg-[#ECEBE5]">
          <div
            className="h-2 rounded-full bg-[#3F8A76] transition-all"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>

      <div className="mt-10 space-y-4">
        {CATEGORIAS.map((categoria) => {
          const itens = skills.filter((s) => s.kind === categoria.kind);
          if (itens.length === 0) return null;
          return (
            <details
              key={categoria.kind}
              open
              className="group rounded-2xl border border-[#D7DDD8] bg-white/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4">
                <span className="text-[15px] font-semibold text-[#123F45]">
                  {categoria.titulo}
                </span>
                <ChevronDown
                  className="h-4 w-4 text-[#5F7F84] transition-transform group-open:rotate-180"
                  aria-hidden
                />
              </summary>

              <div className="space-y-5 border-t border-[#D7DDD8] px-5 py-5">
                {itens.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-2.5 sm:flex-row sm:items-start sm:justify-between"
                  >
                    <span className="max-w-[16rem] pt-1.5 text-[14px] text-[#2A5359]">
                      {item.name}
                    </span>
                    <EscalaProficiencia
                      nome={item.name}
                      valor={valores[item.id] ?? null}
                      onChange={(v) =>
                        setValores((atual) => ({ ...atual, [item.id]: v }))
                      }
                    />
                  </div>
                ))}
              </div>
            </details>
          );
        })}
      </div>

      <StepFooter
        backHref="/field-interest"
        editing={editing}
        label="Ver meu resultado"
        pending={pending}
        disabled={!podeContinuar}
        error={error}
        onSubmit={salvar}
      />
    </div>
  );
}
