"use client";

import React from 'react';
import { Network, Globe2, Target, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ParallaxWrapper from '@/components/animations/parallax-wrapper';
import FloatingElement from '@/components/animations/floating-element';
import { useLanguage } from '@/context/LanguageContext';

interface CTABottomProps {
  onConnectClick?: () => void;
}

const CTABottom: React.FC<CTABottomProps> = ({ onConnectClick }) => {
  const { lang, t } = useLanguage();
  
  const features = [
    { 
      icon: Network, 
      title: t.cta.features[0].title, 
      desc: t.cta.features[0].desc 
    },
    { 
      icon: Globe2, 
      title: t.cta.features[1].title, 
      desc: t.cta.features[1].desc 
    },
    { 
      icon: Target, 
      title: t.cta.features[2].title, 
      desc: t.cta.features[2].desc 
    }
  ];

  return (
        <section className="bg-section-alt py-[80px] md:py-[120px] overflow-hidden relative">
        {/* Background floating elements */}
        <FloatingElement speed={0.15} rotationFactor={0.2} className="absolute top-[10%] right-[5%] opacity-10 pointer-events-none">
          <div className="w-24 h-24 border border-[#229388]/30 rounded-xl rotate-12" />
        </FloatingElement>
        <FloatingElement speed={0.1} rotationFactor={-0.15} className="absolute bottom-[15%] left-[8%] opacity-10 pointer-events-none">
          <div className="w-16 h-16 border border-[#3ec8ba]/20 rounded-full" />
        </FloatingElement>
        
        <div className="container mx-auto px-6 md:px-8 max-w-[1200px] relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-tagline mb-4 block">{t.cta.badge}</span>
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground">
            {lang === 'ar' ? (
              <>لماذا <span className="text-primary">لوميرون؟</span></>
            ) : (
              <>Why <span className="text-primary">Lumeron?</span></>
            )}
          </h2>
        </motion.div>

        {/* Features Grid with parallax */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
            {features.map((item, i) => (
              <ParallaxWrapper key={i} speed={0.05 * (i - 1)}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group bg-white p-8 md:p-10 border border-border rounded-[20px] transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 h-full"
                >
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <item.icon size={26} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-[20px] md:text-[22px] font-semibold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-[15px] md:text-[16px] leading-[1.7]">{item.desc}</p>
                </motion.div>
              </ParallaxWrapper>
            ))}
          </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center max-w-[700px] mx-auto"
        >
            <a 
              href="#contact" 
              onClick={onConnectClick ? (e) => { e.preventDefault(); onConnectClick(); } : undefined}
              className="btn-primary group inline-flex items-center justify-center gap-3 px-10 py-4 w-full sm:w-auto"
            >
            {t.cta.button}
            <ArrowRight size={18} className={`transition-transform duration-300 ${lang === 'ar' ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CTABottom;
