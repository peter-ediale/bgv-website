"use client";

import Image from 'next/image';
import { useRef, useState } from 'react';

/** Phones: swipeable images with dots. Desktop: thumbnails + large image. */
/** The first `mockups` images are product mockups and are shown whole (not cropped). */
export default function ProductGallery({ images, alt, mockups = 0, bg }: { images: string[]; alt: string; mockups?: number; bg?: string }) {
  const fit = (i: number) => (i < mockups ? 'object-contain' : 'object-cover');
  const frame = (i: number) => (i < mockups ? 'aspect-square' : 'aspect-[4/5]');
  const back = (i: number) => (i < mockups && bg ? { background: bg } : undefined);
  const [active, setActive] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    const el = scroller.current;
    if (el) setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  return (
    <div>
      {/* Mobile swipe */}
      <div className="md:hidden -mx-4">
        <div
          ref={scroller}
          onScroll={onScroll}
          className="flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((src, i) => (
            <div key={src} className={`relative shrink-0 w-full ${frame(i)} snap-center bg-bone`} style={back(i)}>
              <Image src={src} alt={`${alt} — image ${i + 1}`} fill priority={i === 0} sizes="100vw" className={fit(i)} />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-3" aria-hidden>
            {images.map((src, i) => (
              <span key={src} className={`h-1 rounded-full transition-all ${i === active ? 'w-6 bg-ink' : 'w-1.5 bg-line'}`} />
            ))}
          </div>
        )}
      </div>

      {/* Desktop */}
      <div className="hidden md:grid grid-cols-[72px_1fr] gap-4">
        <div className="flex flex-col gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              aria-current={i === active}
              style={back(i)}
              className={`relative aspect-square bg-bone overflow-hidden border ${i === active ? 'border-ink' : 'border-transparent opacity-70 hover:opacity-100'}`}
            >
              <Image src={src} alt="" fill sizes="72px" className={fit(i)} />
            </button>
          ))}
        </div>
        <div className={`relative ${frame(active)} bg-bone overflow-hidden`} style={back(active)}>
          <Image src={images[active]} alt={alt} fill priority sizes="(max-width: 1280px) 50vw, 640px" className={fit(active)} />
        </div>
      </div>
    </div>
  );
}
