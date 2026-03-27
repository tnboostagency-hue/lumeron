import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import fs from "node:fs";
import path from "node:path";
import * as schema from "./schema";

/** Ensures ./data exists and returns a stable file: URL (works during `next build` and on Windows). */
function defaultSqliteFileUrl(): string {
  const dir = path.join(process.cwd(), "data");
  fs.mkdirSync(dir, { recursive: true });
  const abs = path.join(dir, "lumeron.db");
  return `file:${abs.replace(/\\/g, "/")}`;
}

const url = process.env.DATABASE_URL?.trim() || defaultSqliteFileUrl();

const client = createClient({ url });
export const db = drizzle(client, { schema });
