'use client'

import { addItemInCart, clearItemsInCart, getCartItems, removeItemFromCart } from "@/actions/cart";
import { createContext, useEffect, useState } from "react";

type CartContextType = {
  carts: { id: string; quantity: number }[];
  cartAction: (action: "ADD_ITEM" | "REMOVE_ITEM" | "CLEAR", itemId?: string) => void;
};

export const CartContext = createContext<CartContextType>({
  carts: [{ id: "", quantity: 0 }],
  cartAction: () => {}
});

export const CartContextProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [carts, setCarts] = useState<{ id: string; quantity: number }[]>([]);

  useEffect(() => {
    const loadCartItems = async () => {
      const items = await getCartItems();
      setCarts(items as { id: string; quantity: number }[]);
    }
    loadCartItems();
  }, [])

  const cartAction = async (action: "ADD_ITEM" | "REMOVE_ITEM" | "CLEAR", itemId?: string) => {
    switch (action) {
      case "ADD_ITEM":
        if (itemId) {
          setCarts((prevCarts) => {
            const existingItem = prevCarts.find((item) => item.id === itemId);
            if (existingItem) {
              return prevCarts.map((item) =>
                item.id === itemId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              );
            } else {
              return [...prevCarts, { id: itemId, quantity: 1 }];
            }
          });
          await addItemInCart(itemId);
        }
        break;

      case "REMOVE_ITEM":
        if (itemId) {
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

      case "CLEAR":
        setCarts([]);
        await clearItemsInCart();
        break;

      default:
        throw new Error("Invalid action.");
    }
  };

  return (
    <CartContext.Provider value={{ carts, cartAction }}>
      {children}
    </CartContext.Provider>
  );
};
