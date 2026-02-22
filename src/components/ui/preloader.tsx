"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

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

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
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
              transition={{ delay: 0.5 }}
              className="text-[#009b88] font-bold tracking-[0.2em] text-sm uppercase"
            >
              Lumeron
            </motion.div>
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
