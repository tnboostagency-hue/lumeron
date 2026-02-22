import React from 'react';

/**
 * FooterCTA Section Component
 * 
 * Clones the final call-to-action section with high precision.
 * Base theme: Dark (the website uses a high-contrast light theme for this specific section according to design guidelines).
 * 
 * Headline: "Built for Now. Ready for What is Next."
 * Sub-headline: "THIS IS JUST THE BEGINNING"
 * Button: "Connect Now" (Lime-green accent color #96c11f)
 */
const FooterCTA: React.FC = () => {
  return (
    <section 
      className="light-section relative w-full overflow-hidden bg-white text-[#1a1a1a] selection:bg-[#96c11f]/30"
      style={{
        paddingTop: '160px',
        paddingBottom: '160px',
      }}
    >
      <div className="container mx-auto px-8 max-w-[1280px]">
        <div className="flex flex-col items-center text-center">
          {/* Subheading */}
          <span 
            className="text-[#1a1a1a] font-semibold uppercase tracking-[0.05em] mb-6"
            style={{
              fontSize: '1.2rem',
              fontFamily: 'var(--font-display)',
            }}
          >
            This is just the beginning
          </span>

          {/* Large Bold Headline */}
          <h2 
            className="text-[#1a1a1a] font-extrabold leading-[1.1] mb-12 max-w-[800px]"
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              letterSpacing: '-0.02em',
              fontFamily: 'var(--font-display)',
            }}
          >
            Built for Now. Ready for What is Next.
          </h2>

          {/* Centered Descriptive Text */}
          <div className="max-w-[760px] mb-16">
            <p 
              className="text-[#1a1a1a] leading-[1.6]"
              style={{
                fontSize: '1.125rem',
                fontFamily: 'var(--font-sans)',
              }}
            >
              With major launches ahead across new regions, new industries, and new breakthroughs in AI,{' '}
              <span className="font-semibold">we are accelerating fast,</span> and you&apos;re witnessing it from the start. 
              From sovereign AI clouds in Saudi Arabia to groundbreaking language models and mission-critical 
              systems for governments and global enterprises, our reach is expanding and our ambition knows no borders. 
              The best is coming, and it&apos;s coming from <span className="font-bold uppercase tracking-tight text-[#3ec8ba]">LUMERON.</span>
            </p>
          </div>

          {/* Final Primary Button */}
          <a 
            href="#"
            className="btn-primary"
          >
            Connect&nbsp;Now
          </a>
        </div>
      </div>

      {/* Subtle Background Elements if needed for exact match */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        {/* Abstract background subtle texture or gradient could go here if detected */}
      </div>
    </section>
  );
};

export default FooterCTA;