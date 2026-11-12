"use client";

import { useEffect, useRef, useState } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ&#%@$';

/**
 * Text that assembles itself from scrambled letters when it scrolls into view.
 * The real text is rendered first (good for search engines and screen readers).
 */
export default function ScrambleText({ text, className = '', duration = 1100 }: { text: string; className?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(text);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let frame = 0;
    let start = 0;
    const run = (t: number) => {
      if (!start) start = t;
      const progress = Math.min(1, (t - start) / duration);
      const settled = Math.floor(progress * text.length);
      setShown(
        text
          .split('')
          .map((c, i) => (i < settled || c === ' ' ? c : CHARS[Math.floor(Math.random() * CHARS.length)]))
          .join('')
      );
      if (progress < 1) frame = requestAnimationFrame(run);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start = 0;
          frame = requestAnimationFrame(run);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [text, duration]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden>{shown}</span>
    </span>
  );
}
