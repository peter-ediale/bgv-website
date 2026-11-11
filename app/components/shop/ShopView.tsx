import Link from 'next/link';
import ProductCard from './ProductCard';
import { editions, products, type Edition } from '@/lib/catalog';

/** The shop grid, either for all editions or for one. */
export default function ShopView({ edition }: { edition: Edition | null }) {
  const list = edition
    ? products.filter((p) => p.edition === edition.id)
    : [...products].sort((a, b) => b.edition - a.edition);

  const tabs = [
    { href: '/shop', label: 'All', active: !edition },
    ...editions.map((e) => ({ href: `/shop/edition-${e.id}`, label: `Edition ${e.id}`, active: edition?.id === e.id })),
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 pt-12 md:pt-16 pb-24">
      <header className="max-w-3xl">
        <p className="eyebrow text-muted">
          {edition ? (edition.status === 'live' ? 'Available now' : 'Coming soon') : 'All editions'}
        </p>
        <h1 className="display text-6xl md:text-8xl mt-3">{edition ? edition.name : 'Shop all'}</h1>
        {edition && <p className="mt-6 text-muted leading-relaxed max-w-xl">{edition.description}</p>}
      </header>

      <div className="mt-10 flex items-center justify-between border-y border-line py-4">
        <nav className="flex gap-6" aria-label="Filter by edition">
          {tabs.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              aria-current={t.active ? 'page' : undefined}
              className={`eyebrow pb-1 border-b ${t.active ? 'border-ink' : 'border-transparent text-muted hover:text-ink'}`}
            >
              {t.label}
            </Link>
          ))}
        </nav>
        <p className="eyebrow text-muted">{list.length} pieces</p>
      </div>

      <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">
        {list.map((p, i) => (
          <ProductCard key={p.id} product={p} priority={i < 4} />
        ))}
      </div>
    </div>
  );
}
