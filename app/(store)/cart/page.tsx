"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useCartStore, cartSubtotal } from '../../store/cartStore';
import { useHydrated } from '../../components/useHydrated';
import { MinusIcon, PlusIcon } from '../../components/site/Icons';
import { formatNaira } from '@/lib/catalog';

export default function CartPage() {
  const { items, removeItem, updateQuantity } = useCartStore();
  const hydrated = useHydrated();

  if (!hydrated) return <div className="min-h-[60vh]" />;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <h1 className="display text-5xl md:text-6xl">Your bag is empty</h1>
        <p className="mt-4 text-muted">Find something that moves different.</p>
        <Link href="/shop" className="btn mt-8 bg-ink text-paper hover:bg-clay">Shop now</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 md:px-8 py-12 md:py-16">
      <h1 className="display text-5xl md:text-7xl">Your bag</h1>

      <ul className="mt-10 border-t border-line divide-y divide-line">
        {items.map((item) => (
          <li key={item.key} className="flex gap-4 md:gap-6 py-6">
            <div className="relative w-24 md:w-28 aspect-[4/5] bg-bone shrink-0">
              <Image src={item.image} alt={item.name} fill sizes="112px" className="object-cover" />
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between gap-4">
                <p className="text-sm font-medium uppercase tracking-wide">{item.name}</p>
                <p className="text-sm">{formatNaira(item.price * item.quantity)}</p>
              </div>
              <p className="text-xs text-muted mt-1">Size: {item.size} · {formatNaira(item.price)} each</p>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center border border-line">
                  <button onClick={() => updateQuantity(item.key, item.quantity - 1)} aria-label="Decrease quantity" className="p-3">
                    <MinusIcon className="size-3" />
                  </button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.key, item.quantity + 1)} aria-label="Increase quantity" className="p-3">
                    <PlusIcon className="size-3" />
                  </button>
                </div>
                <button onClick={() => removeItem(item.key)} className="text-xs underline text-muted hover:text-ink">
                  Remove
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-8 border-t border-line pt-6 md:flex md:items-center md:justify-between">
        <div>
          <p className="flex gap-6 text-lg">
            <span className="eyebrow self-center">Subtotal</span>
            <span className="font-semibold">{formatNaira(cartSubtotal(items))}</span>
          </p>
          <p className="text-xs text-muted mt-1">Delivery calculated at checkout.</p>
        </div>
        <Link href="/checkout" className="btn mt-6 md:mt-0 w-full md:w-auto bg-ink text-paper hover:bg-clay">
          Checkout
        </Link>
      </div>
    </div>
  );
}
