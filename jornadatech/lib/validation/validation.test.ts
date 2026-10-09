import { describe, expect, it } from "vitest";
import { emailSchema, verifyCodeSchema } from "./login";
import { actionPlanSchema, feedbackSchema } from "./career";
import { fieldInterestSchema } from "./field-interest";
import { selfSchema } from "./self";

describe("login", () => {
  it("normaliza o email", () => {
    expect(emailSchema.parse({ email: "  Aluno@Exemplo.COM " }).email).toBe(
      "aluno@exemplo.com",
    );
  });

  it("rejeita email inválido com mensagem em português", () => {
    const result = emailSchema.safeParse({ email: "nao-e-email" });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0].message).toBe("Informe um e-mail válido.");
  });

  it("exige código de 6 dígitos", () => {
    expect(verifyCodeSchema.safeParse({ email: "aluno@exemplo.com", code: "123456" }).success).toBe(true);
    expect(verifyCodeSchema.safeParse({ email: "aluno@exemplo.com", code: "12345a" }).success).toBe(false);
  });
});

describe("etapas", () => {
  it("self exige curso, semestre do curso e motivação", () => {
    const ok = { course: "ads", semester: "semestre-1", motivation: "x", curiosities: [] };
    expect(selfSchema.safeParse(ok).success).toBe(true);
    expect(selfSchema.safeParse({ ...ok, semester: "semestre-9" }).success).toBe(false);
    expect(selfSchema.safeParse({ ...ok, motivation: " " }).success).toBe(false);
    expect(selfSchema.safeParse({ ...ok, course: "medicina" }).success).toBe(false);
  });

  it("self limita o semestre ao curso (ADS 5, SI e CC 8)", () => {
    const base = { motivation: "x", curiosities: [] };
    const ads6 = selfSchema.safeParse({ ...base, course: "ads", semester: "semestre-6" });
    expect(ads6.success).toBe(false);
    expect(ads6.error?.issues[0].message).toBe("Escolha o seu semestre.");
    expect(selfSchema.safeParse({ ...base, course: "cc", semester: "semestre-8" }).success).toBe(true);
    expect(selfSchema.safeParse({ ...base, course: "si", semester: "semestre-8" }).success).toBe(true);
  });

  it("field-interest só aceita perfis do catálogo", () => {
    expect(fieldInterestSchema.safeParse({ profileId: "dev-backend" }).success).toBe(true);
    expect(fieldInterestSchema.safeParse({ profileId: "astronauta" }).success).toBe(false);
  });

  it("plano de ação exige indicador em cada meta", () => {
    const goal = {
      horizon: "SHORT",
      objective: "o",
      action: "a",
      deadline: "1 semana",
      indicator: "",
      done: false,
      suggested: false,
    };
    const result = actionPlanSchema.safeParse({ goals: [goal], feedback: null });
    expect(result.error?.issues[0].message).toBe("Toda meta precisa de um indicador.");
  });

  describe("questionário de fechamento", () => {
    const feedback = {
      satisfaction: 4,
      clarity: 5,
      suggestionsFit: "PARTIAL",
      hardestStep: "NONE",
      nextAction: "Começar o curso de JavaScript",
      recommend: 0,
    };

    it("aceita respostas completas (recomendação vai de 0 a 10)", () => {
      expect(feedbackSchema.safeParse(feedback).success).toBe(true);
      expect(feedbackSchema.safeParse({ ...feedback, recommend: 10 }).success).toBe(true);
      expect(feedbackSchema.safeParse({ ...feedback, recommend: 11 }).success).toBe(false);
    });

    it("exige todas as respostas", () => {
      for (const key of Object.keys(feedback)) {
        expect(feedbackSchema.safeParse({ ...feedback, [key]: null }).success).toBe(false);
      }
    });

    it("rejeita valores fora das opções e escalas", () => {
      expect(feedbackSchema.safeParse({ ...feedback, satisfaction: 0 }).success).toBe(false);
      expect(feedbackSchema.safeParse({ ...feedback, clarity: 6 }).success).toBe(false);
      expect(feedbackSchema.safeParse({ ...feedback, suggestionsFit: "MAYBE" }).success).toBe(false);
      expect(feedbackSchema.safeParse({ ...feedback, hardestStep: "DONE" }).success).toBe(false);
    });

    it("exige próxima ação com pelo menos 10 caracteres, sem contar espaços", () => {
      const result = feedbackSchema.safeParse({ ...feedback, nextAction: "  estudar  " });
      expect(result.error?.issues[0].message).toBe(
        "Descreva sua próxima ação (mínimo de 10 caracteres).",
      );
    });
  });
});
