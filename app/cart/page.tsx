"use client";

import Image from 'next/image';
import { useCartStore } from '../store/cartStore';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore();
  const totalPrice = getTotalPrice();

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-[#FBF8F3]">
        <nav className="flex items-center justify-between px-6 md:px-12 py-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Image 
              src="/logo.png" 
              alt="B&GV Logo" 
              width={40}
              height={40}
              className="h-10 w-auto object-contain"
            />
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-[#4A4A4A]">
            <a href="/" className="hover:text-[#C9A96E] transition-colors">Home</a>
            <a href="/shop" className="hover:text-[#C9A96E] transition-colors">Shop</a>
            <a href="/about" className="hover:text-[#C9A96E] transition-colors">About</a>
            <a href="/contact" className="hover:text-[#C9A96E] transition-colors">Contact</a>
          </div>
          <a href="/cart">
            <button className="px-4 py-2 border border-[#1A1A1A] rounded-full text-sm hover:bg-[#1A1A1A] hover:text-white transition-all duration-300">
              Cart (0)
            </button>
          </a>
        </nav>
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h2 className="font-serif text-3xl font-bold text-[#1A1A1A]">Your cart is empty</h2>
          <p className="text-[#8B7A6B] mt-2">Start shopping to add items!</p>
          <a href="/shop" className="mt-6 px-8 py-3 bg-[#1A1A1A] text-white rounded-full hover:bg-[#C9A96E] transition-all duration-300">
            Continue Shopping
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FBF8F3]">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <Image 
            src="/logo.png" 
            alt="B&GV Logo" 
            width={40}
            height={40}
            className="h-10 w-auto object-contain"
          />
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-[#4A4A4A]">
          <a href="/" className="hover:text-[#C9A96E] transition-colors">Home</a>
          <a href="/shop" className="hover:text-[#C9A96E] transition-colors">Shop</a>
          <a href="/about" className="hover:text-[#C9A96E] transition-colors">About</a>
          <a href="/contact" className="hover:text-[#C9A96E] transition-colors">Contact</a>
        </div>
        <a href="/cart">
          <button className="px-4 py-2 border border-[#1A1A1A] rounded-full text-sm hover:bg-[#1A1A1A] hover:text-white transition-all duration-300">
            Cart ({items.length})
          </button>
        </a>
      </nav>

      {/* Cart Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="font-serif text-4xl font-bold text-[#1A1A1A] mb-8">Your Cart</h1>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 border-b border-[#E8E0D8] last:border-0">
              <div className="relative w-20 h-20 bg-[#F0ECE4] rounded-lg overflow-hidden">
                <Image 
                  src={item.image} 
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-[#1A1A1A]">{item.name}</h3>
                <p className="text-[#C9A96E] font-semibold">{item.price}</p>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 border border-[#E8E0D8] rounded-full hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-all duration-300"
                >
                  -
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button 
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 border border-[#E8E0D8] rounded-full hover:bg-[#1A1A1A] hover:text-white hover:border-[#1A1A1A] transition-all duration-300"
                >
                  +
                </button>
              </div>
              <button 
                onClick={() => removeItem(item.id)}
                className="text-[#8B7A6B] hover:text-red-500 transition-colors text-sm"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-8 bg-[#F0ECE4] p-6 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-lg font-medium text-[#1A1A1A]">Total</span>
            <span className="text-2xl font-serif font-bold text-[#C9A96E]">₦{totalPrice.toLocaleString()}</span>
          </div>
          <a href="/checkout">
            <button className="w-full mt-4 py-3 bg-[#1A1A1A] text-white rounded-full hover:bg-[#C9A96E] transition-all duration-300 font-medium">
              Proceed to Checkout
            </button>
          </a>
        </div>
      </div>
    </main>
  );
}
