"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const clientFiles = [
  "image1.png",
  "image2.png",
  "image3.png",
  "image4.png",
  "image5.jpg",
  "image6.png",
  "image7.jpg",
  "image8.jpg",
  "image9.png",
  "image10.jpg",
  "image11.png",
  "image12.png",
  "image13.png",
  "image14.jpg",
  "image15.png",
  "image16.png",
  "image17.png",
  "image18.png",
  "image19.jpg",
  "image20.jpg",
  "image21.png",
  "image22.jpg",
  "image23.png",
  "image24.png",
  "image25.png",
  "image26.png",
  "image27.png",
  "image28.png",
  "image29.jpg",
  "image30.jpg",
  "image31.jpg",
  "image32.png",
  "image33.png",
  "image34.png",
  "image35.png",
  "image36.png",
  "image37.jpg",
  "image38.jpg",
  "image39.jpg",
  "image40.png",
  "image41.jpeg",
  "image42.png",
];

const clients = clientFiles.map((logo, idx) => ({
  name: `Client ${idx + 1}`,
  logo: `/logos/clients/${logo}`,
}));

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
  const isAr = lang === "ar";

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
      <div
        dir={isAr ? "rtl" : "ltr"}
        className={`relative z-10 container px-6 md:px-8 max-w-[900px] mx-auto mb-14 text-center ${isAr ? "font-sans" : ""}`}
      >
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

        </motion.div>
      </div>

      {/* 4 Marquee rows — alternating directions */}
      <div dir="ltr" className="relative z-0 flex flex-col gap-4">
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
