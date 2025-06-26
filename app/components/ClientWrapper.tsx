"use client";

import { ReactNode } from "react";
import CartProvider from "./Providers";
import Navbar from "./Navbar";
import ShoppingCartModal from "./ShoppingCartModal";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      <ShoppingCartModal />
      {children}
    </CartProvider>
  );
} 