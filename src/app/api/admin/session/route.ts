import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

/** Session probe (no DB) — use to bootstrap admin UI without depending on jobs/news GET. */
export async function GET() {
  const denied = await requireAdminSession();
  if (denied) return denied;
  return NextResponse.json({ ok: true });
}
