"use client";

import { ReactNode } from "react";
import CartProvider from "./Providers";
import ShoppingCartModal from "./ShoppingCartModal";
import Navbar from "./Navbar";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      <ShoppingCartModal />
      {children}
    </CartProvider>
  );
} 