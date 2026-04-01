/// <reference types="@cloudflare/workers-types" />

/** Augment OpenNext Cloudflare env with the app D1 binding (see wrangler.toml). */
declare global {
  interface CloudflareEnv {
    DB: D1Database;
    /** Set in Pages → Settings → Variables (secret recommended). */
    ADMIN_PIN?: string;
    /** Set in Pages → Settings → Variables (secret). Required in production Worker. */
    ADMIN_SESSION_SECRET?: string;
  }
}

export {};
