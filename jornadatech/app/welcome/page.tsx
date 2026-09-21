import Link from "next/link";
import { UserRound, Target, Route, ArrowRight, Ticket } from "lucide-react";

export default function BoasVindasPage() {
  return (
    <div className="mx-auto max-w-xl text-center">
      <h1 className="font-[family-name:var(--font-display)] text-[32px] leading-[1.15] tracking-tight text-[#16231C] md:text-[40px] mt-10">
        Bora montar o seu Canvas de Carreira?
      </h1>
      <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-[#4B5B52]">
        Falta pouco. Em poucos minutos você vai contar um pouco sobre você,
        avaliar suas competências de hoje e sair daqui com um plano
        priorizado do que desenvolver primeiro — no seu ritmo.
      </p>

      {/* Ilustração do processo — as 3 macro-etapas conectadas */}
      <div className="mx-auto mt-12 flex max-w-md items-start justify-between">
        {[
          { icon: UserRound, label: "Conhecendo você" },
          { icon: Target, label: "Seu diagnóstico" },
          { icon: Route, label: "Seu plano" },
        ].map((etapa, i, arr) => {
          const Icon = etapa.icon;
          return (
            <div key={etapa.label} className="flex flex-1 items-start">
              <div className="flex flex-col items-center gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#BFE3CE]/60">
                  <Icon className="h-6 w-6 text-[#26582F]" aria-hidden />
                </span>
                <span className="max-w-[7rem] text-[13px] font-medium text-[#354238]">
                  {etapa.label}
                </span>
              </div>
              {i < arr.length - 1 && (
                <span
                  className="mt-7 h-px flex-1 border-t border-dashed border-[#B9C9BE]"
                  aria-hidden
                />
              )}
            </div>
          );
        })}
      </div>

      <Link
        href="/self"
        className="mt-14 inline-flex items-center gap-2 rounded-full bg-[#2F6B45] px-7 py-3.5 text-[15px] font-semibold text-[#F6F2E7] transition-colors hover:bg-[#26582F]"
      >
        Vamos começar
        <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>

      <p className="mt-6 text-[13px] text-[#8C978F]">
        Leva cerca de 15 minutos · dá para pausar e continuar depois
      </p>

      <div className="mx-auto mt-8 flex max-w-sm items-center gap-3 rounded-2xl border border-[#DCE6DA] bg-[#BFE3CE]/30 px-5 py-4 text-left">
        <Ticket className="h-5 w-5 shrink-0 text-[#26582F]" aria-hidden />
        <p className="text-[13px] leading-relaxed text-[#354238]">
          Complete seu Canvas até o fim e concorra a um ingresso do{" "}
          <span className="font-semibold">Evento Conexão</span>.
        </p>
      </div>
    </div>
  );
}
