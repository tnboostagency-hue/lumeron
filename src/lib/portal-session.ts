import { createHmac, createHash, randomBytes, timingSafeEqual } from "crypto";
import { getCloudflareContext } from "@opennextjs/cloudflare";

export const PORTAL_SESSION_COOKIE = "lumeron_portal_session";
export const PORTAL_PENDING_COOKIE = "lumeron_portal_pending";

export function portalCookieSecure(): boolean {
  return process.env.NODE_ENV !== "development";
}

function readWorkerOrProcessEnv(
  key: "PORTAL_SESSION_SECRET" | "PORTAL_DEMO_OTP" | "PORTAL_DISABLE_DEMO_OTP"
): string | undefined {
  try {
    const { env } = getCloudflareContext();
    const v = env[key];
    if (typeof v === "string") {
      const t = v.trim();
      if (t.length > 0) return t;
    }
  } catch {
    // no Worker context
  }
  const p = process.env[key]?.trim();
  return p && p.length > 0 ? p : undefined;
}

const EMBEDDED_PORTAL_SECRET_FALLBACK = "lumeron-portal-session-fallback-9c1e4a2b8f";

function getPortalSecret(): string {
  const s = readWorkerOrProcessEnv("PORTAL_SESSION_SECRET");
  if (s) return s;
  if (process.env.NODE_ENV === "development") return "dev-lumeron-portal-session-change-in-prod";
  return EMBEDDED_PORTAL_SECRET_FALLBACK;
}

export function normalizePortalEmail(raw: string): string {
  return raw.trim().toLowerCase();
}

function otpHash(email: string, code: string): string {
  return createHash("sha256")
    .update(`${getPortalSecret()}:otp:${normalizePortalEmail(email)}:${code}`)
    .digest("hex");
}

export function signPendingCookie(email: string, code: string): { value: string; maxAge: number } {
  const exp = Math.floor(Date.now() / 1000) + 600;
  const em = normalizePortalEmail(email);
  const h = otpHash(em, code);
  const payloadObj = { email: em, exp, h };
  const payload = Buffer.from(JSON.stringify(payloadObj), "utf8").toString("base64url");
  const sig = createHmac("sha256", getPortalSecret()).update(payload).digest("base64url");
  return { value: `${payload}.${sig}`, maxAge: 600 };
}

export function verifyPendingCookie(
  token: string | undefined,
  email: string,
  code: string
): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;
  const [payload, sig] = parts;
  const expected = createHmac("sha256", getPortalSecret()).update(payload).digest("base64url");
  try {
    if (sig.length !== expected.length) return false;
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  } catch {
    return false;
  }
  let obj: { email: string; exp: number; h: string };
  try {
    obj = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  } catch {
    return false;
  }
  if (obj.exp < Math.floor(Date.now() / 1000)) return false;
  const em = normalizePortalEmail(email);
  if (em !== obj.email) return false;
  const h2 = otpHash(em, code);
  try {
    return timingSafeEqual(Buffer.from(obj.h, "utf8"), Buffer.from(h2, "utf8"));
  } catch {
    return false;
  }
}

export function createPortalSessionToken(email: string): string {
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 14;
  const nonce = randomBytes(12).toString("hex");
  const em = normalizePortalEmail(email);
  const inner = { e: em, exp, n: nonce };
  const payload = Buffer.from(JSON.stringify(inner), "utf8").toString("base64url");
  const sig = createHmac("sha256", getPortalSecret()).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function verifyPortalSessionToken(token: string | undefined): string | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payload, sig] = parts;
  const expected = createHmac("sha256", getPortalSecret()).update(payload).digest("base64url");
  try {
    if (sig.length !== expected.length) return null;
    if (!timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
  } catch {
    return null;
  }
  let obj: { e: string; exp: number; n: string };
  try {
    obj = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  } catch {
    return null;
  }
  if (obj.exp < Math.floor(Date.now() / 1000)) return null;
  if (!obj.e || typeof obj.e !== "string") return null;
  return normalizePortalEmail(obj.e);
}

/**
 * Built-in demo OTP `123456` for onboarding (disable in production with `PORTAL_DISABLE_DEMO_OTP=true`).
 * You can override the demo code with `PORTAL_DEMO_OTP` (e.g. same `123456` or another value).
 */
export function portalDemoOtpAccepts(code: string): boolean {
  const disabled = readWorkerOrProcessEnv("PORTAL_DISABLE_DEMO_OTP");
  if (disabled === "1" || disabled === "true" || disabled === "yes") return false;

  const customDemo = readWorkerOrProcessEnv("PORTAL_DEMO_OTP");
  if (customDemo) return code === customDemo;

  return code === "123456";
}
