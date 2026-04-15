"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import FloatingElement from '@/components/animations/floating-element';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const { lang, t } = useLanguage();
  const words = useMemo(
    () =>
      lang === 'ar'
        ? ['من الاقتصاد الرقمي', 'من البنية التحتية الرقمية', 'من المستقبل الرقمي']
        : ['FUTURE', 'TRANSFORMATION', 'ECONOMY', 'INNOVATION', 'INFRASTRUCTURE'],
    [lang]
  );
    
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMorse, setIsMorse] = useState(false);

  useEffect(() => {
    setIndex(0);
    setSubIndex(0);
    setIsDeleting(false);
  }, [lang]);

  // Fix 100vh on mobile browsers (address bar gap)
  useEffect(() => {
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  const morseCode: Record<string, string> = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
    '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
    '8': '---..', '9': '----.', ' ': ' '
  };

  const getMorse = (text: string) => {
    if (lang === 'ar') return ""; // Skip morse for Arabic text
    return text.split('').map(char => morseCode[char.toUpperCase()] || char).join(' ');
  };

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !isDeleting) {
      setTimeout(() => setIsDeleting(true), 2000);
      return;
    }

    if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
      if (!isDeleting) {
        setIsMorse(true);
        setTimeout(() => setIsMorse(false), 80);
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, words]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

    return (
    <>
      <section className="relative w-full overflow-hidden flex flex-col justify-center pt-[80px] md:min-h-screen" style={{ minHeight: typeof window !== 'undefined' && window.innerWidth >= 768 ? 'calc(var(--vh, 1vh) * 100)' : undefined }}>
          {/* Video Background */}
          <div className="absolute inset-0 z-0">
            <iframe
              src="https://streamable.com/e/j2uo7d?autoplay=1&muted=1&nocontrols=1"
              allow="autoplay; fullscreen"
              allowFullScreen
              className="border-none"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '177.78vh', /* 16/9 * 100vh */
                height: '56.25vw', /* 9/16 * 100vw */
                minWidth: '100%',
                minHeight: '100%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Mobile: full white overlay so text is always readable */}
          <div
            className="absolute inset-0 z-[1] md:hidden"
            style={{ background: 'rgba(255,255,255,0.88)' }}
          />
          {/* Desktop: left-to-right gradient */}
          <div 
            className="absolute inset-0 z-[1] hidden md:block"
            style={{
              background: 'linear-gradient(to right, rgba(255,255,255,0.97) 0%, rgba(255,255,255,0.88) 30%, rgba(255,255,255,0.6) 55%, rgba(255,255,255,0.15) 80%, transparent 100%)',
            }}
          />
          {/* Top fade */}
          <div 
            className="absolute inset-0 z-[1]"
            style={{
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.2) 20%, transparent 50%)',
            }}
          />

          {/* Floating decorative elements — hidden on mobile to avoid clutter */}
          <div className="absolute inset-0 z-[2] hidden sm:block">
            <FloatingElement speed={0.2} rotationFactor={0.3} className="absolute top-[20%] right-[15%] opacity-20">
              <div className="w-16 h-16 border border-[#229388]/30 rounded-lg rotate-45" />
            </FloatingElement>
            <FloatingElement speed={0.15} rotationFactor={-0.2} className="absolute top-[40%] left-[10%] opacity-15">
              <div className="w-12 h-12 border border-[#3ec8ba]/40 rounded-full" />
            </FloatingElement>
            <FloatingElement speed={0.25} rotationFactor={0.4} className="absolute bottom-[30%] right-[20%] opacity-20">
              <div className="w-8 h-8 bg-gradient-to-br from-[#229388]/20 to-transparent rounded-md rotate-12" />
            </FloatingElement>
          </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="container relative z-10 pt-6 pb-4 md:py-12 lg:py-6 flex flex-col items-start justify-center max-w-[1440px] px-5 sm:px-10 md:px-16 mx-auto gap-6"
        >
            <div className="w-full md:w-[65%] shrink-0">
            {/* Logo */}
            <motion.h1 variants={itemVariants} className="mb-3 select-none">
              <span className="sr-only">{t.hero.title}</span>
              <span className="text-[36px] xs:text-[44px] sm:text-[52px] md:text-[68px] lg:text-[76px] font-sans font-black tracking-[-0.02em] bg-gradient-to-r from-[#229388] via-[#3ec8ba] to-[#229388] bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient inline-block leading-tight">
                {t.hero.title}
              </span>
            </motion.h1>

            {/* Main headline */}
            <motion.h2 variants={itemVariants} className="text-foreground text-[19px] xs:text-[22px] sm:text-[26px] md:text-[32px] lg:text-[38px] font-semibold leading-[1.2] mb-4 tracking-[-0.02em]">
              {t.hero.subtitle}
              <br />
                <span className="relative inline-flex flex-col">
                  <span className="bg-gradient-to-r from-[#229388] to-[#3ec8ba] bg-clip-text text-transparent">
                  {lang === 'ar' ? words[index].substring(0, subIndex) : `${t.hero.highlight.split(' ')[0]} ${words[index].substring(0, subIndex)}`}
                  <span className={`inline-block w-[3px] h-[0.65em] ${lang === 'ar' ? 'mr-1' : 'ml-1'} align-middle bg-[#229388] rounded-sm ${isMorse ? 'opacity-100' : 'animate-pulse'}`} />
                </span>
              </span>
            </motion.h2>

            <motion.p variants={itemVariants} className="text-muted-foreground text-[14px] sm:text-[15px] md:text-[17px] max-w-[520px] leading-[1.65] mb-7">
              {t.hero.tagline}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center sm:w-fit">
              <a 
                href="#services" 
                className="btn-primary flex items-center justify-center gap-2 px-6 h-[46px] text-[14px]"
              >
                {t.hero.explore}
                <ArrowRight className={`w-4 h-4 flex-shrink-0 ${lang === 'ar' ? 'rotate-180' : ''}`} />
              </a>
            </motion.div>
          </div>
        </motion.div>

      {/* Bottom fade to white */}
      <div className="absolute bottom-0 left-0 w-full h-8 md:h-32 bg-gradient-to-t from-white to-transparent z-[5]" />
    </section>
    </>
  );
}
