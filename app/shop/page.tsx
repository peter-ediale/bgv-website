import Link from 'next/link';
import Image from 'next/image';
import CartButton from '../components/CartButton';
import ProductCard from '../components/ProductCard';
import AddToCart from '../components/AddToCart';
import {
  products,
  editions,
  getEdition,
  getModelPhotos,
  isPurchasable,
  lookbookImages,
  type EditionId,
} from '../../lib/catalog';

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ edition?: string }>;
}) {
  const { edition: editionParam } = await searchParams;
  const editionId = editions.find((e) => String(e.id) === editionParam)?.id as EditionId | undefined;
  const edition = editionId ? getEdition(editionId) : null;

  const filtered = edition ? products.filter((p) => p.edition === edition.id) : products;
  const title = edition ? `${edition.name} Collection` : 'All Collections';

  return (
    <main className="min-h-screen bg-[#FBF8F3]">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="B&GV Logo" width={40} height={40} className="h-10 w-auto object-contain" />
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-[#4A4A4A]">
          <Link href="/" className="hover:text-[#C9A96E] transition-colors">Home</Link>
          <Link href="/shop" className="text-[#C9A96E] transition-colors">Shop</Link>
          <Link href="/about" className="hover:text-[#C9A96E] transition-colors">About</Link>
          <Link href="/contact" className="hover:text-[#C9A96E] transition-colors">Contact</Link>
        </div>
        <CartButton />
      </nav>

      {/* Shop Header */}
      <div className="text-center py-12 px-4">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A]">{title}</h1>
        <p className="mt-2 text-[#8B7A6B] text-sm tracking-[0.2em] uppercase">
          {edition ? edition.tagline : 'Blessings & Good Vibes'}
        </p>
      </div>

      {/* Model Lookbook Section (Edition 1 photos for now) */}
      {editionId !== 2 && (
        <div className="max-w-7xl mx-auto px-4 pb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">The Lookbook</h2>
            <span className="text-sm text-[#8B7A6B] tracking-wider uppercase">Edition 1</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {lookbookImages.slice(0, 5).map((src, i) => (
              <div key={src} className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[#F0ECE4]">
                <Image
                  src={src}
                  alt={`Edition 1 look ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4">
        <div className="border-t border-[#E8E0D8]"></div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">Shop the Collection</h2>
          <span className="text-sm text-[#8B7A6B] tracking-wider uppercase">{filtered.length} Products</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} modelImages={getModelPhotos(product)} />
              <AddToCart
                product={product}
                purchasable={isPurchasable(product)}
                comingSoon={getEdition(product.edition).status === 'coming-soon'}
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
