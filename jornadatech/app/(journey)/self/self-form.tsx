"use client";

import { useState, useTransition } from "react";
import { Check } from "lucide-react";
import { StepFooter } from "@/components/step-footer";
import { COURSES } from "@/lib/career/courses";
import { CURIOSITIES, semestersFor } from "@/lib/validation/self";
import { saveSelf } from "./actions";

type Props = {
  editing: boolean;
  initial: {
    course: string | null;
    semester: string | null;
    motivation: string;
    curiosities: string[];
  };
};

function Opcao({
  titulo,
  selecionado,
  onClick,
}: {
  titulo: string;
  selecionado: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
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
          {titulo}
        </span>
      </span>
    </button>
  );
}

export default function SelfForm({ editing, initial }: Props) {
  const [curso, setCurso] = useState<string | null>(initial.course);
  const [momento, setMomento] = useState<string | null>(initial.semester);
  const [motivacao, setMotivacao] = useState(initial.motivation);
  const [curiosidades, setCuriosidades] = useState<string[]>(
    initial.curiosities,
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const semestres = semestersFor(curso);

  function escolherCurso(id: string) {
    setCurso(id);
    // ADS tem menos semestres: descarta um semestre que o novo curso não oferece.
    if (!semestersFor(id).some((s) => s.id === momento)) setMomento(null);
  }

  function alternarCuriosidade(item: string) {
    setCuriosidades((atual) =>
      atual.includes(item) ? atual.filter((c) => c !== item) : [...atual, item],
    );
  }

  function salvar() {
    setError(null);
    startTransition(async () => {
      const result = await saveSelf({
        course: curso ?? "",
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
          Qual é o seu curso?
        </p>
        <div className="space-y-1">
          {COURSES.map((c) => (
            <Opcao
              key={c.id}
              titulo={c.name}
              selecionado={curso === c.id}
              onClick={() => escolherCurso(c.id)}
            />
          ))}
        </div>
      </div>

      {curso && (
        <div className="mt-8">
          <p className="mb-3 text-[16px] font-medium text-[#2A5359]">
            Em que semestre você está?
          </p>
          <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
            {semestres.map((m) => (
              <Opcao
                key={m.id}
                titulo={m.title}
                selecionado={momento === m.id}
                onClick={() => setMomento(m.id)}
              />
            ))}
          </div>
        </div>
      )}

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
        disabled={!curso || !momento || !motivacao.trim()}
        error={error}
        onSubmit={salvar}
      />
    </div>
  );
}
