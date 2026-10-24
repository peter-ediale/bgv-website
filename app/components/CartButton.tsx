"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useCartStore } from '../store/cartStore';

export default function CartButton() {
  const itemCount = useCartStore((state) => state.getTotalItems());
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen((s) => !s)} className="px-4 py-2 border border-[#1A1A1A] rounded-full text-sm hover:bg-[#1A1A1A] hover:text-white transition-all duration-300">
        Cart ({itemCount})
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white border rounded shadow p-3 z-50">
          {items.length === 0 ? (
            <div className="text-center text-sm text-[#8B7A6B]">Your cart is empty</div>
          ) : (
            <div className="space-y-3">
              {items.map((it) => (
                <div key={it.id} className="flex items-center gap-3">
                  <div className="w-12 h-12 relative bg-[#F0ECE4] rounded overflow-hidden">
                    <Image src={it.image} alt={it.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 text-sm">
                    <div className="font-medium text-[#1A1A1A]">{it.name}</div>
                    <div className="text-xs text-[#8B7A6B]">{it.price} x {it.quantity}</div>
                  </div>
                  <button onClick={() => removeItem(it.id)} className="text-red-500 text-sm">✕</button>
                </div>
              ))}

              <div className="flex gap-2">
                <Link href="/cart">
                  <button onClick={() => setOpen(false)} className="flex-1 py-2 bg-[#F0ECE4] rounded text-sm">View Cart</button>
                </Link>
                <Link href="/checkout">
                  <button onClick={() => setOpen(false)} className="flex-1 py-2 bg-[#1A1A1A] text-white rounded text-sm">Checkout</button>
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
