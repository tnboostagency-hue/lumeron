"use client";

import Image from 'next/image';
import { Database, Cloud, ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import ParallaxWrapper from '@/components/animations/parallax-wrapper';
import { useLanguage } from '@/context/LanguageContext';

const ProductLayers = () => {
  const { lang, t } = useLanguage();
  
  const products = [
    {
      id: "data-centers",
      tagline: lang === 'ar' ? "ترسيخ الاستقلال الوطني" : "ANCHORING NATIONAL INDEPENDENCE",
      title: t.services.dataCenters,
      description: lang === 'ar' 
        ? "مراكز بيانات سيادية فائقة النطاق ترسخ الاستقلال الرقمي الوطني. نحن نوفر القدرة الحاسوبية والسرعة والقابلية للتوسع التي يتطلبها الذكاء الاصطناعي الحديث، والمصممة خصيصاً للذكاء فائق النطاق."
        : "Sovereign hyperscale data centers anchoring national digital independence. We provide the compute, speed, and scalability that modern AI demands, purpose-built for hyper-scale intelligence.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b1cd8c82-7d59-48f9-9b1f-b8b6ad292087/digital-infrastrucutre-1771453972870.jpg?width=8000&height=8000&resize=contain",
      reverse: false,
      icon: Database
    },
    {
      id: "managed-services",
      tagline: lang === 'ar' ? "حماية استباقية" : "PROACTIVE PROTECTION",
      title: t.services.managedServices,
      description: lang === 'ar'
        ? "أمن سيبراني شامل ومراقبة على مدار الساعة طوال أيام الأسبوع. نحن نحمي الأنظمة الحيوية من التهديدات المتطورة، مما يضمن استمرارية التشغيل بتكاليف يمكن التنبؤ بها واتفاقيات مستوى خدمة مضمونة."
        : "Comprehensive cybersecurity and 24/7 monitoring. We protect critical systems from evolving threats, ensuring operational continuity with predictable costs and guaranteed SLAs.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b1cd8c82-7d59-48f9-9b1f-b8b6ad292087/managed-services-1771453972869.jpg?width=8000&height=8000&resize=contain",
      reverse: true,
      icon: ShieldCheck
    },
    {
      id: "innovations",
      tagline: lang === 'ar' ? "قيادة النماذج الجديدة" : "DRIVING NEW MODELS",
      title: t.services.innovations,
      description: lang === 'ar'
        ? "ذكاء اصطناعي متقدم وإنترنت الأشياء وأتمتة تقود الابتكار. من شبكات استشعار المدن الذكية إلى الحوسبة الطرفية الصناعية، نحن نبني المستقبل المتصل للمملكة."
        : "Advanced AI, IoT, and automation driving innovation. From smart city sensor networks to industrial edge computing, we build the connected future of the Kingdom.",
      image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/b1cd8c82-7d59-48f9-9b1f-b8b6ad292087/future-technology-1771453972869.jpg?width=8000&height=8000&resize=contain",
      reverse: false,
      icon: Cpu
    }
  ];

  return (
    <section className="bg-white py-[80px] md:py-[120px] overflow-hidden">
      <div className="container px-6 md:px-8 max-w-[1440px] mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`max-w-[900px] mb-12 md:mb-20 ${lang === 'ar' ? 'md:ml-auto md:text-right' : ''}`}
        >
          <span className="text-tagline mb-4 block">{t.services.title}</span>
          <p className="text-[15px] sm:text-[18px] md:text-[20px] leading-[1.6] text-muted-foreground">
            {lang === 'ar' ? (
              <>منصات أصلية عبر أربع ركائز أساسية: <span className="font-semibold text-foreground">البنية التحتية</span>، و<span className="font-semibold text-foreground">السحابة</span>، و<span className="font-semibold text-foreground">الخدمات المدارة</span>، و<span className="font-semibold text-foreground">تقنيات المستقبل</span>. خبرة مدعومة من ماسكو مع دعم محلي وتموضع استراتيجي.</>
            ) : (
              <>Native platforms across four core pillars: <span className="font-semibold text-foreground">Infrastructure</span>, <span className="font-semibold text-foreground">Cloud</span>, <span className="font-semibold text-foreground">Managed Services</span>, and <span className="font-semibold text-foreground">Future Technologies</span>. MASCO-backed expertise with local support and strategic positioning.</>
            )}
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="space-y-[60px] md:space-y-[120px]">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
                className={`flex flex-col md:flex-row items-stretch gap-8 md:gap-16 ${product.reverse ? 'md:flex-row-reverse' : ''}`}
            >
              {/* Image with parallax */}
                <div className="w-full md:w-1/2 flex items-center justify-start">
                <ParallaxWrapper 
                  speed={product.reverse ? 0.1 : -0.1} 
                  className="relative w-full aspect-[4/3] md:aspect-square rounded-[20px] overflow-hidden border border-border bg-muted/30"
                >
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                </ParallaxWrapper>
              </div>

              {/* Content */}
              <div className={`w-full md:w-1/2 flex flex-col justify-center space-y-6 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <div className="space-y-4">
                  <div className={`flex items-center justify-start gap-3 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}>
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <product.icon size={20} strokeWidth={1.5} />
                    </div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-primary">
                      {product.tagline}
                    </p>
                  </div>
                  <h3 className="text-[26px] sm:text-[32px] md:text-[42px] font-semibold leading-[1.1] tracking-[-0.02em] text-foreground">
                    {product.title}
                  </h3>
                </div>
                
                  <p className={`text-[16px] md:text-[18px] leading-[1.7] text-muted-foreground ${lang === 'ar' ? 'text-right' : ''}`}>
                  {product.description}
                </p>
                
                <a 
                  href={`/services/${product.id}`}
                  className={`group inline-flex items-center gap-2 text-primary font-semibold text-[14px] uppercase tracking-wider transition-all duration-300 hover:gap-3 ${lang === 'ar' ? 'flex-row-reverse' : ''}`}
                >
                  {lang === 'ar' ? "استكشف الحلول" : "Explore Solutions"}
                  <ArrowUpRight size={16} className={`transition-transform duration-300 ${lang === 'ar' ? 'group-hover:-translate-x-0.5 group-hover:-translate-y-0.5' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'}`} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductLayers;
