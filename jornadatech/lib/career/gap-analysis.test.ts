import { describe, expect, it } from "vitest";
import data from "@/docs/carreiras_tecnologia.json";
import {
  DEFAULT_MARKET_PRIORITY,
  DEFAULT_MIN_LEVEL,
  MAX_LEVEL,
  PROFILES,
  SKILLS,
  courseHasProfile,
  getCourseProfiles,
  getProfile,
  getProfileSkills,
  getSkill,
  skillSlug,
  type Profile,
} from "./catalog";
import { COURSES } from "./courses";
import { TRACK_LIMIT, analyzeGap, recommendationFor } from "./gap-analysis";

// Exemplo de referência do documento de conceito.
const FRONTEND_JR: Profile = {
  id: "frontend-jr",
  title: "Desenvolvedor Front-end Jr.",
  description: "",
  skills: [
    { skillId: "html-css", w: 0.2, m: 4, d: 2 },
    { skillId: "javascript", w: 0.5, m: 4, d: 3 },
    { skillId: "comunicacao", w: 0.3, m: 3, d: 1 },
  ],
};

const ALUNO = { "html-css": 3, javascript: 2, comunicacao: 3 };

describe("analyzeGap — exemplo do documento", () => {
  const result = analyzeGap(FRONTEND_JR, ALUNO);
  const byId = Object.fromEntries(result.gaps.map((g) => [g.skillId, g]));

  it("calcula compatibilidade de 70%", () => {
    expect(result.compatibility).toBeCloseTo(70);
  });

  it("calcula gap normalizado e urgência", () => {
    expect(byId["html-css"].gapNorm).toBeCloseTo(0.25);
    expect(byId["html-css"].urgency).toBeCloseTo(0.1);
    expect(byId.javascript.gapNorm).toBeCloseTo(0.5);
    expect(byId.javascript.urgency).toBeCloseTo(0.75);
    expect(byId.comunicacao.urgency).toBe(0);
  });

  it("prioriza JavaScript, depois HTML/CSS, e deixa Comunicação fora", () => {
    expect(result.track.map((g) => g.skillId)).toEqual([
      "javascript",
      "html-css",
    ]);
  });

  it("recomenda pelo número de níveis faltando", () => {
    expect(byId.javascript.recommendation).toBe("PROJECT");
    expect(byId["html-css"].recommendation).toBe("PRACTICE");
    expect(byId.comunicacao.recommendation).toBeNull();
  });
});

describe("analyzeGap — regras", () => {
  it("proficiência acima do exigido não compensa outra competência", () => {
    const result = analyzeGap(FRONTEND_JR, {
      "html-css": 5,
      javascript: 2,
      comunicacao: 5,
    });
    // 0,2×1 + 0,5×0,5 + 0,3×1
    expect(result.compatibility).toBeCloseTo(75);
  });

  it("competência não avaliada conta como zero", () => {
    const result = analyzeGap(FRONTEND_JR, { "html-css": 4, comunicacao: 3 });
    expect(result.unassessed).toEqual(["javascript"]);
    expect(result.compatibility).toBeCloseTo(50);
    expect(result.track[0].skillId).toBe("javascript");
    expect(result.track[0].recommendation).toBe("COURSE");
  });

  it("normaliza pesos que não somam 1", () => {
    const doubled: Profile = {
      ...FRONTEND_JR,
      skills: FRONTEND_JR.skills.map((s) => ({ ...s, w: s.w * 2 })),
    };
    expect(analyzeGap(doubled, ALUNO).compatibility).toBeCloseTo(70);
  });

  it("desempata por peso, depois prioridade de mercado, depois id", () => {
    const profile: Profile = {
      id: "p",
      title: "",
      description: "",
      skills: [
        { skillId: "b", w: 0.25, m: 4, d: 2 },
        { skillId: "a", w: 0.25, m: 4, d: 2 },
        { skillId: "c", w: 0.5, m: 4, d: 1 },
      ],
    };
    // urgências: b = a = c = 0,5×peso×d = 0,25
    const result = analyzeGap(profile, { a: 2, b: 2, c: 2 });
    expect(result.track.map((g) => g.skillId)).toEqual(["c", "a", "b"]);
  });

  it("limita a trilha a TRACK_LIMIT competências", () => {
    const profile: Profile = {
      id: "p",
      title: "",
      description: "",
      skills: Array.from({ length: 8 }, (_, i) => ({
        skillId: `s${i}`,
        w: 1,
        m: 4,
        d: 1,
      })),
    };
    expect(analyzeGap(profile, {}).track).toHaveLength(TRACK_LIMIT);
  });

  it("mantém o invariante compatibilidade = 100 × (1 − Σ w × gapNorm)", () => {
    for (const profile of PROFILES) {
      const assessments = Object.fromEntries(
        profile.skills.map((s, i) => [s.skillId, i % (MAX_LEVEL + 1)]),
      );
      const result = analyzeGap(profile, assessments);
      const lost = result.gaps.reduce((sum, g) => sum + g.w * g.gapNorm, 0);
      expect(result.compatibility).toBeCloseTo(100 * (1 - lost));
    }
  });
});

describe("recommendationFor", () => {
  it.each([
    [0, null],
    [1, "PRACTICE"],
    [2, "PROJECT"],
    [3, "COURSE"],
    [5, "COURSE"],
  ])("gap %i → %s", (gap, expected) => {
    expect(recommendationFor(gap)).toBe(expected);
  });
});

describe("catálogo", () => {
  const skillIds = new Set(SKILLS.map((s) => s.id));

  it("não tem ids de competência duplicados", () => {
    expect(skillIds.size).toBe(SKILLS.length);
  });

  it.each(PROFILES.map((p) => [p.id, p] as const))(
    "perfil %s é válido",
    (_, profile) => {
      const ids = profile.skills.map((s) => s.skillId);
      expect(new Set(ids).size).toBe(ids.length);
      for (const s of profile.skills) {
        expect(skillIds.has(s.skillId)).toBe(true);
        expect(s.w).toBeGreaterThan(0);
        expect(Number.isInteger(s.m) && s.m >= 1 && s.m <= 5).toBe(true);
        expect(Number.isInteger(s.d) && s.d >= 1 && s.d <= 3).toBe(true);
      }
      const total = profile.skills.reduce((sum, s) => sum + s.w, 0);
      expect(total).toBeCloseTo(1);
      expect(getProfileSkills(profile)).toHaveLength(ids.length);
    },
  );

  // Decisões da curadoria (docs/carreiras_tecnologia.json).
  it.each(PROFILES.map((p) => [p.id, p] as const))(
    "perfil %s tem 7 técnicas + 4 comportamentais, com valores iguais",
    (_, profile) => {
      const kinds = getProfileSkills(profile).map((s) => s.kind);
      expect(kinds.filter((k) => k === "TECH")).toHaveLength(7);
      expect(kinds.filter((k) => k === "BEHAVIORAL")).toHaveLength(4);
      for (const s of profile.skills) {
        expect(s).toMatchObject({
          w: 1 / 11,
          m: DEFAULT_MIN_LEVEL,
          d: DEFAULT_MARKET_PRIORITY,
        });
      }
    },
  );

  it("textos diferentes no JSON geram ids diferentes, e cada id tem um só tipo", () => {
    const byId = new Map<string, Set<string>>();
    for (const course of data.cursos) {
      for (const c of course.carreiras) {
        for (const [names, kind] of [
          [c.competencias_tecnicas, "TECH"],
          [c.competencias_comportamentais, "BEHAVIORAL"],
        ] as const) {
          for (const name of names) {
            const id = skillSlug(name);
            byId.set(id, (byId.get(id) ?? new Set()).add(name));
            expect(getSkill(id)?.kind).toBe(kind);
          }
        }
      }
    }
    for (const names of byId.values()) expect(names.size).toBe(1);
  });

  it("carreira repetida entre cursos tem os mesmos dados", () => {
    const seen = new Map<string, string>();
    for (const course of data.cursos) {
      for (const c of course.carreiras) {
        const json = JSON.stringify([
          c.nome,
          c.resumo,
          c.competencias_tecnicas,
          c.competencias_comportamentais,
        ]);
        expect(seen.get(c.id) ?? json).toBe(json);
        seen.set(c.id, json);
      }
    }
  });

  it("cada curso tem 8 carreiras do catálogo", () => {
    expect(COURSES.map((c) => c.id).sort()).toEqual(
      data.cursos.map((c) => c.id).sort(),
    );
    for (const course of COURSES) {
      const profiles = getCourseProfiles(course.id);
      expect(profiles).toHaveLength(8);
      expect(profiles.every((p) => getProfile(p.id) === p)).toBe(true);
    }
    expect(courseHasProfile("ads", "dev-frontend")).toBe(true);
    expect(courseHasProfile("cc", "dev-frontend")).toBe(false);
    expect(getCourseProfiles("astronomia")).toEqual([]);
  });

  it("toda competência do catálogo é usada por algum perfil", () => {
    const used = new Set(
      PROFILES.flatMap((p) => p.skills.map((s) => s.skillId)),
    );
    expect(SKILLS.filter((s) => !used.has(s.id))).toEqual([]);
  });
});
