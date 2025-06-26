"use client";

import { ReactNode } from "react";
import CartProvider from "./Providers";
import ShoppingCartModal from "./ShoppingCartModal";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      <ShoppingCartModal />
      <main>{children}</main>
      <Footer />
    </CartProvider>
  );
} 