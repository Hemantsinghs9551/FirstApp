import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useShopStore = create(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],

      addToCart: product => {
        const existing = get().cart.find(item => item.id === product.id);

        if (existing) {
          set({
            cart: get().cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          set({
            cart: [...get().cart, { ...product, quantity: 1 }],
          });
        }
      },

      removeFromCart: id => {
        set({
          cart: get().cart.filter(item => item.id !== id),
        });
      },

      increaseQty: id => {
        set({
          cart: get().cart.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
          ),
        });
      },

      decreaseQty: id => {
        set({
          cart: get()
            .cart.map(item =>
              item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
            )
            .filter(item => item.quantity > 0),
        });
      },

      toggleWishlist: product => {
        const exists = get().wishlist.find(item => item.id === product.id);

        if (exists) {
          set({
            wishlist: get().wishlist.filter(item => item.id !== product.id),
          });
        } else {
          set({
            wishlist: [...get().wishlist, product],
          });
        }
      },

      isInWishlist: id => {
        return get().wishlist.some(item => item.id === id);
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: 'shop-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
