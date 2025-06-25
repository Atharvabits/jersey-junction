"use client";

import { Button } from "@/components/ui/button";
import { urlFor } from "../lib/sanity";
import { ProductCart } from "./AddToBag";

export default function CheckoutNow({
  currency,
  description,
  image,
  name,
  price,
  price_id,
}: ProductCart) {

  function buyNowOnWhatsApp() {
    const phoneNumber = "919076056680"; // WhatsApp number without + and spaces
    const message = `Hi! I want to buy this product:

*${name}*
Price: $${price}
Description: ${description}

Please let me know the payment process.`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  }

  return (
    <Button
      variant="outline"
      onClick={buyNowOnWhatsApp}
    >
      Buy Now via WhatsApp
    </Button>
  );
}
