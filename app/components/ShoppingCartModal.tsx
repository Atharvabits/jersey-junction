"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";

export default function ShoppingCartModal() {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice,
  } = useShoppingCart();

  function handleWhatsAppCheckout() {
    if (cartCount === 0) return;
    
    try {
      const phoneNumber = "919076056680"; // WhatsApp number without + and spaces
      
      let message = `Hi! I want to purchase the following items:\n\n`;
      
      Object.values(cartDetails ?? {}).forEach((item, index) => {
        message += `${index + 1}. *${item.name}*\n`;
        message += `   Price: ₹${item.price}\n`;
        message += `   Quantity: ${item.quantity}\n`;
        message += `   Subtotal: ₹${(item.price * item.quantity).toFixed(2)}\n\n`;
      });
      
      message += `*Total: ₹${totalPrice}*\n\n`;
      message += `Please let me know the payment process.`;
      
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
    <Sheet open={shouldDisplayCart} onOpenChange={() => handleCartClick()}>
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto">
            <ul className="-my-6 divide-y divide-gray-200">
              {cartCount === 0 ? (
                <h1 className="py-6">You dont have any items</h1>
              ) : (
                <>
                  {Object.values(cartDetails ?? {}).map((entry) => (
                    <li key={entry.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        {entry.image ? (
                          <Image
                            src={entry.image as string}
                            alt="Product image"
                            width={100}
                            height={100}
                            className="h-full w-full object-cover object-center"
                          />
                        ) : (
                          <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                            <div className="text-center text-gray-400">
                              <div className="text-2xl mb-1">📷</div>
                              <p className="text-xs">No Image</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>{entry.name}</h3>
                            <p className="ml-4">₹{entry.price}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                            {entry.description}
                          </p>
                        </div>

                        <div className="flex flex-1 items-end justify-between text-sm">
                          <p className="text-gray-500">QTY: {entry.quantity}</p>

                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => removeItem(entry.id)}
                              className="font-medium text-primary hover:text-primary/80"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal:</p>
              <p>₹{totalPrice}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Contact us via WhatsApp for payment and delivery details.
            </p>

            <div className="mt-6">
              <Button onClick={handleWhatsAppCheckout} className="w-full" disabled={cartCount === 0}>
                Checkout via WhatsApp
              </Button>
            </div>

            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                OR{" "}
                <button
                  onClick={() => handleCartClick()}
                  className=" font-medium text-primary hover:text-primary/80"
                >
                  Continue Shopping
                </button>
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
