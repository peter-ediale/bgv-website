"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCartStore } from '@/app/store/cartStore';

export default function PaymentSuccessPage() {
  const clearCart = useCartStore((s) => s.clearCart);
  // Paystack sends the customer back with ?reference=<our order id>
  const [orderId] = useState<string | null>(() =>
    typeof window === 'undefined' ? null : new URLSearchParams(window.location.search).get('reference')
  );
  const [status, setStatus] = useState<'checking' | 'paid' | 'failed'>('checking');

  useEffect(() => {
    const reference = new URLSearchParams(window.location.search).get('reference');
    (async () => {
      if (!reference) return setStatus('failed');
      try {
        const res = await fetch('/api/payments/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reference }),
        });
        const data = await res.json();
        if (data.paid) {
          clearCart();
          setStatus('paid');
        } else {
          setStatus('failed');
        }
      } catch {
        setStatus('failed');
      }
    })();
  }, [clearCart]);

  return (
    <div className="mx-auto max-w-xl px-4 py-28 text-center min-h-[60vh]">
      {status === 'checking' && <p className="eyebrow text-muted">Confirming your payment…</p>}

      {status === 'paid' && (
        <>
          <p className="eyebrow text-clay">Order confirmed</p>
          <h1 className="display text-6xl md:text-7xl mt-4">Thank you 🙏🏾</h1>
          <p className="mt-6 text-muted">Your payment was received. A confirmation email is on its way, and we&apos;ll call you when your order ships.</p>
          {orderId && (
            <p className="mt-6 text-sm">
              Order number: <strong>{orderId}</strong>
            </p>
          )}
          <Link href="/shop" className="btn mt-10 bg-ink text-paper hover:bg-clay">Continue shopping</Link>
        </>
      )}

      {status === 'failed' && (
        <>
          <h1 className="display text-5xl md:text-6xl">We couldn&apos;t confirm your payment</h1>
          <p className="mt-6 text-muted">If you were charged, don&apos;t worry. Contact us with your order number and we&apos;ll sort it out.</p>
          {orderId && (
            <p className="mt-6 text-sm">
              Order number: <strong>{orderId}</strong>
            </p>
          )}
          <Link href="/contact" className="btn mt-10 bg-ink text-paper hover:bg-clay">Contact us</Link>
        </>
      )}
    </div>
  );
}
