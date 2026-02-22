"use client";

import { useRef, useEffect, useState, ReactNode } from 'react';
import { useLenis } from 'lenis/react';

interface FloatingElementProps {
  children: ReactNode;
  speed?: number;
  rotationFactor?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function FloatingElement({
  children,
  speed = 0.15,
  rotationFactor = 0,
  className = '',
  style = {},
}: FloatingElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useLenis(({ scroll, progress }) => {
    if (!ref.current || reducedMotion) return;
    
    const element = ref.current;
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Check if element is in viewport
    if (rect.bottom < 0 || rect.top > windowHeight) return;
    
    // Calculate visibility progress (0 when entering, 1 when centered, 0 when leaving)
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = windowHeight / 2;
    const normalizedDistance = (elementCenter - viewportCenter) / windowHeight;
    
    // Floating effect with sine wave for smoothness
    const yOffset = Math.sin(progress * Math.PI * 2 + scroll * 0.001) * 20 * speed;
    const scrollOffset = normalizedDistance * speed * 100;
    const rotation = rotationFactor ? normalizedDistance * rotationFactor * 15 : 0;
    
    element.style.transform = `translate3d(0, ${scrollOffset + yOffset}px, 0) rotate(${rotation}deg)`;
  });

  return (
    <div 
      ref={ref} 
      className={className}
      style={{ 
        willChange: reducedMotion ? 'auto' : 'transform',
        ...style 
      }}
    >
      {children}
    </div>
  );
}
