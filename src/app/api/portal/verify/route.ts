import { NextRequest, NextResponse } from "next/server";
import {
  PORTAL_PENDING_COOKIE,
  PORTAL_SESSION_COOKIE,
  createPortalSessionToken,
  normalizePortalEmail,
  portalCookieSecure,
  portalDemoOtpAccepts,
  verifyPendingCookie,
} from "@/lib/portal-session";

export const dynamic = "force-dynamic";

function isValidEmail(raw: string): boolean {
  const s = raw.trim();
  if (s.length > 254) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: NextRequest) {
  let body: { email?: string; code?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const rawEmail = typeof body.email === "string" ? body.email : "";
  const code = typeof body.code === "string" ? body.code.trim() : "";
  if (!isValidEmail(rawEmail) || !code) {
    return NextResponse.json({ error: "Enter your email and the sign-in code." }, { status: 400 });
  }

  const email = normalizePortalEmail(rawEmail);
  const pending = req.cookies.get(PORTAL_PENDING_COOKIE)?.value;

  const demoOk = portalDemoOtpAccepts(code);
  const otpOk = verifyPendingCookie(pending, email, code);

  if (!demoOk && !otpOk) {
    return NextResponse.json({ error: "Invalid or expired code. Request a new code or try again." }, { status: 401 });
  }

  const token = createPortalSessionToken(email);
  const res = NextResponse.json({ ok: true, email });
  res.cookies.set(PORTAL_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: portalCookieSecure(),
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  res.cookies.set(PORTAL_PENDING_COOKIE, "", {
    httpOnly: true,
    secure: portalCookieSecure(),
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
