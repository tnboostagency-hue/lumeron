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

const COLS_PER_ROW = 8;
const rows = Array.from(
  { length: Math.ceil(allies.length / COLS_PER_ROW) },
  (_, i) => allies.slice(i * COLS_PER_ROW, (i + 1) * COLS_PER_ROW)
);

const StrategyAllies: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <section
      id="strategic-allies"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ background: '#ffffff' }}
    >
      {/* Subtle dot background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(34,147,136,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

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

      {/* Fixed table — partner logos in a stable grid */}
      <div className="relative z-10 container px-6 md:px-8 max-w-[1200px] mx-auto">
        <div
          className="w-full overflow-hidden rounded-xl border border-[#e2e8f0] bg-white"
          style={{ boxShadow: '0 2px 16px rgba(34,147,136,0.06)' }}
        >
          <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
            <tbody>
              {rows.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  style={{
                    borderBottom: rowIdx < rows.length - 1 ? '1px solid #e2e8f0' : 'none',
                  }}
                >
                  {row.map((ally, colIdx) => (
                    <td
                      key={ally.logo}
                      className="p-4 md:p-6 group transition-colors duration-200 hover:bg-[#f0fdfc] align-middle text-center"
                      style={{
                        width: `${100 / COLS_PER_ROW}%`,
                        borderRight: colIdx < row.length - 1 ? '1px solid #e2e8f0' : 'none',
                        minHeight: '100px',
                      }}
                    >
                      <div className="relative w-full max-w-[140px] h-[56px] md:h-[64px] mx-auto">
                        <Image
                          src={ally.logo}
                          alt={ally.name}
                          fill
                          sizes="140px"
                          className="object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                        />
                      </div>
                    </td>
                  ))}
                  {/* Fill empty cells in last row */}
                  {row.length < COLS_PER_ROW &&
                    Array.from({ length: COLS_PER_ROW - row.length }).map((_, i) => (
                      <td
                        key={`empty-${i}`}
                        style={{
                          width: `${100 / COLS_PER_ROW}%`,
                          borderRight: row.length + i < COLS_PER_ROW - 1 ? '1px solid #e2e8f0' : 'none',
                          minHeight: '100px',
                        }}
                      />
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom label */}
      <div className="relative z-10 container px-6 md:px-8 max-w-[1440px] mx-auto mt-10 text-center">
        <p className="text-[12px] font-medium tracking-[0.08em] uppercase text-[#94a3b8]">
          {lang === 'ar'
            ? '· حلفاء موثوقون في رؤية المملكة 2030 ·'
            : '· Trusted strategic allies across Saudi Vision 2030 ·'}
        </p>
      </div>
    </section>
  );
};

export default StrategyAllies;
