"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface NewsItem {
  id: number;
  category: string;
  title: string;
  image: string;
  link: string;
}

const newsData: NewsItem[] = [
  {
    id: 1,
    category: "CYBERSECURITY & RESILIENCE",
    title: "Protecting critical systems and ensuring operational continuity for the Kingdom's infrastructure.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1cd8c82-7d59-48f9-9b1f-b8b6ad292087-humain-com/assets/images/images_2.png",
    link: "#",
  },
  {
    id: 2,
    category: "DIGITAL INFRASTRUCTURE",
    title: "Sovereign hyperscale data centers anchoring national digital independence and cloud mobility.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1cd8c82-7d59-48f9-9b1f-b8b6ad292087-humain-com/assets/images/images_2.png",
    link: "#",
  },
  {
    id: 3,
    category: "IOT & SMART SYSTEMS",
    title: "Interconnected devices and intelligent environments powering NEOM and Qiddiya's future.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1cd8c82-7d59-48f9-9b1f-b8b6ad292087-humain-com/assets/images/images_2.png",
    link: "#",
  },
  {
    id: 4,
    category: "AI & INTELLIGENCE",
    title: "Core cognitive and analytical capabilities driving strategic decisions and automated progress.",
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1cd8c82-7d59-48f9-9b1f-b8b6ad292087-humain-com/assets/images/images_2.png",
    link: "#",
  },
];

export default function NewsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % newsData.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + newsData.length) % newsData.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(handleNext, 8000);
    return () => clearInterval(timer);
  }, [handleNext]);

    return (
      <section className="relative w-full bg-[#0f172a] py-[100px] md:py-[120px] overflow-hidden">
        <div className="container mx-auto px-6 md:px-8 max-w-[1440px] relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-[13px] font-semibold tracking-[0.15em] uppercase text-primary mb-4 block">
            Strategic Pillars
          </span>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-semibold leading-[1.1] tracking-[-0.02em] text-white">
            Powering Digital Transformation
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="relative flex items-center justify-center">
          <div className="relative w-full max-w-[1000px] h-[420px] sm:h-[480px] md:h-[520px] [perspective:2000px]">
            {newsData.map((item, index) => {
              const diff = (index - currentIndex + newsData.length) % newsData.length;
              const isVisible = diff >= 0 && diff <= 2;
              
              const scale = 1 - diff * 0.08;
              const translateY = diff * 35;
              const translateZ = -diff * 120;
              const opacity = diff === 0 ? 1 : diff === 1 ? 0.5 : diff === 2 ? 0.25 : 0;
              const zIndex = newsData.length - diff;

              return (
                <div
                  key={item.id}
                  className={cn(
                    "absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]",
                    !isVisible && "opacity-0 pointer-events-none"
                  )}
                  style={{
                    transform: `translate3d(0, ${translateY}px, ${translateZ}px) scale(${scale})`,
                    zIndex,
                    opacity,
                  }}
                >
                  <div className="relative h-full rounded-[24px] overflow-hidden border border-white/10 bg-[#1e293b] shadow-2xl">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover opacity-30"
                      priority={index === currentIndex}
                    />
                    
                    <div className="absolute inset-0 p-8 sm:p-12 md:p-14 flex flex-col justify-between z-10 bg-gradient-to-t from-[#0f172a]/95 via-[#0f172a]/50 to-transparent">
                      <div className="flex items-center gap-3">
                        <span className="text-[16px] md:text-[18px] font-semibold text-white tracking-wide">LUMERON</span>
                        <span className="text-white/30">|</span>
                        <span className="text-[11px] md:text-[12px] text-white/50 font-medium tracking-wider uppercase">Strategic Pillar</span>
                      </div>

                      <div className="space-y-5 max-w-2xl">
                        <p className="text-[12px] md:text-[13px] font-semibold tracking-[0.15em] text-primary uppercase">
                          {item.category}
                        </p>
                        <h3 className="text-[26px] sm:text-[32px] md:text-[38px] font-semibold leading-[1.15] text-white">
                          {item.title}
                        </h3>
                      </div>

                      <div className="pt-6">
                        <a 
                          href={item.link}
                          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white text-[#0f172a] font-semibold text-[14px] transition-all duration-300 hover:bg-primary hover:text-white"
                        >
                          Explore More
                          <ArrowUpRight size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 md:mt-16 flex items-center justify-center gap-8">
          <button 
            onClick={handlePrev}
            className="group flex items-center justify-center w-12 h-12 rounded-full border border-white/20 hover:border-primary hover:bg-primary transition-all duration-300"
            aria-label="Previous slide"
          >
            <ArrowLeft strokeWidth={1.5} size={20} className="text-white/60 group-hover:text-white transition-colors" />
          </button>

          <div className="flex gap-2">
            {newsData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-2 rounded-full transition-all duration-400",
                  currentIndex === index ? "w-8 bg-primary" : "w-2 bg-white/20 hover:bg-white/40"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={handleNext}
            className="group flex items-center justify-center w-12 h-12 rounded-full border border-white/20 hover:border-primary hover:bg-primary transition-all duration-300"
            aria-label="Next slide"
          >
            <ArrowRight strokeWidth={1.5} size={20} className="text-white/60 group-hover:text-white transition-colors" />
          </button>
        </div>
      </div>
    </section>
  );
}
