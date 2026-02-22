"use client";

import { useRef, useEffect, useState } from 'react';
import { useLenis } from 'lenis/react';

export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useLenis(({ progress }) => {
    if (!ref.current || reducedMotion) return;
    ref.current.style.transform = `scaleX(${progress})`;
  });

  if (reducedMotion) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none">
      <div 
        ref={ref}
        className="h-full w-full origin-left bg-gradient-to-r from-[#229388] to-[#3ec8ba]"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
