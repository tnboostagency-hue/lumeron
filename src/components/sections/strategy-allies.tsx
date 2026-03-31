"use client";

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

function LogoCard({ ally }: { ally: { name: string; logo: string } }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 300, damping: 25 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const relX = (e.clientX - centerX) / rect.width;
    const relY = (e.clientY - centerY) / rect.height;
    x.set(relX);
    y.set(relY);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      whileHover={{
        scale: 1.08,
        transition: { type: 'spring', stiffness: 400, damping: 25 },
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="group/card relative w-full max-w-[200px] h-[80px] md:h-[96px] mx-auto origin-center cursor-default"
    >
      <motion.div
        style={{ transform: 'translateZ(24px)' }}
        className="relative w-full h-full rounded-lg"
      >
        <Image
          src={ally.logo}
          alt={ally.name}
          fill
          sizes="200px"
          className="object-contain opacity-80 group-hover/card:opacity-100 transition-opacity duration-300"
        />
      </motion.div>
      {/* Soft glow on hover */}
      <div
        className="absolute inset-[-12px] rounded-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none -z-10"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 50%, rgba(34,147,136,0.12) 0%, transparent 70%)',
          filter: 'blur(8px)',
        }}
      />
    </motion.div>
  );
}

const allies = [
  { name: 'Cisco', logo: '/logos/partners/Cisco.jpeg' },
  { name: 'CommScope', logo: '/logos/partners/CommScope.png' },
  { name: 'CPI Chatsworth', logo: '/logos/partners/CPI_Chatsworth.png' },
  { name: 'Dell Technologies', logo: '/logos/partners/Dell_Technologies.png' },
  { name: 'Fortinet', logo: '/logos/partners/Fortinet.png' },
  { name: 'Honeywell', logo: '/logos/partners/Honeywell.png' },
  { name: 'HPE', logo: '/logos/partners/HPE.jpeg' },
  { name: 'LenelS2', logo: '/logos/partners/LenelS2.jpeg' },
  { name: 'Microsoft', logo: '/logos/partners/Microsoft.png' },
  { name: 'SAP', logo: '/logos/partners/SAP.png' },
  { name: 'Siemens', logo: '/logos/partners/Siemens.png' },
  { name: 'VMware', logo: '/logos/partners/VMware.jpeg' },
];

const COLS_PER_ROW = 4;
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
                      className="p-4 md:p-6 transition-colors duration-200 hover:bg-[#f8fffe] align-middle text-center"
                      style={{
                        width: `${100 / COLS_PER_ROW}%`,
                        borderRight: colIdx < row.length - 1 ? '1px solid #e2e8f0' : 'none',
                        minHeight: '140px',
                        perspective: '1200px',
                      }}
                    >
                      <LogoCard ally={ally} />
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
                          minHeight: '140px',
                        }}
                      />
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </section>
  );
};

export default StrategyAllies;
