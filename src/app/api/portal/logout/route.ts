import { NextResponse } from "next/server";
import { PORTAL_PENDING_COOKIE, PORTAL_SESSION_COOKIE, portalCookieSecure } from "@/lib/portal-session";

export const dynamic = "force-dynamic";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  const clear = {
    httpOnly: true,
    secure: portalCookieSecure(),
    sameSite: "lax" as const,
    path: "/",
    maxAge: 0,
  };
  res.cookies.set(PORTAL_SESSION_COOKIE, "", clear);
  res.cookies.set(PORTAL_PENDING_COOKIE, "", clear);
  return res;
}
