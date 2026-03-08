export const runtime = "edge";

import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, service, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Send notification to Lumeron team
    await resend.emails.send({
      from: "Lumeron Website <onboarding@resend.dev>",
      to: ["lumeron.sa@gmail.com"], // Update to info@lumeron.sa after verifying domain at resend.com/domains
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
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">Lumeron — MASCO Group Technology Arm · Al Khobar, KSA</p>
          </div>
        </div>
      `,
    });

    // Send thank-you auto-reply to the sender
    await resend.emails.send({
      from: "Lumeron <onboarding@resend.dev>",
      to: [email],
      subject: `Thank you for reaching out, ${name.split(" ")[0]}`,
      html: `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #1a7a70 0%, #229388 50%, #3ec8ba 100%); padding: 40px 40px 32px;">
            <div style="margin-bottom: 20px;">
              <svg width="36" height="36" viewBox="0 0 737.38 158.61" style="display:block;">
                <circle fill="white" cx="413.61" cy="20.49" r="20.49"/>
                <circle fill="white" cx="667.23" cy="20.49" r="20.49"/>
                <circle fill="white" cx="715.25" cy="20.49" r="20.49"/>
                <rect fill="white" x="442.03" width="157.57" height="40.99" rx="18.6"/>
              </svg>
            </div>
            <h1 style="color: white; margin: 0; font-size: 26px; font-weight: 700; line-height: 1.2;">We've received your message.</h1>
            <p style="color: rgba(255,255,255,0.85); margin: 10px 0 0; font-size: 15px; line-height: 1.6;">Thank you for contacting Lumeron. Our team will be in touch shortly.</p>
          </div>
          <div style="padding: 36px 40px; background: white;">
            <p style="color: #111827; font-size: 16px; line-height: 1.7; margin: 0 0 20px;">
              Hi <strong>${name.split(" ")[0]}</strong>,
            </p>
            <p style="color: #374151; font-size: 15px; line-height: 1.8; margin: 0 0 20px;">
              Thank you for reaching out to us${company ? ` on behalf of <strong>${company}</strong>` : ""}. We've received your inquiry${service ? ` regarding <strong>${service}</strong>` : ""} and a member of our team will respond within <strong>24 hours</strong>.
            </p>
            <p style="color: #374151; font-size: 15px; line-height: 1.8; margin: 0 0 32px;">
              In the meantime, feel free to explore our services and solutions at <a href="https://lumeron.sa" style="color: #229388; font-weight: 600; text-decoration: none;">lumeron.sa</a>.
            </p>
            <div style="background: #f0fdf8; border: 1px solid rgba(34,147,136,0.2); border-radius: 10px; padding: 20px 24px;">
              <p style="color: #64748b; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.8px; margin: 0 0 8px;">Your message summary</p>
              <p style="color: #111827; font-size: 14px; line-height: 1.7; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <div style="padding: 24px 40px; background: #f9fafb; border-top: 1px solid #f0f0f0;">
            <table style="width: 100%;">
              <tr>
                <td>
                  <p style="color: #9ca3af; font-size: 12px; margin: 0; line-height: 1.6;">
                    <strong style="color: #229388;">Lumeron</strong> — MASCO Group Technology Arm<br/>
                    3123 16th St., Al Yarmouk, Al Khobar 34412, Saudi Arabia<br/>
                    <a href="mailto:info@lumeron.sa" style="color: #229388; text-decoration: none;">info@lumeron.sa</a>
                  </p>
                </td>
              </tr>
            </table>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Send route error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
