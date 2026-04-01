import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import { getCloudflareContext } from "@opennextjs/cloudflare";

const COOKIE = "lumeron_admin_session";

export { COOKIE as ADMIN_SESSION_COOKIE_NAME };

/** Prefer Secure cookies whenever we are not on `next dev` (Worker often omits NODE_ENV=production). */
export function adminCookieSecure(): boolean {
  return process.env.NODE_ENV !== "development";
}

/**
 * Cloudflare Workers inject Vars/Secrets into `env`, not `process.env`.
 * Fall back to `process.env` for local `next dev` / Node.
 */
function readWorkerOrProcessEnv(key: "ADMIN_PIN" | "ADMIN_SESSION_SECRET"): string | undefined {
  try {
    const { env } = getCloudflareContext();
    const v = env[key];
    if (typeof v === "string") {
      const t = v.trim();
      if (t.length > 0) return t;
    }
  } catch {
    // No Worker context (plain Next dev)
  }
  const p = process.env[key]?.trim();
  return p && p.length > 0 ? p : undefined;
}

/**
 * Shipped fallback so session cookies always sign/verify even when no env is set
 * (Cloudflare Vars sometimes need `env`; `readWorkerOrProcessEnv` covers that first).
 */
const EMBEDDED_SESSION_SECRET_FALLBACK = "lumeron-admin-session-fallback-8f2c9e1b4d7a";

function getSecret(): string {
  const s = readWorkerOrProcessEnv("ADMIN_SESSION_SECRET");
  if (s) return s;
  if (process.env.NODE_ENV === "development") return "dev-lumeron-admin-session-change-in-prod";
  return EMBEDDED_SESSION_SECRET_FALLBACK;
}

export function createAdminSessionToken(): string {
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;
  const nonce = randomBytes(16).toString("hex");
  const payload = `${exp}.${nonce}`;
  const sig = createHmac("sha256", getSecret()).update(payload).digest("hex");
  return `${payload}.${sig}`;
}

export function verifyAdminSessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [expStr, nonce, sig] = parts;
  const payload = `${expStr}.${nonce}`;
  const expected = createHmac("sha256", getSecret()).update(payload).digest("hex");
  try {
    if (sig.length !== expected.length) return false;
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  } catch {
    return false;
  }
  if (Number(expStr) < Math.floor(Date.now() / 1000)) return false;
  return true;
}

/** Used when `ADMIN_PIN` is not set. In production, set `ADMIN_PIN` in the Worker / Pages environment. */
const DEFAULT_ADMIN_PIN = "117799335";

export function getAdminPin(): string {
  const fromEnv = readWorkerOrProcessEnv("ADMIN_PIN");
  return fromEnv && fromEnv.length > 0 ? fromEnv : DEFAULT_ADMIN_PIN;
}
