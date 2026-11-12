"use client";

import Image from 'next/image';
import { useRef } from 'react';
import { useScrollProgress } from '../fx/useScrollProgress';
import ChapterLabel from '../fx/ChapterLabel';

type Shot = {
  src: string;
  focus?: string;
  caption: string;
  /** Where the card ends up, as a share of the screen from the centre (x: -0.5…0.5, y: -0.5…0.5). */
  desk: { x: number; y: number; r: number };
  phone: { x: number; y: number; r: number };
};

// Starts as a messy stack in the middle, fans out as you scroll (idea from oyin.design).
const SHOTS: Shot[] = [
  { src: '/images/models/edition1/model2.jpeg', focus: '50% 30%', caption: 'E1 · 01', desk: { x: -0.33, y: -0.11, r: -7 }, phone: { x: -0.24, y: -0.25, r: -6 } },
  { src: '/images/models/edition1/model3.jpeg', focus: '50% 35%', caption: 'E1 · 02', desk: { x: -0.12, y: -0.16, r: 4 }, phone: { x: 0.24, y: -0.24, r: 5 } },
  { src: '/images/models/edition1/model5.jpeg', focus: '50% 40%', caption: 'E1 · 03', desk: { x: 0.11, y: -0.1, r: -3 }, phone: { x: -0.25, y: 0.02, r: 4 } },
  { src: '/images/models/edition1/model8.jpeg', focus: '50% 30%', caption: 'E1 · 04', desk: { x: 0.33, y: -0.14, r: 6 }, phone: { x: 0.25, y: 0.03, r: -5 } },
  { src: '/images/models/edition1/model4.jpeg', focus: '50% 60%', caption: 'E1 · 05', desk: { x: -0.22, y: 0.24, r: 5 }, phone: { x: -0.23, y: 0.29, r: -3 } },
  { src: '/images/models/edition1/model9.jpeg', focus: '50% 30%', caption: 'E1 · 06', desk: { x: 0.22, y: 0.25, r: -5 }, phone: { x: 0.24, y: 0.3, r: 6 } },
  { src: '/images/models/edition1/model1.jpeg', focus: '50% 40%', caption: 'E1 · 07', desk: { x: 0, y: 0.21, r: 2 }, phone: { x: 0, y: -0.02, r: -2 } },
];

export default function PolaroidLookbook() {
  const ref = useRef<HTMLElement>(null);
  useScrollProgress(ref);

  // Fan-out amount: 0 while the stack is still, then eases to 1.
  const t = 'clamp(0, (var(--p) - 0.12) * 1.6, 1)';

  return (
    <section ref={ref} className="relative h-[260vh]" style={{ ['--p' as string]: 0 }} aria-label="Edition 1 lookbook">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div className="absolute inset-x-0 top-20 md:top-24 z-10 mx-auto max-w-7xl px-4 md:px-8 flex items-start justify-between">
          <div>
            <ChapterLabel className="text-muted">Chapter I — Where it started</ChapterLabel>
            <h2 className="display text-5xl md:text-7xl mt-2">The lookbook</h2>
          </div>
          <p className="meta text-muted hidden sm:block" style={{ opacity: `calc(1 - ${t})` }}>
            Keep scrolling ↓
          </p>
        </div>

        {SHOTS.map((s, i) => (
          <figure
            key={s.src}
            className="lookbook-card absolute left-1/2 top-[56%] w-[34vw] max-w-[210px] md:w-[15vw] bg-white p-2 pb-8 shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
            style={{
              ['--dx' as string]: s.desk.x,
              ['--dy' as string]: s.desk.y,
              ['--dr' as string]: `${s.desk.r}deg`,
              ['--mx' as string]: s.phone.x,
              ['--my' as string]: s.phone.y,
              ['--mr' as string]: `${s.phone.r}deg`,
              ['--t' as string]: t,
              ['--stack' as string]: `${(i - 3) * 2.5}deg`,
              zIndex: SHOTS.length - i,
            }}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-bone">
              <Image src={s.src} alt={`Edition 1 look ${i + 1}`} fill sizes="(max-width: 768px) 40vw, 230px" className="object-cover" style={{ objectPosition: s.focus }} />
            </div>
            <figcaption className="meta absolute bottom-2 left-3 !text-[10px] text-muted">{s.caption}</figcaption>
          </figure>
        ))}
      </div>

      {/* Card positions: phones use --mx/--my, wider screens use --dx/--dy */}
      <style>{`
        .lookbook-card {
          --x: var(--mx); --y: var(--my); --r: var(--mr);
          transform: translate(-50%, -50%)
            translate(calc(var(--t) * var(--x) * 100vw), calc(var(--t) * var(--y) * 100svh))
            rotate(calc(var(--stack) * (1 - var(--t)) + var(--r) * var(--t)));
          will-change: transform;
        }
        @media (min-width: 768px) {
          .lookbook-card { --x: var(--dx); --y: var(--dy); --r: var(--dr); }
        }
      `}</style>
    </section>
  );
}
