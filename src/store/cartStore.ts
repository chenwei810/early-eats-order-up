
import { create } from 'zustand';
import { Cart, CartItem, Product } from '@/types';

interface CartStore {
  cart: Cart;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartItemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: {
    items: [],
    total: 0,
  },

  addToCart: (product: Product, quantity = 1) => {
    set((state) => {
      const existingItemIndex = state.cart.items.findIndex(
        (item) => item.product.id === product.id
      );

      let newItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        newItems = state.cart.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newItems = [...state.cart.items, { product, quantity }];
      }

      const total = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      return {
        cart: {
          items: newItems,
          total,
        },
      };
    });
  },

  removeFromCart: (productId: string) => {
    set((state) => {
      const newItems = state.cart.items.filter(
        (item) => item.product.id !== productId
      );
      
      const total = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      return {
        cart: {
          items: newItems,
          total,
        },
      };
    });
  },

  updateQuantity: (productId: string, quantity: number) => {
    set((state) => {
      if (quantity <= 0) {
        return get().removeFromCart(productId);
      }

      const newItems = state.cart.items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      );

      const total = newItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );

      return {
        cart: {
          items: newItems,
          total,
        },
      };
    });
  },

  clearCart: () => {
    set({
      cart: {
        items: [],
        total: 0,
      },
    });
  },

  getCartItemCount: () => {
    const { cart } = get();
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  },
}));
