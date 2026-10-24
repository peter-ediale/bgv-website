import Image from 'next/image';
import Link from 'next/link';
import FeaturedProductPreview from './FeaturedProductPreview';
import { products, productsEdition2, getModelsByColor } from '../../lib/catalog';

export default function FeaturedSection() {
  return (
    <section id="featured" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="font-serif text-3xl font-bold text-[#1A1A1A] mb-6">Featured Collections</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Edition 1 card: shows the tees in Edition 1 and links to filtered shop */}
          <Link href="/shop?edition=1" className="group block overflow-hidden rounded-lg border hover:shadow-lg transition-shadow">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-[#8B7A6B] uppercase">Edition</div>
                  <div className="font-serif text-2xl font-bold mt-1">Edition 1</div>
                </div>
                <div className="text-[#C9A96E] font-semibold">View all</div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                {products.slice(0,4).map((p) => (
                  <div key={p.id}>
                    <FeaturedProductPreview imageSrc={p.image} alt={p.name} modelImages={getModelsByColor(p.color)} />
                  </div>
                ))}
              </div>
            </div>
          </Link>

          {/* Edition 2 card: render real images if available */}
          <Link href="/shop?edition=2" className="group block overflow-hidden rounded-lg border hover:shadow-lg transition-shadow">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-[#8B7A6B] uppercase">Edition</div>
                  <div className="font-serif text-2xl font-bold mt-1">Edition 2</div>
                </div>
                <div className="text-[#C9A96E] font-semibold">View all</div>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                {productsEdition2.length ? productsEdition2.slice(0,4).map((p) => (
                  <div key={p.id}>
                    <FeaturedProductPreview imageSrc={p.image} alt={p.name} modelImages={getModelsByColor(p.color)} />
                  </div>
                )) : (
                  [1,2,3,4].map((i) => (
                    <div key={i} className="relative aspect-square rounded bg-[#EDE6DD] overflow-hidden"></div>
                  ))
                )}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
