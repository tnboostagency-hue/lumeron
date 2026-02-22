"use client";

import { useRef, useEffect, useState, ReactNode } from 'react';
import { useLenis } from 'lenis/react';
import { motion, useInView } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  parallaxSpeed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  parallaxSpeed = 0.05,
  direction = 'up',
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-10%" });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useLenis(({ scroll }) => {
    if (!ref.current || reducedMotion || !parallaxSpeed) return;
    
    const element = ref.current;
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    if (rect.bottom < 0 || rect.top > windowHeight) return;
    
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = windowHeight / 2;
    const distanceFromCenter = elementCenter - viewportCenter;
    
    const offset = distanceFromCenter * parallaxSpeed * 0.1;
    element.style.setProperty('--parallax-offset', `${offset}px`);
  });

  const getInitialPosition = () => {
    if (reducedMotion) return { opacity: 1, x: 0, y: 0 };
    
    switch (direction) {
      case 'up': return { opacity: 0, y: 40 };
      case 'down': return { opacity: 0, y: -40 };
      case 'left': return { opacity: 0, x: 40 };
      case 'right': return { opacity: 0, x: -40 };
      default: return { opacity: 0, y: 40 };
    }
  };

  const getAnimatePosition = () => {
    return { opacity: 1, x: 0, y: 0 };
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialPosition()}
      animate={isInView ? getAnimatePosition() : getInitialPosition()}
      transition={{
        duration: reducedMotion ? 0 : duration,
        delay: reducedMotion ? 0 : delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      style={{
        willChange: reducedMotion ? 'auto' : 'transform, opacity',
      }}
    >
      {children}
    </motion.div>
  );
}
