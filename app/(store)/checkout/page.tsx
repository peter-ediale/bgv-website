"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCartStore, cartSubtotal } from '../../store/cartStore';
import { useHydrated } from '../../components/useHydrated';
import { formatNaira } from '@/lib/catalog';
import { NIGERIAN_STATES, deliveryFee } from '@/lib/site';

const field =
  'mt-2 w-full bg-transparent border border-line px-4 py-3 text-sm outline-none focus:border-ink transition-colors';

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items);
  const hydrated = useHydrated();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '', state: '' });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const subtotal = cartSubtotal(items);
  const fee = form.state ? deliveryFee(form.state, subtotal) : null;

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

  if (!hydrated) return <div className="min-h-[60vh]" />;

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <h1 className="display text-5xl">Your bag is empty</h1>
        <Link href="/shop" className="btn mt-8 bg-ink text-paper hover:bg-clay">Shop now</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 md:px-8 py-12 md:py-16">
      <h1 className="display text-5xl md:text-7xl">Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="mt-10 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-10">
          <fieldset>
            <legend className="eyebrow mb-4">1. Contact</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm sm:col-span-2">
                Full name
                <input required autoComplete="name" value={form.name} onChange={set('name')} className={field} />
              </label>
              <label className="text-sm">
                Email
                <input required type="email" autoComplete="email" value={form.email} onChange={set('email')} className={field} />
              </label>
              <label className="text-sm">
                Phone (for the rider)
                <input required type="tel" autoComplete="tel" placeholder="080..." value={form.phone} onChange={set('phone')} className={field} />
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend className="eyebrow mb-4">2. Delivery</legend>
            <div className="grid gap-4">
              <label className="text-sm">
                State
                <select required value={form.state} onChange={set('state')} className={field}>
                  <option value="" disabled>Choose your state</option>
                  {NIGERIAN_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </label>
              <label className="text-sm">
                Delivery address (street, area, city, landmark)
                <textarea required rows={3} autoComplete="street-address" value={form.address} onChange={set('address')} className={field} />
              </label>
            </div>
          </fieldset>
        </div>

        <aside className="lg:col-span-5">
          <div className="bg-bone p-6 md:p-8 lg:sticky lg:top-24">
            <h2 className="eyebrow">Order summary</h2>
            <ul className="mt-6 space-y-4">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4">
                  <div className="relative w-16 aspect-[4/5] bg-paper shrink-0">
                    <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                    <span className="absolute -top-2 -right-2 size-5 rounded-full bg-ink text-paper text-[10px] grid place-items-center">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="uppercase tracking-wide">{item.name}</p>
                    <p className="text-xs text-muted mt-1">Size {item.size}</p>
                  </div>
                  <p className="text-sm">{formatNaira(item.price * item.quantity)}</p>
                </li>
              ))}
            </ul>

            <dl className="mt-6 border-t border-line pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Subtotal</dt>
                <dd>{formatNaira(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Delivery</dt>
                <dd>{fee === null ? 'Choose a state' : fee === 0 ? 'Free' : formatNaira(fee)}</dd>
              </div>
              <div className="flex justify-between border-t border-line pt-3 mt-3 text-base font-semibold">
                <dt>Total</dt>
                <dd>{formatNaira(subtotal + (fee ?? 0))}</dd>
              </div>
            </dl>

            {error && <p role="alert" className="mt-4 text-sm text-ember">{error}</p>}

            <button type="submit" disabled={loading} className="btn w-full mt-6 bg-ink text-paper hover:bg-clay">
              {loading ? 'Redirecting to payment…' : 'Pay securely with Paystack'}
            </button>
            <p className="mt-3 text-xs text-muted text-center">Card, bank transfer and USSD accepted.</p>
          </div>
        </aside>
      </form>
    </div>
  );
}
