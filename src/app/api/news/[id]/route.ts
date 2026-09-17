import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { newsArticles } from "@/db/schema";

export const dynamic = "force-dynamic";

/** Public: one published article for its dedicated reading page. */
export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await ctx.params;
    const db = getDb();
    const [article] = await db.select().from(newsArticles).where(and(eq(newsArticles.id, id), eq(newsArticles.published, true))).limit(1);
    if (!article) return NextResponse.json({ error: "Article not found" }, { status: 404 });
    return NextResponse.json({ article });
  } catch (error) {
    console.error("GET /api/news/[id]", error);
    return NextResponse.json({ error: "Article unavailable" }, { status: 500 });
  }
}
