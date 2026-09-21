import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Migrate precisa de uma conexão de sessão/direta — a pooled (6543) trava em db push/migrate.
    // Lido direto de process.env (em vez de env()) para não quebrar `prisma generate`
    // em builds (ex: Vercel) onde DIRECT_URL não está definida — generate não usa a conexão.
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "",
  },
});
