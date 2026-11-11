import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * A cart line. Name/price/image are copies for display only —
 * the server re-prices everything from lib/catalog.ts at checkout.
 */
export type CartItem = {
  key: string; // `${productId}:${size}`
  productId: string;
  size: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type NewCartItem = Omit<CartItem, 'key' | 'quantity'>;

type CartStore = {
  items: CartItem[];
  addItem: (item: NewCartItem) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
};

const MAX_QTY = 10;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const key = `${item.productId}:${item.size}`;
        const existing = get().items.find((i) => i.key === key);
        if (existing) {
          get().updateQuantity(key, existing.quantity + 1);
        } else {
          set({ items: [...get().items, { ...item, key, quantity: 1 }] });
        }
      },

      removeItem: (key) => set({ items: get().items.filter((i) => i.key !== key) }),

      updateQuantity: (key, quantity) => {
        if (quantity <= 0) return get().removeItem(key);
        const q = Math.min(quantity, MAX_QTY);
        set({ items: get().items.map((i) => (i.key === key ? { ...i, quantity: q } : i)) });
      },

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'bgv_cart',
      version: 2,
      // Carts saved by the old version have a different shape — start fresh.
      migrate: () => ({ items: [] }),
    }
  )
);

export const cartCount = (items: CartItem[]) => items.reduce((n, i) => n + i.quantity, 0);
export const cartSubtotal = (items: CartItem[]) => items.reduce((n, i) => n + i.price * i.quantity, 0);
