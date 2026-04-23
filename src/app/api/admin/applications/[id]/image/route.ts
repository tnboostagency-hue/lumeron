import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/db";
import { jobApplications } from "@/db/schema";
import { requireAdminSession } from "@/lib/admin-api";

export const dynamic = "force-dynamic";

function safeFileName(name: string | null, fallback: string): string {
  const raw = (name ?? fallback).trim() || fallback;
  return raw.replace(/[/\\?%*:|"<>]/g, "_").slice(0, 180) || fallback;
}

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const denied = await requireAdminSession();
  if (denied) return denied;
  const { id } = await ctx.params;
  try {
    const db = getDb();
    const [row] = await db
      .select({
        portfolioImageObjectKey: jobApplications.portfolioImageObjectKey,
        portfolioImageBase64: jobApplications.portfolioImageBase64,
        portfolioImageFileName: jobApplications.portfolioImageFileName,
        portfolioImageMimeType: jobApplications.portfolioImageMimeType,
      })
      .from(jobApplications)
      .where(eq(jobApplications.id, id))
      .limit(1);
    if (!row) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }

    if (row.portfolioImageObjectKey) {
      const { env } = getCloudflareContext();
      const bucket = env.FILES_BUCKET as
        | { get: (key: string) => Promise<{ arrayBuffer: () => Promise<ArrayBuffer> } | null> }
        | undefined;
      if (bucket) {
        const obj = await bucket.get(row.portfolioImageObjectKey);
        if (obj) {
          const arr = await obj.arrayBuffer();
          const name = safeFileName(row.portfolioImageFileName, "portfolio-image.png");
          const type = row.portfolioImageMimeType?.trim() || "application/octet-stream";
          const asciiName = name.replace(/[^\x20-\x7e]/g, "_");
          return new NextResponse(arr, {
            status: 200,
            headers: {
              "Content-Type": type,
              "Content-Disposition": `attachment; filename="${asciiName.replace(/"/g, '\\"')}"`,
              "Cache-Control": "private, no-store",
            },
          });
        }
      }
    }

    if (!row.portfolioImageBase64) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }
    let buf: Buffer;
    try {
      buf = Buffer.from(row.portfolioImageBase64, "base64");
    } catch {
      return NextResponse.json({ error: "Invalid image data" }, { status: 500 });
    }
    if (buf.length === 0) {
      return NextResponse.json({ error: "Image not found" }, { status: 404 });
    }
    const name = safeFileName(row.portfolioImageFileName, "portfolio-image.png");
    const type = row.portfolioImageMimeType?.trim() || "application/octet-stream";
    const asciiName = name.replace(/[^\x20-\x7e]/g, "_");
    return new NextResponse(new Uint8Array(buf), {
      status: 200,
      headers: {
        "Content-Type": type,
        "Content-Disposition": `attachment; filename="${asciiName.replace(/"/g, '\\"')}"`,
        "Cache-Control": "private, no-store",
      },
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
