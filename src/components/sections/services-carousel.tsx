"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

interface ServiceCard {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function ServicesCarousel() {
  const { lang, t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const services: ServiceCard[] = [
    {
      id: "data-centers",
      title: t.services.dataCenters,
      description: lang === 'ar' 
        ? "مراكز بيانات سيادية فائقة النطاق ترسخ الاستقلال الرقمي الوطني بقدرة حوسبة مبنية للذكاء فائق النطاق."
        : "Sovereign hyperscale data centers anchoring national digital independence with compute power built for hyper-scale intelligence.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b1cd8c82-7d59-48f9-9b1f-b8b6ad292087/1-Digital-Infrastructure-1770222692211.png?width=8000&height=8000&resize=contain",
      link: "/services/data-centers"
    },
    {
      id: "cybersecurity",
      title: t.services.cybersecurity,
      description: lang === 'ar'
        ? "إدارة شاملة للمكانة الأمنية، وعمليات مركز العمليات الأمنية (SOC)، والقدرة على الصمود السيبراني بما يتماشى مع معايير الهيئة الوطنية للأمن السيبراني."
        : "End-to-end security posture management, SOC operations, and cyber resilience aligned with NCA standards and national frameworks.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b1cd8c82-7d59-48f9-9b1f-b8b6ad292087/Managed-Services-Cybersecurity-1770222692186.png?width=8000&height=8000&resize=contain",
      link: "/services/cybersecurity"
    },
    {
      id: "innovations",
      title: t.services.innovations,
      description: lang === 'ar'
        ? "حلول الذكاء الاصطناعي المتقدمة، وإنترنت الأشياء، والأتمتة التي تدفع الابتكار من المدن الذكية إلى الحوسبة الطرفية الصناعية."
        : "Advanced AI, IoT, and automation solutions driving innovation from smart cities to industrial edge computing and beyond.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b1cd8c82-7d59-48f9-9b1f-b8b6ad292087/Future-Technologies-1770222692228.png?width=8000&height=8000&resize=contain",
      link: "/services/innovations"
    },
    {
      id: "managed-services",
      title: t.services.managedServices,
      description: lang === 'ar'
        ? "عمليات تقنية معلومات مدارة شاملة على مدار الساعة طوال أيام الأسبوع مع اتفاقيات مستوى خدمة مضمونة وتكاليف يمكن التنبؤ بها."
        : "Comprehensive 24/7 managed IT operations with guaranteed SLAs, predictable costs, and proactive support across your entire stack.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b1cd8c82-7d59-48f9-9b1f-b8b6ad292087/Cloud-Platforms-1770222692190.png?width=8000&height=8000&resize=contain",
      link: "/services/managed-services"
    }
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
        <section id="services" className="bg-white relative z-[2] lg:py-[120px] pt-[40px] md:pt-[100px] pb-[80px] flex flex-col items-center lg:gap-y-12 gap-y-10">
          {/* Header Container */}
          <div className="container mx-auto px-5 sm:px-8 md:px-8 max-w-[1440px] flex flex-col items-start">
            {/* Section Header */}
            <div className={`w-full ${lang === 'ar' ? 'text-right' : ''}`}>
              <h2 className="text-[28px] sm:text-[32px] md:text-[42px] font-semibold leading-[1.1] tracking-[-0.01em] text-foreground">
                {lang === 'ar' ? (
                  <>خدماتنا <span className="text-[#229388]">وقدراتنا</span></>
                ) : (
                  <>Our <span className="text-[#229388]">Services</span></>
                )}
              </h2>
              <div className={`flex justify-between items-center w-full mt-2 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                <span className={`block w-full h-px bg-gradient-to-l from-[#229388] to-transparent opacity-80 ${lang === 'ar' ? 'scale-x-1' : '-scale-x-100'}`} />
                <span className="border-[#229388] lg:w-[10px] lg:min-w-[10px] lg:h-[10px] w-2.5 h-2.5 min-w-2.5 block border rounded-full flex-shrink-0" />
              </div>
            </div>
            
            {/* Subtitle */}
            <p className={`text-foreground text-[15px] sm:text-[17px] md:text-[20px] lg:mt-4 mt-3 max-w-[900px] leading-[1.6] ${lang === 'ar' ? 'text-right w-full' : ''}`}>
              {t.services.subtitle}
            </p>
          </div>

          {/* Cards Container - Accordion Hover Effect */}
          <div 
            ref={scrollContainerRef}
              {...(isMobile ? { "data-lenis-prevent": true } : {})}
              className={`lg:container lg:mx-auto lg:max-w-[1440px] w-full flex lg:gap-5 gap-4 px-5 sm:px-8 lg:px-8 lg:overflow-hidden lg:whitespace-normal whitespace-nowrap overflow-x-auto scroll-smooth ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {services.map((service, index) => (
              <Link
                key={service.id}
                href={service.link}
                className="group cursor-pointer rounded-[15px] overflow-hidden relative flex items-end lg:pb-8 pb-8 transition-all duration-700 ease-out"
                style={{
                  flex: isMobile ? '0 0 325px' : (hoveredIndex === null ? '1 1 0%' : (hoveredIndex === index ? '41vw' : '1 1 0%')),
                  minWidth: isMobile ? '325px' : '0',
                  height: isMobile ? '520px' : '36.1111111111vw'
                }}
                onMouseEnter={() => !isMobile && setHoveredIndex(index)}
                onMouseLeave={() => !isMobile && setHoveredIndex(null)}
              >
              {/* Background Overlays */}
                <div className="absolute inset-0">
                  {/* Teal gradient overlay from logo colors - reduced on hover */}
                  <span 
                    className="absolute inset-0 bg-gradient-to-br from-[#229388]/40 to-[#3ec8ba]/40 mix-blend-multiply z-[1] transition-opacity duration-500"
                    style={{
                      opacity: isMobile ? 0.5 : (hoveredIndex === index ? 0.2 : 0.5)
                    }}
                  />
                  {/* Brand teal gradient overlay for text readability - reduced on hover */}
                  <span 
                    className="absolute inset-0 bg-gradient-to-t from-[#229388]/90 via-[#229388]/40 to-transparent z-[1] transition-opacity duration-500"
                    style={{
                      opacity: isMobile ? 1 : (hoveredIndex === index ? 0.7 : 1)
                    }}
                  />
                
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    alt={service.title}
                    src={service.image}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 325px, 50vw"
                    priority={index < 3}
                  />
                </div>
              </div>

                {/* Content */}
                  <div 
                    className={`relative z-[2] whitespace-normal text-white flex flex-col lg:gap-y-4 gap-y-4 transition-all duration-1000 w-full ${lang === 'ar' ? 'text-right' : ''}`}
                    style={{
                      paddingLeft: isMobile ? '22px' : (hoveredIndex === index ? '1.80555555556vw' : '0.625vw'),
                      paddingRight: isMobile ? '22px' : (hoveredIndex === index ? '1.80555555556vw' : '0.625vw')
                    }}
                  >
                  {/* Title - Always visible */}
                  <h4 
                    className="lg:text-[20px] text-[20px] font-semibold text-white transition-all duration-500"
                    style={{
                      overflow: isMobile ? 'visible' : 'hidden',
                      textOverflow: isMobile ? 'clip' : 'ellipsis',
                      whiteSpace: isMobile ? 'normal' : (hoveredIndex === index ? 'normal' : 'nowrap')
                    }}
                  >
                    {service.title}
                  </h4>

                  {/* Expandable Content */}
                    <div 
                      className="flex flex-col lg:gap-y-4 gap-y-4 overflow-hidden transition-all duration-1000"
                      style={{
                        maxHeight: isMobile ? '200px' : (hoveredIndex === index ? '200px' : '0'),
                        opacity: isMobile ? 1 : (hoveredIndex === index ? 1 : 0),
                        transform: isMobile ? 'translateY(0)' : (hoveredIndex === index ? 'translateY(0)' : 'translateY(100%)')
                      }}
                    >
                    {/* Description */}
                    <p className="lg:text-[18px] text-[18px] leading-[1.5] line-clamp-2 lg:line-clamp-none text-white">
                      {service.description}
                    </p>

                    {/* Read More Button */}
                    <div className={`lg:text-[14px] text-[20px] font-medium capitalize flex items-center lg:gap-0 gap-2.5 text-white ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                      <span className="transition-all duration-500 text-white">
                        {t.services.readMore}
                      </span>
                      <div 
                        className="lg:w-6 lg:h-6 w-6 h-6 transition-all duration-300"
                        style={{
                          transform: isMobile ? (lang === 'ar' ? 'translateX(-1vw)' : 'translateX(1vw)') : (hoveredIndex === index ? (lang === 'ar' ? 'translateX(-10px)' : 'translateX(10px)') : 'translateX(0)')
                        }}
                      >
                        <svg 
                          className="w-full h-full rtl:rotate-180" 
                          xmlns="http://www.w3.org/2000/svg" 
                          viewBox="0 0 18 19" 
                          fill="none"
                        >
                          <path 
                            d="M9.129 9.96284C9.129 9.48263 8.93823 9.02208 8.59867 8.68251L5.754 5.83784L6.8145 4.77734L12 9.96284L6.8145 15.1483L5.754 14.0878L8.59867 11.2432C8.93823 10.9036 9.129 10.4431 9.129 9.96284Z" 
                            fill="#ffffff"
                            className="transition-all duration-500"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
            </Link>
          ))}
        </div>

        {/* View All Services Button */}
          <div className="container mx-auto px-5 sm:px-8 md:px-8 max-w-[1440px] flex justify-center w-full">
          <Link 
            href="/services" 
            className={`group text-foreground w-full sm:w-auto capitalize overflow-hidden lg:py-2.5 lg:px-6 py-2 px-[22px] sm:py-4 sm:px-12 lg:text-[18px] text-[18px] font-medium flex items-center justify-center lg:gap-x-2.5 gap-x-[5px] relative border-2 border-transparent rounded-[80px] transition-all duration-300 hover:text-white hover:bg-[#229388] ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
            style={{
              background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #229388, #00bfbd) border-box'
            }}
          >
            <span className="atlwh_Full border-2 border-transparent rounded-[80px] absolute inset-0 transition-all duration-1000" />
            <span className="relative z-[2]">{t.services.viewAll}</span>
            <div className={`lg:group-hover:translate-x-[0.34722222222vw] group-hover:translate-x-[1vw] relative lg:w-6 lg:h-6 w-[17px] h-[17px] transition-all duration-300 ${lang === 'ar' ? 'rotate-180' : ''}`}>
              <svg 
                className="w-full h-full relative z-[2] rtl:rotate-180" 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none"
              >
                <path 
                  d="M12.172 13.914C12.172 13.2737 11.9176 12.6596 11.4649 12.2069L7.672 8.414L9.086 7L16 13.914L9.086 20.828L7.672 19.414L11.4649 15.6211C11.9176 15.1684 12.172 14.5543 12.172 13.914Z" 
                  className="fill-foreground group-hover:fill-white transition-all duration-300"
                />
              </svg>
            </div>
          </Link>
        </div>

        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </section>
  );
}
