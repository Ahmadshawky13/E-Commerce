"use client";
import { createContext, useEffect, useState } from "react";
import { getUserToken } from "./getUserToken";
import { getCartData } from "./CartAction/CartAction";
import { CartData } from "./types/cart.type";

type ContextType = {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
};

export const CountContext = createContext<ContextType | null>(null);

export default function CountProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);

  async function getCart() {
    try {
      const token = await getUserToken();
      if (token) {
        const data: CartData = await getCartData();
        setCount(data?.numOfCartItems || 0);
      }
    } catch (err) {
      console.error("Error fetching cart data", err);
    }
  }

  useEffect(() => {
    getCart();
  }, []);

  return (
    <CountContext.Provider value={{ count, setCount }}>
      {children}
    </CountContext.Provider>
  );
}
