"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useCartStore } from '../../store/cartStore';

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
    <main className="min-h-screen flex items-center justify-center bg-[#FBF8F3] px-4">
      <div className="p-8 bg-white rounded shadow text-center max-w-md">
        {status === 'checking' && <p>Confirming your payment…</p>}

        {status === 'paid' && (
          <>
            <h1 className="font-serif text-2xl font-bold">Thank you! 🙏🏾</h1>
            <p className="mt-2">Your payment was received and your order is confirmed.</p>
            {orderId && <p className="mt-2 text-sm text-[#8B7A6B]">Order number: <strong>{orderId}</strong></p>}
            <p className="mt-2 text-sm text-[#8B7A6B]">A confirmation email is on its way.</p>
            <Link href="/" className="mt-6 inline-block px-6 py-2 bg-[#1A1A1A] text-white rounded-full">Back to Home</Link>
          </>
        )}

        {status === 'failed' && (
          <>
            <h1 className="font-serif text-2xl font-bold">We couldn&apos;t confirm your payment</h1>
            <p className="mt-2">If you were charged, don&apos;t worry — contact us with your order number and we&apos;ll sort it out.</p>
            {orderId && <p className="mt-2 text-sm text-[#8B7A6B]">Order number: <strong>{orderId}</strong></p>}
            <Link href="/contact" className="mt-6 inline-block px-6 py-2 bg-[#1A1A1A] text-white rounded-full">Contact us</Link>
          </>
        )}
      </div>
    </main>
  );
}
