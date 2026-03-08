"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const allies = [
  { name: 'Ally 1',  logo: '/logos/strategic-allies/logo_1.png'  },
  { name: 'Ally 2',  logo: '/logos/strategic-allies/logo_2.jpg'  },
  { name: 'Ally 3',  logo: '/logos/strategic-allies/logo_3.png'  },
  { name: 'Ally 4',  logo: '/logos/strategic-allies/logo_4.png'  },
  { name: 'Ally 5',  logo: '/logos/strategic-allies/logo_5.png'  },
  { name: 'Ally 6',  logo: '/logos/strategic-allies/logo_6.png'  },
  { name: 'Ally 7',  logo: '/logos/strategic-allies/logo_7.png'  },
  { name: 'Ally 8',  logo: '/logos/strategic-allies/logo_8.png'  },
  { name: 'Ally 9',  logo: '/logos/strategic-allies/logo_9.png'  },
  { name: 'Ally 10', logo: '/logos/strategic-allies/logo_10.png' },
  { name: 'Ally 11', logo: '/logos/strategic-allies/logo_11.png' },
  { name: 'Ally 12', logo: '/logos/strategic-allies/logo_12.png' },
  { name: 'Ally 13', logo: '/logos/strategic-allies/logo_13.png' },
  { name: 'Ally 14', logo: '/logos/strategic-allies/logo_14.png' },
  { name: 'Ally 15', logo: '/logos/strategic-allies/logo_15.png' },
  { name: 'Ally 16', logo: '/logos/strategic-allies/logo_16.png' },
  { name: 'Ally 17', logo: '/logos/strategic-allies/logo_17.png' },
  { name: 'Ally 18', logo: '/logos/strategic-allies/logo_18.png' },
  { name: 'Ally 19', logo: '/logos/strategic-allies/logo_19.png' },
  { name: 'Ally 20', logo: '/logos/strategic-allies/logo_20.png' },
  { name: 'Ally 21', logo: '/logos/strategic-allies/logo_21.png' },
  { name: 'Ally 22', logo: '/logos/strategic-allies/logo_22.png' },
  { name: 'Ally 23', logo: '/logos/strategic-allies/logo_23.png' },
  { name: 'Ally 24', logo: '/logos/strategic-allies/logo_24.png' },
  { name: 'Ally 25', logo: '/logos/strategic-allies/logo_25.png' },
  { name: 'Ally 26', logo: '/logos/strategic-allies/logo_26.png' },
  { name: 'Ally 27', logo: '/logos/strategic-allies/logo_27.png' },
  { name: 'Ally 28', logo: '/logos/strategic-allies/logo_28.png' },
  { name: 'Ally 29', logo: '/logos/strategic-allies/logo_29.png' },
  { name: 'Ally 30', logo: '/logos/strategic-allies/logo_30.png' },
  { name: 'Ally 31', logo: '/logos/strategic-allies/logo_31.png' },
  { name: 'Ally 32', logo: '/logos/strategic-allies/logo_32.png' },
  { name: 'Ally 33', logo: '/logos/strategic-allies/logo_33.png' },
  { name: 'Ally 34', logo: '/logos/strategic-allies/logo_34.png' },
  { name: 'Ally 35', logo: '/logos/strategic-allies/logo_35.png' },
  { name: 'Ally 36', logo: '/logos/strategic-allies/logo_36.png' },
  { name: 'Ally 37', logo: '/logos/strategic-allies/logo_37.png' },
  { name: 'Ally 38', logo: '/logos/strategic-allies/logo_38.jpg' },
  { name: 'Ally 39', logo: '/logos/strategic-allies/logo_39.png' },
  { name: 'Ally 40', logo: '/logos/strategic-allies/logo_40.jpg' },
  { name: 'Ally 41', logo: '/logos/strategic-allies/logo_41.jpg' },
  { name: 'Ally 42', logo: '/logos/strategic-allies/logo_42.jpg' },
  { name: 'Ally 43', logo: '/logos/strategic-allies/logo_43.jpg' },
  { name: 'Ally 44', logo: '/logos/strategic-allies/logo_44.jpg' },
  { name: 'Ally 45', logo: '/logos/strategic-allies/logo_45.jpg' },
  { name: 'Ally 46', logo: '/logos/strategic-allies/logo_46.jpg' },
  { name: 'Ally 47', logo: '/logos/strategic-allies/logo_47.jpg' },
  { name: 'Ally 48', logo: '/logos/strategic-allies/logo_48.png' },
  { name: 'Ally 49', logo: '/logos/strategic-allies/logo_49.png' },
  { name: 'Ally 50', logo: '/logos/strategic-allies/logo_50.png' },
  { name: 'Ally 51', logo: '/logos/strategic-allies/logo_51.png' },
  { name: 'Ally 52', logo: '/logos/strategic-allies/logo_52.jpg' },
  { name: 'Ally 53', logo: '/logos/strategic-allies/logo_53.png' },
  { name: 'Ally 54', logo: '/logos/strategic-allies/logo_54.jpg' },
  { name: 'Ally 55', logo: '/logos/strategic-allies/logo_55.jpg' },
  { name: 'Ally 56', logo: '/logos/strategic-allies/logo_56.png' },
  { name: 'Ally 57', logo: '/logos/strategic-allies/logo_57.jpg' },
  { name: 'Ally 58', logo: '/logos/strategic-allies/logo_58.png' },
  { name: 'Ally 59', logo: '/logos/strategic-allies/logo_59.png' },
  { name: 'Ally 60', logo: '/logos/strategic-allies/logo_60.png' },
  { name: 'Ally 61', logo: '/logos/strategic-allies/logo_61.png' },
];

const ROWS = 4;
const perRow = Math.ceil(allies.length / ROWS);
const rows = Array.from({ length: ROWS }, (_, i) =>
  allies.slice(i * perRow, (i + 1) * perRow)
);

interface MarqueeRowProps {
  items: typeof allies;
  direction: 'left' | 'right';
  speed: number;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ items, direction, speed }) => {
  const doubled = [...items, ...items];
  return (
    <div className="relative w-full overflow-hidden">
      <div
        className="flex"
        style={{
          animation: `marquee-${direction} ${speed}s linear infinite`,
          width: 'max-content',
        }}
      >
        {doubled.map((ally, idx) => (
          <div
            key={`${ally.logo}-${idx}`}
            className="flex-shrink-0 flex items-center justify-center mx-4 group"
            style={{ width: '160px', height: '80px' }}
          >
            <div className="relative w-full h-full transition-all duration-300 group-hover:scale-110">
              <Image
                src={ally.logo}
                alt={ally.name}
                fill
                sizes="160px"
                className="object-contain opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StrategyAllies: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <section
      id="strategic-allies"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: '#ffffff' }}
    >
      <style>{`
        @keyframes marquee-left {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marquee-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      {/* Subtle dot background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(34,147,136,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-32 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to right, #ffffff, transparent)' }} />
      <div className="absolute inset-y-0 right-0 w-32 pointer-events-none z-10"
        style={{ background: 'linear-gradient(to left, #ffffff, transparent)' }} />

      {/* Header */}
      <div className="relative z-10 container px-6 md:px-8 max-w-[900px] mx-auto mb-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-[#229388]" />
            <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#229388]">
              {lang === 'ar' ? 'حلفاؤنا الاستراتيجيون' : 'Strategic Allies'}
            </span>
            <div className="w-8 h-px bg-[#229388]" />
          </div>

          <h2
            className="font-bold leading-tight mb-5"
            style={{
              fontFamily: '"Avenir Next Arabic","Inter",sans-serif',
              fontSize: 'clamp(28px,3.5vw,48px)',
              color: '#111827',
              letterSpacing: '-0.025em',
            }}
          >
            {lang === 'ar'
              ? <>شراكات استراتيجية تصنع المستقبل</>
              : <>Strategic Alliances That<br />Shape the Future</>}
          </h2>

          <p
            className="text-[1rem] leading-[1.7] max-w-[680px] mx-auto"
            style={{ color: '#64748b' }}
          >
            {lang === 'ar'
              ? 'نبني شراكات استراتيجية مع أبرز المؤسسات والمنظمات على المستوى المحلي والدولي، لتعزيز الابتكار وتحقيق أهداف رؤية المملكة 2030.'
              : 'We forge deep strategic alliances with leading local and global institutions, accelerating innovation and delivering on the ambitions of Saudi Vision 2030 together.'}
          </p>
        </motion.div>
      </div>

      {/* 4 Marquee rows — alternating directions */}
      <div className="relative z-0 flex flex-col gap-4">
        {rows.map((row, i) => (
          <MarqueeRow
            key={i}
            items={row}
            direction={i % 2 === 0 ? 'left' : 'right'}
            speed={28 + i * 4}
          />
        ))}
      </div>

      {/* Bottom label */}
      <div className="relative z-10 container px-6 md:px-8 max-w-[1440px] mx-auto mt-12 text-center">
        <p
          className="text-[11px] font-semibold tracking-[0.12em] uppercase"
          style={{ color: 'rgba(255,255,255,0.25)' }}
        >
          {lang === 'ar'
            ? '· حلفاء موثوقون في رؤية المملكة 2030 ·'
            : '· Trusted strategic allies across Saudi Vision 2030 ·'}
        </p>
      </div>
    </section>
  );
};

export default StrategyAllies;
