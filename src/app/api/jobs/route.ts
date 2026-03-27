import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { jobs } from "@/db/schema";

export const dynamic = "force-dynamic";

/** Public: list published jobs */
export async function GET() {
  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(jobs)
      .where(eq(jobs.published, true))
      .orderBy(desc(jobs.sortOrder), desc(jobs.createdAt));
    return NextResponse.json({ jobs: rows });
  } catch (e) {
    console.error("GET /api/jobs", e);
    return NextResponse.json({ jobs: [], error: "Database unavailable" }, { status: 200 });
  }
}
