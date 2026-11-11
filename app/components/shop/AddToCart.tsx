"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useCartStore } from '../../store/cartStore';
import { useUIStore } from '../../store/uiStore';
import type { Product } from '@/lib/catalog';

type Props = { product: Product; purchasable: boolean; comingSoon: boolean };

export default function AddToCart({ product, purchasable, comingSoon }: Props) {
  const addItem = useCartStore((s) => s.addItem);
  const openCart = useUIStore((s) => s.openCart);
  const oneSize = product.sizes.length === 1;
  const [size, setSize] = useState<string | null>(oneSize ? product.sizes[0] : null);
  const [needSize, setNeedSize] = useState(false);

  if (!purchasable) {
    return comingSoon ? (
      <div className="space-y-3">
        <button disabled className="btn w-full bg-ink text-paper">Coming soon</button>
        <Link href="/#edition-2" className="btn w-full border border-ink hover:bg-ink hover:text-paper">
          Join the waitlist
        </Link>
      </div>
    ) : (
      <button disabled className="btn w-full border border-line text-muted">Sold out</button>
    );
  }

  const handleAdd = () => {
    if (!size) return setNeedSize(true);
    addItem({ productId: product.id, size, name: product.name, price: product.price, image: product.images[0] });
    openCart();
  };

  return (
    <div>
      {!oneSize && (
        <fieldset>
          <div className="flex justify-between items-center mb-3">
            <legend className="eyebrow">Size{size ? `: ${size}` : ''}</legend>
            <Link href="/size-guide" className="text-xs underline text-muted">Size guide</Link>
          </div>
          <div className="grid grid-cols-5 gap-2" role="radiogroup" aria-label="Size">
            {product.sizes.map((s) => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={size === s}
                onClick={() => {
                  setSize(s);
                  setNeedSize(false);
                }}
                className={`h-12 border text-sm transition-colors ${
                  size === s ? 'bg-ink text-paper border-ink' : 'border-line hover:border-ink'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          {needSize && <p className="mt-2 text-xs text-ember" role="alert">Please choose a size.</p>}
        </fieldset>
      )}
      <button onClick={handleAdd} className="btn w-full mt-5 bg-ink text-paper hover:bg-clay">
        Add to bag
      </button>
    </div>
  );
}
