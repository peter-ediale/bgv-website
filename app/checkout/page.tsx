"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useCartStore, cartSubtotal } from '../store/cartStore';
import { formatNaira } from '../../lib/catalog';
import { useHydrated } from '../components/useHydrated';

const inputClass = 'mt-2 w-full border border-[#E8E0D8] rounded p-2 focus:outline-none focus:border-[#C9A96E]';

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const hydrated = useHydrated();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(({ productId, size, quantity }) => ({ productId, size, quantity })),
          customer: form,
        }),
      });
      const data = await res.json();
      if (res.ok && data.paymentUrl) {
        window.location.href = data.paymentUrl;
        return;
      }
      setError(data.error || 'Something went wrong. Please try again.');
    } catch {
      setError('Network error. Check your connection and try again.');
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-[#FBF8F3]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/cart" className="text-sm text-[#8B7A6B] hover:text-[#1A1A1A]">← Back to cart</Link>
        <h1 className="font-serif text-4xl font-bold text-[#1A1A1A] mt-4 mb-8">Checkout</h1>

        {!hydrated ? null : items.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-[#8B7A6B]">Your cart is empty.</p>
            <Link href="/shop" className="mt-4 inline-block px-6 py-3 bg-[#1A1A1A] text-white rounded-full hover:bg-[#C9A96E] transition-all">Go to Shop</Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden p-6">
            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-[#8B7A6B]">
                  Full name
                  <input required autoComplete="name" value={form.name} onChange={set('name')} className={inputClass} />
                </label>
                <label className="block text-sm text-[#8B7A6B] mt-4">
                  Email
                  <input required type="email" autoComplete="email" value={form.email} onChange={set('email')} className={inputClass} />
                </label>
                <label className="block text-sm text-[#8B7A6B] mt-4">
                  Phone (for delivery)
                  <input required type="tel" autoComplete="tel" placeholder="080..." value={form.phone} onChange={set('phone')} className={inputClass} />
                </label>
                <label className="block text-sm text-[#8B7A6B] mt-4">
                  Delivery address (street, city, state)
                  <textarea required rows={3} autoComplete="street-address" value={form.address} onChange={set('address')} className={inputClass} />
                </label>
              </div>

              <div>
                <h2 className="font-medium text-[#1A1A1A]">Order Summary</h2>
                <div className="mt-4 space-y-4 max-h-64 overflow-auto">
                  {items.map((item) => (
                    <div key={item.key} className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-[#1A1A1A]">{item.name} × {item.quantity}</div>
                        <div className="text-xs text-[#8B7A6B]">Size {item.size} · {formatNaira(item.price)}</div>
                      </div>
                      <div className="font-medium">{formatNaira(item.price * item.quantity)}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <span className="text-lg font-medium text-[#1A1A1A]">Total</span>
                  <span className="text-2xl font-serif font-bold text-[#C9A96E]">{formatNaira(cartSubtotal(items))}</span>
                </div>

                {error && <p role="alert" className="mt-4 text-sm text-red-600">{error}</p>}

                <button type="submit" disabled={loading} className="w-full mt-6 py-3 bg-[#1A1A1A] text-white rounded-full hover:bg-[#C9A96E] transition-all duration-300 font-medium disabled:opacity-60">
                  {loading ? 'Redirecting to payment…' : 'Pay with Paystack'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
