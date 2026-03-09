"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";

type Language = "en" | "ar";

const dictionary = {
  en: {
    nav: {
      about: "About Us",
      services: "Services",
      contact: "Contact",
      connect: "Connect Now",
    },
    hero: {
      title: "LUMERON",
      subtitle: "EMPOWERING SAUDI ARABIA'S",
      highlight: "DIGITAL TRANSFORMATION",
      description: "MASCO's technology arm accelerating Vision 2030 through resilient infrastructure, managed services, and emerging technologies.",
      explore: "Explore Services",
      watch: "Watch Video",
    },
    services: {
      title: "Our Capabilities",
      subtitle: "Accelerating the digital economy through resilient infrastructure, managed services, and cutting-edge innovations.",
        ai: "Artificial Intelligence & Advanced Analytics",
        dataCenters: "Digital Infrastructure & Data Centers",
        industrial: "Industrial Digitalization (Industry 4.0)",
        cybersecurity: "Cybersecurity & Digital Trust",
        smartInfra: "Smart Infrastructure & Connectivity",
        innovations: "Innovations & Future Tech",
        readMore: "Read More",
        viewAll: "View All Services",
    },
    mission: {
      badge: "BUILT FOR THE NATION. GUIDED BY VISION.",
      title: "Strive for Perfection, Settle for Excellence",
      description: "Lumeron is MASCO's technology arm, bridging ambition with execution. We understand the critical context of Saudi Arabia, providing resilient infrastructure that enables a knowledge-based economic development aligned with Vision 2030.",
      roadmap: "Our Mission Roadmap",
      pillars: {
        precision: "Precision",
        precisionDesc: "Technical excellence in every deployment.",
        innovation: "Innovation",
        innovationDesc: "Pioneering new digital frontiers.",
        guidance: "Guidance",
        guidanceDesc: "Strategically aligned with Vision 2030.",
        growth: "Growth",
        growthDesc: "Accelerating the Kingdom's digital economy.",
      },
      stats: {
        growth: "GROWTH",
        growthSub: "Accelerating the digital economy",
        resilience: "RESILIENCE",
        resilienceSub: "Robust & scalable infrastructure",
        precision: "PRECISION",
        precisionSub: "Excellence in every deployment",
      }
    },
    about: {
      whoWeAre: "Who We Are",
      vision: "Our Vision",
      mission: "Our Mission",
      values: "Our Values",
      hero: {
        badge: "About Lumeron",
        title: "Powering Saudi Arabia's Digital Future.",
        description: "Lumeron is MASCO Group's technology arm — a sovereign digital infrastructure company built to accelerate Vision 2030 through resilient data centers, advanced cybersecurity, and emerging technologies.",
        cta1: "Connect Now",
        cta2: "Our Journey",
      },
      content: {
        badge: "Who We Are",
        title: "The Kingdom's sovereign technology partner",
        p1: "Established as MASCO Group's dedicated technology division, Lumeron bridges the gap between world-class digital infrastructure and the Kingdom's strategic ambitions. We don't just deploy technology — we build the foundations that national transformation runs on.",
        p2: "From hyperscale data centers and 24/7 SOC operations to AI systems that understand Arabic cultural context and quantum-safe security architecture, Lumeron's portfolio spans the full stack of modern digital capability.",
        p3: "Backed by MASCO's industrial heritage and guided by Vision 2030, we operate with a mandate to keep Saudi Arabia's data sovereign, its infrastructure resilient, and its enterprises ahead of the technology curve.",
      },
      stats: {
        founded: "Year Founded",
        foundedSub: "Under MASCO Group",
        clients: "Clients Served",
        clientsSub: "Across GCC & MENA",
        uptime: "Uptime SLA",
        uptimeSub: "Guaranteed infrastructure",
        vision: "Vision Aligned",
        visionSub: "Strategic partner",
      },
      pillars: {
        badge: "What Drives Us",
        title: "Our core principles",
        p1: { title: "Sovereign Infrastructure", desc: "We build and operate critical digital infrastructure that stays within the Kingdom — ensuring data sovereignty, low latency, and regulatory compliance." },
        p2: { title: "Cyber Resilience", desc: "With a Saudi-first security philosophy, we align every defensive measure with NCA, CITC, and international frameworks to protect national assets." },
        p3: { title: "Emerging Technology", desc: "From Arabic-native AI to quantum-safe cryptography, we translate frontier research into deployable solutions for Saudi enterprises and government." },
        p4: { title: "Partnership-First", desc: "Lumeron operates as a long-term partner, not a vendor. We co-develop, co-deploy, and co-evolve solutions alongside our clients." },
      },
      journey: {
        badge: "Our Journey",
        title: "A decade of digital leadership",
      },
      cta: {
        title: "Ready to build with Lumeron?",
        button: "Connect Now",
      }
    },
    cta: {
      badge: "Accelerating Vision 2030",
      title: "Why Lumeron?",
      p1: "Lumeron drives Saudi Arabia's digital revolution through Vision 2030-aligned technology solutions spanning infrastructure and emerging technologies.",
      button: "Contact Lumeron",
      features: [
        { title: "Resilient Ecosystems", desc: "Sustainable infrastructure enabling knowledge-based economic development across the Kingdom." },
        { title: "Culturally Aligned", desc: "MASCO-backed expertise with local support and strategic positioning in the Saudi market." },
        { title: "Strategic Support", desc: "Deep local relationships ensuring alignment with national priorities and cultural values." }
      ]
    },
    footer: {
      location: "Prince Turkey Street, Al Fardan Tower, Floor 3, Al Khobar 34413, Saudi Arabia",
      copyright: "© 2025 Lumeron. All rights reserved.",
      privacy: "Privacy Notice",
    },
    contact: {
      title: "Connect with us",
      subtitle: "Have a project in mind? Let's talk.",
      name: "Full Name",
      email: "Work Email",
      company: "Company",
      message: "Message",
      send: "Send Message",
    }
  },
  ar: {
    nav: {
      about: "من نحن",
      services: "خدماتنا",
      contact: "اتصل بنا",
      connect: "اتصل الآن",
    },
    hero: {
      title: "لوميرون",
      subtitle: "تمكين التحول الرقمي",
      highlight: "في المملكة العربية السعودية",
      description: "ذراع ماسكو التكنولوجي الذي يسرع رؤية 2030 من خلال بنية تحتية مرنة، وخدمات مدارة، وتقنيات ناشئة.",
      explore: "استكشف الخدمات",
      watch: "شاهد الفيديو",
    },
    services: {
      title: "قدراتنا",
      subtitle: "تسريع الاقتصاد الرقمي من خلال بنية تحتية مرنة وخدمات مدارة وابتكارات متطورة.",
        ai: "الذكاء الاصطناعي والتحليلات المتقدمة",
        dataCenters: "البنية التحتية الرقمية ومراكز البيانات",
        industrial: "التحول الصناعي الرقمي (الصناعة 4.0)",
        cybersecurity: "الأمن السيبراني والثقة الرقمية",
        smartInfra: "البنية التحتية الذكية والاتصالات",
        innovations: "الابتكارات وتقنيات المستقبل",
        readMore: "اقرأ المزيد",
        viewAll: "عرض جميع الخدمات",
    },
    mission: {
      badge: "بنيت للوطن. تسترشد بالرؤية.",
      title: "نسعى للكمال، ونرضى بالتميز",
      description: "لوميرون هي الذراع التكنولوجي لماسكو، حيث تربط الطموح بالتنفيذ. نحن نتفهم السياق الحيوي للمملكة العربية السعودية، ونوفر بنية تحتية مرنة تمكن من تطوير اقتصادي قائم على المعرفة يتماشى مع رؤية 2030.",
      roadmap: "خارطة طريق مهمتنا",
      pillars: {
        precision: "الدقة",
        precisionDesc: "التميز التقني في كل عملية نشر.",
        innovation: "الابتكار",
        innovationDesc: "ريادة آفاق رقمية جديدة.",
        guidance: "التوجيه",
        guidanceDesc: "متوافق استراتيجياً مع رؤية 2030.",
        growth: "النمو",
        growthDesc: "تسريع الاقتصاد الرقمي للمملكة.",
      },
      stats: {
        growth: "نمو",
        growthSub: "تسريع الاقتصاد الرقمي",
        resilience: "مرونة",
        resilienceSub: "بنية تحتية قوية وقابلة للتوسع",
        precision: "دقة",
        precisionSub: "التميز في كل عملية نشر",
      }
    },
    about: {
      whoWeAre: "من نحن",
      vision: "رؤيتنا",
      mission: "رسالتنا",
      values: "قيمنا",
      hero: {
        badge: "عن لوميرون",
        title: "تمكين المستقبل الرقمي للمملكة.",
        description: "لوميرون هي الذراع التكنولوجي لمجموعة ماسكو — شركة بنية تحتية رقمية سيادية بنيت لتسريع رؤية 2030 من خلال مراكز بيانات مرنة وأمن سيبراني متقدم وتقنيات ناشئة.",
        cta1: "اتصل الآن",
        cta2: "رحلتنا",
      },
      content: {
        badge: "من نحن",
        title: "شريك التكنولوجيا السيادي في المملكة",
        p1: "تأسست لوميرون كقسم تكنولوجيا متخصص لمجموعة ماسكو، وهي تسد الفجوة بين البنية التحتية الرقمية ذات المستوى العالمي والطموحات الاستراتيجية للمملكة. نحن لا نقوم فقط بنشر التكنولوجيا - بل نبني الأسس التي يقوم عليها التحول الوطني.",
        p2: "من مراكز البيانات فائقة النطاق وعمليات مركز العمليات الأمنية على مدار الساعة طوال أيام الأسبوع إلى أنظمة الذكاء الاصطناعي التي تفهم السياق الثقافي العربي وهندسة الأمن الآمنة كمياً، تغطي محفظة لوميرون كامل نطاق القدرات الرقمية الحديثة.",
        p3: "بدعم من الإرث الصناعي لماسكو وبتوجيه من رؤية 2030، نعمل بتكليف للحفاظ على سيادة بيانات المملكة، ومرونة بنيتها التحتية، وبقاء مؤسساتها في طليعة التكنولوجيا.",
      },
      stats: {
        founded: "سنة التأسيس",
        foundedSub: "تحت مجموعة ماسكو",
        clients: "العملاء المخدومون",
        clientsSub: "عبر دول مجلس التعاون وشمال أفريقيا",
        uptime: "اتفاقية مستوى الخدمة",
        uptimeSub: "بنية تحتية مضمونة",
        vision: "متوافق مع الرؤية",
        visionSub: "شريك استراتيجي",
      },
      pillars: {
        badge: "ما يدفعنا",
        title: "مبادئنا الأساسية",
        p1: { title: "البنية التحتية السيادية", desc: "نحن نبني ونشغل بنية تحتية رقمية حيوية تبقى داخل المملكة — مما يضمن سيادة البيانات، وزمن انتقال منخفض، والامتثال التنظيمي." },
        p2: { title: "المرونة السيبرانية", desc: "من خلال فلسفة أمنية سعودية أولاً، نقوم بمواءمة كل إجراء دفاعي مع الهيئة الوطنية للأمن السيبراني وهيئة الاتصالات والفضاء والتقنية والأطر الدولية لحماية الأصول الوطنية." },
        p3: { title: "التكنولوجيا الناشئة", desc: "من الذكاء الاصطناعي العربي الأصيل إلى التشفير الآمن كمياً، نترجم الأبحاث الرائدة إلى حلول قابلة للنشر للمؤسسات والحكومة السعودية." },
        p4: { title: "الشراكة أولاً", desc: "تعمل لوميرون كشريك طويل الأمد، وليس كمورد. نحن نطور وننشر ونطور الحلول جنباً إلى جنب مع عملائنا." },
      },
      journey: {
        badge: "رحلتنا",
        title: "عقد من القيادة الرقمية",
      },
      cta: {
        title: "هل أنت مستعد للبناء مع لوميرون؟",
        button: "اتصل الآن",
      }
    },
    cta: {
      badge: "تسريع رؤية 2030",
      title: "لماذا لوميرون؟",
      p1: "تقود لوميرون الثورة الرقمية في المملكة العربية السعودية من خلال حلول تكنولوجية متوافقة مع رؤية 2030 تشمل البنية التحتية والتقنيات الناشئة.",
      button: "اتصل بـ لوميرون",
      features: [
        { title: "أنظمة مرنة", desc: "بنية تحتية مستدامة تمكن التنمية الاقتصادية القائمة على المعرفة في جميع أنحاء المملكة." },
        { title: "توافق ثقافي", desc: "خبرة مدعومة من ماسكو مع دعم محلي وموقع استراتيجي في السوق السعودي." },
        { title: "دعم استراتيجي", desc: "علاقات محلية عميقة تضمن التوافق مع الأولويات الوطنية والقيم الثقافية." }
      ]
    },
    footer: {
      location: "شارع الأمير تركي، برج الفرادان، الطابق الثالث، الخبر 34413",
      copyright: "© 2025 لوميرون. جميع الحقوق محفوظة.",
      privacy: "إشعار الخصوصية",
    },
    contact: {
      title: "تواصل معنا",
      subtitle: "لديك مشروع في بالك؟ دعنا نتحدث.",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني للعمل",
      company: "الشركة",
      message: "الرسالة",
      send: "إرسال الرسالة",
    }
  },
};

type Dictionary = typeof dictionary.en;

interface LanguageContextType {
  lang: Language;
  t: Dictionary;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANG_COOKIE = "lang";
const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function setLangCookie(value: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${LANG_COOKIE}=${value}; path=/; max-age=${LANG_COOKIE_MAX_AGE}; SameSite=Lax`;
}

export const LanguageProvider: React.FC<{ children: React.ReactNode; initialLang?: Language }> = ({ children, initialLang = "en" }) => {
  const [lang, setLang] = useState<Language>(initialLang);

  // Sync from localStorage on mount (e.g. user had Arabic before cookie existed)
  useEffect(() => {
    const saved = localStorage.getItem(LANG_COOKIE) as Language | null;
    if (saved && (saved === "en" || saved === "ar")) {
      setLang((prev) => (prev !== saved ? saved : prev));
      setLangCookie(saved);
      document.documentElement.lang = saved;
      document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
    }
  }, []);

  const setLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem(LANG_COOKIE, newLang);
    setLangCookie(newLang);
    document.documentElement.lang = newLang;
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  const contextValue = useMemo(() => ({
    lang,
    t: dictionary[lang],
    setLanguage
  }), [lang]);

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
