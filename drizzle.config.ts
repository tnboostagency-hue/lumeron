import fs from "node:fs";
import path from "node:path";
import { defineConfig } from "drizzle-kit";

function fileUrl(): string {
  const dir = path.join(process.cwd(), "data");
  fs.mkdirSync(dir, { recursive: true });
  return `file:${path.join(dir, "lumeron.db").replace(/\\/g, "/")}`;
}

const databaseId = process.env.CLOUDFLARE_D1_DATABASE_ID ?? "32614563-0aee-4bcf-8c77-0f1c7d6edf53";
const useD1Http = Boolean(process.env.CLOUDFLARE_API_TOKEN?.trim());

/** Remote D1 via drizzle-kit when CF API token is set; otherwise local file for `drizzle-kit studio` / introspection. */
export default defineConfig(
  useD1Http
    ? {
        schema: "./src/db/schema.ts",
        out: "./drizzle",
        dialect: "sqlite",
        driver: "d1-http",
        dbCredentials: {
          accountId: process.env.CLOUDFLARE_ACCOUNT_ID!,
          databaseId,
          token: process.env.CLOUDFLARE_API_TOKEN!,
        },
      }
    : {
        schema: "./src/db/schema.ts",
        out: "./drizzle",
        dialect: "sqlite",
        dbCredentials: {
          url: process.env.DRIZZLE_DATABASE_URL?.trim() || fileUrl(),
        },
      }
);
