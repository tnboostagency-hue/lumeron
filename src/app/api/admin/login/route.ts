import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE_NAME,
  createAdminSessionToken,
  getAdminPin,
} from "@/lib/admin-session";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const pin = typeof body?.pin === "string" ? body.pin : "";
    if (pin !== getAdminPin()) {
      return NextResponse.json({ error: "Invalid PIN" }, { status: 401 });
    }
    const token = createAdminSessionToken();
    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
