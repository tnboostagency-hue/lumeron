import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * When `RESEND_FROM` is not set, use an address on your verified domain (lumeron.sa).
 * Avoid `onboarding@resend.dev` in production — it restricts which recipients you can use.
 */
export const DEFAULT_RESEND_FROM_CONTACT = "Lumeron <no-reply@lumeron.sa>";
export const DEFAULT_RESEND_FROM_CAREERS = "Lumeron Careers <no-reply@lumeron.sa>";
export const DEFAULT_RESEND_FROM_PORTAL = "Lumeron <no-reply@lumeron.sa>";

/**
 * Cloudflare Workers expose secrets on `env`, not always on `process.env`.
 * Read Worker env first, then fall back for local `next dev`.
 */
export function getResendApiKey(): string | undefined {
  try {
    const { env } = getCloudflareContext();
    const v = env.RESEND_API_KEY;
    if (typeof v === "string") {
      const t = v.trim();
      if (t.length > 0) return t;
    }
  } catch {
    // No Worker context (plain Next dev)
  }
  const p = process.env.RESEND_API_KEY?.trim();
  return p && p.length > 0 ? p : undefined;
}

export function getResendFrom(fallback: string): string {
  try {
    const { env } = getCloudflareContext();
    const v = env.RESEND_FROM;
    if (typeof v === "string") {
      const t = v.trim();
      if (t.length > 0) return t.slice(0, 320);
    }
  } catch {
    // no Worker context
  }
  const from = process.env.RESEND_FROM?.trim() || fallback;
  return from.slice(0, 320);
}
