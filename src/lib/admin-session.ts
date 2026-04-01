import { createHmac, randomBytes, timingSafeEqual } from "crypto";

const COOKIE = "lumeron_admin_session";

export { COOKIE as ADMIN_SESSION_COOKIE_NAME };

function getSecret(): string {
  const s = process.env.ADMIN_SESSION_SECRET?.trim();
  if (s) return s;
  if (process.env.NODE_ENV === "development") return "dev-lumeron-admin-session-change-in-prod";
  throw new Error("ADMIN_SESSION_SECRET is required in production");
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
  const fromEnv = process.env.ADMIN_PIN?.trim();
  return fromEnv && fromEnv.length > 0 ? fromEnv : DEFAULT_ADMIN_PIN;
}
