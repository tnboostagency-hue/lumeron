import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "drizzle-kit";

function defaultSqliteUrl(): string {
  const dir = path.join(process.cwd(), "data");
  fs.mkdirSync(dir, { recursive: true });
  const abs = path.join(dir, "lumeron.db");
  return `file:${abs.replace(/\\/g, "/")}`;
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "sqlite",
  dbCredentials: {
    /** Use for `file:` while the app uses a remote Turso URL (see `src/db/index.ts`). */
    url: process.env.DRIZZLE_DATABASE_URL?.trim() || process.env.DATABASE_URL?.trim() || defaultSqliteUrl(),
  },
});
