import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductGallery from '../../../components/shop/ProductGallery';
import AddToCart from '../../../components/shop/AddToCart';
import ProductRail from '../../../components/shop/ProductRail';
import { formatNaira, getEdition, getModelPhotos, getProduct, isPurchasable, products } from '@/lib/catalog';
import { delivery } from '@/lib/site';

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).id);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [{ url: product.images[0] }] },
  };
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).id);
  if (!product) notFound();

  const edition = getEdition(product.edition);
  const gallery = [...product.images, ...getModelPhotos(product)];
  const related = products.filter((p) => p.edition === product.edition && p.id !== product.id).slice(0, 4);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 md:px-8 pt-6 pb-20">
        <nav className="eyebrow text-muted mb-6" aria-label="Breadcrumb">
          <Link href="/shop" className="hover:text-ink">Shop</Link>
          <span className="mx-2">/</span>
          <Link href={`/shop/edition-${edition.id}`} className="hover:text-ink">{edition.name}</Link>
        </nav>

        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <ProductGallery images={gallery} alt={product.name} mockups={product.images.length} bg={product.bg} />
          </div>

          <div className="md:col-span-5 md:sticky md:top-24 md:self-start">
            <p className="eyebrow text-muted">{edition.name}</p>
            <h1 className="display text-5xl md:text-6xl mt-3">{product.name}</h1>
            <p className="mt-4 text-lg">{formatNaira(product.price)}</p>
            <p className="mt-6 text-muted leading-relaxed">{product.description}</p>

            <div className="mt-8">
              <AddToCart
                product={product}
                purchasable={isPurchasable(product)}
                comingSoon={edition.status === 'coming-soon'}
              />
            </div>

            <div className="mt-10 border-t border-line divide-y divide-line">
              <details className="group py-4" open>
                <summary className="eyebrow flex justify-between cursor-pointer list-none">
                  Delivery <span className="group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  Lagos: {formatNaira(delivery.lagos)}, {delivery.lagosDays}. Other states: {formatNaira(delivery.otherStates)}, {delivery.otherDays}.
                </p>
              </details>
              <details className="group py-4">
                <summary className="eyebrow flex justify-between cursor-pointer list-none">
                  Size & fit <span className="group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  {product.category === 'Cap' ? 'One size, adjustable strap.' : 'Relaxed, boxy fit. If you’re between sizes, size down for a closer fit.'}{' '}
                  <Link href="/size-guide" className="underline">See the size guide</Link>.
                </p>
              </details>
              <details className="group py-4">
                <summary className="eyebrow flex justify-between cursor-pointer list-none">
                  Returns <span className="group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted leading-relaxed">
                  Wrong size? Exchanges within 7 days of delivery on unworn items with tags.{' '}
                  <Link href="/shipping-returns" className="underline">Full policy</Link>.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 md:px-8 pb-24">
          <h2 className="display text-4xl md:text-5xl mb-8">Complete the look</h2>
          <ProductRail products={related} />
        </section>
      )}
    </>
  );
}
