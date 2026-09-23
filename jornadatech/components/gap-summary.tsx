import { getSkill, type Profile } from "@/lib/career/catalog";
import {
  RECOMMENDATION_LABELS,
  type GapAnalysis,
} from "@/lib/career/gap-analysis";

export function skillName(id: string) {
  return getSkill(id)?.name ?? id;
}

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
      <div className="rounded-[24px] border border-[#DCE6DA] bg-white/50 p-6">
        <p className="text-[13px] font-medium text-[#6C7A6F]">
          Compatibilidade com {profile.title}
        </p>
        <p className="mt-2 font-[family-name:var(--font-display)] text-[40px] leading-none text-[#2F6B45]">
          {Math.round(analysis.compatibility)}%
        </p>

        <div className="mt-6 space-y-3.5">
          {analysis.gaps.map((g) => (
            <div key={g.skillId}>
              <div className="mb-1 flex items-center justify-between text-[12px] text-[#354238]">
                <span>{skillName(g.skillId)}</span>
                <span className="text-[#8C978F]">
                  {g.assessed ? g.a : "—"} / {g.m}
                </span>
              </div>
              <div className="relative h-2 rounded-full bg-[#EDE9DC]">
                <div
                  className="absolute inset-y-0 left-0 rounded-full border-r-2 border-[#16231C]/30"
                  style={{ width: `${(g.m / 5) * 100}%` }}
                />
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-[#6FA37E]"
                  style={{ width: `${(Math.min(g.a, 5) / 5) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[11px] text-[#8C978F]">
          Barra verde: seu nível. Marca: nível esperado para o perfil.
        </p>
      </div>

      <div className="rounded-[24px] border border-[#DCE6DA] bg-white/50 p-6">
        <p className="text-[13px] font-medium text-[#6C7A6F]">
          Trilha sugerida
        </p>
        {analysis.track.length === 0 ? (
          <p className="mt-3 text-[14px] text-[#354238]">
            Você já atende ao nível esperado em todas as competências deste
            perfil.
          </p>
        ) : (
          <ol className="mt-4 space-y-3">
            {analysis.track.map((g, i) => (
              <li key={g.skillId} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#BFE3CE]/60 text-[12px] font-semibold text-[#26582F]">
                  {i + 1}
                </span>
                <span>
                  <span className="block text-[14px] font-semibold text-[#16231C]">
                    {skillName(g.skillId)}
                  </span>
                  <span className="block text-[12px] text-[#4B5B52]">
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
