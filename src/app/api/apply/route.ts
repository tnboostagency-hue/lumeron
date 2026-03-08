export const runtime = "edge";

import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, linkedin, position, cover } = await req.json();

    if (!name || !email || !position) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Notify Lumeron team
    await resend.emails.send({
      from: "Lumeron Careers <onboarding@resend.dev>",
      to: ["lumeron.sa@gmail.com"], // Update to info@lumeron.sa after verifying domain at resend.com/domains
      replyTo: email,
      subject: `Job Application: ${position} — ${name}`,
      html: `
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
              ${phone ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Phone</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111827; font-size: 15px;">${phone}</td>
              </tr>` : ""}
              ${linkedin ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">LinkedIn</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111827; font-size: 15px;"><a href="${linkedin}" style="color: #229388;">${linkedin}</a></td>
              </tr>` : ""}
            </table>
            ${cover ? `
            <div style="margin-top: 24px;">
              <p style="color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 10px;">Cover Letter</p>
              <div style="background: #f8fafc; border-left: 3px solid #229388; padding: 16px 20px; border-radius: 0 8px 8px 0; color: #111827; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${cover}</div>
            </div>` : ""}
          </div>
          <div style="padding: 20px 40px; background: #f9fafb; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">Lumeron Careers · Al Khobar, KSA</p>
          </div>
        </div>
      `,
    });

    // Send thank-you auto-reply to the applicant
    await resend.emails.send({
      from: "Lumeron Careers <onboarding@resend.dev>",
      to: [email],
      subject: `Application received — ${position} at Lumeron`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #1a7a70 0%, #229388 50%, #3ec8ba 100%); padding: 40px 40px 32px;">
            <p style="color: rgba(255,255,255,0.75); font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px; margin: 0 0 12px;">Lumeron Careers</p>
            <h1 style="color: white; margin: 0; font-size: 26px; font-weight: 700; line-height: 1.2;">Your application has been received.</h1>
            <p style="color: rgba(255,255,255,0.85); margin: 10px 0 0; font-size: 15px; line-height: 1.6;">We'll review it and get back to you soon.</p>
          </div>
          <div style="padding: 36px 40px; background: white;">
            <p style="color: #111827; font-size: 16px; line-height: 1.7; margin: 0 0 20px;">
              Hi <strong>${name.split(" ")[0]}</strong>,
            </p>
            <p style="color: #374151; font-size: 15px; line-height: 1.8; margin: 0 0 20px;">
              Thank you for applying for the <strong>${position}</strong> role at Lumeron. We've received your application and our talent team will carefully review it.
            </p>
            <p style="color: #374151; font-size: 15px; line-height: 1.8; margin: 0 0 32px;">
              If your profile is a strong match, we'll reach out within <strong>5–7 business days</strong> to discuss next steps. We appreciate your interest in joining our team and helping build the digital future of Saudi Arabia.
            </p>
            <div style="background: #f0fdf8; border: 1px solid rgba(34,147,136,0.2); border-radius: 10px; padding: 20px 24px; margin-bottom: 32px;">
              <p style="color: #64748b; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; margin: 0 0 12px;">Application details</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-size: 13px; width: 120px;">Position</td>
                  <td style="padding: 6px 0; color: #111827; font-size: 13px; font-weight: 600;">${position}</td>
                </tr>
                <tr>
                  <td style="padding: 6px 0; color: #64748b; font-size: 13px;">Name</td>
                  <td style="padding: 6px 0; color: #111827; font-size: 13px; font-weight: 600;">${name}</td>
                </tr>
                ${phone ? `<tr>
                  <td style="padding: 6px 0; color: #64748b; font-size: 13px;">Phone</td>
                  <td style="padding: 6px 0; color: #111827; font-size: 13px; font-weight: 600;">${phone}</td>
                </tr>` : ""}
              </table>
            </div>
            <p style="color: #374151; font-size: 14px; line-height: 1.7; margin: 0;">
              Questions? Reply to this email or contact us at <a href="mailto:info@lumeron.sa" style="color: #229388; font-weight: 600; text-decoration: none;">info@lumeron.sa</a>.
            </p>
          </div>
          <div style="padding: 24px 40px; background: #f9fafb; border-top: 1px solid #f0f0f0;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0; line-height: 1.6;">
              <strong style="color: #229388;">Lumeron</strong> — MASCO Group Technology Arm<br/>
              3123 16th St., Al Yarmouk, Al Khobar 34412, Saudi Arabia
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Apply route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
