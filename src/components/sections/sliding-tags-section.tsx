"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

/* One icon per tag — shapes match the label (IIoT, SOC, GRC, etc.). */
const iconIIOT = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21V10l3-1v12M9 21V6l3-1.5L15 6v15M21 21V8l-3-1v14" />
    <circle cx="6" cy="4" r="1" fill="currentColor" />
    <path d="M6 5v2M3.5 9L6 7.5M8.5 9L6 7.5" />
    <circle cx="18" cy="4" r="1" />
    <path d="M18 5v2M15.5 7L18 5.5M20.5 7L18 5.5" />
  </svg>
);

const iconIndustrialExcellence = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6-4.6-6 4.6 2.3-7-6-4.6h7.4L12 2z" />
  </svg>
);

const iconDigitalTwin = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
    <path d="M7 9.5L12 12l5-2.5" strokeDasharray="2 2" />
  </svg>
);

const iconDataCenters = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="5" rx="1" />
    <rect x="2" y="10" width="20" height="5" rx="1" />
    <rect x="2" y="17" width="20" height="5" rx="1" />
    <circle cx="18" cy="5.5" r="1" fill="currentColor" />
    <circle cx="18" cy="12.5" r="1" fill="currentColor" />
  </svg>
);

const iconPredictiveMaintenance = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a4 4 0 0 0-6.4 4l-4.3 4.3a2 2 0 0 0 2.8 2.8l4.3-4.3a4 4 0 0 0 3.6-6.8z" />
    <path d="M20 4l-3 3" />
    <circle cx="20" cy="4" r="1" fill="currentColor" />
    <polyline points="3 17 7 13 11 15 21 5" />
  </svg>
);

const iconCybersecurity = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const iconSecurityOperationCenter = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="9" height="11" rx="1" />
    <rect x="13" y="3" width="9" height="6" rx="1" />
    <rect x="13" y="12" width="9" height="9" rx="1" />
    <path d="M4 16h5M4 19h5" />
    <circle cx="17.5" cy="6" r="0.5" fill="currentColor" />
    <path d="M15 17l2 2 4-4" />
  </svg>
);

const iconManagedServices = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1v-3h3v1z" />
    <path d="M3 19a2 2 0 0 0 2 2h1v-3H3v1z" />
    <path d="M12 12v6M9 15h6" />
  </svg>
);

const iconDigitalization = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="8" y="8" width="8" height="8" rx="1" />
    <path d="M4 4l4 4M16 16l4 4M4 20l4-4M20 4l-4 4" />
    <path d="M4 12h2M18 12h2M12 4v2M12 18v2" />
  </svg>
);

const iconSmartInfrastructure = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18" />
    <path d="M5 21V10l7-4 7 4v11" />
    <path d="M9 21v-4h6v4" />
    <path d="M12 2v3M8 4.5h8" />
    <path d="M17 4c0 1.5 2 1.5 2 0" />
    <path d="M5 6c0-1.2 1.5-1.2 1.5 0" />
  </svg>
);

const iconAugmentedReality = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 9V5h4M20 9V5h-4M4 15v4h4M20 15v4h-4" />
    <rect x="8" y="8" width="8" height="8" rx="1.5" strokeDasharray="3 2" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const iconRobotics = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v2" />
    <circle cx="12" cy="4" r="1" fill="currentColor" />
    <rect x="6" y="7" width="12" height="12" rx="2" />
    <circle cx="9.5" cy="12" r="1" fill="currentColor" />
    <circle cx="14.5" cy="12" r="1" fill="currentColor" />
    <path d="M9 16.5h6" />
    <path d="M6 10H4M18 10h2M6 18H4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2h-2" />
  </svg>
);

const iconArtificialIntelligence = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" rx="0.5" />
    <path d="M9 2v2M15 2v2M9 22v2M15 22v2M20 10v2M20 14v2M4 10v2M4 14v2M20 9h2M20 15h2M2 9h2M2 15h2" />
  </svg>
);

const iconDataAnalysis = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
    <path d="M3 20h18" />
  </svg>
);

const iconGRC = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v18" />
    <path d="M5 7h14" />
    <path d="M8 7l-2.5 7h5L8 7z" />
    <path d="M16 7l-2.5 7h5L16 7z" />
  </svg>
);

const iconCloudSecurity = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
    <rect x="10" y="15" width="4" height="5" rx="0.5" />
    <path d="M12 15v-2a2 2 0 0 1 4 0v2" />
  </svg>
);

const terms = [
  { label: "IIOT", href: "/services/industrial", _quote: "", icon: iconIIOT },
  { label: "Industrial Excellence", href: "/services/industrial", _quote: "", icon: iconIndustrialExcellence },
  { label: "Digital Twin", href: "/services/industrial", _quote: "", icon: iconDigitalTwin },
  { label: "Data Centers", href: "/services/data-centers", _quote: "", icon: iconDataCenters },
  { label: "Predictive Maintenance", href: "/services/industrial", _quote: "", icon: iconPredictiveMaintenance },
  { label: "Cybersecurity", href: "/services/cybersecurity", _quote: "", icon: iconCybersecurity },
  { label: "Security Operation Center", href: "/services/cybersecurity", _quote: "", icon: iconSecurityOperationCenter },
  { label: "Managed Services", href: "/services/managed-services", _quote: "", icon: iconManagedServices },
  { label: "Digitalization", href: "/services/industrial", _quote: "", icon: iconDigitalization },
  { label: "Smart Infrastructure", href: "/services/smart-infrastructure", _quote: "", icon: iconSmartInfrastructure },
  { label: "Augmented Reality", href: "/services/innovations", _quote: "", icon: iconAugmentedReality },
  { label: "Robotics", href: "/services/industrial", _quote: "", icon: iconRobotics },
  { label: "Artificial Intelligence", href: "/services/ai", _quote: "", icon: iconArtificialIntelligence },
  { label: "Data Analysis", href: "/services/ai", _quote: "", icon: iconDataAnalysis },
  { label: "GRC", href: "/services/cybersecurity", _quote: "", icon: iconGRC },
  { label: "Cloud Security", href: "/services/cybersecurity", _quote: "", icon: iconCloudSecurity },
];

const arabicLabels: Record<string, string> = {
  IIOT: "إنترنت الأشياء الصناعي",
  "Industrial Excellence": "التميز الصناعي",
  "Digital Twin": "التوأم الرقمي",
  "Data Centers": "مراكز البيانات",
  "Predictive Maintenance": "الصيانة التنبؤية",
  Cybersecurity: "الأمن السيبراني",
  "Security Operation Center": "مركز العمليات الأمنية",
  "Managed Services": "الخدمات المدارة",
  Digitalization: "الرقمنة",
  "Smart Infrastructure": "البنية التحتية الذكية",
  "Augmented Reality": "الواقع المعزز",
  Robotics: "الروبوتات",
  "Artificial Intelligence": "الذكاء الاصطناعي",
  "Data Analysis": "تحليل البيانات",
  GRC: "الحوكمة والمخاطر والامتثال",
  "Cloud Security": "أمن السحابة",
};

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
      className="sliding-tags-pill inline-flex items-center gap-[10px] rounded-[100px] px-[24px] py-[13px] whitespace-nowrap no-underline select-none tracking-[0.01em] font-medium text-[0.95rem] cursor-pointer max-md:gap-[7px] max-md:px-[14px] max-md:py-[9px] max-md:text-[0.78rem] max-md:leading-[1.15] max-md:text-center"
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
  const mobileTerms = localizedTerms.filter(
    (t) => t.label !== (isAr ? arabicLabels["Security Operation Center"] : "Security Operation Center") && t.label !== (isAr ? arabicLabels["Managed Services"] : "Managed Services")
  );
  const localizedRows = [
    localizedTerms.slice(0, 4),
    localizedTerms.slice(4, 8),
    localizedTerms.slice(8, 12),
    localizedTerms.slice(12, 16),
  ];
  const mobileRows = [
    mobileTerms.slice(0, 4),
    mobileTerms.slice(4, 8),
    mobileTerms.slice(8, 12),
    mobileTerms.slice(12, 16),
  ].filter((r) => r.length > 0);

  return (
    <>
      <style>{`
        @keyframes iconPulse {
          0%, 100% { transform: translateY(0) scale(1); opacity: 1; }
          50% { transform: translateY(-2px) scale(1.08); opacity: 0.88; }
        }
        .sliding-tags-pill-icon {
          animation: iconPulse 1.8s ease-in-out infinite;
          transform-origin: center;
        }

        /* Keep desktop visuals identical; only scale down typography/padding on mobile. */
        .sliding-tags-section { background: #ffffff; overflow: hidden; font-family: 'DM Sans','Inter',sans-serif; padding: 80px 0 100px; }
        .sliding-tags-title { font-family: 'Syne','Avenir Next Arabic',sans-serif; font-size: clamp(2rem,5vw,3.2rem); font-weight: 700; color: #0d2e2c; letter-spacing: -0.03em; margin: 0 0 12px; line-height: 1.1; }
        .sliding-tags-subtitle { font-size: 1.05rem; color: #6b9e9a; margin: 0; font-weight: 400; }

        @media (max-width: 767px) {
          .sliding-tags-section { padding: 40px 0 64px; }
          .sliding-tags-title { font-size: clamp(1.7rem, 7vw, 2.3rem); margin-bottom: 10px; }
          .sliding-tags-subtitle { font-size: 0.98rem; }
          .sliding-tags-pill-icon svg { width: 14px; height: 14px; }
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

        {/* Static 4 rows (desktop/tablet) */}
        <div dir="ltr" className="tags-wrapper relative hidden md:flex flex-col gap-[13px]">
          {localizedRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-wrap justify-center gap-[13px]">
              {row.map((term, tagIndex) => (
                <Pill
                  key={`${term.label}-${tagIndex}`}
                  term={term}
                  rowIndex={rowIndex}
                  tagIndex={tagIndex}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Mobile: keep previous row layout with smaller sizing */}
        <div dir="ltr" className="tags-wrapper relative md:hidden flex flex-col gap-[10px] px-[10px]">
          {mobileRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-wrap justify-center gap-[9px]">
              {row.map((term, tagIndex) => (
                <Pill
                  key={`${term.label}-${tagIndex}`}
                  term={term}
                  rowIndex={rowIndex}
                  tagIndex={tagIndex}
                />
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
