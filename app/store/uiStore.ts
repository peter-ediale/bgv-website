import { create } from 'zustand';

/** Open/closed state for the cart drawer and mobile menu (not saved). */
type UIStore = {
  cartOpen: boolean;
  menuOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  setMenu: (open: boolean) => void;
};

export const useUIStore = create<UIStore>()((set) => ({
  cartOpen: false,
  menuOpen: false,
  openCart: () => set({ cartOpen: true, menuOpen: false }),
  closeCart: () => set({ cartOpen: false }),
  setMenu: (open) => set({ menuOpen: open }),
}));
