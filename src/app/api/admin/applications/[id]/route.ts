import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { jobApplications } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminSession();
  if (denied) return denied;
  const { id } = await ctx.params;
  try {
    const db = getDb();
    await db.delete(jobApplications).where(eq(jobApplications.id, id));
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
