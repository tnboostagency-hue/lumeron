import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE_NAME, adminCookieSecure } from "@/lib/admin-session";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: adminCookieSecure(),
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  return res;
}
