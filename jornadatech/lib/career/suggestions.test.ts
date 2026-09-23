import { describe, expect, it } from "vitest";
import { getProfile } from "./catalog";
import { analyzeGap } from "./gap-analysis";
import { suggestGoals } from "./suggestions";

describe("suggestGoals", () => {
  const profile = getProfile("desenvolvimento")!;

  it("sugere uma meta para cada uma das 3 lacunas mais urgentes", () => {
    const analysis = analyzeGap(profile, {});
    const goals = suggestGoals(analysis);
    expect(goals).toHaveLength(3);
    expect(goals.every((g) => g.suggested && !g.done)).toBe(true);
    // Sem nenhuma nota, todo gap é ≥ 3 → curso, médio prazo.
    expect(goals[0]).toMatchObject({ horizon: "MEDIUM", deadline: "8 semanas" });
  });

  it("usa o tipo de recomendação da lacuna", () => {
    const levels = Object.fromEntries(
      profile.skills.map((s) => [s.skillId, s.m]),
    );
    levels.javascript = profile.skills.find((s) => s.skillId === "javascript")!.m - 1;
    const goals = suggestGoals(analyzeGap(profile, levels));
    expect(goals).toHaveLength(1);
    expect(goals[0].action).toBe(
      "Praticar JavaScript com exercícios dirigidos ou mentoria",
    );
  });

  it("não sugere nada quando não há lacunas", () => {
    const levels = Object.fromEntries(profile.skills.map((s) => [s.skillId, 5]));
    expect(suggestGoals(analyzeGap(profile, levels))).toEqual([]);
  });
});
