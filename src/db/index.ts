import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import type { DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "./schema";

/**
 * D1 is bound as `DB` in wrangler.toml — use getCloudflareContext().env.DB, not process.env.
 */
export function getDb(): DrizzleD1Database<typeof schema> {
  const { env } = getCloudflareContext();
  if (!env.DB) {
    throw new Error('D1 binding "DB" is missing. Add [[d1_databases]] in wrangler.toml and apply schema.sql.');
  }
  return drizzle(env.DB, { schema });
}
