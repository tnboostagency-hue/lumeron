"use client";

import React from 'react';
import { Target, Lightbulb, Compass, Rocket, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ParallaxWrapper from '@/components/animations/parallax-wrapper';
import FloatingElement from '@/components/animations/floating-element';
import { useLanguage } from '@/context/LanguageContext';

const MissionStatement: React.FC = () => {
  const { lang, t } = useLanguage();
  
  const pillars = [
    { 
      icon: Target, 
      title: t.mission.pillars.precision, 
      description: t.mission.pillars.precisionDesc
    },
    { 
      icon: Lightbulb, 
      title: t.mission.pillars.innovation, 
      description: t.mission.pillars.innovationDesc
    },
    { 
      icon: Compass, 
      title: t.mission.pillars.guidance, 
      description: t.mission.pillars.guidanceDesc
    },
    { 
      icon: Rocket, 
      title: t.mission.pillars.growth, 
      description: t.mission.pillars.growthDesc
    },
  ];

  return (
        <section className="relative w-full py-[80px] md:py-[140px] bg-[#0f172a] overflow-hidden">
        {/* Background elements with parallax */}
        <div className="absolute inset-0 z-0">
          <ParallaxWrapper speed={-0.25} className="absolute top-0 right-0">
            <div className="w-[600px] h-[600px] bg-gradient-to-bl from-[#229388]/20 via-transparent to-transparent rounded-full blur-3xl" />
          </ParallaxWrapper>
          <ParallaxWrapper speed={-0.15} className="absolute bottom-0 left-0">
            <div className="w-[500px] h-[500px] bg-gradient-to-tr from-[#3ec8ba]/10 via-transparent to-transparent rounded-full blur-3xl" />
          </ParallaxWrapper>
          {/* Grid pattern */}
          <ParallaxWrapper speed={-0.05} className="absolute inset-0">
            <div 
              className="w-full h-full opacity-[0.03]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: '80px 80px'
              }}
            />
          </ParallaxWrapper>
          
          {/* Floating decorative elements */}
          <FloatingElement speed={0.2} rotationFactor={0.3} className="absolute top-[15%] left-[8%] opacity-10">
            <div className="w-20 h-20 border border-white/20 rounded-lg rotate-12" />
          </FloatingElement>
          <FloatingElement speed={0.15} rotationFactor={-0.2} className="absolute bottom-[20%] right-[12%] opacity-10">
            <div className="w-14 h-14 border border-[#3ec8ba]/30 rounded-full" />
          </FloatingElement>
        </div>

      <div className="container mx-auto px-6 md:px-8 max-w-[1200px] relative z-10">
        {/* Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
            <span className="text-[12px] md:text-[13px] font-semibold tracking-[0.15em] uppercase text-white/80">
              {t.mission.badge}
            </span>
          </div>
        </motion.div>

        {/* Main Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[30px] sm:text-[42px] md:text-[56px] font-semibold leading-[1.1] tracking-[-0.02em] mb-6 text-white text-center"
        >
          {lang === 'ar' ? (
            <>نسعى <span className="text-primary">للكمال</span>، ونرضى <span className="underline decoration-primary/50 underline-offset-8 decoration-2">بالتميز</span>.</>
          ) : (
            <>Strive for <span className="text-primary">Perfection</span>,<br />
            Settle for <span className="underline decoration-primary/50 underline-offset-8 decoration-2">Excellence</span>.</>
          )}
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[15px] md:text-[18px] leading-[1.7] text-white/70 text-center max-w-[800px] mx-auto mb-12"
        >
          {t.mission.description}
        </motion.p>

        {/* Pillars Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12"
        >
          {pillars.map((pillar, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center text-primary mb-4 transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:border-primary">
                <pillar.icon size={26} strokeWidth={1.5} />
              </div>
              <h4 className="text-white font-semibold text-[15px] uppercase tracking-wider mb-2">{pillar.title}</h4>
              <p className="text-white/50 text-[13px] leading-relaxed max-w-[160px]">{pillar.description}</p>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center"
        >
          <a 
            href="/about"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 bg-white text-[#0f172a] hover:bg-primary hover:text-white"
          >
            {t.mission.roadmap}
            <ArrowRight size={18} className={`transition-transform duration-300 ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionStatement;
