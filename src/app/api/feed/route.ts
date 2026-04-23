import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { jobs, newsArticles } from "@/db/schema";

export const dynamic = "force-dynamic";

type FeedItem = {
  id: string;
  type: "job" | "news";
  title: string;
  category: string;
  excerpt: string;
  date: string;
  href: string;
};

function toMs(d: string) {
  const ms = new Date(/^\d{4}-\d{2}-\d{2}$/.test(d) ? `${d}T12:00:00` : d).getTime();
  return Number.isFinite(ms) ? ms : 0;
}

export async function GET() {
  try {
    const db = getDb();
    const [jobRows, articleRows] = await Promise.all([
      db
        .select()
        .from(jobs)
        .where(eq(jobs.published, true))
        .orderBy(desc(jobs.sortOrder), desc(jobs.createdAt))
        .limit(50),
      db
        .select()
        .from(newsArticles)
        .where(eq(newsArticles.published, true))
        .orderBy(desc(newsArticles.date), desc(newsArticles.createdAt))
        .limit(50),
    ]);

    const jobItems: FeedItem[] = jobRows.map((j) => ({
      id: `job:${j.id}`,
      type: "job",
      title: j.title,
      category: j.department,
      excerpt: j.description,
      date: j.createdAt,
      href: "/careers",
    }));
    const newsItems: FeedItem[] = articleRows.map((a) => ({
      id: `news:${a.id}`,
      type: "news",
      title: a.title,
      category: a.category,
      excerpt: a.excerpt,
      date: a.date,
      href: "/news",
    }));

    const items = [...newsItems, ...jobItems].sort((a, b) => toMs(b.date) - toMs(a.date));
    return NextResponse.json({ items });
  } catch (e) {
    console.error("GET /api/feed", e);
    return NextResponse.json({ items: [], error: "Database unavailable" }, { status: 200 });
  }
}
