// store/cartStore.js

import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: [],
  addToCart: (item) => {
    set((state) => {
      const existingItem = state.cart.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem) {
        return {
          cart: state.cart.map((cartItem) =>
            cartItem.id === item.id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        };
      }
      return {
        cart: [...state.cart, { ...item, quantity: 1 }],
      };
    });
  },
  removeFromCart: (id) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    }));
  },
  updateQuantity: (id, quantity) => {
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    }));
  },
}));

export default useCartStore;
