import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Migrate precisa de uma conexão de sessão/direta — a pooled (6543) trava em db push/migrate.
    url: env("DIRECT_URL"),
  },
});
