import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, ProductVariant } from '@/types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, variant?: ProductVariant) => boolean;
  removeItem: (id: number, variantId?: number) => void;
  updateQuantity: (id: number, quantity: number, variantId?: number) => boolean;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      // Returns true if added successfully, false if blocked
      addItem: (product, variant) => {
        const items = get().items;

        if (!product.in_stock) return false;

        const availableStock = variant
          ? variant.stock
          : (product.stock ?? 0);

        if (availableStock <= 0) return false;

        const existingIndex = items.findIndex(
          (item) =>
            item.id === product.id &&
            item.variant?.id === variant?.id
        );

        if (existingIndex !== -1) {
          const currentQty = items[existingIndex].quantity;
          if (currentQty >= availableStock) return false;

          const updated = [...items];
          updated[existingIndex].quantity += 1;
          set({ items: updated });
        } else {
          const newItem: CartItem = {
            id: product.id,
            name: product.name,
            price: product.price + (variant?.extra_price || 0),
            quantity: 1,
            image: product.primary_image,
            variant: variant,
            age_range: product.age_range,
            stock: availableStock,
          };
          set({ items: [...items, newItem], isOpen: true });
        }
        return true;
      },

      removeItem: (id, variantId) => {
        set({
          items: get().items.filter(
            (item) =>
              !(item.id === id && item.variant?.id === variantId)
          ),
        });
      },

      // Returns true if updated successfully, false if blocked
      updateQuantity: (id, quantity, variantId) => {
        if (quantity <= 0) {
          get().removeItem(id, variantId);
          return true;
        }

        const item = get().items.find(
          (i) => i.id === id && i.variant?.id === variantId
        );

        if (item) {
          const availableStock = item.variant
            ? item.variant.stock
            : item.stock;

          if (availableStock !== undefined && quantity > availableStock) {
            return false;
          }
        }

        set({
          items: get().items.map((item) =>
            item.id === id && item.variant?.id === variantId
              ? { ...item, quantity }
              : item
          ),
        });
        return true;
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getTotalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      getTotalPrice: () =>
        get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
    }),
    {
      name: 'cart-storage',
      skipHydration: true,
    }
  )
);