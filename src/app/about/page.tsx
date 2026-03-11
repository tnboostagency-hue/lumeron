"use client";

import { useState } from "react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import ContactModal from "@/components/sections/contact-modal";
import PageWrapper from "@/components/ui/page-wrapper";
import { useLanguage } from "@/context/LanguageContext";

// MASCO Group timeline (1960–2024)
const MASCO_TIMELINE = [
  { year: "1960s", items: ["Established as Sole partnership by MASCO's founder Mohammad Ali Alswailem.", "Started business as Road Construction / Material Supplier & Transportation."] },
  { year: "1961", items: ["First road contract in north KSA (Duba–Tabuk Region)."] },
  { year: "1970s", items: ["Multi road construction projects in several regions of KSA (Hafer Al Batin, Tabuk, Riyadh)."] },
  { year: "1972", items: ["First Mega Project for the construction of railway infrastructure for the 453-kilometer Haramain high speed railway connecting the western city of Jeddah with the Holy Cities of Makkah and Madina."] },
  { year: "1979", items: ["First Two mega highway projects (Duba–Tabuk Road) (Riyadh–Qassim highway) & other several road projects.", "Secured first major contract with Saudi Aramco & established a strong relationship."] },
  { year: "1984", items: ["MASCO incorporated as limited liability company."] },
  { year: "1985–1990", items: ["MASCO classified Grade A degree in road construction & maintenance & performed several projects across KSA.", "Incorporate partnership with Saudi Real Estate Co. Biryah."] },
  { year: "1990s", items: ["Several major road & highway projects were done across KSA."] },
  { year: "2003", items: ["MASCO incorporated water projects & performed several major projects."] },
  { year: "2008", items: ["MASCO incorporated energy projects (Advanced Energy) as a subsidiary Co.", "Incorporate Entaj Industrial Services Co. as a subsidiary Co. specialized in ready mix & construction material.", "Building and Water classified Grade A."] },
  { year: "2011", items: ["Raised capital to SAR 550 million."] },
  { year: "2012", items: ["Secured first major contract with Saudi Aramco & established a strong relationship."] },
  { year: "2016", items: ["Diversified its business through incorporating niche industrial production co. establishing a subsidiary Maydan Industry."] },
  { year: "2017", items: ["Incorporate partnership with Saudi Real Estate Co. Biryah.", "Signed new WO with NEOM."] },
  { year: "2021", items: ["Signed new WO with NEOM."] },
  { year: "2023", items: ["Under the Investment Plans, acquired 100% ownership of Transgulf Readymix Concrete Co.", "Signed new WO with NEOM & Qiddiya. AMIRAL PKG#6 'Amiral' complex, a future petrochemicals facility expansion at the SATORP refinery in KSA."] },
  { year: "2024", items: ["MASCO General Contracting Co. signed two mega contracts with Aramco, with a total value exceeding 2.2 billion Saudi Riyals."] },
];

// Lumeron timeline (2025)
const LUMERON_TIMELINE = [
  {
    year: "2025",
    items: [
      "Lumeron established as a MASCO Group subsidiary — the Group's dedicated technology company.",
      "Launched core service lines: Data Center Solutions, Industrial Automation & Robotics, AI Solutions, and Cybersecurity.",
      "Headquartered in Saudi Arabia, positioned to serve regional and national digital transformation needs.",
    ],
  },
];

export default function AboutPage() {
  const { lang } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  const stats = [
    { val: "60+", label: lang === "ar" ? "سنوات من النمو" : "Years of Growth", sub: lang === "ar" ? "من الطرق إلى التقنية" : "From roads to technology" },
    { val: "1960", label: lang === "ar" ? "التأسيس" : "Founded", sub: lang === "ar" ? "محمد علي السويلم" : "Mohammad Ali Alswailem" },
    { val: "2025", label: lang === "ar" ? "انطلاق لوميرون" : "Lumeron Launch", sub: lang === "ar" ? "ذراع التكنولوجيا" : "Technology arm" },
    { val: "2.2B+", label: lang === "ar" ? "عقود أرامكو" : "SAR Contracts", sub: lang === "ar" ? "2024" : "2024" },
  ];

  return (
    <>
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <Navbar />
      <PageWrapper>
        {/* HERO */}
        <section className="relative min-h-[80vh] flex flex-col justify-end overflow-hidden bg-white pt-20">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(34,147,136,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(34,147,136,0.055) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
              maskImage: "radial-gradient(ellipse 90% 80% at 50% 0%, black 20%, transparent 75%)",
            }}
          />
          <div className="absolute pointer-events-none" style={{ top: "-8%", left: "50%", transform: "translateX(-50%)", width: "900px", height: "600px", background: "radial-gradient(ellipse at center, rgba(34,147,136,0.08) 0%, transparent 65%)" }} />

          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg viewBox="0 0 1440 700" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
              <circle cx="720" cy="-80" r="420" stroke="rgba(34,147,136,0.07)" strokeWidth="1" fill="none" />
              <circle cx="720" cy="-80" r="580" stroke="rgba(34,147,136,0.04)" strokeWidth="1" fill="none" />
              <circle cx="720" cy="-80" r="720" stroke="rgba(34,147,136,0.025)" strokeWidth="1" fill="none" />
              <circle cx="120" cy="560" r="6" fill="rgba(34,147,136,0.35)" />
              <circle cx="1320" cy="420" r="4" fill="rgba(34,147,136,0.3)" />
              <circle cx="280" cy="320" r="3" fill="rgba(34,147,136,0.25)" />
            </svg>
          </div>

          <div className="container mx-auto px-6 md:px-8 pb-20 relative z-10">
            <div className={`flex items-center gap-3 mb-7 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
              <div className="w-6 h-px bg-[#229388]" />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#229388]">
                {lang === "ar" ? "قصتنا" : "Our Story"}
              </span>
            </div>
            <h1
              className={`font-bold leading-[0.95] tracking-tight mb-10 ${lang === "ar" ? "text-right" : ""}`}
              style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(42px,7vw,80px)", color: "#111827", letterSpacing: "-0.03em" }}
            >
              {lang === "ar" ? (
                <>
                  إرث من النمو منذ 1960
                  <br />
                  <span style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    الآن نتوسع في التكنولوجيا
                  </span>
                </>
              ) : (
                <>
                  A Legacy of Growth Since 1960
                  <br />
                  <span style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    Now Expanding into Technology
                  </span>
                </>
              )}
            </h1>
            <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-8 ${lang === "ar" ? "md:flex-row-reverse" : ""}`}>
              <p className={`text-[17px] text-[#64748b] leading-[1.75] max-w-[540px] font-light ${lang === "ar" ? "text-right" : ""}`}>
                {lang === "ar"
                  ? "مجموعة ماسكو: أكثر من 60 عاماً من بناء المملكة. منذ تأسيسنا عام 1960، نمونا من شركة تشييد طرق إلى قائد متنوع في البنية التحتية والمياه والطاقة والمشاريع الكبرى."
                  : "MASCO Group: 60+ Years of Building the Kingdom. Since our establishment in 1960, we have grown from a road construction company into a diversified leader across infrastructure, water, energy, and large-scale developments."}
              </p>
              <div className="flex gap-4 flex-shrink-0 flex-wrap">
                <button onClick={() => setModalOpen(true)} className="btn-primary text-[14px] px-8 py-3.5">
                  {lang === "ar" ? "اتصل الآن" : "Connect Now"}
                </button>
                <a href="#timeline" className="btn-outline text-[14px] px-8 py-3.5">
                  {lang === "ar" ? "رحلتنا" : "Our Journey"}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* INTRO + STATS */}
        <section className="bg-white py-28 border-t border-[#e2e8f0]">
          <div className="container mx-auto px-6 md:px-8">
            <div className={`grid md:grid-cols-2 gap-20 items-center ${lang === "ar" ? "dir-rtl" : ""}`}>
              <div className={lang === "ar" ? "text-right" : ""}>
                <div className={`flex items-center gap-3 mb-5 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                  <div className="w-5 h-px bg-[#229388]" />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#229388]">
                    {lang === "ar" ? "مجموعة ماسكو" : "MASCO Group"}
                  </span>
                </div>
                <h2 className="font-bold leading-tight mb-8" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,44px)", color: "#111827", letterSpacing: "-0.025em" }}>
                  {lang === "ar"
                    ? "60+ عاماً من بناء المملكة"
                    : "60+ Years of Building the Kingdom"}
                </h2>
                <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-5">
                  {lang === "ar"
                    ? "منذ تأسيسنا عام 1960، نمونا من شركة تشييد طرق إلى قائد متنوع في البنية التحتية والمياه والطاقة والمشاريع الكبرى. رحلتنا تعكس الطموح والمرونة والالتزام بتقدم المملكة."
                    : "Since our establishment in 1960, MASCO has grown from a road construction company into a diversified leader across infrastructure, water, energy, and large-scale developments. Our journey reflects ambition, resilience, and commitment to Saudi Arabia's progress."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl p-6 border border-[#e2e8f0] bg-white hover:border-[#229388]/30 hover:shadow-md transition-all duration-300"
                    style={{ boxShadow: "0 2px 12px rgba(34,147,136,0.05)" }}
                  >
                    <div className={`font-bold leading-none mb-1 ${lang === "ar" ? "text-right" : ""}`} style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(26px,3vw,38px)", color: "#111827", letterSpacing: "-0.02em" }}>
                      {s.val}
                    </div>
                    <div className={`text-[13px] font-semibold text-[#229388] mb-0.5 ${lang === "ar" ? "text-right" : ""}`}>{s.label}</div>
                    <div className={`text-[12px] text-[#94a3b8] ${lang === "ar" ? "text-right" : ""}`}>{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TIMELINE — MASCO Group (3D spine + alternating cards) */}
        <section id="timeline" className="relative bg-[#f8fafc] py-28 border-t border-[#e2e8f0] overflow-hidden">
          {/* Subtle 3D depth gradient background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-50"
            style={{
              background: "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(34,147,136,0.04) 0%, transparent 70%)",
            }}
          />
          <div className="container mx-auto px-6 md:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-5 h-px bg-[#229388]" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#229388]">
                  {lang === "ar" ? "رحلتنا" : "Our Journey"}
                </span>
                <div className="w-5 h-px bg-[#229388]" />
              </div>
              <h2 className="font-bold" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,44px)", color: "#111827", letterSpacing: "-0.025em" }}>
                {lang === "ar" ? "ستة عقود من الطموح" : "Six Decades of Ambition"}
              </h2>
              <p className="text-[15px] text-[#64748b] max-w-[560px] mx-auto mt-4 leading-[1.7]">
                {lang === "ar"
                  ? "من الطرق والسكك الحديدية إلى المياه والطاقة والعقود الضخمة مع أرامكو ونوم وقيديا."
                  : "From roads and railways to water, energy, and mega contracts with Aramco, NEOM, and Qiddiya."}
              </p>
            </div>

            <div
              className="relative max-w-5xl mx-auto"
              style={{ perspective: "1200px" }}
            >
              {/* Vertical 3D spine */}
              <div
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 hidden md:block rounded-full"
                style={{
                  background: "linear-gradient(to bottom, transparent 0%, rgba(34,147,136,0.2) 10%, rgba(34,147,136,0.6) 50%, rgba(34,147,136,0.2) 90%, transparent 100%)",
                  boxShadow: "0 0 20px rgba(34,147,136,0.15), inset 0 0 20px rgba(255,255,255,0.5)",
                }}
              />
              <div
                className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-3 hidden md:block rounded-full -z-10 opacity-30"
                style={{
                  background: "linear-gradient(to bottom, rgba(34,147,136,0.1), rgba(62,200,186,0.2), rgba(34,147,136,0.1))",
                }}
              />

              <div className="space-y-6 hidden md:block">
                {MASCO_TIMELINE.map((item, i) => {
                  const isLeft = i % 2 === 0;
                  const rtlFlip = lang === "ar";
                  const cardOnLeft = rtlFlip ? !isLeft : isLeft;
                  const TimelineCard = () => (
                        <div
                          className="w-full max-w-[420px] rounded-2xl p-6 sm:p-7 border border-[#e2e8f0] bg-white hover:border-[#229388]/40 transition-all duration-500 group cursor-default overflow-hidden relative"
                          style={{
                            boxShadow: "0 4px 20px rgba(34,147,136,0.06), 0 1px 3px rgba(0,0,0,0.04)",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "translateY(-6px)";
                            e.currentTarget.style.boxShadow = "0 24px 48px rgba(34,147,136,0.14), 0 12px 24px rgba(0,0,0,0.08)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "translateY(0)";
                            e.currentTarget.style.boxShadow = "0 4px 20px rgba(34,147,136,0.06), 0 1px 3px rgba(0,0,0,0.04)";
                          }}
                        >
                          <div className={`flex flex-col sm:flex-row sm:items-start gap-4 ${lang === "ar" ? "sm:flex-row-reverse text-right" : ""}`}>
                            <div
                              className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full w-fit ${lang === "ar" ? "self-end sm:self-auto" : ""}`}
                              style={{
                                background: "linear-gradient(135deg, rgba(34,147,136,0.12), rgba(62,200,186,0.08))",
                                border: "1px solid rgba(34,147,136,0.25)",
                                boxShadow: "0 2px 8px rgba(34,147,136,0.1)",
                              }}
                            >
                              <span className="font-bold text-[14px] text-[#229388]">{item.year}</span>
                            </div>
                            <ul className="flex-1 space-y-2">
                              {item.items.map((text, j) => (
                                <li key={j} className={`text-[14px] sm:text-[15px] text-[#64748b] leading-[1.75] font-light flex gap-2 ${lang === "ar" ? "flex-row-reverse text-right" : ""}`}>
                                  <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 bg-[#229388]/60" />
                                  <span>{text}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                  );

                  return (
                    <div
                      key={item.year + i}
                      className="relative flex flex-col md:flex-row items-stretch min-h-[100px]"
                    >
                      <div className={`flex-1 flex flex-col md:max-w-[calc(50%-28px)] ${cardOnLeft ? "md:pr-8 md:items-end" : "md:pl-8 md:items-start"}`}>
                        {cardOnLeft ? <TimelineCard /> : null}
                      </div>
                      {/* Center dot on spine */}
                      <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 items-center justify-center z-10 pointer-events-none">
                        <div
                          className="w-3.5 h-3.5 rounded-full border-2 border-white"
                          style={{
                            background: "linear-gradient(135deg, #229388, #3ec8ba)",
                            boxShadow: "0 0 14px rgba(34,147,136,0.5), inset 0 1px 0 rgba(255,255,255,0.5)",
                          }}
                        />
                      </div>
                      <div className={`flex-1 flex flex-col md:max-w-[calc(50%-28px)] ${cardOnLeft ? "md:pl-8 md:items-start" : "md:pr-8 md:items-end"}`}>
                        {!cardOnLeft ? <TimelineCard /> : null}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Mobile: simple stacked cards with subtle 3D shadow */}
              <div className="md:hidden space-y-4 mt-4">
                {MASCO_TIMELINE.map((item, i) => (
                  <div
                    key={item.year + i}
                    className={`rounded-2xl p-6 sm:p-7 border border-[#e2e8f0] bg-white ${lang === "ar" ? "text-right" : ""}`}
                    style={{
                      boxShadow: "0 8px 24px rgba(34,147,136,0.08), 0 2px 8px rgba(0,0,0,0.04)",
                      transform: "translateZ(4px)",
                    }}
                  >
                    <div className={`flex flex-col sm:flex-row sm:items-start gap-4 ${lang === "ar" ? "sm:flex-row-reverse" : ""}`}>
                      <div
                        className={`flex-shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full w-fit ${lang === "ar" ? "self-end sm:self-auto" : ""}`}
                        style={{
                          background: "linear-gradient(135deg, rgba(34,147,136,0.12), rgba(62,200,186,0.08))",
                          border: "1px solid rgba(34,147,136,0.25)",
                          boxShadow: "0 2px 8px rgba(34,147,136,0.1)",
                        }}
                      >
                        <span className="font-bold text-[14px] text-[#229388]">{item.year}</span>
                      </div>
                      <ul className="flex-1 space-y-2">
                        {item.items.map((text, j) => (
                          <li key={j} className={`text-[14px] sm:text-[15px] text-[#64748b] leading-[1.75] font-light flex gap-2 ${lang === "ar" ? "flex-row-reverse text-right" : ""}`}>
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2 bg-[#229388]/60" />
                            <span>{text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* LUMERON: A NEW CHAPTER */}
        <section className="bg-white py-28 border-t border-[#e2e8f0]">
          <div className="container mx-auto px-6 md:px-8">
            <div className="max-w-4xl mx-auto">
              <div className={`text-center mb-12 ${lang === "ar" ? "text-right" : ""}`}>
                <div className={`flex items-center justify-center gap-3 mb-4 ${lang === "ar" ? "flex-row-reverse" : ""}`}>
                  <div className="w-5 h-px bg-[#229388]" />
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#229388]">
                    {lang === "ar" ? "لوميرون" : "Lumeron"}
                  </span>
                  <div className="w-5 h-px bg-[#229388]" />
                </div>
                <h2 className="font-bold mb-6" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,44px)", color: "#111827", letterSpacing: "-0.025em" }}>
                  {lang === "ar" ? "فصل جديد في التكنولوجيا" : "A New Chapter in Technology"}
                </h2>
                <p className="text-[16px] text-[#64748b] leading-[1.8] max-w-2xl mx-auto font-light">
                  {lang === "ar"
                    ? "بناءً على إرث ستة عقود من مجموعة ماسكو، أُسست لوميرون في 2025 كذراع التكنولوجيا المخصص للمجموعة — لتقديم حلول مراكز بيانات عالمية، أتمتة صناعية، ذكاء اصطناعي، وأمن سيبراني للمملكة وما وراءها."
                    : "Building on six decades of MASCO Group's legacy, Lumeron was established in 2025 as the Group's dedicated technology arm — bringing world-class data center solutions, industrial automation, AI, and cybersecurity to the Kingdom and beyond."}
                </p>
              </div>

              <div
                className="rounded-2xl p-8 sm:p-10 border-2 border-[#229388]/20 bg-gradient-to-br from-[#f0fdfc] to-white"
                style={{ boxShadow: "0 8px 40px rgba(34,147,136,0.08)" }}
              >
                {LUMERON_TIMELINE.map((item) => (
                  <div key={item.year}>
                    <div
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 ${lang === "ar" ? "flex-row-reverse" : ""}`}
                      style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)", color: "white" }}
                    >
                      <span className="font-bold text-[15px]">{item.year}</span>
                    </div>
                    <ul className="space-y-4">
                      {item.items.map((text, j) => (
                        <li key={j} className={`text-[15px] text-[#475569] leading-[1.8] font-light flex gap-3 ${lang === "ar" ? "flex-row-reverse text-right" : ""}`}>
                          <span className="flex-shrink-0 w-2 h-2 rounded-full mt-1.5 bg-[#229388]" />
                          <span>{text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <p
                className={`mt-12 text-[18px] sm:text-[20px] font-semibold text-[#111827] leading-relaxed ${lang === "ar" ? "text-center text-right" : "text-center"}`}
                style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif' }}
              >
                {lang === "ar"
                  ? "من الطرق إلى مراكز البيانات — مجموعة ماسكو تستمر في بناء مستقبل المملكة."
                  : "From roads to data centers — MASCO Group continues to build Saudi Arabia's future."}
              </p>
            </div>
          </div>
        </section>

        {/* CTA STRIP */}
        <section
          className={`py-20 px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8 ${lang === "ar" ? "md:flex-row-reverse" : ""}`}
          style={{ background: "linear-gradient(135deg,#1a7a70 0%,#229388 50%,#3ec8ba 100%)" }}
        >
          <h2 className={`font-bold text-white leading-tight max-w-xl ${lang === "ar" ? "text-right" : ""}`} style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(24px,3vw,42px)", letterSpacing: "-0.025em" }}>
            {lang === "ar" ? "مستعد لتبني مع لوميرون؟" : "Ready to build with Lumeron?"}
          </h2>
          <button
            onClick={() => setModalOpen(true)}
            className="flex-shrink-0 bg-white font-semibold text-[13px] tracking-[0.08em] uppercase px-10 py-4 rounded-full transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-md"
            style={{ color: "#229388" }}
          >
            {lang === "ar" ? "اتصل الآن" : "Connect Now"}
          </button>
        </section>

        <Footer />
      </PageWrapper>
    </>
  );
}
