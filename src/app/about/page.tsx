"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import ContactModal from "@/components/sections/contact-modal";
import PageWrapper from "@/components/ui/page-wrapper";
import { useLanguage } from "@/context/LanguageContext";

// 5-step condensed timeline (MASCO → Lumeron)
const TIMELINE_STEPS = [
  {
    year: "1960",
    titleEn: "Founding",
    titleAr: "التأسيس",
    descEn: "MASCO established by Mohammad Ali Alswailem. Started as road construction and material supplier.",
    descAr: "تأسيس ماسكو على يد محمد علي السويلم. انطلقت في تشييد الطرق ومواد البناء.",
  },
  {
    year: "1979",
    titleEn: "First Aramco",
    titleAr: "أول عقد أرامكو",
    descEn: "Secured first major contract with Saudi Aramco. Mega highway projects (Duba–Tabuk, Riyadh–Qassim).",
    descAr: "أول عقد ضخم مع أرامكو السعودية. مشاريع طرق كبرى.",
  },
  {
    year: "2008",
    titleEn: "Energy & Water",
    titleAr: "الطاقة والمياه",
    descEn: "Advanced Energy and Entaj subsidiaries. Building and Water classified Grade A.",
    descAr: "شركات الطاقة المتقدمة وإنتاج. تصنيف بناء ومياه درجة أ.",
  },
  {
    year: "2024",
    titleEn: "Mega Contracts",
    titleAr: "عقود ضخمة",
    descEn: "Two mega Aramco contracts exceeding 2.2B SAR. Partnerships with NEOM & Qiddiya.",
    descAr: "عقدان ضخمان مع أرامكو تتجاوز قيمتهما 2.2 مليار ريال.",
  },
  {
    year: "2025",
    titleEn: "Lumeron",
    titleAr: "لوميرون",
    descEn: "Lumeron established as MASCO's technology arm — data centers, automation, AI, cybersecurity.",
    descAr: "إطلاق لوميرون كذراع التكنولوجيا — مراكز بيانات، أتمتة، ذكاء اصطناعي، أمن سيبراني.",
  },
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

function TimelineStep({ step, index, lang, isCardLeft }: { step: typeof TIMELINE_STEPS[0]; index: number; lang: "en" | "ar"; isCardLeft: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px 0px -60px 0px", amount: 0.3 });
  const title = lang === "ar" ? step.titleAr : step.titleEn;
  const desc = lang === "ar" ? step.descAr : step.descEn;
  const isLumeron = step.year === "2025";

  const cardEl = (
    <div
      className={`rounded-2xl p-6 border border-[#e2e8f0] bg-white transition-all duration-300 hover:shadow-xl hover:shadow-[#229388]/10 hover:border-[#229388]/30 ${lang === "ar" ? "text-right" : ""}`}
      style={{ boxShadow: "0 4px 20px rgba(34,147,136,0.06)" }}
    >
      <div className={`flex items-center gap-3 mb-2 ${lang === "ar" ? "flex-row-reverse justify-end" : ""}`}>
        <span
          className="inline-block px-3 py-1 rounded-full text-[12px] font-bold"
          style={{ background: isLumeron ? "linear-gradient(135deg,#229388,#3ec8ba)" : "rgba(34,147,136,0.12)", color: isLumeron ? "white" : "#229388" }}
        >
          {step.year}
        </span>
        <span className="font-bold text-[17px] text-[#111827]" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif' }}>{title}</span>
      </div>
      <p className="text-[14px] text-[#64748b] leading-[1.75] font-light">{desc}</p>
    </div>
  );

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`relative min-h-[100px] ${index < TIMELINE_STEPS.length - 1 ? "mb-16 md:mb-20" : ""}`}
    >
      {/* Desktop: explicit 3-column grid - Left | Spine | Right */}
      <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-0 md:items-start">
        <div className="flex justify-end pr-6 min-h-[80px]">
          {isCardLeft ? <div className="max-w-[360px]">{cardEl}</div> : null}
        </div>
        <div className="flex flex-col items-center flex-shrink-0 px-1">
          <div
            className="w-5 h-5 rounded-full border-2 border-white flex-shrink-0 z-10"
            style={{
              background: isLumeron ? "linear-gradient(135deg,#229388,#3ec8ba)" : "#229388",
              boxShadow: isLumeron ? "0 0 0 4px rgba(34,147,136,0.2)" : "0 0 0 3px rgba(34,147,136,0.15)",
            }}
          />
          {index < TIMELINE_STEPS.length - 1 && (
            <div className="flex-1 w-0.5 min-h-[60px] mt-1" style={{ background: "linear-gradient(to bottom, rgba(34,147,136,0.4), rgba(34,147,136,0.15))" }} />
          )}
        </div>
        <div className="flex justify-start pl-6 min-h-[80px]">
          {!isCardLeft ? <div className="max-w-[360px]">{cardEl}</div> : null}
        </div>
      </div>

      {/* Mobile */}
      <div className="flex gap-4 md:hidden">
        <div className="flex flex-col items-center flex-shrink-0">
          <div
            className="w-4 h-4 rounded-full border-2 border-white flex-shrink-0 z-10"
            style={{
              background: isLumeron ? "linear-gradient(135deg,#229388,#3ec8ba)" : "#229388",
              boxShadow: "0 0 0 2px rgba(34,147,136,0.2)",
            }}
          />
          {index < TIMELINE_STEPS.length - 1 && (
            <div className="flex-1 w-0.5 min-h-[40px] mt-1 bg-[#229388]/25" />
          )}
        </div>
        <div
          className={`flex-1 rounded-2xl p-5 border border-[#e2e8f0] bg-white ${lang === "ar" ? "text-right" : ""}`}
          style={{ boxShadow: "0 4px 16px rgba(34,147,136,0.06)" }}
        >
          <div className={`flex items-center gap-3 mb-2 ${lang === "ar" ? "flex-row-reverse justify-end" : ""}`}>
            <span
              className="inline-block px-3 py-1 rounded-full text-[12px] font-bold"
              style={{ background: isLumeron ? "linear-gradient(135deg,#229388,#3ec8ba)" : "rgba(34,147,136,0.12)", color: isLumeron ? "white" : "#229388" }}
            >
              {step.year}
            </span>
            <span className="font-bold text-[16px] text-[#111827]" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif' }}>{title}</span>
          </div>
          <p className="text-[14px] text-[#64748b] leading-[1.75] font-light">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}

function TimelineSection({ lang }: { lang: "en" | "ar" }) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <section id="timeline" className="relative bg-[#f8fafc] py-20 md:py-28 border-t border-[#e2e8f0] overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(34,147,136,0.06) 0%, transparent 65%)" }}
      />
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 24 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 md:mb-20"
        >
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
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {TIMELINE_STEPS.map((step, i) => {
            const isCardLeft = i % 2 === 0;
            return <TimelineStep key={step.year} step={step} index={i} lang={lang} isCardLeft={isCardLeft} />;
          })}
        </div>
      </div>
    </section>
  );
}

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
              style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(32px,5.5vw,56px)", color: "#111827", letterSpacing: "-0.03em" }}
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

        {/* TIMELINE — 5 steps with scroll animation */}
        <TimelineSection lang={lang} />

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
