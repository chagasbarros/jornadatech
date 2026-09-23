import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import { createSupabaseServerClient } from "./supabase/server";
import { stepRedirect, type Step } from "./journey";

/** Usuário do Supabase validado no servidor, ou null. */
export const getAuthUser = cache(async () => {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user?.email) return null;
  return { id: data.user.id, email: data.user.email };
});

/** Cria o User do Prisma no primeiro login; nos seguintes só atualiza o email. */
export async function syncUser(authUser: { id: string; email: string }) {
  return prisma.user.upsert({
    where: { id: authUser.id },
    create: { id: authUser.id, email: authUser.email },
    update: { email: authUser.email },
  });
}

/**
 * Usuário autenticado + registro do Prisma. Redireciona para /login sem sessão.
 * Chamar em toda página privada, Server Action e Route Handler.
 */
export const requireUser = cache(async () => {
  const authUser = await getAuthUser();
  if (!authUser) redirect("/login");

  const user = await prisma.user.findUnique({ where: { id: authUser.id } });
  return user ?? syncUser(authUser);
});

/** requireUser() + regra de navegação da jornada para a etapa da página. */
export async function requireStep(step: Step) {
  const user = await requireUser();
  const target = stepRedirect(user, step);
  if (target) redirect(target);
  return user;
}
