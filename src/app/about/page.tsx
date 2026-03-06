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

  const timeline = [
    {
      year: "2016",
      title: lang === 'ar' ? "تأسست تحت مجموعة ماسكو" : "Founded under MASCO Group",
      desc: lang === 'ar' ? "تأسست لوميرون كذراع تكنولوجي لماسكو للطاقة، مكلفة ببناء العمود الفقري الرقمي للعمليات الصناعية والطاقة للمجموعة." : "Lumeron was established as the technology arm of MASCO Energy, tasked with building the digital backbone for the Group's industrial and energy operations.",
    },
    {
      year: "2018",
      title: lang === 'ar' ? "أول مركز بيانات فائق النطاق" : "First Hyperscale Data Center",
      desc: lang === 'ar' ? "تشغيل أول مركز بيانات سيادي من فئة ماسكو في المملكة، وتقديم بنية تحتية من المستوى الثالث+ لعملاء الحكومة والشركات في دول مجلس التعاون الخليجي." : "Commissioned the Kingdom's first MASCO-grade sovereign data center, delivering Tier III+ infrastructure to government and enterprise clients across the GCC.",
    },
    {
      year: "2020",
      title: lang === 'ar' ? "مركز التميز للأمن السيبراني" : "Cybersecurity Center of Excellence",
      desc: lang === 'ar' ? "إطلاق مركز عمليات أمنية (SOC) مخصص يتماشى مع معايير الهيئة الوطنية للأمن السيبراني وهيئة الاتصالات، مما يوفر مراقبة للتهديدات على مدار الساعة طوال أيام الأسبوع." : "Launched a dedicated SOC aligned with NCA and CITC standards, providing 24/7 threat monitoring and incident response for critical national infrastructure.",
    },
    {
      year: "2022",
      title: lang === 'ar' ? "شريك استراتيجي لرؤية 2030" : "Vision 2030 Strategic Partner",
      desc: lang === 'ar' ? "تم تعيينها رسمياً كشريك تكنولوجي مفضل لبرامج رؤية 2030، ودعم نيوم، وكيانات محفظة صندوق الاستثمارات العامة، والوزارات الحكومية الرئيسية." : "Formally designated as a preferred technology partner for Vision 2030 programmes, supporting NEOM, PIF portfolio entities, and key government ministries.",
    },
    {
      year: "2023",
      title: lang === 'ar' ? "قسم الابتكارات والذكاء الاصطناعي" : "Innovations & AI Division",
      desc: lang === 'ar' ? "تأسيس قسم الابتكارات، ونشر نماذج لغوية كبيرة باللغة العربية، ومنصات التوأم الرقمي، وتقييمات الاستعداد الكمي عبر المؤسسات السعودية." : "Established the Innovations division, deploying Arabic-language LLMs, digital twin platforms, and quantum-readiness assessments across Saudi enterprises.",
    },
    {
      year: "2024",
      title: lang === 'ar' ? "التوسع في منطقة الشرق الأوسط وشمال أفريقيا" : "MENA Expansion",
      desc: lang === 'ar' ? "توسيع الخدمات المدارة وعمليات الأمن السيبراني خارج المملكة العربية السعودية إلى البحرين والإمارات ومصر - لدعم التحول الرقمي الإقليمي على نطاق واسع." : "Extended managed services and cybersecurity operations beyond Saudi Arabia into Bahrain, UAE, and Egypt — supporting regional digital transformation at scale.",
    },
    {
      year: "2025",
      title: lang === 'ar' ? "الجيل القادم من البنية التحتية" : "Next Generation Infrastructure",
      desc: lang === 'ar' ? "البدء في إنشاء ثلاثة مجمعات جديدة فائقة النطاق مع مجموعات حوسبة ذكاء اصطناعي متكاملة، مما يعزز مكانة لوميرون كعمود فقري للسحابة السيادية في المملكة." : "Broke ground on three new hyperscale campuses with integrated AI compute clusters, reinforcing Lumeron's position as the Kingdom's sovereign cloud backbone.",
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

      {/* PILLARS */}
      <section className="bg-[#f8fafc] py-28 border-y border-[#e2e8f0]">
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

      {/* TIMELINE */}
      <section id="timeline" className="bg-white py-32">
        <div className="container mx-auto px-6 md:px-8">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-5 h-px bg-[#229388]" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#229388]">{t.about.journey.badge}</span>
              <div className="w-5 h-px bg-[#229388]" />
            </div>
            <h2 className="font-bold" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,44px)", color: "#111827", letterSpacing: "-0.025em" }}>
              {t.about.journey.title}
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block" style={{ background: "linear-gradient(to bottom, rgba(34,147,136,0.1), rgba(34,147,136,0.4) 30%, rgba(34,147,136,0.4) 70%, rgba(34,147,136,0.1))" }} />

            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div key={item.year} className={`relative flex flex-col md:flex-row items-start md:items-center mb-12 last:mb-0 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
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

      {/* ROADMAP */}
      <section className="py-32 bg-[#f8fafc] border-t border-[#e2e8f0]">
        <div className="container mx-auto px-6 md:px-8">
          <div className="text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-5 h-px bg-[#229388]" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#229388]">{lang === 'ar' ? 'خارطة الطريق' : 'Our Roadmap'}</span>
              <div className="w-5 h-px bg-[#229388]" />
            </div>
            <h2 className="font-bold mb-4" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,44px)", color: "#111827", letterSpacing: "-0.025em" }}>
              {lang === 'ar' ? 'مسيرة بناء المستقبل الرقمي' : 'Building tomorrow\'s digital foundation'}
            </h2>
            <p className="text-[15px] text-[#64748b] max-w-[480px] mx-auto leading-[1.7]">
              {lang === 'ar' ? 'خمس مراحل استراتيجية تُرسّخ ريادة لوميرون في البنية التحتية الرقمية السيادية.' : 'Five strategic phases cementing Lumeron\'s leadership in sovereign digital infrastructure.'}
            </p>
          </div>

          {/* Roadmap phases */}
          <div className="relative">
            {/* Horizontal connector line — desktop */}
            <div className="hidden lg:block absolute top-[52px] left-[10%] right-[10%] h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(34,147,136,0.25) 15%,rgba(34,147,136,0.4) 50%,rgba(34,147,136,0.25) 85%,transparent)" }} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-4 relative z-10">
              {[
                { phase: "01", years: "2016–2020", title: lang === 'ar' ? "التأسيس" : "Foundation", desc: lang === 'ar' ? "إرساء البنية التحتية وإطلاق الخدمات المدارة" : "Infrastructure establishment & managed services launch", active: false, done: true },
                { phase: "02", years: "2020–2022", title: lang === 'ar' ? "التوسع" : "Expansion", desc: lang === 'ar' ? "توسعة الأمن السيبراني ومراكز البيانات على نطاق واسع" : "Cybersecurity & data center scale-up across the GCC", active: false, done: true },
                { phase: "03", years: "2022–2024", title: lang === 'ar' ? "الابتكار" : "Innovation", desc: lang === 'ar' ? "إطلاق الذكاء الاصطناعي والرقمنة الصناعية" : "AI systems & Industrial Digitalization division launched", active: true, done: false },
                { phase: "04", years: "2024–2026", title: lang === 'ar' ? "الريادة" : "Leadership", desc: lang === 'ar' ? "البنية التحتية الذكية والتوافق مع رؤية 2030" : "Smart infrastructure & Vision 2030 alignment at scale", active: true, done: false },
                { phase: "05", years: "2026+", title: lang === 'ar' ? "السيادة" : "Sovereignty", desc: lang === 'ar' ? "منصة السيادة الرقمية الوطنية الكاملة" : "Full national digital sovereignty platform realised", active: false, done: false },
              ].map((p, i) => (
                <div key={p.phase} className={`flex flex-col items-center text-center group`}>
                  {/* Phase circle */}
                  <div
                    className="w-[52px] h-[52px] rounded-full flex items-center justify-center font-bold text-[15px] mb-5 relative z-10 transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
                    style={{
                      background: p.done
                        ? "linear-gradient(135deg,#229388,#3ec8ba)"
                        : p.active
                        ? "linear-gradient(135deg,#3ec8ba,#229388)"
                        : "white",
                      color: p.done || p.active ? "white" : "#94a3b8",
                      border: p.done || p.active ? "none" : "2px solid #e2e8f0",
                      boxShadow: p.active ? "0 0 0 6px rgba(34,147,136,0.12)" : p.done ? "0 4px 12px rgba(34,147,136,0.25)" : "none",
                      fontFamily: '"Avenir Next Arabic","Inter",sans-serif',
                    }}
                  >
                    {p.done ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    ) : p.phase}
                  </div>

                  {/* Card */}
                  <div
                    className="rounded-2xl p-5 w-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-lg"
                    style={{
                      background: p.active ? "white" : p.done ? "white" : "rgba(248,250,252,0.8)",
                      border: p.active ? "1px solid rgba(34,147,136,0.3)" : "1px solid #e2e8f0",
                      boxShadow: p.active ? "0 4px 20px rgba(34,147,136,0.1)" : "0 2px 8px rgba(0,0,0,0.04)",
                    }}
                  >
                    {p.active && (
                      <div className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded-full mb-3" style={{ background: "rgba(34,147,136,0.1)", color: "#229388" }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#229388] animate-pulse flex-shrink-0" />
                        {lang === 'ar' ? 'الآن' : 'Active'}
                      </div>
                    )}
                    <div className="text-[11px] font-bold text-[#229388] mb-1.5 tracking-[0.06em]">{p.years}</div>
                    <h3 className="font-bold text-[16px] text-[#111827] mb-2" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif' }}>{p.title}</h3>
                    <p className="text-[12px] text-[#64748b] leading-[1.7]">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
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
