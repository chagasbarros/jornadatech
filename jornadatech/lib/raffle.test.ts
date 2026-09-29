import { describe, expect, it } from "vitest";
import { generateRaffleCode } from "./raffle";

describe("generateRaffleCode", () => {
  it("gera sempre 4 dígitos", () => {
    for (let i = 0; i < 1000; i++) {
      expect(generateRaffleCode()).toMatch(/^\d{4}$/);
    }
  });
});
