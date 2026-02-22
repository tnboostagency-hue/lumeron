"use client";
import { useEffect, useRef } from "react";

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    // Trigger fade-in
    const el = ref.current;
    if (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(18px)";
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.transition = "opacity 0.55s ease, transform 0.55s ease";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        });
      });
    }
  }, []);

  return (
    <div ref={ref} style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
