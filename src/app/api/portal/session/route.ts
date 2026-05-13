import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { PORTAL_SESSION_COOKIE, verifyPortalSessionToken } from "@/lib/portal-session";

export const dynamic = "force-dynamic";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(PORTAL_SESSION_COOKIE)?.value;
  const email = verifyPortalSessionToken(token);
  if (!email) {
    return NextResponse.json({ user: null });
  }
  return NextResponse.json({ user: email });
}
