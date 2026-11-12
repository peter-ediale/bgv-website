"use client";

import Image from 'next/image';
import { useState } from 'react';

/**
 * A word with a tiny photo next to it (idea borrowed from oyin.design).
 * Hover (desktop) or tap (phone) to see the photo bigger.
 */
export default function InlinePhoto({ children, src, alt }: { children: React.ReactNode; src: string; alt: string }) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative inline-flex items-baseline gap-1.5 cursor-pointer"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        onBlur={() => setOpen(false)}
        aria-expanded={open}
        className="inline-flex items-baseline gap-1.5 underline decoration-1 underline-offset-[0.2em] decoration-clay"
      >
        {children}
        <span className="relative inline-block h-[0.85em] w-[1.15em] translate-y-[0.08em] overflow-hidden rounded-[3px] bg-bone align-baseline">
          <Image src={src} alt="" fill sizes="48px" className="object-cover" />
        </span>
      </button>
      <span
        role="img"
        aria-label={alt}
        className={`pointer-events-none absolute left-1/2 bottom-full z-20 mb-3 w-44 md:w-56 -translate-x-1/2 bg-paper p-1.5 pb-6 shadow-xl transition-all duration-300 origin-bottom ${
          open ? 'opacity-100 scale-100 -rotate-2' : 'opacity-0 scale-90 rotate-0'
        }`}
      >
        <span className="relative block aspect-[4/5] overflow-hidden bg-bone">
          <Image src={src} alt="" fill sizes="224px" className="object-cover" />
        </span>
        <span className="meta absolute bottom-1.5 left-2 text-muted !text-[9px]">{alt}</span>
      </span>
    </span>
  );
}
