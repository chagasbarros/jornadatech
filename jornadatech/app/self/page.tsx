"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

const MOMENTOS = [
  {
    id: "semestre-1",
    titulo: "1º semestre",
  },
  {
    id: "semestre-2",
    titulo: "2º semestre",
  },
  {
    id: "semestre-3",
    titulo: "3º semestre",
  },
  {
    id: "semestre-4",
    titulo: "4º semestre",
  },
  {
    id: "semestre-5",
    titulo: "5º semestre",
  },
];

const CURIOSIDADES = [
  "Desenvolvimento de software",
  "Análise de Sistemas",
  "Gestão de projetos em TI",
  "Redes e infraestrutura",
  "Segurança da informação",
  "Testes e qualidade",
];

export default function QuemSouEuPage() {
  const [momento, setMomento] = useState<string | null>(null);
  const [curiosidades, setCuriosidades] = useState<string[]>([]);

  function alternarCuriosidade(item: string) {
    setCuriosidades((atual) =>
      atual.includes(item) ? atual.filter((c) => c !== item) : [...atual, item],
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="font-[family-name:var(--font-display)] text-[28px] leading-tight tracking-tight text-[#16231C] md:text-[34px] mt-10">
        Quem é você nessa jornada?
      </h1>

      <div className="mt-10">
        <p className="mb-3 text-[16px] font-medium text-[#354238]">
          Onde você está no Curso de ADS?
        </p>
        <div className="space-y-1">
          {MOMENTOS.map((m) => {
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
                    ? "border-[#2F6B45] bg-[#BFE3CE]/30"
                    : "border-[#DCE6DA] bg-white/50 hover:border-[#B9C9BE]")
                }
              >
                <span
                  className={
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border " +
                    (selecionado
                      ? "border-[#2F6B45] bg-[#2F6B45] text-[#F6F2E7]"
                      : "border-[#B9C9BE] bg-transparent")
                  }
                >
                  {selecionado && <Check className="h-3.5 w-3.5" aria-hidden />}
                </span>
                <span>
                  <span className="block text-[15px] font-semibold text-[#16231C]">
                    {m.titulo}
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
          className="mb-3 block text-[16px] font-medium text-[#354238]"
        >
          O que te motiva a estudar tecnologia?
        </label>
        <textarea
          id="motivacao"
          rows={3}
          placeholder="Ex.: quero um trabalho mais flexível, sempre gostei de resolver problemas..."
          className="w-full resize-none rounded-2xl border border-[#DCE6DA] bg-white/50 p-4 text-[15px] text-[#16231C] placeholder:text-[#8C978F] outline-none transition-colors focus:border-[#2F6B45] focus:ring-2 focus:ring-[#BFE3CE]"
        />
      </div>

      <div className="mt-8">
        <p className="mb-3 text-[16px] font-medium text-[#354238]">
          Quais assuntos despertam sua curiosidade?{" "}
          <span className="font-normal text-[#8C978F]">(opcional)</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {CURIOSIDADES.map((item) => {
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
                    ? "border-[#2F6B45] bg-[#2F6B45] text-[#F6F2E7]"
                    : "border-[#DCE6DA] bg-white/50 text-[#354238] hover:border-[#B9C9BE]")
                }
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-14 flex items-center justify-between">
        <Link
          href="/field-interest"
          className="inline-flex items-center gap-2 rounded-full bg-[#2F6B45] px-6 py-3 text-[15px] font-semibold text-[#F6F2E7] transition-colors hover:bg-[#26582F] mb-4"
        >
          Continuar
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
