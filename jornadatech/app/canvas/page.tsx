"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Sparkles, X } from "lucide-react";

function BlocoCanvas({
  titulo,
  descricao,
  children,
}: {
  titulo: string;
  descricao: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[#DCE6DA] bg-white/50 p-5">
      <h3 className="text-[14px] font-semibold text-[#16231C]">{titulo}</h3>
      <p className="mt-1 text-[13px] text-[#6C7A6F]">{descricao}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export default function CanvasPage() {
  // Pré-preenchido a partir da trilha sugerida na tela de resultado.
  const [competencias, setCompetencias] = useState<string[]>([
    "JavaScript",
    "HTML / CSS",
  ]);
  const [novaCompetencia, setNovaCompetencia] = useState("");

  function removerCompetencia(nome: string) {
    setCompetencias((atual) => atual.filter((c) => c !== nome));
  }

  function adicionarCompetencia() {
    const valor = novaCompetencia.trim();
    if (valor && !competencias.includes(valor)) {
      setCompetencias((atual) => [...atual, valor]);
    }
    setNovaCompetencia("");
  }

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-[family-name:var(--font-display)] text-[28px] leading-tight tracking-tight text-[#16231C] md:text-[34px]">
        Seu Canvas de Carreira
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-[#4B5B52]">
        Já adiantamos o que vimos no seu resultado. Complete o restante com suas
        próprias palavras.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <BlocoCanvas
            titulo="Objetivo profissional"
            descricao="Em uma frase, onde você quer chegar."
          >
            <input
              type="text"
              placeholder="Ex.: Atuar como desenvolvedor(a) front-end júnior em até 1 ano"
              className="w-full rounded-xl border border-[#DCE6DA] bg-white/70 px-4 py-3 text-[14px] text-[#16231C] placeholder:text-[#8C978F] outline-none transition-colors focus:border-[#2F6B45] focus:ring-2 focus:ring-[#BFE3CE]"
            />
          </BlocoCanvas>
        </div>

        <div className="sm:col-span-2">
          <BlocoCanvas
            titulo="Competências a desenvolver"
            descricao="Pré-preenchido com base na sua trilha sugerida — edite como quiser."
          >
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-[#BFE3CE]/50 px-3 py-1 text-[12px] font-medium text-[#26582F]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden />
              Sugerido com base no seu resultado
            </div>
            <div className="flex flex-wrap gap-2">
              {competencias.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#DCE6DA] bg-white/70 py-1.5 pl-3 pr-2 text-[13px] font-medium text-[#354238]"
                >
                  {c}
                  <button
                    type="button"
                    onClick={() => removerCompetencia(c)}
                    aria-label={`Remover ${c}`}
                    className="rounded-full p-0.5 text-[#8C978F] hover:bg-[#EDE9DC] hover:text-[#16231C]"
                  >
                    <X className="h-3 w-3" aria-hidden />
                  </button>
                </span>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                value={novaCompetencia}
                onChange={(e) => setNovaCompetencia(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    adicionarCompetencia();
                  }
                }}
                placeholder="Adicionar outra competência"
                className="flex-1 rounded-xl border border-[#DCE6DA] bg-white/70 px-4 py-2.5 text-[13px] text-[#16231C] placeholder:text-[#8C978F] outline-none transition-colors focus:border-[#2F6B45] focus:ring-2 focus:ring-[#BFE3CE]"
              />
              <button
                type="button"
                onClick={adicionarCompetencia}
                className="rounded-xl border border-[#DCE6DA] px-4 text-[13px] font-medium text-[#354238] transition-colors hover:border-[#B9C9BE]"
              >
                Adicionar
              </button>
            </div>
          </BlocoCanvas>
        </div>

        <BlocoCanvas
          titulo="Experiências e projetos"
          descricao="Cursos, projetos pessoais, estágios ou trabalhos voluntários."
        >
          <textarea
            rows={4}
            placeholder="Liste o que você já fez, mesmo que pareça pequeno"
            className="w-full resize-none rounded-xl border border-[#DCE6DA] bg-white/70 p-3 text-[14px] text-[#16231C] placeholder:text-[#8C978F] outline-none transition-colors focus:border-[#2F6B45] focus:ring-2 focus:ring-[#BFE3CE]"
          />
        </BlocoCanvas>

        <BlocoCanvas
          titulo="Portfólio"
          descricao="Um link (GitHub, Behance, site pessoal) ou o que pretende criar."
        >
          <input
            type="text"
            placeholder="Ex.: github.com/seu-usuario"
            className="w-full rounded-xl border border-[#DCE6DA] bg-white/70 px-4 py-3 text-[14px] text-[#16231C] placeholder:text-[#8C978F] outline-none transition-colors focus:border-[#2F6B45] focus:ring-2 focus:ring-[#BFE3CE]"
          />
        </BlocoCanvas>

        <div className="sm:col-span-2">
          <BlocoCanvas
            titulo="Networking"
            descricao="Pessoas, comunidades ou eventos que podem te ajudar nessa jornada."
          >
            <textarea
              rows={3}
              placeholder="Ex.: comunidade de ADS da faculdade, grupo de estudos, evento de tecnologia da cidade"
              className="w-full resize-none rounded-xl border border-[#DCE6DA] bg-white/70 p-3 text-[14px] text-[#16231C] placeholder:text-[#8C978F] outline-none transition-colors focus:border-[#2F6B45] focus:ring-2 focus:ring-[#BFE3CE]"
            />
          </BlocoCanvas>
        </div>
      </div>

      <div className="mt-14 flex items-center justify-between">
        <Link
          href="/onboarding/resultado"
          className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#4B5B52] transition-colors hover:text-[#16231C]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Voltar
        </Link>
        <Link
          href="/action-plan"
          className="inline-flex items-center gap-2 rounded-full bg-[#2F6B45] px-6 py-3 text-[15px] font-semibold text-[#F6F2E7] transition-colors hover:bg-[#26582F]"
        >
          Continuar para o plano de ação
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
