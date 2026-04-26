import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { linksProfile } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

function nowIso() {
  return new Date().toISOString();
}

export async function GET() {
  const denied = await requireAdminSession();
  if (denied) return denied;
  try {
    const db = getDb();
    const [row] = await db.select().from(linksProfile).where(eq(linksProfile.id, "primary")).limit(1);
    return NextResponse.json({
      links: row ?? {
        id: "primary",
        phoneContact: "",
        whatsapp: "",
        linkedin: "",
        website: "",
        x: "",
        instagram: "",
      },
    });
  } catch (e) {
    console.error("GET /api/admin/links", e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const denied = await requireAdminSession();
  if (denied) return denied;
  try {
    const body = await req.json();
    const db = getDb();
    const t = nowIso();

    const payload = {
      phoneContact: String(body?.phoneContact ?? "").trim(),
      whatsapp: String(body?.whatsapp ?? "").trim(),
      linkedin: String(body?.linkedin ?? "").trim(),
      website: String(body?.website ?? "").trim(),
      x: String(body?.x ?? "").trim(),
      instagram: String(body?.instagram ?? "").trim(),
      updatedAt: t,
    };

    const [existing] = await db.select().from(linksProfile).where(eq(linksProfile.id, "primary")).limit(1);
    if (existing) {
      await db.update(linksProfile).set(payload).where(eq(linksProfile.id, "primary"));
    } else {
      await db.insert(linksProfile).values({
        id: "primary",
        ...payload,
        createdAt: t,
      });
    }
    const [row] = await db.select().from(linksProfile).where(eq(linksProfile.id, "primary")).limit(1);
    return NextResponse.json({ links: row });
  } catch (e) {
    console.error("PATCH /api/admin/links", e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
