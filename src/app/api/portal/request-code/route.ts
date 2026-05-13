import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import {
  normalizePortalEmail,
  PORTAL_PENDING_COOKIE,
  signPendingCookie,
  portalCookieSecure,
} from "@/lib/portal-session";

export const dynamic = "force-dynamic";

const DEFAULT_FROM = "Lumeron Website <onboarding@resend.dev>";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isValidEmail(raw: string): boolean {
  const s = raw.trim();
  if (s.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: NextRequest) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const raw = typeof body.email === "string" ? body.email : "";
  if (!isValidEmail(raw)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const email = normalizePortalEmail(raw);
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    const res = NextResponse.json({
      ok: true,
      demoOnly: true,
      message: "Email delivery is not configured. Continue with demo code 123456 (or set RESEND_API_KEY).",
    });
    return res;
  }

  const code = String(Math.floor(100000 + Math.random() * 900000));
  const { value: pendingValue, maxAge } = signPendingCookie(email, code);

  const from = (process.env.RESEND_FROM?.trim() || DEFAULT_FROM).slice(0, 320);
  const resend = new Resend(apiKey);
  const safeEmail = escapeHtml(email);
  const safeCode = escapeHtml(code);

  const { error } = await resend.emails.send({
    from,
    to: [email],
    subject: "Your Lumeron client portal sign-in code",
    html: `
      <div style="font-family: 'Inter', Arial, sans-serif; max-width: 520px; margin: 0 auto; padding: 24px;">
        <p style="color:#111827;font-size:16px;margin:0 0 16px;">Sign in to the <strong>Lumeron client portal</strong></p>
        <p style="color:#64748b;font-size:14px;margin:0 0 24px;">Use this one-time code. It expires in 10 minutes.</p>
        <div style="font-size:28px;font-weight:700;letter-spacing:0.2em;color:#229388;padding:16px 24px;background:#f0fdf8;border-radius:12px;border:1px solid #3ec8ba;text-align:center;">${safeCode}</div>
        <p style="color:#94a3b8;font-size:12px;margin:24px 0 0;">If you did not request this, you can ignore this email. Sent to ${safeEmail}</p>
      </div>
    `,
  });

  if (error) {
    console.error("portal request-code Resend:", error);
    return NextResponse.json({ error: error.message || "Could not send email." }, { status: 500 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(PORTAL_PENDING_COOKIE, pendingValue, {
    httpOnly: true,
    secure: portalCookieSecure(),
    sameSite: "lax",
    path: "/",
    maxAge,
  });
  return res;
}
