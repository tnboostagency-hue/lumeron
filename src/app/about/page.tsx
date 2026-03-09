"use client";

import { useState } from "react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import ContactModal from "@/components/sections/contact-modal";
import PageWrapper from "@/components/ui/page-wrapper";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutPage() {
  const { lang, t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  // MASCO Group → Lumeron timeline (short version; full group timeline can be inserted when provided)
  const timeline = [
    {
      year: lang === 'ar' ? "مجموعة ماسكو" : "MASCO Group",
      title: lang === 'ar' ? "إرث المجموعة وتأسيس الذراع التكنولوجي" : "Group heritage & technology arm foundation",
      desc: lang === 'ar' ? "مسيرة مجموعة ماسكو في الصناعة والطاقة والبنية التحتية، وصولاً إلى تأسيس ذراع تكنولوجي مخصص لقيادة التحول الرقمي." : "MASCO Group's journey across industry, energy and infrastructure, leading to the establishment of a dedicated technology arm to lead digital transformation.",
    },
    {
      year: "2025 Q4",
      title: lang === 'ar' ? "إطلاق لوميرون" : "Lumeron launch",
      desc: lang === 'ar' ? "الإطلاق الرسمي لشركة لوميرون كذراع تكنولوجي لمجموعة ماسكو، مكلفة ببناء البنية التحتية الرقمية السيادية وخدمات الأمن السيبراني والابتكارات المتقدمة." : "Official launch of Lumeron as MASCO Group's technology arm, tasked with building sovereign digital infrastructure, cybersecurity operations and advanced innovations.",
    },
    {
      year: lang === 'ar' ? "اليوم" : "Today",
      title: lang === 'ar' ? "مشروعان رائدان قيد التنفيذ" : "Two flagship projects in delivery",
      desc: lang === 'ar' ? "لوميرون تقود حالياً مشروعين رائدين يعكسان التزامها بتحقيق أهداف رؤية 2030 وتقديم حلول بنية تحتية رقمية وأمن سيبراني على أعلى المعايير." : "Lumeron is currently delivering two flagship projects, reflecting its commitment to Vision 2030 objectives and to sovereign digital infrastructure and cybersecurity at the highest standards.",
    },
  ];

  const pillars = [
    { icon: "🏗", title: t.about.pillars.p1.title, desc: t.about.pillars.p1.desc },
    { icon: "🛡", title: t.about.pillars.p2.title, desc: t.about.pillars.p2.desc },
    { icon: "🤖", title: t.about.pillars.p3.title, desc: t.about.pillars.p3.desc },
    { icon: "🤝", title: t.about.pillars.p4.title, desc: t.about.pillars.p4.desc },
  ];

  const stats = [
    { val: "2016", label: t.about.stats.founded, sub: t.about.stats.foundedSub },
    { val: "500+", label: t.about.stats.clients, sub: t.about.stats.clientsSub },
    { val: "99.99%", label: t.about.stats.uptime, sub: t.about.stats.uptimeSub },
    { val: "2030", label: t.about.stats.vision, sub: t.about.stats.visionSub },
  ];

  return (
    <PageWrapper>
      <>
        <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        <Navbar />

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
            <line x1="120" y1="560" x2="280" y2="320" stroke="rgba(34,147,136,0.1)" strokeWidth="1" />
            <line x1="1320" y1="420" x2="1160" y2="250" stroke="rgba(34,147,136,0.1)" strokeWidth="1" />
          </svg>
        </div>

        <div className="container mx-auto px-6 md:px-8 pb-20 relative z-10">
          <div className={`flex items-center gap-3 mb-7 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
            <div className="w-6 h-px bg-[#229388]" />
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#229388]">{t.about.hero.badge}</span>
          </div>
          <h1
            className={`font-bold leading-[0.95] tracking-tight mb-10 ${lang === 'ar' ? 'text-right' : ''}`}
            style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(48px,8vw,96px)", color: "#111827", letterSpacing: "-0.03em" }}
          >
            {lang === 'ar' ? (
              <>تمكين المستقبل<br /> <span style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>الرقمي للمملكة.</span></>
            ) : (
              <>Powering Saudi<br /> <span style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Arabia's Digital</span><br />Future.</>
            )}
          </h1>
          <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-8 ${lang === 'ar' ? 'md:flex-row-reverse' : ''}`}>
            <p className={`text-[17px] text-[#64748b] leading-[1.75] max-w-[480px] font-light ${lang === 'ar' ? 'text-right' : ''}`}>
              {t.about.hero.description}
            </p>
            <div className="flex gap-4 flex-shrink-0 flex-wrap">
              <button onClick={() => setModalOpen(true)} className="btn-primary text-[14px] px-8 py-3.5">{t.about.hero.cta1}</button>
              <a href="#timeline" className="btn-outline text-[14px] px-8 py-3.5">{t.about.hero.cta2}</a>
            </div>
          </div>
        </div>
      </section>

      {/* WHO WE ARE */}
      <section className="bg-white py-28 border-t border-[#e2e8f0]">
        <div className="container mx-auto px-6 md:px-8">
          <div className={`grid md:grid-cols-2 gap-20 items-center ${lang === 'ar' ? 'dir-rtl' : ''}`}>
            <div className={lang === 'ar' ? 'text-right' : ''}>
              <div className={`flex items-center gap-3 mb-5 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                <div className="w-5 h-px bg-[#229388]" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#229388]">{t.about.content.badge}</span>
              </div>
              <h2 className="font-bold leading-tight mb-8" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,48px)", color: "#111827", letterSpacing: "-0.025em" }}>
                {t.about.content.title}
              </h2>
              <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-5">
                {t.about.content.p1}
              </p>
              <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-5">
                {t.about.content.p2}
              </p>
              <p className="text-[16px] text-[#64748b] leading-[1.8] font-light">
                {t.about.content.p3}
              </p>
            </div>

            {/* Visual: stat cards */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-2xl p-6 border border-[#e2e8f0] bg-white hover:border-[#229388]/30 hover:shadow-md transition-all duration-300"
                  style={{ boxShadow: "0 2px 12px rgba(34,147,136,0.05)" }}
                >
                  <div className={`font-bold leading-none mb-1 ${lang === 'ar' ? 'text-right' : ''}`} style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(26px,3vw,38px)", color: "#111827", letterSpacing: "-0.02em" }}>
                    {s.val}
                  </div>
                  <div className={`text-[13px] font-semibold text-[#229388] mb-0.5 ${lang === 'ar' ? 'text-right' : ''}`}>{s.label}</div>
                  <div className={`text-[12px] text-[#94a3b8] ${lang === 'ar' ? 'text-right' : ''}`}>{s.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE — MASCO Group → Lumeron 2025 Q4 → Today */}
      <section id="timeline" className="bg-[#f8fafc] py-28 border-t border-[#e2e8f0]">
        <div className="container mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-5 h-px bg-[#229388]" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#229388]">{t.about.journey.badge}</span>
              <div className="w-5 h-px bg-[#229388]" />
            </div>
            <h2 className="font-bold" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,44px)", color: "#111827", letterSpacing: "-0.025em" }}>
              {t.about.journey.title}
            </h2>
            <p className="text-[15px] text-[#64748b] max-w-[520px] mx-auto mt-4 leading-[1.7]">
              {lang === 'ar' ? 'من مجموعة ماسكو إلى إطلاق لوميرون ووصولاً إلى واقعنا اليوم.' : 'From MASCO Group heritage to Lumeron launch and where we are today.'}
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block" style={{ background: "linear-gradient(to bottom, rgba(34,147,136,0.1), rgba(34,147,136,0.4) 30%, rgba(34,147,136,0.4) 70%, rgba(34,147,136,0.1))" }} />

            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={item.year + i} className={`relative flex flex-col md:flex-row items-start md:items-center mb-12 last:mb-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className={`w-full md:w-[calc(50%-28px)] ${isLeft ? "md:pr-8" : "md:pl-8"}`}>
                    <div
                      className={`rounded-2xl p-7 border border-[#e2e8f0] bg-white hover:border-[#229388]/30 hover:shadow-lg transition-all duration-300 group ${lang === 'ar' ? 'text-right' : ''}`}
                      style={{ boxShadow: "0 2px 16px rgba(34,147,136,0.04)" }}
                    >
                      <div className={`inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full ${lang === 'ar' ? 'flex-row-reverse' : ''}`} style={{ background: "rgba(34,147,136,0.08)", border: "1px solid rgba(34,147,136,0.15)" }}>
                        <span className="font-bold text-[13px] text-[#229388]">{item.year}</span>
                      </div>
                      <h3 className="font-bold text-[#111827] text-[18px] mb-2 leading-snug" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif' }}>{item.title}</h3>
                      <p className="text-[13px] text-[#64748b] leading-[1.75] font-light">{item.desc}</p>
                    </div>
                  </div>

                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-[14px] h-[14px] rounded-full border-2 border-[#229388] bg-white items-center justify-center z-10">
                    <div className="w-[6px] h-[6px] rounded-full bg-[#229388]" />
                  </div>

                  <div className={`md:hidden flex items-center gap-3 mb-3 w-full ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-2 h-2 rounded-full bg-[#229388]" />
                    <div className="h-px flex-1 bg-[#229388]/20" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="bg-white py-28 border-t border-[#e2e8f0]">
        <div className="container mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-5 h-px bg-[#229388]" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#229388]">{t.about.pillars.badge}</span>
              <div className="w-5 h-px bg-[#229388]" />
            </div>
            <h2 className="font-bold mb-4" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,44px)", color: "#111827", letterSpacing: "-0.025em" }}>
              {t.about.pillars.title}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((p) => (
              <div
                key={p.title}
                className={`bg-white rounded-2xl p-8 border border-[#e2e8f0] hover:border-[#229388]/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${lang === 'ar' ? 'text-right' : ''}`}
                style={{ boxShadow: "0 2px 16px rgba(34,147,136,0.04)" }}
              >
                <div className="text-4xl mb-5">{p.icon}</div>
                <h3 className="font-bold text-[#111827] text-[17px] mb-3" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif' }}>{p.title}</h3>
                <p className="text-[13px] text-[#64748b] leading-[1.75] font-light">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section
        className={`py-20 px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8 ${lang === 'ar' ? 'md:flex-row-reverse' : ''}`}
        style={{ background: "linear-gradient(135deg,#1a7a70 0%,#229388 50%,#3ec8ba 100%)" }}
      >
        <h2 className={`font-bold text-white leading-tight max-w-xl ${lang === 'ar' ? 'text-right' : ''}`} style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(24px,3vw,42px)", letterSpacing: "-0.025em" }}>
          {t.about.cta.title}
        </h2>
        <button
          onClick={() => setModalOpen(true)}
          className="flex-shrink-0 bg-white font-semibold text-[13px] tracking-[0.08em] uppercase px-10 py-4 rounded-full transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-md"
          style={{ color: "#229388" }}
        >
          {t.about.cta.button}
        </button>
      </section>

      <Footer />
      </>
    </PageWrapper>
  );
}
