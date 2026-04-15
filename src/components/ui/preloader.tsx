"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

const MorseDot = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0, 1, 0],
      scale: [0.8, 1.2, 0.8]
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    className="w-2 h-2 rounded-full bg-[#009b88]"
  />
);

const MorseDash = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, width: 0 }}
    animate={{ 
      opacity: [0, 1, 0],
      width: ["0px", "24px", "0px"]
    }}
    transition={{
      duration: 1.5,
      repeat: Infinity,
      delay,
      ease: "easeInOut"
    }}
    className="h-2 rounded-full bg-[#009b88]"
  />
);

const MAX_LOADING_MS = 4000; // safety: never show preloader longer than this

export default function Preloader() {
  const { t, lang } = useLanguage();
  const slogan = t.mission.title;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const done = () => setLoading((prev) => (prev ? false : prev));
    const timer = setTimeout(done, 2500);
    const safety = setTimeout(done, MAX_LOADING_MS);
    if (typeof window !== "undefined") {
      if (document.readyState === "complete") done();
      else window.addEventListener("load", done);
    }
    return () => {
      clearTimeout(timer);
      clearTimeout(safety);
      if (typeof window !== "undefined") window.removeEventListener("load", done);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
        >
          <div className="flex flex-col items-center gap-8">
            {/* Lumeron Morse Animation: L (.-..) U (..-) M (--) */}
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5 items-center">
                <MorseDot delay={0} />
                <MorseDash delay={0.2} />
                <MorseDot delay={0.4} />
                <MorseDot delay={0.6} />
              </div>
              <div className="w-4" /> {/* Space between letters */}
              <div className="flex gap-1.5 items-center">
                <MorseDot delay={0.8} />
                <MorseDot delay={1.0} />
                <MorseDash delay={1.2} />
              </div>
              <div className="w-4" />
              <div className="flex gap-1.5 items-center">
                <MorseDash delay={1.4} />
                <MorseDash delay={1.6} />
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#009b88] font-bold tracking-[0.2em] text-sm uppercase"
            >
              Lumeron
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                delay: 0.95,
                duration: 0.95,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={`mt-1 max-w-[min(90vw,320px)] text-center text-[11px] sm:text-[12px] font-medium leading-snug text-[#475569] ${lang === "ar" ? "px-2" : "tracking-[0.04em]"}`}
            >
              <span className="bg-gradient-to-r from-[#229388] via-[#3ec8ba] to-[#229388] bg-[length:120%_auto] bg-clip-text text-transparent">
                {slogan}
              </span>
            </motion.p>
          </div>
          
          {/* Subtle Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#009b88]/10 rounded-full blur-[120px]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
