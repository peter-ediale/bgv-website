import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ChapterLabel from '../../components/fx/ChapterLabel';

export const metadata: Metadata = {
  title: 'Our Story',
  description: 'How Friday hangouts with friends became Blessings & Good Vibes.',
};

const chapters = [
  {
    year: 'The circle',
    title: 'Friday nights',
    body: 'B&GV started with a simple ritual: Friday hangouts with friends, chilling, relaxing and being present with each other. Over time the bond in that circle grew strong enough to earn a name, Blessings and Good Vibes, and it stuck.',
    image: '/images/models/edition1/model1.jpeg',
  },
  {
    year: '2024',
    title: 'Edition 1',
    body: 'The first edition was a prototype. The goal was never perfection. It was getting the idea out of our heads and into the world.',
    image: '/images/models/edition1/model2.jpeg',
  },
  {
    year: '2026',
    title: 'Evolve',
    body: 'The brand has grown alongside its founder through tough times, resilience and grit. Edition 2 reflects that growth: not a finished glow-up, but proof of a brand still evolving, still building, and still carrying blessings and good vibes through every phase.',
    image: '/images/products/edition2/Edition2_Product1.jpeg',
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-4 md:px-8 pt-16 md:pt-24 pb-16">
        <ChapterLabel className="text-muted">Prologue — Our story</ChapterLabel>
        <h1 className="display text-[15vw] md:text-[9rem] mt-4">
          Blessings &amp;
          <br />
          <span className="text-clay">good vibes</span>
        </h1>
        <p className="mt-10 max-w-2xl text-lg leading-relaxed text-muted">
          Stay positive no matter the situation. Keep a happy face through hard times. Carry a strong sense of style
          and vibe into everything, from parties to everyday life, and credit it all to one thing above everything
          else: God&apos;s blessings.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 md:px-8 pb-24 space-y-24">
        {chapters.map((c, i) => (
          <article key={c.title} className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className={`relative aspect-[4/5] overflow-hidden bg-bone ${i % 2 ? 'md:order-2' : ''}`}>
              <Image src={c.image} alt={c.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" style={{ objectPosition: '50% 35%' }} />
            </div>
            <div className={i % 2 ? 'md:pr-12' : 'md:pl-12'}>
              <ChapterLabel className="text-clay">
                Chapter {['I', 'II', 'III'][i]} — {c.year}
              </ChapterLabel>
              <h2 className="display text-5xl md:text-7xl mt-3">{c.title}</h2>
              <p className="mt-6 text-muted leading-relaxed max-w-md">{c.body}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-20 grid gap-12 md:grid-cols-2">
          <div>
            <p className="eyebrow text-paper/50">Mission</p>
            <p className="mt-4 text-xl leading-relaxed">
              To design and produce high-quality clothing that promotes self-expression, confidence and a positive
              lifestyle, while building a sense of community and unity among the people who wear it.
            </p>
          </div>
          <div>
            <p className="eyebrow text-paper/50">Vision</p>
            <p className="mt-4 text-xl leading-relaxed">
              To become a leading clothing brand in Africa, recognised for a unique style and comfort, and for making a
              positive impact on our customers&apos; lives.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 md:px-8 pb-20">
          <Link href="/shop" className="btn bg-paper text-ink hover:bg-clay hover:text-paper">Shop the collection</Link>
        </div>
      </section>
    </>
  );
}
