"use client";

import { useState, useTransition } from "react";
import { Check } from "lucide-react";
import { StepFooter } from "@/components/step-footer";
import { CURIOSITIES, SEMESTERS } from "@/lib/validation/self";
import { saveSelf } from "./actions";

type Props = {
  editing: boolean;
  initial: {
    semester: string | null;
    motivation: string;
    curiosities: string[];
  };
};

export default function SelfForm({ editing, initial }: Props) {
  const [momento, setMomento] = useState<string | null>(initial.semester);
  const [motivacao, setMotivacao] = useState(initial.motivation);
  const [curiosidades, setCuriosidades] = useState<string[]>(
    initial.curiosities,
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function alternarCuriosidade(item: string) {
    setCuriosidades((atual) =>
      atual.includes(item) ? atual.filter((c) => c !== item) : [...atual, item],
    );
  }

  function salvar() {
    setError(null);
    startTransition(async () => {
      const result = await saveSelf({
        semester: momento ?? "",
        motivation: motivacao,
        curiosities: curiosidades,
      });
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="font-[family-name:var(--font-display)] text-[28px] leading-tight tracking-tight text-[#123F45] md:text-[34px] mt-10">
        Quem é você nessa jornada?
      </h1>

      <div className="mt-10">
        <p className="mb-3 text-[16px] font-medium text-[#2A5359]">
          Onde você está no Curso de ADS?
        </p>
        <div className="space-y-1">
          {SEMESTERS.map((m) => {
            const selecionado = momento === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setMomento(m.id)}
                aria-pressed={selecionado}
                className={
                  "flex w-full items-start gap-3 rounded-2xl border p-2 text-left transition-colors " +
                  (selecionado
                    ? "border-[#0B5A48] bg-[#C5E3D9]/30"
                    : "border-[#D7DDD8] bg-white/50 hover:border-[#B7C4BE]")
                }
              >
                <span
                  className={
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border " +
                    (selecionado
                      ? "border-[#0B5A48] bg-[#0B5A48] text-[#F8F7F3]"
                      : "border-[#B7C4BE] bg-transparent")
                  }
                >
                  {selecionado && <Check className="h-3.5 w-3.5" aria-hidden />}
                </span>
                <span>
                  <span className="block text-[15px] font-semibold text-[#123F45]">
                    {m.title}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-10">
        <label
          htmlFor="motivacao"
          className="mb-3 block text-[16px] font-medium text-[#2A5359]"
        >
          O que te motiva a estudar tecnologia?
        </label>
        <textarea
          id="motivacao"
          rows={3}
          maxLength={1000}
          value={motivacao}
          onChange={(e) => setMotivacao(e.target.value)}
          placeholder="Ex.: quero um trabalho mais flexível, sempre gostei de resolver problemas..."
          className="w-full resize-none rounded-2xl border border-[#D7DDD8] bg-white/50 p-4 text-[15px] text-[#123F45] placeholder:text-[#8FA3A6] outline-none transition-colors focus:border-[#0B5A48] focus:ring-2 focus:ring-[#C5E3D9]"
        />
      </div>

      <div className="mt-8">
        <p className="mb-3 text-[16px] font-medium text-[#2A5359]">
          Quais assuntos despertam sua curiosidade?{" "}
          <span className="font-normal text-[#8FA3A6]">(opcional)</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {CURIOSITIES.map((item) => {
            const ativo = curiosidades.includes(item);
            return (
              <button
                key={item}
                type="button"
                onClick={() => alternarCuriosidade(item)}
                aria-pressed={ativo}
                className={
                  "rounded-full border px-4 py-2 text-[13px] font-medium transition-colors " +
                  (ativo
                    ? "border-[#0B5A48] bg-[#0B5A48] text-[#F8F7F3]"
                    : "border-[#D7DDD8] bg-white/50 text-[#2A5359] hover:border-[#B7C4BE]")
                }
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <StepFooter
        editing={editing}
        label="Continuar"
        pending={pending}
        disabled={!momento || !motivacao.trim()}
        error={error}
        onSubmit={salvar}
      />
    </div>
  );
}
