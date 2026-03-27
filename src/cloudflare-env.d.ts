/// <reference types="@cloudflare/workers-types" />

/** Augment OpenNext Cloudflare env with the app D1 binding (see wrangler.toml). */
declare global {
  interface CloudflareEnv {
    DB: D1Database;
  }
}

export {};
