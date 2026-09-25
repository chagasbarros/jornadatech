import { getSkill, type Profile } from "@/lib/career/catalog";
import {
  RECOMMENDATION_LABELS,
  type GapAnalysis,
  type Recommendation,
} from "@/lib/career/gap-analysis";

export function skillName(id: string) {
  return getSkill(id)?.name ?? id;
}

// Cores de prioridade da identidade visual: alta (laranja), média (âmbar), baixa (verde).
export const PRIORITY_BADGE: Record<Recommendation, string> = {
  COURSE: "bg-[#F58E52]/25 text-[#8A4A1F]",
  PROJECT: "bg-[#E9B24D]/30 text-[#6B5516]",
  PRACTICE: "bg-[#C5E3D9]/70 text-[#073D35]",
};

/** Compatibilidade + barras por competência + trilha sugerida. */
export function GapSummary({
  profile,
  analysis,
}: {
  profile: Profile;
  analysis: GapAnalysis;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-[1fr_1.2fr]">
      <div className="overflow-hidden rounded-[24px] border border-[#D7DDD8] bg-white/50 shadow-card">
        <div className="relative bg-grad-brand p-6 text-white">
          <span
            className="absolute right-0 top-0 h-16 w-16 rounded-bl-[48px] bg-[#F58E52]/25"
            aria-hidden
          />
          <p className="text-[13px] font-medium text-[#E7F1EE]">
            Área profissional compatível
          </p>
          <p className="mt-1 font-[family-name:var(--font-display)] text-[20px] leading-snug">
            {profile.title}
          </p>
          <p className="mt-3 font-[family-name:var(--font-display)] text-[44px] font-semibold leading-none">
            {Math.round(analysis.compatibility)}%
          </p>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-[#073D35]/60">
            <div
              className="h-full rounded-full bg-grad-compat"
              style={{ width: `${Math.round(analysis.compatibility)}%` }}
            />
          </div>
        </div>

        <div className="space-y-3.5 p-6">
          {analysis.gaps.map((g) => (
            <div key={g.skillId}>
              <div className="mb-1 flex items-center justify-between text-[12px] text-[#2A5359]">
                <span>{skillName(g.skillId)}</span>
                <span className="text-[#8FA3A6]">
                  {g.assessed ? g.a : "—"} / {g.m}
                </span>
              </div>
              <div className="relative h-2 rounded-full bg-[#ECEBE5]">
                <div
                  className="absolute inset-y-0 left-0 rounded-full border-r-2 border-[#123F45]/30"
                  style={{ width: `${(g.m / 5) * 100}%` }}
                />
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-[#0B5A48]"
                  style={{ width: `${(Math.min(g.a, 5) / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
          <p className="pt-0.5 text-[11px] text-[#8FA3A6]">
            Barra verde: seu nível. Marca: nível esperado para o perfil.
          </p>
        </div>
      </div>

      <div className="rounded-[24px] border border-[#D7DDD8] bg-white/50 p-6 shadow-card">
        <p className="text-[13px] font-medium text-[#5F7F84]">
          Trilha sugerida
        </p>
        {analysis.track.length === 0 ? (
          <p className="mt-3 text-[14px] text-[#2A5359]">
            Você já atende ao nível esperado em todas as competências deste
            perfil.
          </p>
        ) : (
          <ol className="mt-4 space-y-3">
            {analysis.track.map((g, i) => (
              <li key={g.skillId} className="flex gap-3">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold ${
                    g.recommendation
                      ? PRIORITY_BADGE[g.recommendation]
                      : "bg-[#C5E3D9]/70 text-[#073D35]"
                  }`}
                >
                  {i + 1}
                </span>
                <span>
                  <span className="block text-[14px] font-semibold text-[#123F45]">
                    {skillName(g.skillId)}
                  </span>
                  <span className="block text-[12px] text-[#456A70]">
                    Faltam {g.gap} {g.gap === 1 ? "nível" : "níveis"} ·{" "}
                    {g.recommendation && RECOMMENDATION_LABELS[g.recommendation]}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
