'use client';

import { addItemInCart, clearItemFromCart, clearItemsInCart, getCartItems, removeItemFromCart } from '@/actions/cart';
import { createContext, useEffect, useState } from 'react';

type CartContextType = {
  carts: CartItem[];
  cartAction: (action: 'ADD_ITEM' | 'REMOVE_ITEM' | 'CLEAR', item?: CartItem) => void;
};

export const CartContext = createContext<CartContextType>({
  carts: [],
  cartAction: () => {}
});

export const CartContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [carts, setCarts] = useState<CartItem[]>([]);

  useEffect(() => {
    const loadCartItems = async () => {
      const items = await getCartItems();
      setCarts(items as CartItem[]);
      console.log(items);
    }
    loadCartItems();
  }, [])

  const cartAction = async (action: 'ADD_ITEM' | 'REMOVE_ITEM' | 'CLEAR', item?: CartItem) => {
    const itemId = item?.id as string;
    switch (action) {
      case 'ADD_ITEM':
        if (item) {
          setCarts((prevCarts) => {
            const existingItem = prevCarts.find((item) => item.id === itemId);
            if (existingItem) {
              return prevCarts.map((item) =>
                item.id === itemId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              );
            } else {
              return [
                ...prevCarts,
                {
                  id: itemId,
                  title: item.title,
                  price: item.price,
                  quantity: 1
                }
              ];
            }
          });
          await addItemInCart(itemId)
        }
        break;

      case 'REMOVE_ITEM':
        if (item) {
          setCarts((prevCarts) =>
            prevCarts
              .map((item) =>
                item.id === itemId
                  ? { ...item, quantity: Math.max(item.quantity - 1, 0) }
                  : item
              )
              .filter((item) => item.quantity > 0)
          );
          await removeItemFromCart(itemId);
        }
        break;
        
      case 'CLEAR':
        setCarts([]);
        await clearItemsInCart()
        break;

      default:
        throw new Error('Action non reconnue');
    }
  };

  return (
    <CartContext.Provider value={{ carts, cartAction }}>
      {children}
    </CartContext.Provider>
  );
};
