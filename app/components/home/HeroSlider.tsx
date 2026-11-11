"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';

export type Slide = {
  image: string;
  /** CSS object-position, to keep faces in frame on narrow phones. */
  focus?: string;
  eyebrow: string;
  title: string[]; // one entry per line
  cta: { href: string; label: string };
  /** 'contain' shows a product mockup whole on a dark backdrop instead of filling the screen. */
  fit?: 'cover' | 'contain';
};

const DURATION = 4500; // ms each slide stays on screen

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((i: number) => setIndex((i + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(index + 1), DURATION);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  return (
    <section
      className="relative -mt-16 h-[100svh] min-h-[560px] w-full overflow-hidden bg-black text-paper"
      aria-roledescription="carousel"
      aria-label="Featured"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((s, i) => {
        const active = i === index;
        return (
          <div
            key={s.image}
            className={`absolute inset-0 transition-opacity duration-[1000ms] ease-in-out ${active ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            aria-hidden={!active}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
          >
            {/* key on `active` restarts the slow zoom each time the slide shows */}
            <div key={active ? 'on' : 'off'} className={`absolute inset-0 ${active ? 'animate-kenburns' : ''}`}>
              {s.fit === 'contain' ? (
                <div className="absolute inset-x-4 top-20 bottom-[44%] md:inset-x-auto md:right-[5vw] md:top-20 md:bottom-12 md:w-[46%]">
                  <div className="relative h-full w-full">
                    <Image src={s.image} alt="" fill priority={i === 0} sizes="(max-width: 768px) 100vw, 50vw" className="object-contain" />
                  </div>
                </div>
              ) : (
                <Image
                  src={s.image}
                  alt=""
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover"
                  style={{ objectPosition: s.focus ?? 'center' }}
                />
              )}
            </div>
            <div className={`absolute inset-0 ${s.fit === 'contain' ? 'bg-gradient-to-t from-black/90 via-black/10 to-transparent md:bg-gradient-to-r md:from-black/80 md:via-transparent' : 'bg-gradient-to-t from-black/85 via-black/20 to-black/40'}`} />

            <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 md:px-8 pb-24 md:pb-20">
              <div className={s.fit === 'contain' ? 'md:max-w-[52%]' : ''}>
              {active && (
                <>
                  <p className="eyebrow text-paper/80 animate-fade-up">{s.eyebrow}</p>
                  <h2 className="display mt-4 text-[15vw] md:text-[8.5vw] xl:text-[7.5rem] leading-[0.88]">
                    {s.title.map((line, li) => (
                      <span key={li} className="block animate-fade-up" style={{ animationDelay: `${120 + li * 110}ms` }}>
                        {line}
                      </span>
                    ))}
                  </h2>
                  <Link
                    href={s.cta.href}
                    className="btn mt-8 bg-paper text-ink hover:bg-clay hover:text-paper animate-fade-up"
                    style={{ animationDelay: '420ms' }}
                  >
                    {s.cta.label}
                  </Link>
                </>
              )}
              </div>
            </div>
          </div>
        );
      })}

      {/* Progress bars — also act as slide buttons */}
      <div className="absolute z-20 bottom-8 inset-x-0 mx-auto max-w-7xl px-4 md:px-8 flex gap-2">
        {slides.map((s, i) => (
          <button
            key={s.image}
            onClick={() => go(i)}
            aria-label={`Show slide ${i + 1}`}
            aria-current={i === index}
            className="relative h-6 flex-1 max-w-24 group"
          >
            <span className="absolute inset-x-0 top-1/2 h-px bg-paper/30" />
            <span
              key={i === index ? `on-${index}` : 'off'}
              className="absolute left-0 top-1/2 h-px bg-paper origin-left"
              style={{
                width: '100%',
                transform: i < index ? 'scaleX(1)' : 'scaleX(0)',
                animation: i === index && !paused ? `hero-progress ${DURATION}ms linear forwards` : undefined,
              }}
            />
          </button>
        ))}
      </div>
      <style>{`@keyframes hero-progress { from { transform: scaleX(0) } to { transform: scaleX(1) } }`}</style>
    </section>
  );
}
