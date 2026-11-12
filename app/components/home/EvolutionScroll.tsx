"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { useScrollProgress } from '../fx/useScrollProgress';
import ChapterLabel from '../fx/ChapterLabel';

// The four figures from the back of the Evolve tee. h = natural height (keeps their relative size).
const PHASES = [
  { src: '/brand/evolve/fig1.png', w: 291, h: 180, name: 'Crawl', line: 'Never stay the same.' },
  { src: '/brand/evolve/fig2.png', w: 209, h: 367, name: 'Learn', line: 'Break the pattern.' },
  { src: '/brand/evolve/fig3.png', w: 170, h: 441, name: 'Walk', line: 'Rewrite the rules.' },
  { src: '/brand/evolve/fig4.png', w: 384, h: 445, name: 'Run', line: 'Built for those who move different.' },
];
const TALLEST = 445;
const N = PHASES.length;

// CSS expressions driven by --p (0 → 1 scroll progress through the section).
/** 0 → 1 as phase i arrives (phase 0 is already visible at the start). */
const appear = (i: number) => `clamp(0, (var(--p) * ${N} - ${i} + 0.25) * 4, 1)`;
/** 1 only while phase i is the current one. */
const current = (i: number) => (i === N - 1 ? appear(i) : `calc(${appear(i)} - ${appear(i + 1)})`);

/**
 * Scroll-driven "evolution": as you scroll, each figure walks in, one phase at a time.
 * The section is tall; the black panel inside sticks to the screen while you scroll through it.
 */
export default function EvolutionScroll() {
  const ref = useRef<HTMLElement>(null);
  useScrollProgress(ref);

  return (
    <section
      ref={ref}
      className="relative h-[230vh] bg-ink text-paper"
      style={{ ['--p' as string]: 0 }}
      aria-label="Evolve: crawl, learn, walk, run"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden flex flex-col">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8 pt-24 md:pt-28 flex items-start justify-between gap-4">
          <ChapterLabel className="text-paper/60">The evolution</ChapterLabel>
          <p className="meta text-paper/60 tabular-nums flex gap-1.5">
            Phase
            <span className="relative inline-block w-[2ch]">
              <span className="invisible">00</span>
              {PHASES.map((_, i) => (
                <span key={i} className="absolute inset-0" style={{ opacity: current(i) }}>
                  0{i + 1}
                </span>
              ))}
            </span>
            / 0{N}
          </p>
        </div>

        {/* Caption: one line per phase, crossfading */}
        <div className="relative mx-auto w-full max-w-7xl px-4 md:px-8 mt-8 md:mt-12 h-[8rem] md:h-[12rem]">
          {PHASES.map((ph, i) => (
            <h2
              key={ph.name}
              className="display absolute inset-x-4 md:inset-x-8 text-5xl md:text-8xl"
              aria-hidden={i > 0}
              style={{
                opacity: current(i),
                transform: `translateY(calc((1 - ${appear(i)}) * 28px))`,
              }}
            >
              {ph.line}
            </h2>
          ))}
        </div>

        {/* The figures on a ground line */}
        <div className="relative mt-auto mb-20 md:mb-16 mx-auto w-full max-w-6xl px-4 md:px-8">
          <div className="evo-row flex items-end justify-between gap-2 md:gap-10">
            {PHASES.map((ph, i) => (
              <div
                key={ph.name}
                className="relative"
                style={{
                  height: `${(ph.h / TALLEST) * 100}%`,
                  aspectRatio: `${ph.w} / ${ph.h}`,
                  opacity: appear(i),
                  transform: `translateX(calc((1 - ${appear(i)}) * -48px))`,
                }}
              >
                <Image src={ph.src} alt={ph.name} fill sizes="160px" className="object-contain" />
              </div>
            ))}
          </div>
          <div className="mt-3 h-px bg-paper/25 relative">
            <div className="absolute inset-y-0 left-0 w-full bg-clay origin-left" style={{ transform: 'scaleX(var(--p))' }} />
          </div>
          <div className="mt-3 flex justify-between">
            {PHASES.map((ph, i) => (
              <span key={ph.name} className="meta" style={{ opacity: `calc(0.3 + 0.7 * ${appear(i)})` }}>
                0{i + 1} {ph.name}
              </span>
            ))}
          </div>
        </div>

        {/* Figure row height: fits the screen width on phones, the screen height on bigger screens */}
        <style>{`.evo-row { height: min(34vw, 26vh); } @media (min-width: 768px) { .evo-row { height: clamp(110px, 28vh, 300px); } }`}</style>

        <div className="absolute inset-x-0 bottom-6 flex justify-center" style={{ opacity: 'clamp(0, (var(--p) - 0.85) * 8, 1)' }}>
          <Link href="#edition-2" className="meta underline underline-offset-4 hover:text-clay">
            Join the Edition 2 waitlist ↑
          </Link>
        </div>
      </div>
    </section>
  );
}
