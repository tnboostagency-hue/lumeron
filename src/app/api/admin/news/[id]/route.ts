import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { newsArticles } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-api";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function nowIso() {
  return new Date().toISOString();
}

export async function PATCH(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminSession();
  if (denied) return denied;
  const { id } = await ctx.params;
  try {
    const body = await req.json();
    const patch: Partial<{
      title: string;
      category: string;
      date: string;
      excerpt: string;
      content: string;
      published: boolean;
      updatedAt: string;
    }> = { updatedAt: nowIso() };
    if (body.title != null) patch.title = String(body.title).trim();
    if (body.category != null) patch.category = String(body.category).trim();
    if (body.date != null) patch.date = String(body.date).trim();
    if (body.excerpt != null) patch.excerpt = String(body.excerpt).trim();
    if (body.content != null) patch.content = String(body.content).trim();
    if (typeof body.published === "boolean") patch.published = body.published;
    await db.update(newsArticles).set(patch).where(eq(newsArticles.id, id));
    const [row] = await db.select().from(newsArticles).where(eq(newsArticles.id, id)).limit(1);
    if (!row) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ article: row });
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
    await db.delete(newsArticles).where(eq(newsArticles.id, id));
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
