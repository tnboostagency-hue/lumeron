import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { jobs } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

function nowIso() {
  return new Date().toISOString();
}

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminSession();
  if (denied) return denied;
  const { id } = await ctx.params;
  try {
    const db = getDb();
    const body = await req.json();
    const patch: Partial<{
      title: string;
      department: string;
      location: string;
      type: string;
      description: string;
      published: boolean;
      sortOrder: number;
      updatedAt: string;
    }> = { updatedAt: nowIso() };
    if (body.title != null) patch.title = String(body.title).trim();
    if (body.department != null) patch.department = String(body.department).trim();
    if (body.location != null) patch.location = String(body.location).trim();
    if (body.type != null) patch.type = String(body.type).trim();
    if (body.description != null) patch.description = String(body.description).trim();
    if (typeof body.published === "boolean") patch.published = body.published;
    if (body.sortOrder != null && Number.isFinite(Number(body.sortOrder))) {
      patch.sortOrder = Number(body.sortOrder);
    }
    await db.update(jobs).set(patch).where(eq(jobs.id, id));
    const [row] = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1);
    if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ job: row });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminSession();
  if (denied) return denied;
  const { id } = await ctx.params;
  try {
    const db = getDb();
    await db.delete(jobs).where(eq(jobs.id, id));
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
