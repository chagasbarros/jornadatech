"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Code2,
  Layers,
  BadgeCheck,
  Cloud,
  ClipboardList,
  ArrowLeft,
  ArrowRight,
  Check,
} from "lucide-react";

const LIMITE_SELECAO = 3;

const AREAS = [
  {
    id: "desenvolvimento",
    icon: Code2,
    titulo: "Desenvolvimento de Software",
    texto:
      "Construir sites, aplicativos e sistemas — a base de quem programa no dia a dia.",
  },
  {
    id: "analise",
    icon: Layers,
    titulo: "Análise de Sistemas",
    texto:
      "Entender problemas, desenhar soluções e planejar como os sistemas devem ser construídos.",
  },
  {
    id: "gestao",
    icon: BadgeCheck,
    titulo: "Gestão de Projetos em TI",
    texto:
      "Organizar recursos, definir prazos e garantir que os projetos sejam entregues com sucesso.",
  },
  {
    id: "infraestrutura",
    icon: Cloud,
    titulo: "Redes e infraestrutura",
    texto:
      "Manter sistemas no ar, automatizar processos e cuidar da infraestrutura que sustenta tudo.",
  },
  {
    id: "seguranca",
    icon: ClipboardList,
    titulo: "Segurança da Informação",
    texto:
      "Proteger dados e sistemas contra ameaças e garantir a integridade das informações.",
  },
  {
    id: "qualidade",
    icon: ClipboardList,
    titulo: "Qualidade de Software",
    texto:
      "Testar, encontrar falhas e garantir que o que foi construído funciona como esperado.",
  },
];

export default function AreasInteressePage() {
  const [selecionadas, setSelecionadas] = useState<string[]>([]);
  const atingiuLimite = selecionadas.length >= LIMITE_SELECAO;

  function alternar(id: string) {
    setSelecionadas((atual) => {
      if (atual.includes(id)) return atual.filter((a) => a !== id);
      if (atual.length >= LIMITE_SELECAO) return atual;
      return [...atual, id];
    });
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-[family-name:var(--font-display)] text-[28px] leading-tight tracking-tight text-[#16231C] md:text-[34px] mt-10">
        Quais áreas você quer comparar com o seu perfil?
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-[#4B5B52]">
        Escolha de 1 a {LIMITE_SELECAO} áreas. Depois da autoavaliação, você
        verá o quanto já atende a cada uma delas.
      </p>

      <div className="mt-4 flex items-center gap-2 text-[13px] font-medium">
        <span
          className={
            selecionadas.length > 0 ? "text-[#2F6B45]" : "text-[#8C978F]"
          }
        >
          {selecionadas.length} de {LIMITE_SELECAO} selecionadas
        </span>
        {atingiuLimite && (
          <span className="text-[#8C978F]">
            · limite atingido, desmarque uma para trocar
          </span>
        )}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {AREAS.map((area) => {
          const Icon = area.icon;
          const ativa = selecionadas.includes(area.id);
          const desabilitada = !ativa && atingiuLimite;
          return (
            <button
              key={area.id}
              type="button"
              onClick={() => alternar(area.id)}
              aria-pressed={ativa}
              disabled={desabilitada}
              className={
                "flex flex-col items-start gap-3 rounded-2xl border p-5 text-left transition-colors " +
                (ativa
                  ? "border-[#2F6B45] bg-[#BFE3CE]/30"
                  : desabilitada
                    ? "cursor-not-allowed border-[#DCE6DA] bg-white/30 opacity-50"
                    : "border-[#DCE6DA] bg-white/50 hover:border-[#B9C9BE]")
              }
            >
              <div className="flex w-full items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#BFE3CE]/60">
                  <Icon className="h-5 w-5 text-[#26582F]" aria-hidden />
                </span>
                {ativa && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#2F6B45] text-[#F6F2E7]">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                  </span>
                )}
              </div>
              <span className="text-[15px] font-semibold text-[#16231C]">
                {area.titulo}
              </span>
              <span className="text-[13px] leading-relaxed text-[#4B5B52]">
                {area.texto}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-14 flex items-center justify-between">
        <Link
          href="/onboarding/quem-sou-eu"
          className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#4B5B52] transition-colors hover:text-[#16231C]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Voltar
        </Link>
        <Link
          href={selecionadas.length > 0 ? "/self-evaluation" : "#"}
          aria-disabled={selecionadas.length === 0}
          className={
            "inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold transition-colors " +
            (selecionadas.length > 0
              ? "bg-[#2F6B45] text-[#F6F2E7] hover:bg-[#26582F]"
              : "pointer-events-none bg-[#EDE9DC] text-[#8C978F]")
          }
        >
          Continuar
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}
