"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentSuccessPage({ searchParams }: { searchParams?: any }) {
  const router = useRouter();
  const [status, setStatus] = useState<'checking' | 'paid' | 'failed'>('checking');

  useEffect(() => {
    (async () => {
      const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams(searchParams);
      const reference = params.get('reference') || params.get('orderId');
      const mock = params.get('mock');

      if (!reference) {
        setStatus('failed');
        return;
      }

      try {
        const res = await fetch('/api/payments/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reference, orderId: reference }),
        });
        const data = await res.json();
        if (data.paid) setStatus('paid');
        else setStatus('failed');
      } catch (err) {
        console.error(err);
        setStatus('failed');
      }
    })();
  }, []);

  if (status === 'checking') {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#FBF8F3]">
        <div className="p-8 bg-white rounded shadow text-center">Checking payment...</div>
      </main>
    );
  }

  if (status === 'paid') {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#FBF8F3]">
        <div className="p-8 bg-white rounded shadow text-center">
          <h2 className="font-serif text-2xl font-bold">Payment Successful</h2>
          <p className="mt-2">Thank you — your payment was received.</p>
          <a href="/" className="mt-4 inline-block px-4 py-2 bg-[#1A1A1A] text-white rounded">Back to Home</a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FBF8F3]">
      <div className="p-8 bg-white rounded shadow text-center">
        <h2 className="font-serif text-2xl font-bold">Payment Failed</h2>
        <p className="mt-2">We couldn't verify your payment. Please contact support.</p>
      </div>
    </main>
  );
}
