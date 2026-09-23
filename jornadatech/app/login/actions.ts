"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { syncUser } from "@/lib/auth";
import { homePath } from "@/lib/journey";
import { emailSchema, verifyCodeSchema } from "@/lib/validation/login";
import { firstIssue, type ActionResult } from "@/lib/steps";

export async function requestCode(input: { email: string }): Promise<ActionResult> {
  const parsed = emailSchema.safeParse(input);
  if (!parsed.success) return firstIssue(parsed.error);

  const supabase = await createSupabaseServerClient();
  // Cria o usuário no Supabase se não existir. A resposta é a mesma nos
  // dois casos, para não revelar quais emails estão cadastrados.
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data.email,
  });

  if (error) {
    if (error.status === 429) {
      return { error: "Aguarde um pouco antes de pedir um novo código." };
    }
    console.error("Falha ao enviar código de login:", error.message);
    return { error: "Não foi possível enviar o código. Tente novamente." };
  }
}

export async function verifyCode(input: {
  email: string;
  code: string;
}): Promise<ActionResult> {
  const parsed = verifyCodeSchema.safeParse(input);
  if (!parsed.success) return firstIssue(parsed.error);

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.verifyOtp({
    email: parsed.data.email,
    token: parsed.data.code,
    type: "email",
  });

  if (error || !data.user?.email) {
    return { error: "Código inválido ou expirado. Peça um novo código." };
  }

  const user = await syncUser({ id: data.user.id, email: data.user.email });
  redirect(homePath(user));
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/login");
}
