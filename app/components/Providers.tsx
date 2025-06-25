"use client";

import { ReactNode } from "react";
import { CartProvider as USCProvider } from "use-shopping-cart";

export default function CartProvider({ children }: { children: ReactNode }) {
  return (
    <USCProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.NEXT_PUBLIC_STRIPE_KEY as string}
      successUrl={`${typeof window !== 'undefined' ? window.location.origin : ''}/stripe/success`}
      cancelUrl={`${typeof window !== 'undefined' ? window.location.origin : ''}/stripe/error`}
      currency="INR"
      billingAddressCollection={false}
      shouldPersist={true}
      language="en-US"
    >
      {children}
    </USCProvider>
  );
}
