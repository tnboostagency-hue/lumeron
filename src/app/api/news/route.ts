import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { newsArticles } from "@/db/schema";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Public: list published articles */
export async function GET() {
  try {
    const rows = await db
      .select()
      .from(newsArticles)
      .where(eq(newsArticles.published, true))
      .orderBy(desc(newsArticles.date), desc(newsArticles.createdAt));
    return NextResponse.json({ articles: rows });
  } catch (e) {
    console.error("GET /api/news", e);
    return NextResponse.json({ articles: [], error: "Database unavailable" }, { status: 200 });
  }
}
