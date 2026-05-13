/// <reference types="@cloudflare/workers-types" />

/** Augment OpenNext Cloudflare env with the app D1 binding (see wrangler.toml). */
declare global {
  interface CloudflareEnv {
    DB: D1Database;
    /** Set in Pages → Settings → Variables (secret recommended). */
    ADMIN_PIN?: string;
    /** Set in Pages → Settings → Variables (secret). Required in production Worker. */
    ADMIN_SESSION_SECRET?: string;
    /** Optional: signed portal client sessions (set in production). */
    PORTAL_SESSION_SECRET?: string;
    /** Optional: override built-in demo OTP (default demo code is `123456`). */
    PORTAL_DEMO_OTP?: string;
    /** Set to `true` / `1` to disable demo OTP and allow only email codes. */
    PORTAL_DISABLE_DEMO_OTP?: string;
  }
}

export {};
