"use client";

import { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import type { Product } from '../../lib/catalog';

type Props = { product: Product; purchasable: boolean; comingSoon: boolean };

export default function AddToCart({ product, purchasable, comingSoon }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const oneSize = product.sizes.length === 1;
  const [size, setSize] = useState<string | null>(oneSize ? product.sizes[0] : null);
  const [added, setAdded] = useState(false);

  if (!purchasable) {
    return (
      <button disabled className="mt-3 w-full py-2 border border-[#E8E0D8] rounded-full text-sm text-[#8B7A6B] cursor-not-allowed">
        {comingSoon ? 'Coming Soon' : 'Sold Out'}
      </button>
    );
  }

  const handleAdd = () => {
    if (!size) return;
    addItem({ productId: product.id, size, name: product.name, price: product.price, image: product.images[0] });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="mt-3">
      {!oneSize && (
        <div className="flex gap-2 flex-wrap" role="radiogroup" aria-label={`Size for ${product.name}`}>
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              role="radio"
              aria-checked={size === s}
              onClick={() => setSize(s)}
              className={`min-w-10 px-2 py-1 border text-xs rounded ${size === s ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'border-[#E8E0D8] hover:border-[#1A1A1A]'}`}
            >
              {s}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={handleAdd}
        disabled={!size}
        className="mt-3 w-full py-2 border border-[#1A1A1A] rounded-full text-sm hover:bg-[#1A1A1A] hover:text-white transition-all duration-300 disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-current"
      >
        {added ? 'Added ✓' : size ? 'Add to Cart' : 'Select a size'}
      </button>
    </div>
  );
}
