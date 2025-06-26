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
  slug,
}: ProductCart) {

  function buyNowOnWhatsApp() {
    try {
      const phoneNumber = "919076056680"; // WhatsApp number without + and spaces
      
      // Generate the product link
      const productLink = slug ? `${window.location.origin}/product/${slug}` : window.location.href;
      
      // Create the message with proper formatting
      const message = `Hi! I want to buy this product:

*${name}*
Price: ₹${price}
Description: ${description || 'N/A'}

Product Link: ${productLink}

Please let me know the payment process.`;
      
      // Use encodeURIComponent for proper URL encoding
      const encodedMessage = encodeURIComponent(message);
      
      // Use wa.me format which is more reliable
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
      
      // Log for debugging
      console.log('WhatsApp URL:', whatsappUrl);
      console.log('Message:', message);
      
      // Try to open WhatsApp with error handling
      const newWindow = window.open(whatsappUrl, '_blank');
      
      // Check if popup was blocked
      if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
        // Fallback: try to navigate to WhatsApp Web
        window.location.href = whatsappUrl;
      }
    } catch (error) {
      console.error('Error opening WhatsApp:', error);
      alert('Unable to open WhatsApp. Please contact us at +91 90760 56680');
    }
  }

  return (
    <Button
      variant="outline"
      onClick={buyNowOnWhatsApp}
      className="w-full border-2 border-black text-black hover:bg-black hover:text-white px-4 sm:px-8 py-2 sm:py-3 text-xs sm:text-sm font-semibold relative"
    >
      <span className="flex items-center space-x-1 sm:space-x-2">
        <span>BUY NOW</span>
        <div className="flex space-x-1">
          <div className="w-3 h-2 sm:w-4 sm:h-3 bg-yellow-400 rounded-sm"></div>
          <div className="w-3 h-2 sm:w-4 sm:h-3 bg-red-500 rounded-sm"></div>
          <div className="w-3 h-2 sm:w-4 sm:h-3 bg-blue-500 rounded-sm"></div>
        </div>
      </span>
    </Button>
  );
}
