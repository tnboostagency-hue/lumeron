import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { getDb } from "@/db";
import { jobApplications } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

/** List applications (CV stored server-side; omitted from payload size) */
export async function GET() {
  const denied = await requireAdminSession();
  if (denied) return denied;
  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(jobApplications)
      .orderBy(desc(jobApplications.createdAt))
      .limit(200);
    const applications = rows.map(({ cvBase64, ...rest }) => ({
      ...rest,
      hasCv: Boolean(cvBase64 && cvBase64.length > 0),
    }));
    return NextResponse.json({ applications });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
