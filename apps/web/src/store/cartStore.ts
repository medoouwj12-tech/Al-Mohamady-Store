import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  qty: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  increaseQty: (id: string) => void;
  decreaseQty: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (item) => set((state) => {
        const existingItem = state.items.find(i => i.id === item.id);
        if (existingItem) {
          return {
            items: state.items.map(i => i.id === item.id ? { ...i, qty: i.qty + item.qty } : i)
          };
        }
        return { items: [...state.items, item] };
      }),
      removeFromCart: (id) => set((state) => ({
        items: state.items.filter(i => i.id !== id)
      })),
      increaseQty: (id) => set((state) => ({
        items: state.items.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i)
      })),
      decreaseQty: (id) => set((state) => ({
        items: state.items.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty - 1) } : i)
      })),
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
