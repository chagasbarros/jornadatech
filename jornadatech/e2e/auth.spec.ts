import { expect, test } from "@playwright/test";

// Fluxos que não dependem de receber o código por email.
// O fluxo completo da jornada precisa de um usuário de teste no Supabase.

test("a landing page é pública", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("/");
});

test("a tela de login é pública e pede o email", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: "Bem-vindo" })).toBeVisible();
  await expect(page.getByLabel("E-mail")).toBeVisible();
});

for (const path of [
  "/self",
  "/field-interest",
  "/self-evaluation",
  "/canvas",
  "/action-plan",
  "/dashboard",
]) {
  test(`${path} redireciona para /login sem sessão`, async ({ page }) => {
    await page.goto(path);
    await expect(page).toHaveURL("/login");
  });
}

test("rejeita no servidor email sem domínio completo", async ({ page }) => {
  await page.goto("/login");
  // Espera a hidratação; antes dela o form faria um submit nativo.
  await page.waitForLoadState("networkidle");
  // O navegador aceita "aluno@exemplo"; o Zod exige domínio completo.
  await page.getByLabel("E-mail").fill("aluno@exemplo");
  await page.getByRole("button", { name: "Enviar código" }).click();
  await expect(page.getByText("Informe um e-mail válido.")).toBeVisible();
});
