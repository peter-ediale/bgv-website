import Image from 'next/image';
import Link from 'next/link';
import HeroSlider, { type Slide } from '../components/home/HeroSlider';
import Countdown from '../components/home/Countdown';
import ProductRail from '../components/shop/ProductRail';
import SubscribeForm from '../components/site/SubscribeForm';
import { ArrowIcon } from '../components/site/Icons';
import EvolutionScroll from '../components/home/EvolutionScroll';
import PolaroidLookbook from '../components/home/PolaroidLookbook';
import ChapterLabel from '../components/fx/ChapterLabel';
import LiveStatus from '../components/fx/LiveStatus';
import ScrambleText from '../components/fx/ScrambleText';
import InlinePhoto from '../components/fx/InlinePhoto';
import { getEdition, getProductsByEdition } from '@/lib/catalog';

const slides: Slide[] = [
  {
    image: '/images/products/edition2/Edition2_Product3.jpeg',
    fit: 'contain',
    eyebrow: 'Edition 2 — Coming soon',
    title: ['Beyond who', 'you were', 'yesterday'],
    cta: { href: '#edition-2', label: 'Join the waitlist' },
  },
  {
    image: '/images/models/edition1/model1.jpeg',
    focus: '50% 40%',
    eyebrow: 'Edition 1 — Available now',
    title: ['Blessings &', 'Good Vibes'],
    cta: { href: '/shop/edition-1', label: 'Shop Edition 1' },
  },
  {
    image: '/images/models/edition1/model3.jpeg',
    focus: '50% 35%',
    eyebrow: 'Built for those who move different',
    title: ['Move', 'different'],
    cta: { href: '/shop', label: 'Shop all' },
  },
  {
    image: '/images/models/edition1/model7.jpeg',
    focus: '50% 30%',
    eyebrow: 'Our story',
    title: ['Credit it', 'all to God'],
    cta: { href: '/about', label: 'Read the story' },
  },
];

const manifesto = ['Never stay the same', 'Break the pattern', 'Rewrite the rules', 'Blessings & good vibes'];

export default function Home() {
  const e2 = getEdition(2);
  const edition2 = getProductsByEdition(2);
  const edition1 = getProductsByEdition(1);

  return (
    <>
      <div className="relative">
        <HeroSlider slides={slides} />
        <div className="pointer-events-none absolute inset-x-0 top-14 z-20 mx-auto max-w-7xl px-4 md:px-8 hidden md:flex justify-end text-paper/80">
          <LiveStatus items={['Edition 02', e2.statusNote ?? (e2.status === 'live' ? 'Out now' : 'Coming soon')]} />
        </div>
      </div>

      {/* Manifesto ticker */}
      <section className="border-b border-line overflow-hidden py-6 md:py-8" aria-label="Manifesto">
        <div className="flex w-max animate-marquee [animation-duration:40s]">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
              {[...manifesto, ...manifesto].map((m, i) => (
                <span key={i} className="display text-5xl md:text-7xl px-6 md:px-10 flex items-center gap-12 md:gap-20 whitespace-nowrap">
                  {m}
                  <span className="text-clay text-3xl">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Edition 2 teaser + waitlist */}
      <section id="edition-2" className="bg-ink text-paper scroll-mt-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-20 md:py-28 grid gap-14 md:grid-cols-2 md:items-center">
          <div>
            <ChapterLabel className="text-clay">{e2.status === 'live' ? 'Now showing' : 'Coming soon'} — Chapter II</ChapterLabel>
            <h2 className="display text-[22vw] md:text-[10rem] mt-4">
              <ScrambleText text="Evolve" />
            </h2>
            <p className="eyebrow mt-2 text-paper/60">Edition 2</p>
            <p className="mt-8 max-w-md text-paper/80 leading-relaxed">{e2.description}</p>
            <LiveStatus className="mt-6 text-paper/60" items={['Edition 02', e2.statusNote ?? (e2.status === 'live' ? 'Out now' : 'Coming soon')]} />

            {e2.launchDate && (
              <div className="mt-10">
                <Countdown to={e2.launchDate} />
              </div>
            )}

            <div className="mt-10 max-w-md">
              {e2.status === 'live' ? (
                <Link href="/shop/edition-2" className="btn bg-paper text-ink hover:bg-clay hover:text-paper">
                  Shop Edition 2
                </Link>
              ) : (
                <>
                  <p className="text-sm text-paper/70 mb-2">Get first access before it sells out.</p>
                  <SubscribeForm source="edition-2-waitlist" tone="light" cta="Notify me" />
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="relative col-span-2 aspect-square bg-black">
              <Image src="/images/products/edition2/Edition2_Product2.jpeg" alt="Evolve Tee — White" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain" />
            </div>
            <div className="relative aspect-square bg-black">
              <Image src="/images/products/edition2/Edition2_Product4.jpeg" alt="Evolve Tank Top — Black" fill sizes="25vw" className="object-contain" />
            </div>
            <div className="relative aspect-square bg-white">
              <Image src="/images/products/edition2/Edition2_Product7.jpeg" alt="Evolve Cap — Brown" fill sizes="25vw" className="object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Crawl → learn → walk → run, driven by scroll */}
      <EvolutionScroll />

      {/* Edition 2 pieces */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <ChapterLabel className="text-muted">Chapter II — Evolve</ChapterLabel>
            <h2 className="display text-5xl md:text-6xl mt-2">The pieces</h2>
          </div>
          <Link href="/shop/edition-2" className="eyebrow flex items-center gap-2 hover:opacity-60">
            View all <ArrowIcon />
          </Link>
        </div>
        <ProductRail products={edition2.slice(0, 4)} />
      </section>

      {/* Lookbook: polaroids that fan out as you scroll */}
      <PolaroidLookbook />

      {/* Edition 1 shop */}
      <section className="bg-bone">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-20">
          <div className="flex items-end justify-between mb-8">
            <div>
              <ChapterLabel className="text-muted">Chapter I — Available now</ChapterLabel>
              <h2 className="display text-5xl md:text-6xl mt-2">Edition 1</h2>
            </div>
            <Link href="/shop/edition-1" className="eyebrow flex items-center gap-2 hover:opacity-60">
              Shop all <ArrowIcon />
            </Link>
          </div>
          <ProductRail products={edition1} />
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-24 grid gap-12 md:grid-cols-2 md:items-center">
        <div className="relative aspect-[4/5] overflow-hidden bg-bone">
          <Image src="/images/models/edition1/model7.jpeg" alt="B&GV Edition 1" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" style={{ objectPosition: '50% 30%' }} />
        </div>
        <div className="md:pl-10">
          <ChapterLabel className="text-muted">Prologue — The story</ChapterLabel>
          <h2 className="display text-5xl md:text-7xl mt-4">Born on Friday nights</h2>
          <p className="mt-8 text-lg md:text-xl leading-relaxed max-w-lg">
            B&amp;GV started as{' '}
            <InlinePhoto src="/images/models/edition1/model1.jpeg" alt="The Friday circle">
              Friday hangouts
            </InlinePhoto>{' '}
            with friends: chilling, relaxing, being present. The bond grew strong enough to earn a name, and it stuck.
            Stay positive through hard times, carry{' '}
            <InlinePhoto src="/images/models/edition1/model3.jpeg" alt="Edition 1, 2024">
              your style
            </InlinePhoto>{' '}
            everywhere, and{' '}
            <InlinePhoto src="/images/products/edition2/Edition2_Product1.jpeg" alt="Edition 2 — Evolve">
              keep evolving
            </InlinePhoto>
            , crediting it all to God&apos;s blessings.
          </p>
          <p className="meta text-muted mt-4">Tap the underlined words</p>
          <Link href="/about" className="btn mt-10 border border-ink hover:bg-ink hover:text-paper">
            Read the story
          </Link>
        </div>
      </section>
    </>
  );
}
