import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, service, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      from: "Lumeron Website <onboarding@resend.dev>",
      to: ["lumeron.sa@gmail.com"],
      replyTo: email,
      subject: `Inquiry from ${name}${company ? ` — ${company}` : ""}${service ? ` | ${service}` : ""}`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #1a7a70 0%, #229388 50%, #3ec8ba 100%); padding: 32px 40px;">
            <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 700;">New Contact Inquiry</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0; font-size: 14px;">Received via lumeron.sa contact form</p>
          </div>
          <div style="padding: 32px 40px; background: white;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #64748b; font-size: 13px; width: 140px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Name</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111827; font-size: 15px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Email</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111827; font-size: 15px;"><a href="mailto:${email}" style="color: #229388;">${email}</a></td>
              </tr>
              ${company ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Company</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111827; font-size: 15px;">${company}</td>
              </tr>` : ""}
              ${service ? `
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Service</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #f0f0f0; color: #111827; font-size: 15px;">${service}</td>
              </tr>` : ""}
            </table>
            <div style="margin-top: 24px;">
              <p style="color: #64748b; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin: 0 0 10px;">Message</p>
              <div style="background: #f8fafc; border-left: 3px solid #229388; padding: 16px 20px; border-radius: 0 8px 8px 0; color: #111827; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</div>
            </div>
          </div>
          <div style="padding: 20px 40px; background: #f9fafb; text-align: center;">
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">Lumeron — MASCO Digital · Al Khobar, KSA</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Send route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
