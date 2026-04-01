"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import ContactModal from "@/components/sections/contact-modal";
import { useLanguage } from "@/context/LanguageContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [logoEntered, setLogoEntered] = useState(false);
  const { lang, t, setLanguage } = useLanguage();

  const serviceLinks = [
    { name: t.services.dataCenters, href: "/services/data-centers" },
    { name: t.services.cybersecurity, href: "/services/cybersecurity" },
    { name: t.services.industrial, href: "/services/industrial" },
    { name: t.services.ai, href: "/services/ai" },
    { name: t.services.smartInfra, href: "/services/smart-infrastructure" },
  ];

  // Desktop dropdown uses compact labels only.
  const desktopServiceLinks = [
    { name: "Data Centers", href: "/services/data-centers" },
    { name: "Industry 4.0", href: "/services/industrial" },
    { name: "Cybersecurity", href: "/services/cybersecurity" },
    { name: "Artificial Intelligence", href: "/services/ai" },
    { name: "Smart Infrastructure", href: "/services/smart-infrastructure" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Trigger a simple entrance animation for the logos on first render.
    setLogoEntered(true);
  }, []);

  return (
    <>
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />

      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ease-in-out h-20 flex items-center border-b ${
          isScrolled
            ? "border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.08),0_1px_0_rgba(255,255,255,0.7)_inset]"
            : "border-white/20 shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
        }`}
        style={{
          background: isScrolled
            ? "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.3) 40%, rgba(240,253,252,0.35) 70%, rgba(255,255,255,0.45) 100%)"
            : "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.12) 50%, rgba(240,253,252,0.15) 100%)",
          WebkitBackdropFilter: isScrolled ? "blur(60px) saturate(1.8) brightness(1.05)" : "blur(40px) saturate(1.6)",
          backdropFilter: isScrolled ? "blur(60px) saturate(1.8) brightness(1.05)" : "blur(40px) saturate(1.6)",
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between gap-3">
          {/* Logo — may shrink on narrow phones so the menu button stays visible */}
          <div className="min-w-0 flex-1">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 group min-w-0 max-w-full">
              {/* Main logo */}
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={logoEntered ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-[32px] w-[100px] shrink-0 sm:h-[36px] sm:w-[130px] md:w-[160px] md:h-[40px] transition-all duration-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 737.38 158.61" className="w-full h-full object-contain">
                  <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                      <circle fill="#009b88" cx="413.61" cy="20.49" r="20.49" />
                      <circle fill="#009b88" cx="667.23" cy="20.49" r="20.49" />
                      <circle fill="#009b88" cx="715.25" cy="20.49" r="20.49" />
                      <rect fill="#009b88" x="442.03" width="157.57" height="40.99" rx="18.6" />
                      <path className="transition-colors duration-300 fill-black" d="M0,150.3V32.75a8.19,8.19,0,0,1,16.38,0V142.11h92a8.19,8.19,0,1,1,0,16.38H8.19A8.19,8.19,0,0,1,0,150.3Z" />
                      <path className="transition-colors duration-300 fill-black" d="M209.09,77.19v73.23a8.17,8.17,0,0,1-16.32.63,39.36,39.36,0,0,1-62.56-31.88v-42a8.19,8.19,0,1,1,16.38,0v42a23.06,23.06,0,0,0,46.12,0v-42a8.19,8.19,0,0,1,16.38,0Z" />
                      <path className="transition-colors duration-300 fill-black" d="M373.73,108.42v42a8.19,8.19,0,1,1-16.38,0v-42a23.06,23.06,0,0,0-46.12,0v42a8.19,8.19,0,1,1-16.38,0v-42a23.06,23.06,0,0,0-46.12,0v42a8.19,8.19,0,0,1-16.38,0V77.18a8.17,8.17,0,0,1,16.32-.64A39.25,39.25,0,0,1,303,84.46a39.39,39.39,0,0,1,70.69,24Z" />
                      <path className="transition-colors duration-300 fill-black" d="M479.87,113.8a8.19,8.19,0,0,1-8.19,8.19H407.84a28.43,28.43,0,0,0,47.32,11.91,8.19,8.19,0,1,1,11.58,11.58,44.78,44.78,0,0,1-76.46-31c0-.21,0-.42,0-.64s0-.44,0-.65a44.8,44.8,0,0,1,89.59.65Zm-17.57-8.19a28.43,28.43,0,0,0-54.46,0Z" />
                      <path className="transition-colors duration-300 fill-black" d="M545.75,77.18a8.19,8.19,0,0,1-8.19,8.19,23.08,23.08,0,0,0-23.06,23v42a8.19,8.19,0,1,1-16.38,0V77.18a8.17,8.17,0,0,1,16.32-.64A39.19,39.19,0,0,1,537.56,69,8.18,8.18,0,0,1,545.75,77.18Z" />
                      <path className="transition-colors duration-300 fill-black" d="M640.24,113.8A44.81,44.81,0,1,1,595.44,69,44.85,44.85,0,0,1,640.24,113.8Zm-16.38,0a28.43,28.43,0,1,0-28.42,28.42A28.46,28.46,0,0,0,623.86,113.8Z" />
                      <path className="transition-colors duration-300 fill-black" d="M737.38,108.42v42a8.19,8.19,0,1,1-16.38,0v-42a23.06,23.06,0,0,0-46.12,0v42a8.19,8.19,0,1,1-16.38,0V77.18a8.17,8.17,0,0,1,16.32-.64,39.37,39.37,0,0,1,62.56,31.88Z" />
                    </g>
                  </g>
                </svg>
              </motion.div>

              {/* Secondary mark on mobile/tablet: stays next to main logo */}
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={logoEntered ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="w-px h-8 bg-[#e2e8f0]/90 self-center shrink-0 lg:hidden"
                aria-hidden
              />
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={logoEntered ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="relative h-[28px] w-[120px] sm:h-[32px] sm:w-[150px] md:h-[34px] md:w-[170px] shrink-0 lg:hidden cursor-pointer"
                role="link"
                tabIndex={0}
                aria-label={lang === "ar" ? "عام الذكاء الاصطناعي - يفتح في تبويب جديد" : "AI year page (opens in new tab)"}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open("https://sdaia.gov.sa/ar/MediaCenter/Pages/ai-year.aspx", "_blank", "noopener,noreferrer");
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    e.stopPropagation();
                    window.open("https://sdaia.gov.sa/ar/MediaCenter/Pages/ai-year.aspx", "_blank", "noopener,noreferrer");
                  }
                }}
              >
                <Image
                  src="/logos/header-secondary.svg"
                  alt={lang === "ar" ? "شعار ذكاء اصطناعي — المملكة العربية السعودية" : "Saudi AI mark"}
                  fill
                  sizes="170px"
                  className="object-contain object-left"
                  priority={false}
                />
              </motion.div>

            </Link>
          </div>

          {/* Desktop nav — About Us | Services | Careers | News | Contact */}
          <div className="hidden lg:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2">
            {/* About Us */}
            <Link
              href="/about"
              className="text-[15px] font-semibold flex items-center gap-1.5 transition-all hover:opacity-70 whitespace-nowrap text-foreground"
            >
              {t.nav.about}
            </Link>

            {/* Services dropdown */}
            <div className="relative group">
              <button className="text-[15px] font-semibold flex items-center gap-1.5 transition-all hover:opacity-70 whitespace-nowrap text-foreground">
                {t.nav.services}
                <ChevronDown className="w-4 h-4 mt-0.5 opacity-60 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 translate-y-2 group-hover:translate-y-0 w-72">
                <div
                  className="rounded-2xl overflow-hidden shadow-xl border border-black/6"
                  style={{ background: "rgba(255,255,255,0.92)", backdropFilter: "blur(40px) saturate(1.8)", WebkitBackdropFilter: "blur(40px) saturate(1.8)" }}
                >
                  <div className="h-0.5 w-full" style={{ background: "linear-gradient(90deg, #229388, #3ec8ba)" }} />
                  {desktopServiceLinks.map((s, i) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="flex items-center gap-3 px-5 py-3.5 text-[14px] font-medium text-foreground hover:bg-[#229388]/8 hover:text-[#229388] transition-colors group/item"
                      style={{ borderBottom: i < serviceLinks.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#229388]/30 group-hover/item:bg-[#229388] transition-colors flex-shrink-0" />
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Careers */}
            <Link
              href="/careers"
              className="text-[15px] font-semibold flex items-center gap-1.5 transition-all hover:opacity-70 whitespace-nowrap text-foreground"
            >
              {lang === "ar" ? "الوظائف" : "Careers"}
            </Link>

            {/* News */}
            <Link
              href="/news"
              className="text-[15px] font-semibold flex items-center gap-1.5 transition-all hover:opacity-70 whitespace-nowrap text-foreground"
            >
              {lang === "ar" ? "الأخبار" : "News"}
            </Link>

            {/* Contact — leads to contact section on home page */}
            <Link
              href="/#contact"
              className="text-[15px] font-semibold flex items-center gap-1.5 transition-all hover:opacity-70 whitespace-nowrap text-foreground"
            >
              {t.nav.contact}
            </Link>
          </div>

          {/* Right side — never shrink so hamburger stays on-screen */}
          <div className="flex shrink-0 items-center gap-3 md:gap-4">
            <div className="md:hidden flex items-center rounded-full border border-[#0f172a]/12 bg-white/85 px-2 py-1 text-[12px] font-semibold text-foreground">
              <button
                onClick={() => setLanguage("en")}
                className={`px-1.5 ${lang === "en" ? "text-[#229388]" : "opacity-50"}`}
              >
                EN
              </button>
              <span className="text-muted-foreground/70">|</span>
              <button
                onClick={() => setLanguage("ar")}
                className={`font-sans px-1.5 ${lang === "ar" ? "text-[#229388]" : "opacity-50"}`}
              >
                عربي
              </button>
            </div>

            <div className="hidden md:flex items-center text-[14px] font-semibold text-foreground">
              <button
                onClick={() => setLanguage("en")}
                className={`hover:opacity-70 transition-opacity ${lang === "en" ? "text-[#229388]" : "opacity-50"}`}
              >
                EN
              </button>
              <span className="mx-2 font-light text-muted-foreground">|</span>
              <button
                onClick={() => setLanguage("ar")}
                className={`font-sans hover:opacity-70 transition-opacity ${lang === "ar" ? "text-[#229388]" : "opacity-50"}`}
              >
                عربي
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-2">
              <a
                href="https://sdaia.gov.sa/ar/MediaCenter/Pages/ai-year.aspx"
                target="_blank"
                rel="noopener noreferrer"
                className="relative h-[32px] w-[184px] xl:w-[196px] shrink-0 -mr-1"
                aria-label={lang === "ar" ? "عام الذكاء الاصطناعي - يفتح في تبويب جديد" : "AI year page (opens in new tab)"}
              >
                <Image
                  src="/logos/header-secondary.svg"
                  alt={lang === "ar" ? "شعار ذكاء اصطناعي — المملكة العربية السعودية" : "Saudi AI mark"}
                  fill
                  sizes="196px"
                  className="object-contain object-right"
                  priority={false}
                />
              </a>

              <button
                onClick={() => setModalOpen(true)}
                className="btn-primary px-4 py-2 md:px-6 md:py-3 text-sm md:text-base"
              >
                {t.nav.connect.replace(" ", "\u00A0")}
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              aria-label={isMobileMenuOpen ? (lang === "ar" ? "إغلاق القائمة" : "Close menu") : (lang === "ar" ? "فتح القائمة" : "Open menu")}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-[110] flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#0f172a]/12 bg-white/85 text-[#0f172a] shadow-sm backdrop-blur-sm transition-colors hover:bg-white hover:border-[#229388]/35"
            >
              {isMobileMenuOpen ? <X size={22} strokeWidth={2.25} /> : <Menu size={22} strokeWidth={2.25} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[90] bg-white transition-transform duration-500 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex flex-col h-full pt-28 px-8 pb-10 overflow-y-auto">
          <div className="flex flex-col space-y-6">
            {/* About Us */}
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-bold text-foreground py-2"
            >
              {t.nav.about}
            </Link>

            {/* Services with expandable sub-links */}
            <div className="flex flex-col">
              <button
                onClick={() => setMobileServicesOpen((v) => !v)}
                className="text-2xl font-bold text-foreground flex items-center justify-between py-2"
              >
                {t.nav.services}
                <ChevronDown
                  className="w-6 h-6 opacity-40 transition-transform duration-300"
                  style={{ transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>
              <div
                className="overflow-hidden transition-all duration-400 ease-in-out"
                style={{ maxHeight: mobileServicesOpen ? "300px" : "0" }}
              >
                <div className="pl-4 flex flex-col space-y-3 border-l-2 border-[#229388]/20 mt-3">
                  {serviceLinks.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="text-lg text-muted-foreground font-medium hover:text-[#229388] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Careers */}
            <Link
              href="/careers"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-bold text-foreground py-2"
            >
              {lang === "ar" ? "الوظائف" : "Careers"}
            </Link>

            {/* News */}
            <Link
              href="/news"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-bold text-foreground py-2"
            >
              {lang === "ar" ? "الأخبار" : "News"}
            </Link>

            {/* Contact — leads to contact section on home page */}
            <Link
              href="/#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-bold text-foreground text-left py-2"
            >
              {t.nav.contact}
            </Link>
          </div>

          <div className="mt-auto pt-10 border-t border-border flex flex-col space-y-6">
            <button
              onClick={() => { setIsMobileMenuOpen(false); setModalOpen(true); }}
              className="btn-primary px-6 py-3 text-base text-center w-full"
            >
              {t.nav.connect}
            </button>
            <div className="flex flex-wrap items-center gap-3 text-lg font-semibold text-foreground">
              <button
                onClick={() => setLanguage("en")}
                className={lang === "en" ? "text-[#229388]" : "opacity-50"}
              >
                English
              </button>
              <span className="text-muted-foreground font-light">|</span>
              <button
                onClick={() => setLanguage("ar")}
                className={`font-sans ${lang === "ar" ? "text-[#229388]" : "opacity-50"}`}
              >
                عربي
              </button>
            </div>
            <p className="text-sm text-muted-foreground">
              {lang === 'ar' ? "MASCO Digital تسارع رؤية المملكة 2030." : "MASCO Digital accelerating Saudi Vision 2030."}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
