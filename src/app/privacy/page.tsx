"use client";

import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";

const sections = [
  {
    title: "1. Who We Are",
    content: `Lumeron Technology Company ("Lumeron", "we", "us", or "our") is MASCO Digital, registered and operating in the Kingdom of Saudi Arabia as part of MASCO Energy Group. We are committed to protecting your personal information in accordance with the Personal Data Protection Law (PDPL) of Saudi Arabia and other applicable regulations.`,
  },
  {
    title: "2. Information We Collect",
    content: `We may collect the following categories of personal data when you interact with our website or services:\n\n• Contact information: name, email address, phone number, job title, and company name.\n• Inquiry details: service interests and messages submitted through our contact forms.\n• Technical data: IP address, browser type, pages visited, and session duration collected automatically through analytics tools.\n• Communication records: correspondence you send us via email or contact forms.`,
  },
  {
    title: "3. How We Use Your Information",
    content: `We process your personal data for the following legitimate purposes:\n\n• To respond to your inquiries and provide requested information about our services.\n• To communicate with you regarding projects, proposals, and ongoing engagements.\n• To improve and optimize our website and digital services.\n• To comply with legal and regulatory obligations applicable in the Kingdom of Saudi Arabia.\n• To send relevant updates or communications where you have given consent.`,
  },
  {
    title: "4. Legal Basis for Processing",
    content: `We process your personal data on the following legal grounds under the PDPL:\n\n• Your explicit consent (e.g., when submitting a contact form).\n• Performance of a contract or pre-contractual steps at your request.\n• Compliance with a legal obligation.\n• Legitimate interests pursued by Lumeron, provided these do not override your rights.`,
  },
  {
    title: "5. Data Sharing and Disclosure",
    content: `Lumeron does not sell, trade, or rent your personal data to third parties. We may share data with:\n\n• MASCO Group subsidiaries and affiliates for internal business operations.\n• Trusted service providers who assist us in operating our website and services, under strict confidentiality obligations.\n• Regulatory authorities or law enforcement where required by applicable Saudi law.\n\nAll third-party recipients are bound by data protection obligations consistent with this notice.`,
  },
  {
    title: "6. Data Retention",
    content: `We retain personal data only for as long as necessary to fulfil the purposes for which it was collected, to comply with legal obligations, resolve disputes, and enforce our agreements. When data is no longer needed, it is securely deleted or anonymised.`,
  },
  {
    title: "7. Data Security",
    content: `We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, disclosure, alteration, or destruction. These include encryption in transit and at rest, access controls, and regular security assessments aligned with our cybersecurity practice standards.`,
  },
  {
    title: "8. Your Rights",
    content: `Under the PDPL and applicable regulations, you have the right to:\n\n• Access the personal data we hold about you.\n• Correct inaccurate or incomplete data.\n• Request deletion of your data where lawfully permitted.\n• Withdraw consent where processing is based on consent.\n• Object to certain types of processing.\n• Lodge a complaint with the Saudi Data & Artificial Intelligence Authority (SDAIA).\n\nTo exercise any of these rights, please contact us at privacy@lumeron.sa.`,
  },
  {
    title: "9. Cookies and Tracking",
    content: `Our website uses essential cookies to ensure proper functionality and analytics cookies to understand how visitors interact with our content. You may control cookie preferences through your browser settings. By continuing to use our website, you consent to our use of cookies as described above.`,
  },
  {
    title: "10. Changes to This Notice",
    content: `We may update this Privacy Notice periodically to reflect changes in our practices, technology, or legal requirements. The date of the most recent revision will always appear at the top of this page. Continued use of our website after any update constitutes acceptance of the revised notice.`,
  },
  {
    title: "11. Contact Us",
    content: `For any privacy-related questions, requests, or complaints, please contact our Data Protection Officer:\n\nEmail: privacy@lumeron.sa\nPostal address: Lumeron Technology Company, MASCO Group, Riyadh, Kingdom of Saudi Arabia`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-white pt-32 pb-16 border-b border-[#e2e8f0] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(34,147,136,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(34,147,136,0.05) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%, black 20%, transparent 70%)",
          }}
        />
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px bg-[#229388]" />
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#229388]">Legal</span>
          </div>
          <h1
            className="font-bold leading-tight mb-4"
            style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(36px,5vw,64px)", color: "#111827", letterSpacing: "-0.025em" }}
          >
            Privacy Notice
          </h1>
          <p className="text-[15px] text-[#64748b] max-w-[560px] leading-[1.75]">
            Last updated: February 2026. This notice describes how Lumeron Technology Company collects, uses, and protects your personal data in compliance with Saudi PDPL.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#f8fafc] py-20">
        <div className="container mx-auto px-6 md:px-8 max-w-[860px]">
          <div className="flex flex-col gap-8">
            {sections.map((s) => (
              <div
                key={s.title}
                className="bg-white rounded-2xl p-8 border border-[#e2e8f0]"
                style={{ boxShadow: "0 2px 16px rgba(34,147,136,0.04)" }}
              >
                <h2
                  className="font-bold text-[#111827] text-[18px] mb-4"
                  style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif' }}
                >
                  {s.title}
                </h2>
                <p className="text-[14px] text-[#64748b] leading-[1.85] font-light whitespace-pre-line">{s.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
