"use client";

import React from 'react';
import { Shield, Cpu, CloudLightning, Activity } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const allies = [
  { name: 'MASCO GROUP', logo: '/logos/masco_group.png' },
  { name: 'ARAMCO DIGITAL', logo: '/logos/aramco_digital.png' },
  { name: 'ARAMCO', logo: '/logos/aramco.png' },
  { name: 'TOTALENERGIES', logo: '/logos/totalenergies.png' },
  { name: 'AWS', logo: '/logos/aws.png' },
  { name: 'AZURE', logo: '/logos/azure.png' },
  { name: 'GOOGLE CLOUD', logo: '/logos/google_cloud.png' },
  { name: 'HUAWEI', logo: '/logos/huawei.png' },
  { name: 'Siemens', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b1cd8c82-7d59-48f9-9b1f-b8b6ad292087/Siemens-resized-1771512113300.webp?width=400&height=400&resize=contain' },
  { name: 'CommScope', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b1cd8c82-7d59-48f9-9b1f-b8b6ad292087/CommScope-resized-1771512113318.webp?width=400&height=400&resize=contain' },
  { name: 'Thingworx', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b1cd8c82-7d59-48f9-9b1f-b8b6ad292087/ThingWorx-1771512112829.png?width=400&height=400&resize=contain' },
  { name: 'Dell Technologies', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b1cd8c82-7d59-48f9-9b1f-b8b6ad292087/Dell-resized-1771512113298.webp?width=400&height=400&resize=contain' },
  { name: 'Chatsworth Products', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b1cd8c82-7d59-48f9-9b1f-b8b6ad292087/CPI-1771512112829.png?width=400&height=400&resize=contain' },
  { name: 'Honeywell', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b1cd8c82-7d59-48f9-9b1f-b8b6ad292087/Honeywell-1771512112984.png?width=400&height=400&resize=contain' },
  { name: 'HPE', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b1cd8c82-7d59-48f9-9b1f-b8b6ad292087/HPE-1771512112829.png?width=400&height=400&resize=contain' },
];

// Split into two rows
const row1 = allies.slice(0, 8);
const row2 = allies.slice(8);

interface MarqueeRowProps {
  items: typeof allies;
  direction?: 'left' | 'right';
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ items, direction = 'left' }) => {
  // Duplicate for seamless loop
  const doubled = [...items, ...items];
  const translateTo = direction === 'left' ? '-50%' : '0%';
  const translateFrom = direction === 'left' ? '0%' : '-50%';

  return (
    <div className="relative w-full overflow-hidden">
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-white to-transparent" />
      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-white to-transparent" />

      <motion.div
        className="flex gap-10 md:gap-14 items-center"
        style={{ width: 'max-content' }}
        animate={{ x: [translateFrom, translateTo] }}
        transition={{
          duration: 22,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {doubled.map((ally, i) => (
          <div
            key={`${ally.name}-${i}`}
            className="relative flex-shrink-0 w-[100px] sm:w-[120px] md:w-[140px] h-[52px] md:h-[60px] grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          >
            <Image
              src={ally.logo}
              alt={ally.name}
              fill
              sizes="140px"
              className="object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const StrategicAllies: React.FC = () => {
  const { lang } = useLanguage();

  const stats = [
    { label: lang === 'ar' ? "ضمان وقت التشغيل" : "Uptime Guarantee", value: "99.99%", icon: Activity },
    { label: lang === 'ar' ? "بروتوكول الأمان" : "Security Protocol", value: "L-SOC", icon: Shield },
    { label: lang === 'ar' ? "قدرة الحوسبة" : "Compute Power", value: lang === 'ar' ? "فائقة النطاق" : "Hyperscale", icon: Cpu },
    { label: lang === 'ar' ? "اتصال السحابة" : "Cloud Connectivity", value: lang === 'ar' ? "متعدد السحابة" : "Multi-Cloud", icon: CloudLightning },
  ];

  return (
    <section className="bg-white py-[80px] md:py-[120px] flex flex-col items-center justify-center overflow-hidden">
      <div className="container px-6 md:px-8 max-w-[1440px] mx-auto">

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mb-16 md:mb-24"
        >
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                <stat.icon size={24} strokeWidth={1.5} />
              </div>
              <p className="text-[22px] sm:text-[28px] md:text-[36px] font-semibold text-foreground tracking-tight mb-1 leading-tight">{stat.value}</p>
              <p className="text-[12px] md:text-[13px] font-semibold text-primary uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-16 md:mb-20" />

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="text-tagline mb-3 block">
            {lang === 'ar' ? "شركاء موثوقون" : "Trusted Partners"}
          </span>
          <h2 className="text-[28px] sm:text-[34px] md:text-[42px] font-semibold tracking-tight text-foreground">
            {lang === 'ar' ? "حلفاؤنا الاستراتيجيون" : "Our Strategic Allies"}
          </h2>
        </motion.div>
      </div>

      {/* Marquee rows — full bleed */}
      <div className="w-full flex flex-col gap-8">
        <MarqueeRow items={row1} direction="left" />
        <MarqueeRow items={row2} direction="right" />
      </div>
    </section>
  );
};

export default StrategicAllies;
