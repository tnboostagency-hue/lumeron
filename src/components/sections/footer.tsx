"use client";

import React from 'react';
import Link from 'next/link';
import { Linkedin, Instagram, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { lang, t, setLanguage } = useLanguage();

  const navLinks = [
    { label: t.nav.about, href: "/about" },
    { label: t.nav.services, href: "/#services" },
    { label: t.nav.contact, href: "/#contact" },
    { label: t.footer.privacy, href: "/privacy" },
  ];

  return (
    <footer className="w-full bg-[#0f172a] text-white pt-14 pb-8 overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 max-w-[1440px]">

        {/* Main Footer Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-8">

          {/* Lumeron Branding */}
          <div className="flex items-center">
            <Link href="/" className="block">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 737.38 158.61"
                className="w-[140px] h-[36px] md:w-[160px] md:h-[40px]"
              >
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Layer_1-2" data-name="Layer 1">
                    <circle fill="#229388" cx="413.61" cy="20.49" r="20.49"/>
                    <circle fill="#229388" cx="667.23" cy="20.49" r="20.49"/>
                    <circle fill="#229388" cx="715.25" cy="20.49" r="20.49"/>
                    <rect fill="#229388" x="442.03" width="157.57" height="40.99" rx="18.6"/>
                    <path fill="#ffffff" d="M0,150.3V32.75a8.19,8.19,0,0,1,16.38,0V142.11h92a8.19,8.19,0,1,1,0,16.38H8.19A8.19,8.19,0,0,1,0,150.3Z"/>
                    <path fill="#ffffff" d="M209.09,77.19v73.23a8.17,8.17,0,0,1-16.32.63,39.36,39.36,0,0,1-62.56-31.88v-42a8.19,8.19,0,1,1,16.38,0v42a23.06,23.06,0,0,0,46.12,0v-42a8.19,8.19,0,0,1,16.38,0Z"/>
                    <path fill="#ffffff" d="M373.73,108.42v42a8.19,8.19,0,1,1-16.38,0v-42a23.06,23.06,0,0,0-46.12,0v42a8.19,8.19,0,1,1-16.38,0v-42a23.06,23.06,0,0,0-46.12,0v42a8.19,8.19,0,0,1-16.38,0V77.18a8.17,8.17,0,0,1,16.32-.64A39.25,39.25,0,0,1,303,84.46a39.39,39.39,0,0,1,70.69,24Z"/>
                    <path fill="#ffffff" d="M479.87,113.8a8.19,8.19,0,0,1-8.19,8.19H407.84a28.43,28.43,0,0,0,47.32,11.91,8.19,8.19,0,1,1,11.58,11.58,44.78,44.78,0,0,1-76.46-31c0-.21,0-.42,0-.64s0-.44,0-.65a44.8,44.8,0,0,1,89.59.65Zm-17.57-8.19a28.43,28.43,0,0,0-54.46,0Z"/>
                    <path fill="#ffffff" d="M545.75,77.18a8.19,8.19,0,0,1-8.19,8.19,23.08,23.08,0,0,0-23.06,23v42a8.19,8.19,0,1,1-16.38,0V77.18a8.17,8.17,0,0,1,16.32-.64A39.19,39.19,0,0,1,537.56,69,8.18,8.18,0,0,1,545.75,77.18Z"/>
                    <path fill="#ffffff" d="M640.24,113.8A44.81,44.81,0,1,1,595.44,69,44.85,44.85,0,0,1,640.24,113.8Zm-16.38,0a28.43,28.43,0,1,0-28.42,28.42A28.46,28.46,0,0,0,623.86,113.8Z"/>
                    <path fill="#ffffff" d="M737.38,108.42v42a8.19,8.19,0,1,1-16.38,0v-42a23.06,23.06,0,0,0-46.12,0v42a8.19,8.19,0,1,1-16.38,0V77.18a8.17,8.17,0,0,1,16.32-.64,39.37,39.37,0,0,1,62.56,31.88Z"/>
                  </g>
                </g>
              </svg>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[14px] font-medium text-white/60 hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Social & Language */}
          <div className="flex flex-row items-center gap-5 flex-wrap justify-center">
            <div className="flex items-center gap-3">
              <a href="#" aria-label="X / Twitter" className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white">
                <Linkedin size={16} />
              </a>
              <a href="#" aria-label="Instagram" className="p-2 rounded-full hover:bg-white/10 transition-colors text-white/60 hover:text-white">
                <Instagram size={16} />
              </a>
            </div>

            <div className="hidden sm:block h-4 w-px bg-white/20" aria-hidden="true" />

            <div className="flex items-center gap-3 text-[14px] font-medium">
              <button 
                onClick={() => setLanguage('en')}
                className={`transition-colors ${lang === 'en' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
              >
                EN
              </button>
              <span className="text-white/30">|</span>
              <button 
                onClick={() => setLanguage('ar')}
                className={`font-sans transition-colors ${lang === 'ar' ? 'text-white' : 'text-white/40 hover:text-white/70'}`}
              >
                عربي
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-6" />

        {/* Location + Copyright row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-[13px] text-white/40">
            <MapPin size={13} className="text-[#3ec8ba] flex-shrink-0" />
            <span>{t.footer.location} — MASCO Group</span>
          </div>
          <p className="text-[13px] text-white/40">
            © {currentYear} {t.hero.title} • MASCO ENERGY. {lang === 'ar' ? "جميع الحقوق محفوظة." : "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
};


export default Footer;
