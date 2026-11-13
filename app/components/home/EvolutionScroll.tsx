"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion, useInView } from '../fx/useInView';
import ChapterLabel from '../fx/ChapterLabel';

// The four figures from the back of the Evolve tee. h = natural height (keeps their relative size).
const PHASES = [
  { src: '/brand/evolve/fig1.png', w: 291, h: 180, name: 'Crawl', line: 'Never stay the same.' },
  { src: '/brand/evolve/fig2.png', w: 209, h: 367, name: 'Learn', line: 'Break the pattern.' },
  { src: '/brand/evolve/fig3.png', w: 170, h: 441, name: 'Walk', line: 'Rewrite the rules.' },
  { src: '/brand/evolve/fig4.png', w: 384, h: 445, name: 'Run', line: 'Built for those who move different.' },
];
const TALLEST = 445;
const LAST = PHASES.length - 1;

const STEP_MS = 1300; // time on each phase
const HOLD_MS = 3500; // pause on "Run" before replaying

/**
 * The "evolution": when this section comes into view, the figures walk in one by one
 * (crawl → learn → walk → run) on their own, then replay after a pause.
 * The page scrolls normally — nothing is pinned, so it never feels stuck.
 */
export default function EvolutionScroll() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const [phase, setPhase] = useState(-1); // -1 = nothing shown yet

  useEffect(() => {
    if (!inView) return;
    const reduced = prefersReducedMotion(); // show everything at once, no movement
    if (reduced && phase === LAST) return;
    const t = setTimeout(
      () => setPhase((p) => (reduced ? LAST : p >= LAST ? -1 : p + 1)),
      reduced ? 0 : phase === -1 ? 250 : phase >= LAST ? HOLD_MS : STEP_MS
    );
    return () => clearTimeout(t);
  }, [inView, phase]);

  const shown = Math.max(phase, 0);

  return (
    <section ref={ref} className="relative bg-ink text-paper overflow-hidden" aria-label="Evolve: crawl, learn, walk, run">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8 pt-20 md:pt-24 flex items-start justify-between gap-4">
        <ChapterLabel className="text-paper/60">The evolution</ChapterLabel>
        <p className="meta text-paper/60 tabular-nums">
          Phase 0{shown + 1} / 0{PHASES.length}
        </p>
      </div>

      {/* Caption: one line per phase, crossfading */}
      <div className="relative mx-auto w-full max-w-7xl px-4 md:px-8 mt-8 md:mt-10 h-[8.5rem] md:h-[12rem]" aria-live="polite">
        {PHASES.map((ph, i) => (
          <h2
            key={ph.name}
            aria-hidden={i !== shown}
            className={`display absolute inset-x-4 md:inset-x-8 text-5xl md:text-8xl transition-all duration-700 ease-out ${
              i === shown && phase >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {ph.line}
          </h2>
        ))}
      </div>

      {/* The figures on a ground line */}
      <div className="mx-auto w-full max-w-6xl px-4 md:px-8 mt-6 md:mt-10 pb-10">
        <div className="evo-row flex items-end justify-between gap-2 md:gap-10">
          {PHASES.map((ph, i) => (
            <div
              key={ph.name}
              className={`relative transition-all duration-700 ease-out ${
                i <= phase ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}
              style={{ height: `${(ph.h / TALLEST) * 100}%`, aspectRatio: `${ph.w} / ${ph.h}` }}
            >
              <Image src={ph.src} alt={ph.name} fill sizes="160px" className="object-contain" />
            </div>
          ))}
        </div>
        <div className="mt-3 h-px bg-paper/25 relative">
          <div
            className="absolute inset-y-0 left-0 w-full bg-clay origin-left transition-transform duration-1000 ease-out"
            style={{ transform: `scaleX(${phase < 0 ? 0 : (phase + 1) / PHASES.length})` }}
          />
        </div>
        <div className="mt-3 flex justify-between">
          {PHASES.map((ph, i) => (
            <span key={ph.name} className={`meta transition-opacity duration-500 ${i <= phase ? 'opacity-100' : 'opacity-30'}`}>
              0{i + 1} {ph.name}
            </span>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link href="#edition-2" className="meta underline underline-offset-4 hover:text-clay">
            Join the Edition 2 waitlist ↑
          </Link>
        </div>
      </div>

      {/* Figure row height: fits the screen width on phones, the screen height on bigger screens */}
      <style>{`.evo-row { height: min(34vw, 26vh); } @media (min-width: 768px) { .evo-row { height: clamp(110px, 28vh, 300px); } }`}</style>
    </section>
  );
}
