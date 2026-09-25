"use client";

import { useState, useTransition } from "react";
import {
  Code2,
  Layers,
  BadgeCheck,
  Cloud,
  ShieldCheck,
  ClipboardList,
  Check,
  type LucideIcon,
} from "lucide-react";
import { StepFooter } from "@/components/step-footer";
import { PROFILES } from "@/lib/career/catalog";
import { saveFieldInterest } from "./actions";

const ICONS: Record<string, LucideIcon> = {
  desenvolvimento: Code2,
  analise: Layers,
  gestao: BadgeCheck,
  infraestrutura: Cloud,
  seguranca: ShieldCheck,
  qualidade: ClipboardList,
};

type Props = {
  editing: boolean;
  initialProfileId: string | null;
};

export default function FieldInterestForm({ editing, initialProfileId }: Props) {
  const [selecionada, setSelecionada] = useState<string | null>(
    initialProfileId,
  );
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const trocouPerfil =
    editing && initialProfileId !== null && selecionada !== initialProfileId;

  function salvar() {
    if (!selecionada) return;
    setError(null);
    startTransition(async () => {
      const result = await saveFieldInterest({ profileId: selecionada });
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-[family-name:var(--font-display)] text-[28px] leading-tight tracking-tight text-[#123F45] md:text-[34px] mt-10">
        Qual área você quer comparar com o seu perfil?
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-[#456A70]">
        Escolha uma área. Depois da autoavaliação, você verá o quanto já atende
        a ela e o que priorizar.
      </p>

      {trocouPerfil && (
        <p className="mt-4 rounded-2xl border border-[#F6C9A6] bg-[#FDEEE3] p-4 text-[13px] leading-relaxed text-[#8A4A1F]">
          Ao trocar de área, seu resultado passa a ser calculado para o novo
          perfil. Se quiser guardar o plano atual, imprima-o no painel antes de
          salvar.
        </p>
      )}

      <div
        className="mt-6 grid gap-3 sm:grid-cols-2"
        role="radiogroup"
        aria-label="Área profissional"
      >
        {PROFILES.map((area) => {
          const Icon = ICONS[area.id] ?? Code2;
          const ativa = selecionada === area.id;
          return (
            <button
              key={area.id}
              type="button"
              role="radio"
              aria-checked={ativa}
              onClick={() => setSelecionada(area.id)}
              className={
                "flex flex-col items-start gap-3 rounded-2xl border p-5 text-left transition-colors " +
                (ativa
                  ? "border-[#0B5A48] bg-[#C5E3D9]/30"
                  : "border-[#D7DDD8] bg-white/50 hover:border-[#B7C4BE]")
              }
            >
              <div className="flex w-full items-start justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C5E3D9]/60">
                  <Icon className="h-5 w-5 text-[#073D35]" aria-hidden />
                </span>
                {ativa && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#0B5A48] text-[#F8F7F3]">
                    <Check className="h-3.5 w-3.5" aria-hidden />
                  </span>
                )}
              </div>
              <span className="text-[15px] font-semibold text-[#123F45]">
                {area.title}
              </span>
              <span className="text-[13px] leading-relaxed text-[#456A70]">
                {area.description}
              </span>
            </button>
          );
        })}
      </div>

      <StepFooter
        backHref="/self"
        editing={editing}
        label="Continuar"
        pending={pending}
        disabled={!selecionada}
        error={error}
        onSubmit={salvar}
      />
    </div>
  );
}
