import { describe, expect, it } from "vitest";
import { afterSave, homePath, stepRedirect, type JourneyState } from "./journey";

const firstAccess = (currentStep: JourneyState["currentStep"]): JourneyState => ({
  currentStep,
  completedAt: null,
});
const completed: JourneyState = { currentStep: "DONE", completedAt: new Date() };

describe("homePath", () => {
  it("leva à etapa atual no primeiro acesso", () => {
    expect(homePath(firstAccess("SELF"))).toBe("/self");
    expect(homePath(firstAccess("CANVAS"))).toBe("/canvas");
  });

  it("leva ao dashboard após concluir", () => {
    expect(homePath(completed)).toBe("/dashboard");
  });
});

describe("stepRedirect", () => {
  it("impede pular etapas no primeiro acesso", () => {
    expect(stepRedirect(firstAccess("SELF"), "CANVAS")).toBe("/self");
    expect(stepRedirect(firstAccess("FIELD_INTEREST"), "DONE")).toBe(
      "/field-interest",
    );
  });

  it("permite a etapa atual e as anteriores", () => {
    expect(stepRedirect(firstAccess("CANVAS"), "CANVAS")).toBeNull();
    expect(stepRedirect(firstAccess("CANVAS"), "SELF")).toBeNull();
  });

  it("libera tudo após concluir", () => {
    expect(stepRedirect(completed, "SELF")).toBeNull();
    expect(stepRedirect(completed, "DONE")).toBeNull();
  });
});

describe("afterSave", () => {
  it("avança para a próxima etapa no primeiro acesso", () => {
    expect(afterSave(firstAccess("SELF"), "SELF")).toEqual({
      currentStep: "FIELD_INTEREST",
      completed: false,
      redirectTo: "/field-interest",
    });
  });

  it("não regride o progresso ao salvar uma etapa anterior", () => {
    expect(afterSave(firstAccess("CANVAS"), "SELF")).toEqual({
      currentStep: "CANVAS",
      completed: false,
      redirectTo: "/field-interest",
    });
  });

  it("conclui a jornada ao salvar o plano de ação", () => {
    expect(afterSave(firstAccess("ACTION_PLAN"), "ACTION_PLAN")).toEqual({
      currentStep: "DONE",
      completed: true,
      redirectTo: "/dashboard",
    });
  });

  it("volta ao dashboard ao editar após concluir", () => {
    expect(afterSave(completed, "SELF_EVALUATION")).toEqual({
      currentStep: "DONE",
      completed: true,
      redirectTo: "/dashboard",
    });
  });
});
