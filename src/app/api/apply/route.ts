import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { getDb } from "@/db";
import { jobApplications } from "@/db/schema";

export const dynamic = "force-dynamic";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const MAX_CV_BYTES = 8 * 1024 * 1024;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

type UploadAsset = {
  fileName: string;
  mimeType: string;
  content: Buffer;
};

type BucketLike = {
  put: (
    key: string,
    value: ArrayBuffer | ArrayBufferView | string | ReadableStream,
    options?: { httpMetadata?: { contentType?: string } }
  ) => Promise<unknown>;
};

type ApplyPayload = {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  position: string;
  jobId: string | null;
  cover: string;
  themeGuide: string;
  cv: UploadAsset | null;
  portfolioImage: UploadAsset | null;
};

function safeFileName(name: string): string {
  return name.replace(/[/\\?%*:|"<>]/g, "_").slice(0, 180) || "file";
}

async function readApplyPayload(req: NextRequest): Promise<ApplyPayload> {
  const ct = req.headers.get("content-type") ?? "";
  if (ct.includes("multipart/form-data")) {
    const form = await req.formData();
    const cvFile = form.get("cv");
    const imageFile = form.get("portfolioImage");
    let cv: UploadAsset | null = null;
    let portfolioImage: UploadAsset | null = null;

    if (cvFile instanceof File && cvFile.size > 0) {
      if (cvFile.size > MAX_CV_BYTES) throw new Error("CV_TOO_LARGE");
      cv = {
        fileName: safeFileName(cvFile.name),
        mimeType: cvFile.type || "application/octet-stream",
        content: Buffer.from(await cvFile.arrayBuffer()),
      };
    }

    if (imageFile instanceof File && imageFile.size > 0) {
      if (imageFile.size > MAX_IMAGE_BYTES) throw new Error("IMAGE_TOO_LARGE");
      if (!imageFile.type.startsWith("image/")) throw new Error("IMAGE_INVALID_TYPE");
      portfolioImage = {
        fileName: safeFileName(imageFile.name),
        mimeType: imageFile.type || "application/octet-stream",
        content: Buffer.from(await imageFile.arrayBuffer()),
      };
    }

    return {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      linkedin: String(form.get("linkedin") ?? "").trim(),
      position: String(form.get("position") ?? "").trim(),
      jobId: form.get("jobId") ? String(form.get("jobId")).trim() : null,
      cover: String(form.get("cover") ?? "").trim(),
      themeGuide: String(form.get("themeGuide") ?? "").trim(),
      cv,
      portfolioImage,
    };
  }
  const j = await req.json();
  return {
    name: String(j?.name ?? "").trim(),
    email: String(j?.email ?? "").trim(),
    phone: String(j?.phone ?? "").trim(),
    linkedin: String(j?.linkedin ?? "").trim(),
    position: String(j?.position ?? "").trim(),
    jobId: j?.jobId ? String(j.jobId).trim() : null,
    cover: String(j?.cover ?? "").trim(),
    themeGuide: String(j?.themeGuide ?? "").trim(),
    cv: null,
    portfolioImage: null,
  };
}

async function putToR2(bucket: BucketLike, key: string, asset: UploadAsset) {
  await bucket.put(key, asset.content, {
    httpMetadata: {
      contentType: asset.mimeType,
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    let payload: ApplyPayload;
    try {
      payload = await readApplyPayload(req);
    } catch (e) {
      if ((e as Error).message === "CV_TOO_LARGE") {
        return NextResponse.json({ error: "CV must be under 8MB" }, { status: 400 });
      }
      if ((e as Error).message === "IMAGE_TOO_LARGE") {
        return NextResponse.json({ error: "Image must be under 5MB" }, { status: 400 });
      }
      if ((e as Error).message === "IMAGE_INVALID_TYPE") {
        return NextResponse.json({ error: "Portfolio file must be an image" }, { status: 400 });
      }
      throw e;
    }

    const { name, email, phone, linkedin, position, jobId, cover, themeGuide, cv, portfolioImage } = payload;
    if (!name || !phone) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const id = randomUUID();
    const createdAt = new Date().toISOString();
    const { env } = getCloudflareContext();
    const bucket = env.FILES_BUCKET as BucketLike | undefined;

    let cvObjectKey: string | null = null;
    let portfolioImageObjectKey: string | null = null;
    let cvBase64: string | null = null;
    let portfolioImageBase64: string | null = null;

    if (bucket) {
      if (cv) {
        cvObjectKey = `applications/${id}/cv-${Date.now()}-${cv.fileName}`;
        await putToR2(bucket, cvObjectKey, cv);
      }
      if (portfolioImage) {
        portfolioImageObjectKey = `applications/${id}/portfolio-${Date.now()}-${portfolioImage.fileName}`;
        await putToR2(bucket, portfolioImageObjectKey, portfolioImage);
      }
    } else {
      if (cv) cvBase64 = cv.content.toString("base64");
      if (portfolioImage) portfolioImageBase64 = portfolioImage.content.toString("base64");
    }

    try {
      const db = getDb();
      await db.insert(jobApplications).values({
        id,
        jobId,
        jobTitle: position,
        name,
        email,
        phone: phone || null,
        linkedin: linkedin || null,
        coverLetter: cover || null,
        themeGuide: themeGuide || null,
        cvFileName: cv?.fileName ?? null,
        cvMimeType: cv?.mimeType ?? null,
        cvObjectKey,
        cvBase64,
        portfolioImageFileName: portfolioImage?.fileName ?? null,
        portfolioImageMimeType: portfolioImage?.mimeType ?? null,
        portfolioImageObjectKey,
        portfolioImageBase64,
        createdAt,
      });
    } catch (dbErr) {
      console.error("jobApplications insert", dbErr);
      return NextResponse.json(
        { error: "Could not save application right now. Please try again shortly." },
        { status: 503 }
      );
    }

    if (resend) {
      const html = `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #1a7a70 0%, #229388 50%, #3ec8ba 100%); padding: 32px 40px;">
            <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">New Job Application</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">Received via lumeron.sa careers page</p>
          </div>
          <div style="padding: 32px 40px; background: white;">
            <div style="display: inline-block; background: #f0fdf8; border: 1px solid #229388; color: #229388; font-size: 13px; font-weight: 700; padding: 6px 14px; border-radius: 20px; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 0.5px;">
              ${position || "General Application"}
            </div>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #64748b; font-size: 13px; width: 140px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Full Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111827; font-size: 15px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111827; font-size: 15px;"><a href="mailto:${email}" style="color: #229388;">${email}</a></td>
              </tr>
              ${
                phone
                  ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Phone</td><td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111827; font-size: 15px;">${phone}</td></tr>`
                  : ""
              }
              ${
                linkedin
                  ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">LinkedIn</td><td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111827; font-size: 15px;"><a href="${linkedin}" style="color: #229388;">${linkedin}</a></td></tr>`
                  : ""
              }
            </table>
            ${
              cover
                ? `<div style="margin-top: 24px;"><p style="color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 10px;">Cover Letter</p><div style="background: #f8fafc; border-left: 3px solid #229388; padding: 16px 20px; border-radius: 0 8px 8px 0; color: #111827; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${cover}</div></div>`
                : ""
            }
            ${
              themeGuide
                ? `<div style="margin-top: 16px;"><p style="color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 10px;">Theme Guide</p><div style="background: #f8fafc; border-left: 3px solid #3ec8ba; padding: 14px 18px; border-radius: 0 8px 8px 0; color: #111827; font-size: 14px; line-height: 1.7; white-space: pre-wrap;">${themeGuide}</div></div>`
                : ""
            }
            ${
              cv
                ? `<p style="margin-top:16px;color:#229388;font-size:13px;">CV attached: ${cv.fileName}</p>`
                : `<p style="margin-top:16px;color:#94a3b8;font-size:12px;">No CV file uploaded.</p>`
            }
            ${
              portfolioImage
                ? `<p style="margin-top:8px;color:#229388;font-size:13px;">Portfolio image attached: ${portfolioImage.fileName}</p>`
                : ""
            }
          </div>
          <div style="padding: 20px 40px; background: #f9fafb; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">Lumeron Careers · Al Khobar, KSA</p>
          </div>
        </div>
      `;
      const jobTitle = position || "General Application";
      const attachments = [
        ...(cv ? [{ filename: cv.fileName, content: cv.content }] : []),
        ...(portfolioImage ? [{ filename: portfolioImage.fileName, content: portfolioImage.content }] : []),
      ];
      const { error } = await resend.emails.send({
        from: "Lumeron Careers <onboarding@resend.dev>",
        to: ["HR@lumeron.sa"],
        ...(email ? { replyTo: email } : {}),
        subject: `Job Application: ${jobTitle} — ${name}`,
        html,
        ...(attachments.length > 0 ? { attachments } : {}),
      });
      if (error) {
        console.error("Resend error:", error);
        return NextResponse.json({ success: true, saved: true, emailed: false, emailError: error.message });
      }
    }

    return NextResponse.json({ success: true, saved: true, emailed: Boolean(resend), usedR2: Boolean(bucket) });
  } catch (err) {
    console.error("Apply route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
