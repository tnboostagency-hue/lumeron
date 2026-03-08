"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const clients = [
  { name: 'Client 1',  logo: '/logos/allies/logo_1.png'  },
  { name: 'Client 2',  logo: '/logos/allies/logo_2.jpg'  },
  { name: 'Client 3',  logo: '/logos/allies/logo_3.png'  },
  { name: 'Client 4',  logo: '/logos/allies/logo_4.png'  },
  { name: 'Client 5',  logo: '/logos/allies/logo_5.png'  },
  { name: 'Client 6',  logo: '/logos/allies/logo_6.png'  },
  { name: 'Client 7',  logo: '/logos/allies/logo_7.png'  },
  { name: 'Client 8',  logo: '/logos/allies/logo_8.png'  },
  { name: 'Client 9',  logo: '/logos/allies/logo_9.png'  },
  { name: 'Client 10', logo: '/logos/allies/logo_10.png' },
  { name: 'Client 11', logo: '/logos/allies/logo_11.png' },
  { name: 'Client 12', logo: '/logos/allies/logo_12.png' },
  { name: 'Client 13', logo: '/logos/allies/logo_13.png' },
  { name: 'Client 14', logo: '/logos/allies/logo_14.png' },
  { name: 'Client 15', logo: '/logos/allies/logo_15.png' },
  { name: 'Client 16', logo: '/logos/allies/logo_16.png' },
  { name: 'Client 17', logo: '/logos/allies/logo_17.png' },
  { name: 'Client 18', logo: '/logos/allies/logo_18.png' },
  { name: 'Client 19', logo: '/logos/allies/logo_19.png' },
  { name: 'Client 20', logo: '/logos/allies/logo_20.png' },
  { name: 'Client 21', logo: '/logos/allies/logo_21.png' },
  { name: 'Client 22', logo: '/logos/allies/logo_22.png' },
  { name: 'Client 23', logo: '/logos/allies/logo_23.png' },
  { name: 'Client 24', logo: '/logos/allies/logo_24.png' },
  { name: 'Client 25', logo: '/logos/allies/logo_25.png' },
  { name: 'Client 26', logo: '/logos/allies/logo_26.png' },
  { name: 'Client 27', logo: '/logos/allies/logo_27.png' },
  { name: 'Client 28', logo: '/logos/allies/logo_28.png' },
  { name: 'Client 29', logo: '/logos/allies/logo_29.png' },
  { name: 'Client 30', logo: '/logos/allies/logo_30.png' },
  { name: 'Client 31', logo: '/logos/allies/logo_31.png' },
  { name: 'Client 32', logo: '/logos/allies/logo_32.png' },
  { name: 'Client 33', logo: '/logos/allies/logo_33.png' },
  { name: 'Client 34', logo: '/logos/allies/logo_34.png' },
  { name: 'Client 35', logo: '/logos/allies/logo_35.png' },
  { name: 'Client 36', logo: '/logos/allies/logo_36.png' },
  { name: 'Client 37', logo: '/logos/allies/logo_37.png' },
  { name: 'Client 38', logo: '/logos/allies/logo_38.jpg' },
  { name: 'Client 39', logo: '/logos/allies/logo_39.png' },
  { name: 'Client 40', logo: '/logos/allies/logo_40.jpg' },
  { name: 'Client 41', logo: '/logos/allies/logo_41.jpg' },
  { name: 'Client 42', logo: '/logos/allies/logo_42.jpg' },
  { name: 'Client 43', logo: '/logos/allies/logo_43.jpg' },
  { name: 'Client 44', logo: '/logos/allies/logo_44.jpg' },
  { name: 'Client 45', logo: '/logos/allies/logo_45.jpg' },
  { name: 'Client 46', logo: '/logos/allies/logo_46.jpg' },
  { name: 'Client 47', logo: '/logos/allies/logo_47.jpg' },
  { name: 'Client 48', logo: '/logos/allies/logo_48.png' },
];

const ROWS = 4;
const perRow = Math.ceil(clients.length / ROWS);
const rows = Array.from({ length: ROWS }, (_, i) =>
  clients.slice(i * perRow, (i + 1) * perRow)
);

interface MarqueeRowProps {
  items: typeof clients;
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
        {doubled.map((client, idx) => (
          <div
            key={`${client.logo}-${idx}`}
            className="flex-shrink-0 flex items-center justify-center mx-4 group"
            style={{ width: '160px', height: '80px' }}
          >
            <div className="relative w-full h-full transition-all duration-300 group-hover:scale-110">
              <Image
                src={client.logo}
                alt={client.name}
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

const OurClients: React.FC = () => {
  const { lang } = useLanguage();

  return (
    <section
      id="our-clients"
      className="relative py-20 md:py-28 overflow-hidden bg-white"
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
              {lang === 'ar' ? 'عملاؤنا' : 'Our Clients'}
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
              ? <>موثوق به من قِبل كبرى المؤسسات</>
              : <>Trusted by Saudi Arabia's<br />most ambitious organisations</>}
          </h2>

          <p
            className="text-[1rem] leading-[1.7] max-w-[680px] mx-auto"
            style={{ color: '#64748b' }}
          >
            {lang === 'ar'
              ? 'نفخر بخدمة نخبة من المؤسسات والشركات الرائدة في المملكة العربية السعودية وخارجها، ونلتزم بتقديم حلول متكاملة تلبي تطلعاتهم وتتجاوز توقعاتهم.'
              : 'We are proud to serve a distinguished portfolio of leading organisations across Saudi Arabia and beyond, delivering tailored solutions that meet their ambitions and exceed expectations.'}
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

    </section>
  );
};

export default OurClients;
