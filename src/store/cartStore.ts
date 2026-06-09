import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  restaurantId: string;
  image?: string;
};

type CartStore = {
  items: CartItem[];
  restaurantId: string | null;
  totalItems: number;
  totalPrice: number;

  addToCart: (
    item: Omit<CartItem, 'quantity'>,
    restaurantId: string
  ) => void;

  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      restaurantId: null,
      totalItems: 0,
      totalPrice: 0,

      addToCart: (item, restaurantId) => {
        let currentItems = get().items;
        const currentRestaurantId = get().restaurantId;

        // Clear cart when switching restaurants
        if (
          currentRestaurantId &&
          currentRestaurantId !== restaurantId
        ) {
          currentItems = [];
        }

        const existingItemIndex = currentItems.findIndex(
          i => i.id === item.id
        );

        let newItems: CartItem[];

        if (existingItemIndex >= 0) {
          newItems = [...currentItems];

          newItems[existingItemIndex] = {
            ...newItems[existingItemIndex],
            quantity: newItems[existingItemIndex].quantity + 1,
          };
        } else {
          newItems = [
            ...currentItems,
            {
              ...item,
              quantity: 1,
            },
          ];
        }

        const totalItems = newItems.reduce(
          (sum, cartItem) => sum + cartItem.quantity,
          0
        );

        const totalPrice = newItems.reduce(
          (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
          0
        );

        set({
          items: newItems,
          restaurantId,
          totalItems,
          totalPrice,
        });
      },

      removeFromCart: id => {
        const newItems = get().items.filter(
          item => item.id !== id
        );

        const totalItems = newItems.reduce(
          (sum, cartItem) => sum + cartItem.quantity,
          0
        );

        const totalPrice = newItems.reduce(
          (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
          0
        );

        set({
          items: newItems,
          totalItems,
          totalPrice,
        });
      },

      increaseQuantity: id => {
        const newItems = get().items.map(item =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );

        const totalItems = newItems.reduce(
          (sum, cartItem) => sum + cartItem.quantity,
          0
        );

        const totalPrice = newItems.reduce(
          (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
          0
        );

        set({
          items: newItems,
          totalItems,
          totalPrice,
        });
      },

      decreaseQuantity: id => {
        const newItems = get()
          .items
          .map(item =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item
          )
          .filter(item => item.quantity > 0);

        const totalItems = newItems.reduce(
          (sum, cartItem) => sum + cartItem.quantity,
          0
        );

        const totalPrice = newItems.reduce(
          (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
          0
        );

        set({
          items: newItems,
          totalItems,
          totalPrice,
        });
      },

      clearCart: () => {
        set({
          items: [],
          restaurantId: null,
          totalItems: 0,
          totalPrice: 0,
        });
      },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);