"use client";

export const dynamic = 'force-dynamic';

import Image from 'next/image';
import { useCartStore } from '../store/cartStore';
import CartButton from '../components/CartButton';
import ProductCard from '../components/ProductCard';
import { allProducts as catalogProducts, productsEdition2, modelFiles, getModelsByColor } from '../../lib/catalog';
import { useSearchParams } from 'next/navigation';

// Use shared product catalog
const products = catalogProducts;

// Model images for the lookbook and hover-preview mapping
// Note: some filenames in `/public` include spaces (e.g. "model 8 red tee.jpeg").
// We reference them exactly as they exist in the `public/` folder.
// Use shared unique model images and pick the first 5 for the lookbook
import { uniqueModelImages } from '../../lib/catalog';
const models = uniqueModelImages.slice(0, 5).map((img, idx) => ({ id: idx + 1, image: img, name: `Look ${idx + 1}` }));

function getModelForColor(color: string | null | undefined): string | null {
  if (!color) return null;
  const found = modelFiles.find((m) => m.color === color);
  return found ? found.image : null;
}

export default function ShopPage() {
  const searchParams = useSearchParams();
  const edition = searchParams ? searchParams.get('edition') : null;

  const filtered = edition ? products.filter((p) => p.edition === edition) : products;

  const title = edition ? `Edition ${edition} Collection` : 'Edition 1 Collection';

  return (
    <main className="min-h-screen bg-[#FBF8F3]">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Image 
            src="/logo.png" 
            alt="B&GV Logo" 
            width={40}
            height={40}
            className="h-10 w-auto object-contain"
          />
        </div>
        
        <div className="hidden md:flex gap-8 text-sm font-medium text-[#4A4A4A]">
          <a href="/" className="hover:text-[#C9A96E] transition-colors">Home</a>
          <a href="/shop" className="text-[#C9A96E] transition-colors">Shop</a>
          <a href="/about" className="hover:text-[#C9A96E] transition-colors">About</a>
          <a href="/contact" className="hover:text-[#C9A96E] transition-colors">Contact</a>
        </div>
        
        <CartButton />

      </nav>

      {/* Shop Header */}
      <div className="text-center py-12 px-4">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#1A1A1A]">
          {title}
        </h1>
        <p className="mt-2 text-[#8B7A6B] text-sm tracking-[0.2em] uppercase">
          {edition ? `Edition ${edition}` : 'Where it all started'}
        </p>
      </div>

      {/* Model Lookbook Section */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex items-center justify-between mb-8">
                <h2 className="font-serif text-2xl font-bold text-[#1A1A1A]">The Lookbook</h2>
                <span className="text-sm text-[#8B7A6B] tracking-wider uppercase">{edition ? `Edition ${edition}` : 'Edition 1'}</span>
              </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {models.map((model) => (
            <div key={model.id} className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[#F0ECE4]">
              <Image 
                src={model.image} 
                alt={model.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
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
          {filtered.length === 0 ? (
            <div className="col-span-full bg-white rounded-lg p-8 text-center">
              <h3 className="font-medium">Coming soon</h3>
              <p className="text-sm text-[#8B7A6B] mt-2">We haven't released this edition yet. Check back soon.</p>
            </div>
          ) : (
            filtered.map((product) => {
              // gather all model images matching product color
              const color = product.color;
              const modelImages = modelFiles.filter((m) => m.color === color).map((m) => m.image);
              return (
                <div key={product.id}>
                  <ProductCard product={product} modelImages={modelImages} />
                  <div className="mt-3">
                    <button
                      onClick={() => {
                        const addItem = useCartStore.getState().addItem;
                        addItem({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                        });
                      }}
                      className="mt-3 w-full py-2 border border-[#1A1A1A] rounded-full text-sm hover:bg-[#1A1A1A] hover:text-white transition-all duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}
