"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const terms = [
  {
    label: "Colocation",
    href: "/services/data-centers",
    _quote:"Shared facilities, sovereign control",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="5" rx="1"/><rect x="2" y="10" width="20" height="5" rx="1"/><rect x="2" y="17" width="20" height="5" rx="1"/><circle cx="18" cy="5.5" r="1" fill="currentColor"/><circle cx="18" cy="12.5" r="1" fill="currentColor"/></svg>,
  },
  {
    label: "Hyperscale",
    href: "/services/data-centers",
    _quote:"Infinite scale, zero compromise",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>,
  },
  {
    label: "Virtualization",
    href: "/services/data-centers",
    _quote:"One platform, many worlds",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="9" height="9" rx="2"/><rect x="13" y="7" width="9" height="9" rx="2"/><path d="M7 7V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/></svg>,
  },
  {
    label: "Zero-Trust Architecture",
    href: "/services/cybersecurity",
    _quote:"Trust nothing, verify everything",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>,
  },
  {
    label: "SIEM",
    href: "/services/cybersecurity",
    _quote:"Every log tells a story",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  },
  {
    label: "Endpoint Detection & Response",
    href: "/services/cybersecurity",
    _quote:"Detect fast, respond faster",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
  },
  {
    label: "Digital Twin",
    href: "/services/industrial",
    _quote:"Mirror your world digitally",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  },
  {
    label: "SCADA Systems",
    href: "/services/industrial",
    _quote:"Industry running on intelligence",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>,
  },
  {
    label: "Predictive Maintenance",
    href: "/services/industrial",
    _quote:"Fix it before it breaks",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  },
  {
    label: "Neural Networks",
    href: "/services/ai",
    _quote:"Layers of learned intelligence",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><circle cx="4" cy="6" r="2"/><circle cx="20" cy="6" r="2"/><circle cx="4" cy="18" r="2"/><circle cx="20" cy="18" r="2"/><line x1="6" y1="6" x2="10" y2="10"/><line x1="18" y1="6" x2="14" y2="10"/><line x1="6" y1="18" x2="10" y2="14"/><line x1="18" y1="18" x2="14" y2="14"/></svg>,
  },
  {
    label: "Machine Learning Pipelines",
    href: "/services/ai",
    _quote:"Data in, decisions out",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3Z"/></svg>,
  },
  {
    label: "Natural Language Processing",
    href: "/services/ai",
    _quote:"Machines that understand Arabic",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  },
  {
    label: "Edge Computing",
    href: "/services/smart-infrastructure",
    _quote:"Process where data lives",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  },
  {
    label: "IoT Ecosystem",
    href: "/services/smart-infrastructure",
    _quote:"Everything connected, everything smart",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2"/><path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"/></svg>,
  },
  {
    label: "Low-Latency Networks",
    href: "/services/smart-infrastructure",
    _quote:"Speed measured in microseconds",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></svg>,
  },
  {
    label: "5G Network Slicing",
    href: "/services/smart-infrastructure",
    _quote:"One network, infinite possibilities",
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M10.28 16.17a6 6 0 0 1 3.44 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
  },
];

const arabicLabels: Record<string, string> = {
  Colocation: "الاستضافة المشتركة",
  Hyperscale: "البنية فائقة التوسع",
  Virtualization: "الافتراضية",
  "Zero-Trust Architecture": "معمارية انعدام الثقة",
  SIEM: "إدارة معلومات وأحداث الأمن",
  "Endpoint Detection & Response": "كشف واستجابة نقاط النهاية",
  "Digital Twin": "التوأم الرقمي",
  "SCADA Systems": "أنظمة سكادا",
  "Predictive Maintenance": "الصيانة التنبؤية",
  "Neural Networks": "الشبكات العصبية",
  "Machine Learning Pipelines": "خطوط تعلم الآلة",
  "Natural Language Processing": "معالجة اللغة الطبيعية",
  "Edge Computing": "الحوسبة الطرفية",
  "IoT Ecosystem": "منظومة إنترنت الأشياء",
  "Low-Latency Networks": "شبكات منخفضة الكمون",
  "5G Network Slicing": "تجزئة شبكة الجيل الخامس",
};

// 4 rows of 4
const rows = [
  terms.slice(0, 4),
  terms.slice(4, 8),
  terms.slice(8, 12),
  terms.slice(12, 16),
];

const variants = [
  { bg: "#1e8178", color: "#fff", border: "transparent" },
  { bg: "transparent", color: "#1e8178", border: "#1e8178" },
  { bg: "#d4ecea", color: "#1e8178", border: "transparent" },
];

const pattern = [
  [0, 1, 2, 1],
  [1, 2, 0, 2],
  [2, 0, 1, 0],
  [0, 2, 1, 2],
];

function Pill({ term, rowIndex, tagIndex }: { term: typeof terms[0]; rowIndex: number; tagIndex: number }) {
  const [hovered, setHovered] = useState(false);
  const v = variants[pattern[rowIndex % 4][tagIndex % 4]];

  return (
    <Link
      href={term.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="sliding-tags-pill inline-flex items-center gap-[10px] rounded-[100px] px-[24px] py-[13px] whitespace-nowrap no-underline select-none tracking-[0.01em] font-medium text-[0.95rem] cursor-pointer max-md:gap-[8px] max-md:px-[18px] max-md:py-[10px] max-md:text-[0.85rem]"
      style={{
        fontFamily: "'DM Sans','Inter',sans-serif",
        background: hovered ? "#1e8178" : v.bg,
        color: hovered ? "#fff" : v.color,
        border: `2px solid ${hovered ? "transparent" : v.border}`,
        boxShadow: hovered ? "0 8px 28px rgba(30,129,120,0.25)" : "0 2px 10px rgba(30,129,120,0.07)",
        transform: hovered ? "translateY(-3px) scale(1.04)" : "translateY(0) scale(1)",
        transition: "all 0.22s cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      <span
        className="sliding-tags-pill-icon flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full transition-all max-md:h-[26px] max-md:w-[26px]"
        style={{
        background: hovered ? "rgba(255,255,255,0.15)" : v.bg === "#1e8178" ? "rgba(255,255,255,0.15)" : v.bg === "#d4ecea" ? "rgba(30,129,120,0.12)" : "rgba(30,129,120,0.08)",
        color: hovered ? "#fff" : v.color,
        transition: "all 0.22s ease",
        }}
      >
        {term.icon}
      </span>

      <span className="whitespace-nowrap">{term.label}</span>
    </Link>
  );
}

export default function SlidingTagsSection() {
  const { lang } = useLanguage();
  const isAr = lang === "ar";
  const localizedTerms = terms.map((t) => ({
    ...t,
    label: isAr ? arabicLabels[t.label] ?? t.label : t.label,
  }));
  const localizedRows = [
    localizedTerms.slice(0, 4),
    localizedTerms.slice(4, 8),
    localizedTerms.slice(8, 12),
    localizedTerms.slice(12, 16),
  ];

  return (
    <>
      <style>{`
        .tags-row-ltr { animation: tagsSlideLTR 32s linear infinite; }
        .tags-row-rtl { animation: tagsSlideRTL 28s linear infinite; }
        .tags-row-ltr:nth-child(2) { animation-duration: 38s; }
        .tags-row-rtl:nth-child(4) { animation-duration: 26s; }
        @keyframes tagsSlideLTR { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
        @keyframes tagsSlideRTL { 0% { transform: translateX(-50%) } 100% { transform: translateX(0) } }
        .tags-wrapper:hover .tags-row-ltr,
        .tags-wrapper:hover .tags-row-rtl { animation-play-state: paused; }

        /* Keep desktop visuals identical; only scale down typography/padding on mobile. */
        .sliding-tags-section { background: #ffffff; overflow: hidden; font-family: 'DM Sans','Inter',sans-serif; padding: 80px 0 100px; }
        .sliding-tags-title { font-family: 'Syne','Avenir Next Arabic',sans-serif; font-size: clamp(2rem,5vw,3.2rem); font-weight: 700; color: #0d2e2c; letter-spacing: -0.03em; margin: 0 0 12px; line-height: 1.1; }
        .sliding-tags-subtitle { font-size: 1.05rem; color: #6b9e9a; margin: 0; font-weight: 400; }

        @media (max-width: 767px) {
          .sliding-tags-section { padding: 60px 0 72px; }
          .sliding-tags-title { font-size: clamp(1.7rem, 7vw, 2.3rem); margin-bottom: 10px; }
          .sliding-tags-subtitle { font-size: 0.98rem; }
        }
      `}</style>

      <section className="sliding-tags-section">
        {/* Header */}
        <div dir={isAr ? "rtl" : "ltr"} className="text-center mb-[56px] px-[24px] max-md:mb-[42px] max-md:px-[16px]">
          <h2 className="sliding-tags-title">
            {isAr ? (
              <>
                مبني على <span style={{ color: "#1e8178" }}>الذكاء</span>
              </>
            ) : (
              <>
                Built on <span style={{ color: "#1e8178" }}>Intelligence</span>
              </>
            )}
          </h2>
          <p className="sliding-tags-subtitle">
            {isAr
              ? "تقنيات أساسية تمكّن الجيل القادم من الأنظمة"
              : "Core technologies powering the next generation of systems"}
          </p>
        </div>

        {/* Rows */}
        <div dir="ltr" className="tags-wrapper relative flex flex-col gap-[14px] max-md:gap-[12px]">
          {/* Fade masks */}
          <div className="absolute left-0 top-0 bottom-0 z-[2] w-[140px] pointer-events-none bg-[linear-gradient(to_right,#fff_40%,transparent)] max-md:w-[70px]" />
          <div className="absolute right-0 top-0 bottom-0 z-[2] w-[140px] pointer-events-none bg-[linear-gradient(to_left,#fff_40%,transparent)] max-md:w-[70px]" />

          {localizedRows.map((row, rowIndex) => {
            const isRTL = rowIndex % 2 === 1;
            const repeated = [...row, ...row, ...row, ...row, ...row, ...row];
            return (
              <div
                key={rowIndex}
                className={`${isRTL ? "tags-row-rtl" : "tags-row-ltr"} flex w-max gap-[13px] py-[3px] max-md:gap-[10px] max-md:py-[2px]`}
              >
                {repeated.map((term, i) => (
                  <Pill key={`${term.label}-${i}`} term={term} rowIndex={rowIndex} tagIndex={i % row.length} />
                ))}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
