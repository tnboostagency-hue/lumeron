import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getDb } from "@/db";
import { jobApplications } from "@/db/schema";

export const dynamic = "force-dynamic";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const MAX_CV_BYTES = 8 * 1024 * 1024;

async function readApplyPayload(req: NextRequest): Promise<{
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  position: string;
  jobId: string | null;
  cover: string;
  cvFileName: string | null;
  cvMimeType: string | null;
  cvBase64: string | null;
}> {
  const ct = req.headers.get("content-type") ?? "";
  if (ct.includes("multipart/form-data")) {
    const form = await req.formData();
    const file = form.get("cv");
    let cvFileName: string | null = null;
    let cvMimeType: string | null = null;
    let cvBase64: string | null = null;
    if (file instanceof File && file.size > 0) {
      if (file.size > MAX_CV_BYTES) {
        throw new Error("CV_TOO_LARGE");
      }
      cvFileName = file.name;
      cvMimeType = file.type || "application/octet-stream";
      const buf = Buffer.from(await file.arrayBuffer());
      cvBase64 = buf.toString("base64");
    }
    return {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      linkedin: String(form.get("linkedin") ?? "").trim(),
      position: String(form.get("position") ?? "").trim(),
      jobId: form.get("jobId") ? String(form.get("jobId")).trim() : null,
      cover: String(form.get("cover") ?? "").trim(),
      cvFileName,
      cvMimeType,
      cvBase64,
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
    cvFileName: null,
    cvMimeType: null,
    cvBase64: null,
  };
}

export async function POST(req: NextRequest) {
  try {
    let payload;
    try {
      payload = await readApplyPayload(req);
    } catch (e) {
      if ((e as Error).message === "CV_TOO_LARGE") {
        return NextResponse.json({ error: "CV must be under 8MB" }, { status: 400 });
      }
      throw e;
    }
    const { name, email, phone, linkedin, position, jobId, cover, cvFileName, cvMimeType, cvBase64 } = payload;

    if (!name || !email || !position) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const id = randomUUID();
    const createdAt = new Date().toISOString();
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
        cvFileName,
        cvMimeType,
        cvBase64,
        createdAt,
      });
    } catch (dbErr) {
      console.error("jobApplications insert", dbErr);
      return NextResponse.json(
        { error: "Could not save application. Ensure D1 is migrated (wrangler d1 execute … --file=./schema.sql)." },
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
              ${position}
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
              cvFileName
                ? `<p style="margin-top:16px;color:#229388;font-size:13px;">CV attached: ${cvFileName}</p>`
                : `<p style="margin-top:16px;color:#94a3b8;font-size:12px;">No CV file uploaded.</p>`
            }
          </div>
          <div style="padding: 20px 40px; background: #f9fafb; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">Lumeron Careers · Al Khobar, KSA</p>
          </div>
        </div>
      `;
      const { error } = await resend.emails.send({
        from: "Lumeron Careers <onboarding@resend.dev>",
        to: ["lumeron.sa@gmail.com"],
        replyTo: email,
        subject: `Job Application: ${position} — ${name}`,
        html,
        ...(cvBase64 && cvFileName
          ? { attachments: [{ filename: cvFileName, content: Buffer.from(cvBase64, "base64") }] }
          : {}),
      });

      if (error) {
        console.error("Resend error:", error);
        return NextResponse.json({ success: true, saved: true, emailed: false, emailError: error.message });
      }
    }

    return NextResponse.json({ success: true, saved: true, emailed: Boolean(resend) });
  } catch (err) {
    console.error("Apply route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
