import React from 'react';
import Image from 'next/image';

interface SolutionSectionProps {
  tagline: string;
  title: string;
  description: string;
  imageSrc: string;
  imageLeft?: boolean;
  subtext?: string;
}

const SolutionItem: React.FC<SolutionSectionProps> = ({
  tagline,
  title,
  description,
  imageSrc,
  imageLeft = true,
  subtext,
}) => {
  return (
    <div className="w-full max-w-[1280px] mx-auto py-[100px] px-8 md:px-12">
      <div className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 ${imageLeft ? '' : 'md:flex-row-reverse'}`}>
        {/* Image Container */}
        <div className="w-full md:w-[45%] flex justify-center">
          <div className="relative w-full max-w-[400px] aspect-square rounded-[24px] overflow-hidden shadow-2xl">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        </div>

        {/* Text Content */}
        <div className="w-full md:w-[55%] flex flex-col items-start text-left">
          <span className="text-[#1A1A1A] font-semibold text-[14px] uppercase tracking-[0.1em] mb-4 opacity-70">
            {tagline}
          </span>
          <h2 className="text-[#1A1A1A] text-[32px] md:text-[42px] font-bold leading-[1.1] mb-6 tracking-tight">
            {title}
          </h2>
          <p className="text-[#1A1A1A] text-[18px] leading-[1.6] opacity-90 max-w-[580px]">
            {description}
          </p>
          {subtext && (
            <p className="mt-6 text-[11px] text-[#1A1A1A] font-medium opacity-50 uppercase tracking-wider">
              {subtext}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const SolutionsGrid = () => {
  const sections = [
    {
      tagline: "Real Intelligence for Real Impact Eye",
      title: "Applications & Solutions",
      description: "We deliver full-stack solutions designed to transform industries. From smart cities to sovereign governments, energy systems to financial markets, we tailor AI-powered products that adapt, learn, and solve. Delivered directly or through our strategic partner network, every deployment is built for scale and for change.",
      imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1cd8c82-7d59-48f9-9b1f-b8b6ad292087-humain-com/assets/images/images_1.png",
      imageLeft: true,
    },
    {
      tagline: "Models with Purpose",
      title: "AI Models",
      description: "We don't just build models, we build sovereign intelligence. From ALLAM*, our Arabic-first large language model, to a full-duplex voice LLM and integrations, we ensure your AI speaks your language, adapts to your world, and evolves with you. Our marketplace enables access, exchange, and innovation across a global model ecosystem.",
      imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1cd8c82-7d59-48f9-9b1f-b8b6ad292087-humain-com/assets/images/images_2.png",
      imageLeft: false,
      subtext: "* CO-DEVELOPED WITH SDAIA",
    },
    {
      tagline: "The Lifeblood of AI",
      title: "Data Platform",
      description: "Our data platform is where intelligence takes shape. We manage the full data lifecycle: ingestion pipelines, orchestration, processing, visualization, and secured governance. Through adaptive APIs, integration adaptors, and AI/ML services, we transform raw data into activated insight; secure, governed, and always in motion.",
      imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1cd8c82-7d59-48f9-9b1f-b8b6ad292087-humain-com/assets/images/images_1.png", // Fallback to provided assets
      imageLeft: true,
    },
    {
      tagline: "Built for Intelligence",
      title: "Infrastructure",
      description: "We provide the compute, speed, and scalability that modern AI demands. From AI training infrastructure like GPUs, to next-gen inference engines powered by LPUs, we architect performance from the ground up. Our cloud services deliver secure data storage, ultra-fast pipelines, and elastic computing environments ready for everything. From training billion-parameter models to real-time insights. And at the foundation of it all: our next-generation AI-native data centers.",
      imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1cd8c82-7d59-48f9-9b1f-b8b6ad292087-humain-com/assets/images/images_2.png", // Fallback to provided assets
      imageLeft: false,
    },
  ];

  return (
    <section className="light-section bg-white">
      {/* Intro text mentioned in instructions/flow */}
      <div className="w-full max-w-[1280px] mx-auto pt-[120px] pb-[40px] px-8 md:px-12 text-center">
        <div className="max-w-[800px] mx-auto">
          <p className="text-[#1A1A1A] text-[20px] md:text-[24px] font-bold leading-[1.4] mb-4">
            We provide a scalable, secure ecosystem of cloud-native platforms across four core layers:
            Infrastructure, Cloud, Data & Models, and Applications.
          </p>
          <p className="text-[#1A1A1A] text-[18px] opacity-70">
            No patchwork, no vendors to juggle. Just one full stack, built for scale and ready to solve real problems.
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        {sections.map((section, index) => (
          <React.Fragment key={index}>
            <SolutionItem {...section} />
            {index < sections.length - 1 && (
              <div className="w-full px-8 md:px-12">
                <hr className="max-w-[1280px] mx-auto border-[#1A1A1A] opacity-10" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default SolutionsGrid;