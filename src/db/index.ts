import { createClient } from "@libsql/client/web";
import { drizzle } from "drizzle-orm/libsql/web";
import * as schema from "./schema";

/**
 * Uses `@libsql/client/web` + HTTP (edge-safe). No `file:` URLs.
 *
 * Turso / remote: prefer an `https://…` database URL for the web client; use DATABASE_AUTH_TOKEN (or TURSO_AUTH_TOKEN).
 * Local: `turso dev` then DATABASE_URL=http://127.0.0.1:8080
 * Drizzle CLI on a file DB: DRIZZLE_DATABASE_URL=file:… (see drizzle.config.ts).
 */
function resolveDatabaseUrl(): string {
  const fromEnv = process.env.DATABASE_URL?.trim();
  if (fromEnv?.startsWith("file:")) {
    throw new Error(
      "[db] file: URLs are not supported at runtime. Use Turso, or `turso dev` and DATABASE_URL=http://127.0.0.1:8080. For drizzle-kit against a file DB use DRIZZLE_DATABASE_URL."
    );
  }
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV !== "production") {
    return "http://127.0.0.1:8080";
  }
  /* Build / misconfigured deploy: avoid import-time throw; queries fail until DATABASE_URL is set. */
  return "http://127.0.0.1:9";
}

const url = resolveDatabaseUrl();
const authToken =
  process.env.DATABASE_AUTH_TOKEN?.trim() ||
  process.env.TURSO_AUTH_TOKEN?.trim() ||
  process.env.LIBSQL_AUTH_TOKEN?.trim();

const client = createClient({
  url,
  authToken: authToken || undefined,
});

export const db = drizzle(client, { schema });
