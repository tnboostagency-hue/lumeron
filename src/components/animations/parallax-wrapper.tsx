"use client";

import { useRef, useEffect, useState, ReactNode } from 'react';
import { useLenis } from 'lenis/react';

interface ParallaxWrapperProps {
  children: ReactNode;
  speed?: number; // -1 to 1: negative = slower (background), positive = faster (foreground)
  className?: string;
  direction?: 'vertical' | 'horizontal';
  style?: React.CSSProperties;
}

export default function ParallaxWrapper({
  children,
  speed = 0.1,
  className = '',
  direction = 'vertical',
  style = {},
}: ParallaxWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useLenis(({ scroll }) => {
    if (!ref.current || reducedMotion) return;
    
    const element = ref.current;
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Calculate how far the element is from the center of the viewport
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = windowHeight / 2;
    const distanceFromCenter = elementCenter - viewportCenter;
    
    // Apply parallax based on distance from viewport center
    const offset = distanceFromCenter * speed * 0.15;
    
    if (direction === 'vertical') {
      element.style.transform = `translate3d(0, ${offset}px, 0)`;
    } else {
      element.style.transform = `translate3d(${offset}px, 0, 0)`;
    }
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
