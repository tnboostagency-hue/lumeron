import { NextRequest, NextResponse } from "next/server";
import { desc } from "drizzle-orm";
import { randomUUID } from "crypto";
import { db } from "@/db";
import { jobs } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-api";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function nowIso() {
  return new Date().toISOString();
}

export async function GET() {
  const denied = await requireAdminSession();
  if (denied) return denied;
  try {
    const rows = await db.select().from(jobs).orderBy(desc(jobs.createdAt));
    return NextResponse.json({ jobs: rows });
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
    const department = String(body?.department ?? "").trim();
    const description = String(body?.description ?? "").trim();
    if (!title || !department || !description) {
      return NextResponse.json({ error: "title, department, description required" }, { status: 400 });
    }
    const id = randomUUID();
    const t = nowIso();
    const row = {
      id,
      title,
      department,
      location: String(body?.location ?? "Al Khobar, Saudi Arabia").trim(),
      type: String(body?.type ?? "Full-time").trim(),
      description,
      published: body?.published !== false,
      sortOrder: Number.isFinite(Number(body?.sortOrder)) ? Number(body.sortOrder) : 0,
      createdAt: t,
      updatedAt: t,
    };
    await db.insert(jobs).values(row);
    return NextResponse.json({ job: row });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
