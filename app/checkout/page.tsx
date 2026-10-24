"use client";

import Image from 'next/image';
import { useState } from 'react';
import { useCartStore } from '../store/cartStore';

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const totalPrice = getTotalPrice();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handlePlaceOrder = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!name || !email || !address) {
      alert('Please fill in name, email and address');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/payments/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, total: totalPrice, customer: { name, email, address } }),
      });
      const data = await res.json();
      if (data.paymentUrl) {
        // redirect user to payment URL (Paystack or mock)
        window.location.href = data.paymentUrl;
        return;
      }
      alert('Failed to create payment');
    } catch (err) {
      console.error(err);
      alert('Payment error');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-screen bg-[#FBF8F3] flex items-center justify-center">
        <div className="max-w-xl text-center p-8 bg-white rounded-lg shadow">
          <h2 className="font-serif text-3xl font-bold text-[#1A1A1A]">Thank you, {name}!</h2>
          <p className="mt-4 text-[#8B7A6B]">Your order <strong>{orderId}</strong> has been placed successfully.</p>
          <a href="/" className="mt-6 inline-block px-6 py-3 bg-[#1A1A1A] text-white rounded-full hover:bg-[#C9A96E] transition-all">Back to Home</a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FBF8F3]">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="font-serif text-4xl font-bold text-[#1A1A1A] mb-8">Checkout</h1>

        {items.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-[#8B7A6B]">Your cart is empty.</p>
            <a href="/shop" className="mt-4 inline-block px-6 py-3 bg-[#1A1A1A] text-white rounded-full hover:bg-[#C9A96E] transition-all">Go to Shop</a>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden p-6">
            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-[#8B7A6B]">Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full border rounded p-2" />

                <label className="block text-sm text-[#8B7A6B] mt-4">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full border rounded p-2" />

                <label className="block text-sm text-[#8B7A6B] mt-4">Address</label>
                <textarea value={address} onChange={(e) => setAddress(e.target.value)} className="mt-2 w-full border rounded p-2" />
              </div>

              <div>
                <h2 className="font-medium text-[#1A1A1A]">Order Summary</h2>
                <div className="mt-4 space-y-4 max-h-64 overflow-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-[#1A1A1A]">{item.name} x {item.quantity}</div>
                        <div className="text-xs text-[#8B7A6B]">{item.price}</div>
                      </div>
                      <div className="font-medium">₦{(parseInt(item.price.replace(/[₦,]/g, '')) * item.quantity).toLocaleString()}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <span className="text-lg font-medium text-[#1A1A1A]">Total</span>
                  <span className="text-2xl font-serif font-bold text-[#C9A96E]">₦{totalPrice.toLocaleString()}</span>
                </div>

                <button type="submit" disabled={loading} className="w-full mt-6 py-3 bg-[#1A1A1A] text-white rounded-full hover:bg-[#C9A96E] transition-all duration-300 font-medium disabled:opacity-60">
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
