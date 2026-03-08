"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const allies = [
  { name: 'Partner 1', logo: '/logos/allies/logo_1.png' },
  { name: 'Partner 2', logo: '/logos/allies/logo_2.jpg' },
  { name: 'Partner 3', logo: '/logos/allies/logo_3.png' },
  { name: 'Partner 4', logo: '/logos/allies/logo_4.png' },
  { name: 'Partner 5', logo: '/logos/allies/logo_5.png' },
  { name: 'Partner 6', logo: '/logos/allies/logo_6.png' },
  { name: 'Partner 7', logo: '/logos/allies/logo_7.png' },
  { name: 'Partner 8', logo: '/logos/allies/logo_8.png' },
  { name: 'Partner 9', logo: '/logos/allies/logo_9.png' },
  { name: 'Partner 10', logo: '/logos/allies/logo_10.png' },
  { name: 'Partner 11', logo: '/logos/allies/logo_11.png' },
  { name: 'Partner 12', logo: '/logos/allies/logo_12.png' },
  { name: 'Partner 13', logo: '/logos/allies/logo_13.png' },
  { name: 'Partner 14', logo: '/logos/allies/logo_14.png' },
  { name: 'Partner 15', logo: '/logos/allies/logo_15.png' },
  { name: 'Partner 16', logo: '/logos/allies/logo_16.png' },
  { name: 'Partner 17', logo: '/logos/allies/logo_17.png' },
  { name: 'Partner 18', logo: '/logos/allies/logo_18.png' },
  { name: 'Partner 19', logo: '/logos/allies/logo_19.png' },
  { name: 'Partner 20', logo: '/logos/allies/logo_20.png' },
  { name: 'Partner 21', logo: '/logos/allies/logo_21.png' },
  { name: 'Partner 22', logo: '/logos/allies/logo_22.png' },
  { name: 'Partner 23', logo: '/logos/allies/logo_23.png' },
  { name: 'Partner 24', logo: '/logos/allies/logo_24.png' },
  { name: 'Partner 25', logo: '/logos/allies/logo_25.png' },
  { name: 'Partner 26', logo: '/logos/allies/logo_26.png' },
  { name: 'Partner 27', logo: '/logos/allies/logo_27.png' },
  { name: 'Partner 28', logo: '/logos/allies/logo_28.png' },
  { name: 'Partner 29', logo: '/logos/allies/logo_29.png' },
  { name: 'Partner 30', logo: '/logos/allies/logo_30.png' },
  { name: 'Partner 31', logo: '/logos/allies/logo_31.png' },
  { name: 'Partner 32', logo: '/logos/allies/logo_32.png' },
  { name: 'Partner 33', logo: '/logos/allies/logo_33.png' },
  { name: 'Partner 34', logo: '/logos/allies/logo_34.png' },
  { name: 'Partner 35', logo: '/logos/allies/logo_35.png' },
  { name: 'Partner 36', logo: '/logos/allies/logo_36.png' },
  { name: 'Partner 37', logo: '/logos/allies/logo_37.png' },
  { name: 'Partner 38', logo: '/logos/allies/logo_38.jpg' },
  { name: 'Partner 39', logo: '/logos/allies/logo_39.png' },
  { name: 'Partner 40', logo: '/logos/allies/logo_40.jpg' },
  { name: 'Partner 41', logo: '/logos/allies/logo_41.jpg' },
  { name: 'Partner 42', logo: '/logos/allies/logo_42.jpg' },
  { name: 'Partner 43', logo: '/logos/allies/logo_43.jpg' },
  { name: 'Partner 44', logo: '/logos/allies/logo_44.jpg' },
  { name: 'Partner 45', logo: '/logos/allies/logo_45.jpg' },
  { name: 'Partner 46', logo: '/logos/allies/logo_46.jpg' },
  { name: 'Partner 47', logo: '/logos/allies/logo_47.jpg' },
  { name: 'Partner 48', logo: '/logos/allies/logo_48.png' },
  { name: 'Partner 49', logo: '/logos/allies/logo_49.png' },
];

// 7 columns per row → 7 rows of 7 = 49
const COLS = 7;
const rows = Array.from({ length: Math.ceil(allies.length / COLS) }, (_, i) =>
  allies.slice(i * COLS, (i + 1) * COLS)
);

interface ClientsGridProps {
  variant?: 'default' | 'dark';
}

const ClientsGrid: React.FC<ClientsGridProps> = ({ variant = 'default' }) => {
  const { lang } = useLanguage();
  const isDark = variant === 'dark';

  return (
    <section
      id={isDark ? 'clients-footer' : 'clients'}
      className="relative py-20 md:py-28 overflow-hidden"
      style={{
        background: isDark
          ? 'linear-gradient(135deg, #0d2e2c 0%, #0f3532 50%, #0d2e2c 100%)'
          : 'white',
      }}
    >
      {/* Background decoration */}
      {isDark ? (
        <>
          <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(34,147,136,0.07) 1px,transparent 1px),linear-gradient(90deg,rgba(34,147,136,0.07) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(34,147,136,0.12) 0%, transparent 70%)' }} />
        </>
      ) : (
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(34,147,136,0.05) 1px,transparent 1px)', backgroundSize: '28px 28px' }} />
      )}

      <div className="relative z-10 container px-6 md:px-8 max-w-[1440px] mx-auto mb-12 md:mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-5 h-px bg-[#229388]" />
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-[#229388]">
                {lang === 'ar' ? 'شركاؤنا' : 'Our Partners'}
              </span>
            </div>
            <h2
              className="font-bold leading-tight"
              style={{
                fontFamily: '"Avenir Next Arabic","Inter",sans-serif',
                fontSize: 'clamp(28px,3.5vw,48px)',
                color: isDark ? 'white' : '#111827',
                letterSpacing: '-0.025em',
              }}
            >
              {lang === 'ar'
                ? <>بناء المستقبل الرقمي<br />لكبرى المؤسسات السعودية</>
                : <>Trusted by Saudi Arabia's<br />most ambitious organisations</>}
            </h2>
          </div>

          <div className="flex items-center gap-6 flex-shrink-0">
            <div className="text-center">
              <div className="font-bold text-[32px] leading-none" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', color: '#229388', letterSpacing: '-0.02em' }}>49<span style={{ fontSize: '0.5em' }}>+</span></div>
              <div className="text-[11px] font-semibold tracking-[0.1em] uppercase mt-1" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#94a3b8' }}>
                {lang === 'ar' ? 'شريك' : 'Partners'}
              </div>
            </div>
            <div className="w-px h-10" style={{ background: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }} />
            <div className="text-center">
              <div className="font-bold text-[32px] leading-none" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', color: '#229388', letterSpacing: '-0.02em' }}>12<span style={{ fontSize: '0.5em' }}>+</span></div>
              <div className="text-[11px] font-semibold tracking-[0.1em] uppercase mt-1" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#94a3b8' }}>
                {lang === 'ar' ? 'قطاع' : 'Sectors'}
              </div>
            </div>
            <div className="w-px h-10" style={{ background: isDark ? 'rgba(255,255,255,0.1)' : '#e2e8f0' }} />
            <div className="text-center">
              <div className="font-bold text-[32px] leading-none" style={{ fontFamily: '"Avenir Next Arabic","Inter",sans-serif', color: '#229388', letterSpacing: '-0.02em' }}>9<span style={{ fontSize: '0.5em' }}>yr</span></div>
              <div className="text-[11px] font-semibold tracking-[0.1em] uppercase mt-1" style={{ color: isDark ? 'rgba(255,255,255,0.5)' : '#94a3b8' }}>
                {lang === 'ar' ? 'خبرة' : 'Experience'}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Grid with visible row & column lines */}
      <div className="relative z-10 container px-6 md:px-8 max-w-[1440px] mx-auto">
        <div
          className="w-full"
          style={{
            border: isDark ? '1px solid rgba(34,147,136,0.25)' : '1px solid #e2e8f0',
          }}
        >
          {rows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className="flex"
              style={{
                borderBottom:
                  rowIdx < rows.length - 1
                    ? isDark
                      ? '1px solid rgba(34,147,136,0.25)'
                      : '1px solid #e2e8f0'
                    : 'none',
              }}
            >
              {row.map((ally, colIdx) => (
                <div
                  key={ally.logo}
                  className="flex items-center justify-center group"
                  style={{
                    flex: 1,
                    borderRight:
                      colIdx < row.length - 1
                        ? isDark
                          ? '1px solid rgba(34,147,136,0.25)'
                          : '1px solid #e2e8f0'
                        : 'none',
                    padding: '20px 12px',
                    minHeight: '96px',
                    background: 'transparent',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.background = isDark
                      ? 'rgba(34,147,136,0.08)'
                      : '#f0fdfc';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.background = 'transparent';
                  }}
                >
                  <div className="relative w-full h-[60px]">
                    <Image
                      src={ally.logo}
                      alt={ally.name}
                      fill
                      sizes="(max-width: 768px) 120px, 180px"
                      className="object-contain transition-all duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>
              ))}
              {/* Fill empty cells in last row */}
              {row.length < COLS &&
                Array.from({ length: COLS - row.length }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    style={{
                      flex: 1,
                      borderRight:
                        row.length + i < COLS - 1
                          ? isDark
                            ? '1px solid rgba(34,147,136,0.25)'
                            : '1px solid #e2e8f0'
                          : 'none',
                      minHeight: '96px',
                    }}
                  />
                ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom label */}
      <div className="relative z-10 container px-6 md:px-8 max-w-[1440px] mx-auto mt-10">
        <p className="text-[12px] font-medium tracking-[0.08em] uppercase" style={{ color: isDark ? 'rgba(255,255,255,0.3)' : '#cbd5e1' }}>
          {lang === 'ar' ? '· شركاء موثوقون في رؤية المملكة 2030 ·' : '· Partners in Saudi Vision 2030 ·'}
        </p>
      </div>
    </section>
  );
};

export default ClientsGrid;
