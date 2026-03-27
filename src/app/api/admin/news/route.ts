import { NextRequest, NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { randomUUID } from "crypto";
import { getDb } from "@/db";
import { newsArticles } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

function nowIso() {
  return new Date().toISOString();
}

export async function GET() {
  const denied = await requireAdminSession();
  if (denied) return denied;
  try {
    const rows = await db.select().from(newsArticles).orderBy(desc(newsArticles.createdAt));
    return NextResponse.json({ articles: rows });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const denied = await requireAdminSession();
  if (denied) return denied;
  try {
    const body = await req.json();
    const title = String(body?.title ?? "").trim();
    const category = String(body?.category ?? "Company News").trim();
    const date = String(body?.date ?? new Date().toISOString().split("T")[0]).trim();
    const excerpt = String(body?.excerpt ?? "").trim();
    if (!title || !excerpt) {
      return NextResponse.json({ error: "title and excerpt required" }, { status: 400 });
    }
    const id = randomUUID();
    const t = nowIso();
    const row = {
      id,
      title,
      category,
      date,
      excerpt,
      content: String(body?.content ?? "").trim(),
      published: body?.published !== false,
      createdAt: t,
      updatedAt: t,
    };
    const db = getDb();
    await db.insert(newsArticles).values(row);
    return NextResponse.json({ article: row });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
