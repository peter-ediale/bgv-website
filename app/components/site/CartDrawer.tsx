"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useCartStore, cartSubtotal } from '../../store/cartStore';
import { useUIStore } from '../../store/uiStore';
import { formatNaira } from '../../../lib/catalog';
import { CloseIcon, MinusIcon, PlusIcon } from './Icons';
import { useHydrated } from '../useHydrated';

export default function CartDrawer() {
  const { items: stored, updateQuantity, removeItem } = useCartStore();
  const items = useHydrated() ? stored : [];
  const { cartOpen, closeCart } = useUIStore();

  useEffect(() => {
    if (!cartOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && closeCart();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [cartOpen, closeCart]);

  return (
    <div className={`fixed inset-0 z-50 ${cartOpen ? '' : 'pointer-events-none'}`} aria-hidden={!cartOpen}>
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${cartOpen ? 'opacity-100' : 'opacity-0'}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-paper flex flex-col transition-transform duration-300 ease-out ${
          cartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-line">
          <h2 className="eyebrow">Your Bag ({items.reduce((n, i) => n + i.quantity, 0)})</h2>
          <button onClick={closeCart} aria-label="Close bag" className="p-2 -mr-2" tabIndex={cartOpen ? 0 : -1}>
            <CloseIcon />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 text-center">
            <p className="display text-4xl">Your bag is empty</p>
            <Link href="/shop" onClick={closeCart} className="btn bg-ink text-paper hover:bg-clay" tabIndex={cartOpen ? 0 : -1}>
              Shop now
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto divide-y divide-line px-6">
              {items.map((it) => (
                <li key={it.key} className="flex gap-4 py-5">
                  <div className="relative w-20 aspect-[4/5] bg-bone shrink-0">
                    <Image src={it.image} alt={it.name} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between gap-3">
                      <p className="text-sm font-medium uppercase tracking-wide">{it.name}</p>
                      <p className="text-sm">{formatNaira(it.price * it.quantity)}</p>
                    </div>
                    <p className="text-xs text-muted mt-1">Size: {it.size}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-line">
                        <button onClick={() => updateQuantity(it.key, it.quantity - 1)} aria-label="Decrease quantity" className="p-2" tabIndex={cartOpen ? 0 : -1}>
                          <MinusIcon className="size-3" />
                        </button>
                        <span className="w-6 text-center text-sm">{it.quantity}</span>
                        <button onClick={() => updateQuantity(it.key, it.quantity + 1)} aria-label="Increase quantity" className="p-2" tabIndex={cartOpen ? 0 : -1}>
                          <PlusIcon className="size-3" />
                        </button>
                      </div>
                      <button onClick={() => removeItem(it.key)} className="text-xs underline text-muted hover:text-ink" tabIndex={cartOpen ? 0 : -1}>
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-line p-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="eyebrow">Subtotal</span>
                <span className="font-semibold">{formatNaira(cartSubtotal(items))}</span>
              </div>
              <p className="text-xs text-muted">Delivery calculated at checkout.</p>
              <Link href="/checkout" onClick={closeCart} className="btn w-full bg-ink text-paper hover:bg-clay" tabIndex={cartOpen ? 0 : -1}>
                Checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
