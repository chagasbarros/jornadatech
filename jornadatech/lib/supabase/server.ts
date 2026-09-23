import "server-only";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

// Um client por requisição — nunca reutilizar entre requisições.
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Server Components não podem gravar cookies; o proxy.ts
            // renova a sessão antes de a página renderizar.
          }
        },
      },
    },
  );
}
