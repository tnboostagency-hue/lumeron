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
    <figure className="group relative rounded-[26px] border border-[#d8eae7] bg-[linear-gradient(145deg,#ffffff_0%,#f2faf9_55%,#e5f4f2_100%)] p-2 shadow-[0_20px_60px_rgba(15,81,76,0.13)] sm:p-3">
      <div className="overflow-hidden rounded-[18px] bg-[#e8f3f2] ring-1 ring-[#0d2e2c]/5" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {images.map((src, index) => (
            <div className="min-w-0 flex-[0_0_100%]" key={`${src.slice(0, 36)}-${index}`}>
              <img src={src} alt={index === 0 ? alt : `${alt} — image ${index + 1}`} className="aspect-[16/11] w-full object-cover sm:aspect-[16/9]" />
            </div>
          ))}
        </div>
      </div>
      {images.length > 1 && (
        <>
          <div className="absolute right-4 top-4 rounded-full border border-white/60 bg-[#0d2e2c]/55 px-2.5 py-1 text-[11px] font-semibold tracking-[0.08em] text-white backdrop-blur-sm sm:right-5 sm:top-5">{selected + 1} / {images.length}</div>
          <button type="button" onClick={previous} aria-label="Previous image" className="absolute left-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/90 text-[#16766e] shadow-lg opacity-100 transition-opacity sm:left-5 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"><ChevronLeft size={20} /></button>
          <button type="button" onClick={next} aria-label="Next image" className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-white/90 text-[#16766e] shadow-lg opacity-100 transition-opacity sm:right-5 sm:opacity-0 sm:group-hover:opacity-100 sm:focus:opacity-100"><ChevronRight size={20} /></button>
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full border border-white/20 bg-[#0d2e2c]/55 px-3 py-2 backdrop-blur-sm">
            {images.map((_, index) => <button key={index} onClick={() => embla?.scrollTo(index)} aria-label={`Show image ${index + 1}`} className={`h-1.5 rounded-full transition-all ${selected === index ? "w-5 bg-white" : "w-1.5 bg-white/55"}`} />)}
          </div>
        </>
      )}
    </figure>
  );
}
