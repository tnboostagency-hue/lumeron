import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { linksProfile } from "@/db/schema";

export const dynamic = "force-dynamic";

export async function GET() {
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
    console.error("GET /api/links", e);
    return NextResponse.json({ links: null, error: "Database unavailable" }, { status: 200 });
  }
}
