import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { defineConfig, env } from "prisma/config";

// Prisma 7 no longer loads env files automatically
expand(config({ path: [".env.local", ".env.development"], quiet: true }));

export default defineConfig({
  schema: "prisma/schema",
  migrations: {
    path: "prisma/schema/migrations",
  },
  datasource: {
    url: env("POSTGRES_URL"),
  },
});
