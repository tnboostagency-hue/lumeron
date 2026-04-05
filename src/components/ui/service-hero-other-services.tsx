"use client";

import Link from "next/link";
import { useId, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

type Props = {
  excludeHref: string;
  className?: string;
};

function normalizePath(href: string) {
  return href.replace(/\/$/, "") || "/";
}

/** Same five lines as main nav — short labels (EN matches site IA naming). */
const OTHER_SERVICE_LINKS = [
  { href: "/services/data-centers", en: "Data Centers", ar: "مراكز البيانات" },
  { href: "/services/industrial", en: "Industry 4.0", ar: "الصناعة 4.0" },
  { href: "/services/cybersecurity", en: "Cybersecurity", ar: "الأمن السيبراني" },
  { href: "/services/ai", en: "Artificial Intelligence", ar: "الذكاء الاصطناعي" },
  { href: "/services/smart-infrastructure", en: "Smart Infrastructure", ar: "البنية التحتية الذكية" },
] as const;

export default function ServiceHeroOtherServices({ excludeHref, className }: Props) {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const current = normalizePath(excludeHref);
  const isRtl = lang === "ar";

  const links = useMemo(() => {
    return OTHER_SERVICE_LINKS.filter((l) => normalizePath(l.href) !== current).map((l) => ({
      href: l.href,
      label: lang === "ar" ? l.ar : l.en,
    }));
  }, [lang, current]);

  return (
    <div
      className={cn("relative z-[120] inline-block overflow-visible text-start", className)}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={cn(
          "btn-outline text-[14px] px-8 py-3.5 inline-flex items-center gap-2",
          isRtl && "flex-row-reverse"
        )}
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls={menuId}
      >
        <span>{t.services.otherServices}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 opacity-70 transition-transform duration-300",
            open ? "rotate-180" : "rotate-0"
          )}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="menu"
            aria-label={t.services.otherServicesMenuLabel}
            initial={{ opacity: 0, y: 14, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 10, filter: "blur(10px)" }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "absolute bottom-full left-0 z-[200] mb-2 w-[min(calc(100vw-2rem),288px)]",
              isRtl && "left-auto right-0"
            )}
            style={{ transformOrigin: "bottom center" }}
          >
            <div
              className={cn(
                "rounded-xl border border-[#e2e8f0] py-2 shadow-xl shadow-[#229388]/10",
                "bg-white/50 backdrop-blur-xl backdrop-saturate-150",
                "supports-[backdrop-filter]:bg-white/40"
              )}
            >
              <p className="px-4 pb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#94a3b8]">
                {t.services.otherServicesMenuLabel}
              </p>
              <ul className="flex flex-col gap-0.5">
                {links.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: isRtl ? 12 : -12, filter: "blur(8px)" }}
                    animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                    transition={{
                      delay: 0.05 + i * 0.048,
                      duration: 0.28,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      role="menuitem"
                      className={cn(
                        "block px-4 py-2.5 text-[13px] font-medium text-[#374151] transition-colors",
                        "hover:bg-[#229388]/8 hover:text-[#229388]"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
