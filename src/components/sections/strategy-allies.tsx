import React from 'react';
import Image from 'next/image';

const StrategyAllies = () => {
  const partners = [
    { name: 'SDAIA', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1cd8c82-7d59-48f9-9b1f-b8b6ad292087-humain-com/assets/images/1-3.gif' }, // Placeholder based on assets rules
    { name: 'Qualcomm', logo: '' },
    { name: 'NVIDIA', logo: '' },
    { name: 'Luma', logo: '' },
    { name: 'Cisco', logo: '' },
    { name: 'AWS', logo: '' },
    { name: 'AMD', logo: '' },
    { name: 'Groq', logo: '' },
  ];

  return (
    <section 
      className="relative w-full overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #96C11F 0%, #004D40 100%)',
        paddingTop: '120px',
        paddingBottom: '160px'
      }}
    >
      <div className="container mx-auto px-8 max-w-[1280px]">
        {/* Header Content */}
        <div className="flex flex-col items-center text-center space-y-6 mb-20">
          <span 
            className="text-[#000000] opacity-80 font-semibold tracking-widest text-[0.85rem] uppercase"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Built for the world ahead
          </span>
          
          <h2 
            className="text-[#000000] text-[3.5rem] leading-[1.1] font-bold tracking-tight max-w-4xl"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Full AI Stack.<br />Endless Possibilities.
          </h2>

          <p 
            className="text-[#000000] text-[1.125rem] leading-[1.6] font-medium max-w-[850px] opacity-90"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            We build the entire AI stack: data centers, cloud, models, and applications. 
            So you don’t have to piece things together. Out of the box, end to end, with 
            HUMAIN as your single partner. Our belief is simple: AI isn’t an add-on, it’s 
            the foundation of the future.
          </p>
        </div>

        {/* Strategic Allies Section */}
        <div className="mt-24">
          <h3 
            className="text-[#000000] opacity-60 font-bold tracking-[0.2em] text-[0.75rem] uppercase text-center mb-12"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Our Strategic Allies
          </h3>

          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-10 opacity-70">
            {/* SDAIA Logo (from assets) */}
            <div className="grayscale contrast-125 brightness-0 hover:grayscale-0 hover:brightness-100 transition-all duration-300">
              <img 
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/b1cd8c82-7d59-48f9-9b1f-b8b6ad292087-humain-com/assets/images/1-3.gif" 
                alt="SDAIA" 
                className="h-8 w-auto object-contain"
              />
            </div>

            {/* Other Partners as Text UI (Matching grayscale requirement with high-weight typography) */}
            <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-12">
              <span className="text-black font-black text-2xl tracking-tighter grayscale">Qualcomm</span>
              <span className="text-black font-extrabold text-2xl tracking-tight grayscale">NVIDIA</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-12 mt-12 opacity-70">
            <span className="text-black font-black text-xl italic tracking-tight grayscale">Luma</span>
            <span className="text-black font-bold text-xl grayscale">CISCO</span>
            <span className="text-black font-black text-xl grayscale">aws</span>
            <span className="text-black font-extrabold text-2xl tracking-tighter grayscale">AMD</span>
            <span className="text-black font-black text-3xl tracking-tight grayscale">groq</span>
          </div>
        </div>
      </div>

      {/* Decorative Gradient Overlay to transition to next section */}
      <div 
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/10 to-transparent pointer-events-none"
      />
    </section>
  );
};

export default StrategyAllies;