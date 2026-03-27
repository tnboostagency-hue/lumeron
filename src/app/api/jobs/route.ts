import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { jobs } from "@/db/schema";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/** Public: list published jobs */
export async function GET() {
  try {
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
