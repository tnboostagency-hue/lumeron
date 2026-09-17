"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ArticleGallery({ images, alt }: { images: string[]; alt: string }) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: images.length > 1, align: "start" });
  const [selected, setSelected] = useState(0);
  const previous = useCallback(() => embla?.scrollPrev(), [embla]);
  const next = useCallback(() => embla?.scrollNext(), [embla]);

  useEffect(() => {
    if (!embla) return;
    const sync = () => setSelected(embla.selectedScrollSnap());
    sync();
    embla.on("select", sync);
    return () => { embla.off("select", sync); };
  }, [embla]);

  useEffect(() => {
    if (!embla || images.length < 2) return;
    const timer = window.setInterval(() => embla.scrollNext(), 5500);
    return () => window.clearInterval(timer);
  }, [embla, images.length]);

  return (
    <div className="group relative overflow-hidden rounded-[24px] bg-[#e8f3f2] shadow-[0_20px_55px_rgba(15,81,76,0.14)]">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {images.map((src, index) => (
            <div className="min-w-0 flex-[0_0_100%]" key={`${src.slice(0, 36)}-${index}`}>
              <img src={src} alt={index === 0 ? alt : `${alt} — image ${index + 1}`} className="aspect-[16/8] w-full object-cover" />
            </div>
          ))}
        </div>
      </div>
      {images.length > 1 && (
        <>
          <button type="button" onClick={previous} aria-label="Previous image" className="absolute left-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#16766e] shadow-lg opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"><ChevronLeft size={20} /></button>
          <button type="button" onClick={next} aria-label="Next image" className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#16766e] shadow-lg opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"><ChevronRight size={20} /></button>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-[#0d2e2c]/50 px-3 py-2">
            {images.map((_, index) => <button key={index} onClick={() => embla?.scrollTo(index)} aria-label={`Show image ${index + 1}`} className={`h-1.5 rounded-full transition-all ${selected === index ? "w-5 bg-white" : "w-1.5 bg-white/55"}`} />)}
          </div>
        </>
      )}
    </div>
  );
}
