"use client";

import { useState } from "react";
import Navbar from "@/components/sections/navbar";
import Footer from "@/components/sections/footer";
import ContactModal from "@/components/sections/contact-modal";
import PageWrapper from "@/components/ui/page-wrapper";
import { useLanguage } from "@/context/LanguageContext";

export default function InnovationsPage() {
  const { lang, t } = useLanguage();
  const [modalOpen, setModalOpen] = useState(false);

  const stats = [
    { num: "40", unit: "+", label: lang === 'ar' ? "مشاريع بحث وتطوير نشطة" : "Active R&D projects" },
    { num: "12", unit: "+", label: lang === 'ar' ? "براءات اختراع مسجلة" : "Patents filed" },
    { num: "Vision", unit: " 2030", label: lang === 'ar' ? "توافق استراتيجي" : "Strategic alignment" },
    { num: "3", unit: "x", label: lang === 'ar' ? "سرعة الابتكار مقابل السوق" : "Innovation velocity vs. market" },
  ];

  const services = [
    { num: "01", title: lang === 'ar' ? "الذكاء الاصطناعي" : "Artificial Intelligence", desc: lang === 'ar' ? "نماذج لغوية كبيرة ورؤية حاسوبية وتحليلات تنبؤية مصممة خصيصاً للغة العربية وسياقات قطاع الشرق الأوسط وشمال أفريقيا." : "Large language models, computer vision, and predictive analytics custom-built for Arabic language and MENA sector contexts." },
    { num: "02", title: lang === 'ar' ? "منصة المدن الذكية" : "Smart Cities Platform", desc: lang === 'ar' ? "مجموعة ذكاء حضري متكاملة تربط أجهزة استشعار إنترنت الأشياء وبيانات التنقل والخدمات البلدية في نظام تشغيل مدينة موحد." : "Integrated urban intelligence stack connecting IoT sensors, mobility data, and municipal services into a unified city OS." },
    { num: "03", title: lang === 'ar' ? "الاستعداد الكمي" : "Quantum Readiness", desc: lang === 'ar' ? "تقييم التشفير الآمن كمياً وخارطة طريق للهجرة لحماية المنظمات قبل نقطة تحول الحوسبة الكمية." : "Quantum-safe cryptography assessment and migration roadmap to protect organizations ahead of the quantum computing inflection point." },
    { num: "04", title: lang === 'ar' ? "التوأم الرقمي" : "Digital Twin", desc: lang === 'ar' ? "محاكاة عالية الدقة للأصول المادية - المصانع والمجمعات والشبكات - مما يمكن من العمليات التنبؤية وتخطيط السيناريوهات." : "High-fidelity simulation of physical assets — factories, campuses, grids — enabling predictive operations and scenario planning." },
    { num: "05", title: lang === 'ar' ? "الواقع الممتد (XR)" : "Extended Reality (XR)", desc: lang === 'ar' ? "بيئات تدريب AR/VR ومنصات تعاون عن بعد وأماكن عمل رقمية غامرة للمؤسسات والحكومة." : "AR/VR training environments, remote collaboration platforms, and immersive digital workplaces for enterprise and government." },
    { num: "06", title: lang === 'ar' ? "استشارات التقنيات الناشئة" : "Emerging Tech Advisory", desc: lang === 'ar' ? "رادار تكنولوجي على مستوى مجلس الإدارة ومعايير تنافسية ورسم خرائط طريق استراتيجية لإبقاء القيادة في طليعة الابتكار." : "Board-level technology radar, competitive benchmarking, and strategic roadmapping to keep leadership ahead of disruption." },
  ];

  const specs = [
    { name: lang === 'ar' ? "نماذج الذكاء الاصطناعي المنشورة" : "AI Models Deployed", val: "20+" },
    { name: lang === 'ar' ? "بيانات معالجة يومياً" : "Data Processed Daily", val: "50 TB" },
    { name: lang === 'ar' ? "اللغات المدعومة" : "Languages Supported", val: lang === 'ar' ? "العربية + الإنجليزية" : "Arabic + EN" },
    { name: lang === 'ar' ? "منصات السحاب" : "Cloud Platforms", val: lang === 'ar' ? "سحاب متعدد" : "Multi-cloud" },
    { name: lang === 'ar' ? "استثمار البحث والتطوير" : "R&D Investment", val: lang === 'ar' ? "15% من الإيرادات" : "15% Revenue" },
    { name: lang === 'ar' ? "براءات الاختراع" : "Patents Filed", val: "12+" },
    { name: lang === 'ar' ? "رؤية 2030" : "Vision 2030", val: lang === 'ar' ? "متوافقة" : "Aligned" },
    { name: lang === 'ar' ? "شبكة الشركاء" : "Partner Network", val: lang === 'ar' ? "عالمية" : "Global" },
  ];

  return (
    <>
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
      <Navbar />
      <PageWrapper>

      {/* HERO */}
      <section className="relative min-h-[92vh] flex flex-col justify-end overflow-hidden bg-white pt-20">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(rgba(34,147,136,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(34,147,136,0.06) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
            maskImage: "radial-gradient(ellipse 80% 70% at 50% 0%, black 30%, transparent 80%)",
          }}
        />
        <div className="absolute pointer-events-none" style={{ top: "-5%", left: "50%", transform: "translateX(-50%)", width: "860px", height: "500px", background: "radial-gradient(ellipse at center, rgba(34,147,136,0.09) 0%, transparent 65%)" }} />
        <div className="absolute inset-0 pointer-events-none">
          <svg viewBox="0 0 1440 860" fill="none" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
            <circle cx="250" cy="200" r="5" fill="rgba(34,147,136,0.4)"/>
            <circle cx="500" cy="320" r="5" fill="rgba(34,147,136,0.5)"/>
            <circle cx="380" cy="480" r="5" fill="rgba(34,147,136,0.35)"/>
            <circle cx="1190" cy="200" r="5" fill="rgba(34,147,136,0.4)"/>
            <circle cx="940" cy="320" r="5" fill="rgba(34,147,136,0.5)"/>
            <circle cx="1060" cy="480" r="5" fill="rgba(34,147,136,0.35)"/>
            <line x1="250" y1="200" x2="500" y2="320" stroke="rgba(34,147,136,0.14)" strokeWidth="1"/>
            <line x1="500" y1="320" x2="380" y2="480" stroke="rgba(34,147,136,0.14)" strokeWidth="1"/>
            <line x1="250" y1="200" x2="380" y2="480" stroke="rgba(34,147,136,0.09)" strokeWidth="1"/>
            <line x1="1190" y1="200" x2="940" y2="320" stroke="rgba(34,147,136,0.14)" strokeWidth="1"/>
            <line x1="940" y1="320" x2="1060" y2="480" stroke="rgba(34,147,136,0.14)" strokeWidth="1"/>
            <line x1="1190" y1="200" x2="1060" y2="480" stroke="rgba(34,147,136,0.09)" strokeWidth="1"/>
          </svg>
        </div>

        <div className="container mx-auto px-6 md:px-8 pb-20 relative z-10">
          <div className={`flex items-center gap-3 mb-3 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
            <div className="w-6 h-px bg-[#229388]" />
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#229388]">Service</span>
          </div>
          <h2 className={`font-bold text-foreground mb-7 ${lang === 'ar' ? 'text-right' : ''}`} style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,4vw,42px)", letterSpacing: "-0.02em", color: "#111827" }}>
            {t.services.innovations}
          </h2>
          <h1
            className={`font-bold leading-[0.95] tracking-tight mb-10 ${lang === 'ar' ? 'text-right' : ''}`}
            style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(52px,8vw,96px)", color: "#111827", letterSpacing: "-0.03em" }}
          >
            {lang === 'ar' ? (
              <>تكنولوجيا<br /> <span style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>تصيغ</span><br />المستقبل.</>
            ) : (
              <>Technology<br /> <span style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>That Shapes</span><br />Tomorrow.</>
            )}
          </h1>
          <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-8 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
            <p className={`text-[17px] text-[#64748b] leading-[1.75] max-w-[420px] font-light ${lang === 'ar' ? 'text-right' : ''}`}>
              {lang === 'ar' ? "قسم الابتكارات في لوميرون هو محرك المملكة المخصص للتكنولوجيا الناشئة - حيث يترجم الاختراقات العالمية في الذكاء الاصطناعي والكم والواقع الممتد إلى ميزة تنافسية ملموسة للمؤسسات السعودية." : "Lumeron's innovations division is the Kingdom's dedicated engine for emerging technology — translating global breakthroughs in AI, quantum, and XR into tangible competitive advantage for Saudi enterprises."}
            </p>
            <div className="flex gap-4 flex-shrink-0">
              <button onClick={() => setModalOpen(true)} className="btn-primary text-[14px] px-8 py-3.5">{t.about.hero.cta1}</button>
              <a href="#services" className="btn-outline text-[14px] px-8 py-3.5">{lang === 'ar' ? "خدماتنا" : "Our Services"}</a>
            </div>
          </div>
        </div>

        <div className={`absolute bottom-10 ${lang === 'ar' ? 'left-10' : 'right-10'} flex flex-col items-center gap-2 z-10`}>
          <div className="w-px h-14" style={{ background: "linear-gradient(to bottom, #229388, transparent)", animation: "pulse 2s ease-in-out infinite" }} />
          <span className="text-[10px] tracking-[0.15em] uppercase text-[#94a3b8]" style={{ writingMode: "vertical-rl" }}>{lang === 'ar' ? "اسحب لأسفل" : "Scroll"}</span>
        </div>
      </section>

      {/* STATS BAR */}
      <div className="border-y border-[#e2e8f0] bg-white grid grid-cols-2 lg:grid-cols-4 shadow-sm">
        {stats.map((s) => (
          <div key={s.label} className="px-10 py-10 border-r border-[#e2e8f0] last:border-r-0">
            <div className={`font-bold leading-none mb-2 ${lang === 'ar' ? 'text-right' : ''}`} style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,46px)", color: "#111827", letterSpacing: "-0.02em" }}>
              {s.num}<span className="text-[#229388]" style={{ fontSize: "0.55em" }}>{s.unit}</span>
            </div>
            <div className={`text-[12px] font-medium tracking-[0.07em] uppercase text-[#94a3b8] ${lang === 'ar' ? 'text-right' : ''}`}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ABOUT */}
      <section id="about" className="bg-white py-32">
        <div className={`container mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-20 items-center ${lang === 'ar' ? 'dir-rtl' : ''}`}>
          <div className={lang === 'ar' ? 'text-right' : ''}>
            <div className={`flex items-center gap-3 mb-5 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
              <div className="w-5 h-px bg-[#229388]" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#229388]">{lang === 'ar' ? "عن هذه الخدمة" : "About This Service"}</span>
            </div>
            <h2 className="font-bold leading-tight mb-8" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,48px)", color: "#111827", letterSpacing: "-0.025em" }}>
              {lang === 'ar' ? "شريك التكنولوجيا الناشئة في المملكة" : "Saudi Arabia's emerging technology partner"}
            </h2>
            <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-6">
              {lang === 'ar' ? "من حلول الذكاء الاصطناعي التي تفهم الفروق الثقافية العربية إلى التشفير المقاوم للكم المصمم لعصر ما بعد الحوسبة التقليدية، يعمل فريق الابتكارات في لوميرون حيث تلتقي تكنولوجيا اليوم بمتطلبات الغد." : "From AI solutions that understand Arabic cultural nuance to quantum-resistant cryptography designed for the post-classical era, Lumeron's innovations team works where today's technology meets tomorrow's requirements."}
            </p>
            <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-10">
              {lang === 'ar' ? "نحن نعمل جنباً إلى جنب مع نيوم وشركات محفظة صندوق الاستثمارات العامة والوزارات الحكومية لتطوير ونشر الحلول التي تدفع أهداف رؤية 2030 مباشرة." : "We work alongside NEOM, PIF portfolio companies, and government ministries to co-develop and deploy solutions that directly advance Vision 2030 objectives."}
            </p>
            <button onClick={() => setModalOpen(true)} className="btn-primary text-[14px]">{lang === 'ar' ? "ابدأ محادثة" : "Start a Conversation"}</button>
          </div>
          <div className="relative">
            <div className="rounded-2xl overflow-hidden border border-[#e2e8f0] shadow-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#f0fdfc 0%,#f8fafc 100%)", aspectRatio: "4/3" }}>
              <svg viewBox="0 0 400 320" fill="none" className="w-4/5 h-4/5">
                {[80, 140, 200, 260].map((y) => (
                  <circle key={`l1-${y}`} cx="80" cy={y} r="12" fill="rgba(34,147,136,0.12)" stroke="rgba(34,147,136,0.4)" strokeWidth="1.5"/>
                ))}
                {[100, 175, 250].map((y) => (
                  <circle key={`l2-${y}`} cx="200" cy={y} r="14" fill="rgba(34,147,136,0.18)" stroke="rgba(34,147,136,0.5)" strokeWidth="1.5"/>
                ))}
                {[140, 210].map((y) => (
                  <circle key={`l3-${y}`} cx="320" cy={y} r="16" fill="rgba(34,147,136,0.22)" stroke="#229388" strokeWidth="2"/>
                ))}
                {[80, 140, 200, 260].map((y1) => [100, 175, 250].map((y2) => (
                  <line key={`${y1}-${y2}`} x1="92" y1={y1} x2="186" y2={y2} stroke="rgba(34,147,136,0.12)" strokeWidth="1"/>
                )))}
                {[100, 175, 250].map((y1) => [140, 210].map((y2) => (
                  <line key={`${y1}-${y2}-r`} x1="214" y1={y1} x2="304" y2={y2} stroke="rgba(34,147,136,0.18)" strokeWidth="1"/>
                )))}
              </svg>
              <div className={`absolute -bottom-4 ${lang === 'ar' ? '-right-4' : '-left-4'} text-white rounded-xl px-5 py-4 shadow-lg`} style={{ background: "linear-gradient(135deg,#229388,#3ec8ba)" }}>
                <div className="font-bold text-2xl leading-none" style={{ fontFamily: '"Avenir Next Arabic",sans-serif' }}>2030</div>
                <div className="text-[11px] mt-1 opacity-90 tracking-wide">{lang === 'ar' ? "متوافق مع الرؤية" : "Vision Aligned"}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES — bento mosaic */}
      <section id="services" className="py-28 relative overflow-hidden" style={{ background: "#f8fafc" }}>
        <div className="container mx-auto px-6 md:px-8">
          <div className={`flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 ${lang === 'ar' ? 'lg:flex-row-reverse text-right' : ''}`}>
            <div>
              <div className={`flex items-center gap-3 mb-4 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                <div className="w-5 h-px bg-[#229388]" />
                <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#229388]">{lang === 'ar' ? "ما نقدمه" : "What We Offer"}</span>
              </div>
              <h2 className="font-bold leading-tight" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,44px)", color: "#111827", letterSpacing: "-0.025em", maxWidth: "480px" }}>
                {lang === 'ar' ? "تكنولوجيا ناشئة، قابلة للنشر" : "Emerging technology, made deployable"}
              </h2>
            </div>
            <p className="text-[15px] text-[#64748b] leading-[1.7] max-w-[360px] font-light">
              {lang === 'ar' ? "نحن نسد الفجوة بين الأبحاث والإنتاج - نأخذ التقنيات الرائدة من إثبات المفهوم إلى النشر على مستوى المؤسسة." : "We bridge the gap between research and production — taking frontier technologies from proof-of-concept to enterprise-scale deployment."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {services.map((s, i) => {
              const tags = [
                ["LLM", "Arabic NLP", "Vision AI"],
                ["IoT", "Urban OS", "Mobility"],
                ["Post-Quantum", "Crypto", "Migration"],
                ["Simulation", "Industrial", "Predictive"],
                ["AR/VR", "Metaverse", "Training"],
                ["Strategy", "Radar", "Advisory"],
              ];
              const nodeCounts = [4, 3, 5, 3, 4, 3];
              const isWide = i === 0;
              return (
                <div
                  key={s.num}
                  className={`group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 ${isWide ? "lg:col-span-2" : ""} ${lang === 'ar' ? 'text-right' : ''}`}
                  style={{
                    background: "white",
                    boxShadow: "0 2px 16px rgba(34,147,136,0.06)",
                    border: "1px solid rgba(34,147,136,0.15)",
                  }}
                >
                  <div className="h-1 w-full" style={{ background: "linear-gradient(90deg,#229388,#3ec8ba)" }} />

                  <div className={`absolute top-0 ${lang === 'ar' ? 'left-0 rotate-180' : 'right-0'} w-32 h-32 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500`}>
                    <svg viewBox="0 0 128 128" fill="none" className="w-full h-full">
                      {Array.from({ length: nodeCounts[i] }).map((_, j) => {
                        const cx = 20 + j * 24;
                        const cy = 20 + (j % 2) * 30;
                        const nx = cx + 20;
                        const ny = cy + 25;
                        return (
                          <g key={j}>
                            <circle cx={cx} cy={cy} r="5" fill="#229388" />
                            {j < nodeCounts[i] - 1 && <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#3ec8ba" strokeWidth="1" />}
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  <div className="p-8 relative z-10">
                    <div className={`flex items-center gap-3 mb-4 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <span className="text-[11px] font-bold tracking-[0.18em] text-[#229388]">{s.num}</span>
                      <div className="h-px flex-1" style={{ background: "rgba(34,147,136,0.15)" }} />
                    </div>
                    <h3 className="font-bold text-[#111827] mb-3 leading-snug" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: isWide ? "clamp(20px,2vw,26px)" : "18px" }}>{s.title}</h3>
                    <p className="text-[13px] text-[#64748b] leading-[1.75] font-light mb-6">{s.desc}</p>
                    <div className={`flex flex-wrap gap-2 ${lang === 'ar' ? 'justify-end' : ''}`}>
                      {tags[i]?.map((tag) => (
                        <span key={tag} className="text-[10px] font-semibold tracking-[0.1em] uppercase px-3 py-1 rounded-full" style={{ background: "rgba(34,147,136,0.07)", color: "#229388", border: "1px solid rgba(34,147,136,0.15)" }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="py-32 bg-white">
        <div className={`container mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-24 items-center ${lang === 'ar' ? 'dir-rtl' : ''}`}>
          <div className={lang === 'ar' ? 'text-right' : ''}>
            <div className={`flex items-center gap-3 mb-5 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
              <div className="w-5 h-px bg-[#229388]" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#229388]">{lang === 'ar' ? "منهجيتنا" : "Our Methodology"}</span>
            </div>
            <h2 className="font-bold leading-tight mb-6" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,44px)", color: "#111827", letterSpacing: "-0.025em" }}>
              {lang === 'ar' ? "من البحث إلى الواقع" : "From research to reality"}
            </h2>
            <p className="text-[16px] text-[#64748b] leading-[1.8] font-light mb-10">
              {lang === 'ar' ? "تتحرك خطوط الابتكار لدينا من خلال مراحل منظمة: اكتشاف التكنولوجيا، تقييم جدوى السوق السعودي، النشر التجريبي، والتكامل الكامل - مع فرق هندسية مخصصة في كل خطوة." : "Our innovation pipeline moves through structured stages: technology scouting, Saudi market viability assessment, pilot deployment, and full-scale integration — with dedicated engineering squads at each step."}
            </p>
            <ul className="flex flex-col divide-y divide-[#e2e8f0]">
              {(lang === 'ar' ? ["فرق هندسة AI/ML مخصصة", "ضبط النماذج اللغوية الكبيرة باللغة العربية", "خبرة في مشاريع نيوم وصندوق الاستثمارات العامة", "خرائط طريق للهجرة الآمنة كمياً", "بيئات إنتاج XR", "توافق استراتيجي مع رؤية 2030"] : ["Dedicated AI/ML engineering teams","Arabic NLP and LLM fine-tuning","NEOM & PIF project experience","Quantum-safe migration roadmaps","XR production environments","Vision 2030 strategic alignment"]).map((item) => (
                <li key={item} className={`flex items-center gap-4 py-4 text-[14px] text-[#111827] font-medium ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                  <span className="w-2 h-2 rounded-full bg-[#229388] flex-shrink-0" />{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-[#e2e8f0] shadow-lg relative overflow-hidden" style={{ aspectRatio: "1", background: "linear-gradient(145deg,#f0fdfc 0%,#f8fafc 50%,#edfaf9 100%)" }}>
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(34,147,136,0.06) 1px, transparent 1px)", backgroundSize: "22px 22px" }} />
            <svg viewBox="0 0 360 380" fill="none" className="w-full h-full relative z-10">
              <defs>
                <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#3ec8ba" stopOpacity="0.4"/>
                  <stop offset="100%" stopColor="#3ec8ba" stopOpacity="0"/>
                </radialGradient>
              </defs>

              {[70, 120, 170, 220, 270].map((y, i) => (
                <g key={`l1-${y}`}>
                  <circle cx="60" cy={y} r="18" fill="url(#nodeGlow)">
                    <animate attributeName="r" values="14;20;14" dur={`${2+i*0.4}s`} repeatCount="indefinite"/>
                  </circle>
                  <circle cx="60" cy={y} r="9" fill="rgba(34,147,136,0.12)" stroke="rgba(34,147,136,0.4)" strokeWidth="1.5"/>
                  <circle cx="60" cy={y} r="4" fill="#229388">
                    <animate attributeName="opacity" values="1;0.4;1" dur={`${1.5+i*0.3}s`} repeatCount="indefinite"/>
                  </circle>
                </g>
              ))}

              {[95, 155, 210, 265].map((y, i) => (
                <g key={`l2-${y}`}>
                  <circle cx="150" cy={y} r="20" fill="url(#nodeGlow)">
                    <animate attributeName="r" values="15;22;15" dur={`${2.2+i*0.35}s`} repeatCount="indefinite"/>
                  </circle>
                  <circle cx="150" cy={y} r="10" fill="rgba(34,147,136,0.15)" stroke="rgba(34,147,136,0.5)" strokeWidth="1.5"/>
                  <circle cx="150" cy={y} r="5" fill="#229388">
                    <animate attributeName="opacity" values="0.8;0.3;0.8" dur={`${1.8+i*0.25}s`} repeatCount="indefinite"/>
                  </circle>
                </g>
              ))}

              {[110, 175, 240].map((y, i) => (
                <g key={`l3-${y}`}>
                  <circle cx="240" cy={y} r="22" fill="url(#nodeGlow)">
                    <animate attributeName="r" values="16;24;16" dur={`${2.4+i*0.4}s`} repeatCount="indefinite"/>
                  </circle>
                  <circle cx="240" cy={y} r="11" fill="rgba(34,147,136,0.18)" stroke="#229388" strokeWidth="1.5"/>
                  <circle cx="240" cy={y} r="5" fill="#3ec8ba">
                    <animate attributeName="opacity" values="1;0.35;1" dur={`${2+i*0.3}s`} repeatCount="indefinite"/>
                  </circle>
                </g>
              ))}

              {[140, 210].map((y, i) => (
                <g key={`l4-${y}`}>
                  <circle cx="320" cy={y} r="24" fill="url(#nodeGlow)">
                    <animate attributeName="r" values="18;28;18" dur={`${2.6+i*0.5}s`} repeatCount="indefinite"/>
                  </circle>
                  <circle cx="320" cy={y} r="13" fill="rgba(34,147,136,0.22)" stroke="#229388" strokeWidth="2"/>
                  <circle cx="320" cy={y} r="6" fill="#229388">
                    <animate attributeName="opacity" values="1;0.5;1" dur={`${1.4+i*0.4}s`} repeatCount="indefinite"/>
                  </circle>
                </g>
              ))}

              {[70,120,170,220,270].map((y1) => [95,155,210,265].map((y2) => (
                <line key={`${y1}-${y2}`} x1="69" y1={y1} x2="140" y2={y2} stroke="rgba(34,147,136,0.12)" strokeWidth="1" strokeDasharray="4 3">
                  <animate attributeName="stroke-dashoffset" values="14;0" dur={`${1.2+Math.abs(y1-y2)*0.003}s`} repeatCount="indefinite"/>
                </line>
              )))}

              {[95,155,210,265].map((y1) => [110,175,240].map((y2) => (
                <line key={`${y1}-${y2}-m`} x1="160" y1={y1} x2="229" y2={y2} stroke="rgba(34,147,136,0.15)" strokeWidth="1" strokeDasharray="4 3">
                  <animate attributeName="stroke-dashoffset" values="14;0" dur={`${1+Math.abs(y1-y2)*0.003}s`} repeatCount="indefinite"/>
                </line>
              )))}

              {[110,175,240].map((y1) => [140,210].map((y2) => (
                <line key={`${y1}-${y2}-r`} x1="251" y1={y1} x2="307" y2={y2} stroke="rgba(34,147,136,0.2)" strokeWidth="1.2" strokeDasharray="4 3">
                  <animate attributeName="stroke-dashoffset" values="14;0" dur={`${0.9+Math.abs(y1-y2)*0.003}s`} repeatCount="indefinite"/>
                </line>
              )))}

                <text x="60" y="308" textAnchor="middle" fontSize="7.5" fill="#94a3b8" fontWeight="600" letterSpacing="0.5">{lang === 'ar' ? "مدخلات" : "INPUT"}</text>
                <text x="150" y="308" textAnchor="middle" fontSize="7.5" fill="#94a3b8" fontWeight="600" letterSpacing="0.5">{lang === 'ar' ? "مخفي" : "HIDDEN"}</text>
                <text x="240" y="285" textAnchor="middle" fontSize="7.5" fill="#94a3b8" fontWeight="600" letterSpacing="0.5">{lang === 'ar' ? "مخفي" : "HIDDEN"}</text>
                <text x="320" y="255" textAnchor="middle" fontSize="7.5" fill="#229388" fontWeight="700" letterSpacing="0.5">{lang === 'ar' ? "مخرجات" : "OUTPUT"}</text>

                <rect x="80" y="320" width="200" height="26" rx="5" fill="rgba(34,147,136,0.1)" stroke="rgba(34,147,136,0.3)" strokeWidth="1"/>
                <circle cx="97" cy="333" r="4" fill="#229388"><animate attributeName="opacity" values="1;0.3;1" dur="1.4s" repeatCount="indefinite"/></circle>
                <text x="108" y="337" fontSize="8.5" fill="#229388" fontWeight="700" letterSpacing="0.6">{lang === 'ar' ? "نموذج لغوي عربي — الاستنتاج نشط" : "ARABIC LLM — INFERENCE ACTIVE"}</text>
            </svg>
          </div>
        </div>
      </section>

      {/* SPECS */}
      <section className="py-28 bg-[#f8fafc] border-t border-[#e2e8f0]">
        <div className="container mx-auto px-6 md:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-5 h-px bg-[#229388]" />
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#229388]">{lang === 'ar' ? "القدرات في لمحة" : "Capabilities at a Glance"}</span>
              <div className="w-5 h-px bg-[#229388]" />
            </div>
            <h2 className="font-bold mb-4" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(28px,3.5vw,44px)", color: "#111827", letterSpacing: "-0.025em" }}>
              {lang === 'ar' ? "الابتكار بالأرقام" : "Innovation by the numbers"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto" style={{ border: "1px solid rgba(34,147,136,0.18)", gap: "1px", background: "rgba(34,147,136,0.12)", boxShadow: "0 4px 24px rgba(34,147,136,0.06)" }}>
            {specs.map((r) => (
              <div key={r.name} className={`bg-white px-10 py-7 flex justify-between items-center hover:bg-[#f0fdfc] transition-colors duration-200 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                <span className="text-[12px] font-bold tracking-[0.07em] uppercase text-[#94a3b8]">{r.name}</span>
                <span className="font-semibold text-[20px] text-[#111827]" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', letterSpacing: "-0.01em" }}>{r.val}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className={`py-20 px-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-8 ${lang === 'ar' ? 'md:flex-row-reverse' : ''}`} style={{ background: "linear-gradient(135deg,#1a7a70 0%,#229388 50%,#3ec8ba 100%)" }}>
        <h2 className={`font-bold text-white leading-tight max-w-xl ${lang === 'ar' ? 'text-right' : ''}`} style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', fontSize: "clamp(24px,3vw,42px)", letterSpacing: "-0.025em" }}>
          {lang === 'ar' ? "جاهز لنشر تكنولوجيا الغد اليوم؟" : "Ready to deploy tomorrow's technology today?"}
        </h2>
        <button onClick={() => setModalOpen(true)} className="flex-shrink-0 bg-white font-semibold text-[13px] tracking-[0.08em] uppercase px-10 py-4 rounded-full transition-all hover:opacity-90 hover:-translate-y-0.5 shadow-md" style={{ color: "#229388" }}>
          {t.about.cta.button}
        </button>
      </section>

      <Footer />
      </PageWrapper>
    </>
  );
}
