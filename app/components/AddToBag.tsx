"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/sanity";

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: any;
  price_id: string;
  slug?: string;
}

export default function AddToBag({
  currency,
  description,
  image,
  name,
  price,
  price_id,
}: ProductCart) {
  const { addItem, handleCartClick } = useShoppingCart();

  // Helper function to safely get image URL
  const getImageUrl = (image: any) => {
    try {
      if (!image || !image.asset) {
        return "/placeholder-image.svg";
      }
      return urlFor(image).url();
    } catch (error) {
      console.error('Error generating image URL:', error);
      return "/placeholder-image.svg";
    }
  };

  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: getImageUrl(image),
    price_id: price_id,
  };
  return (
    <Button
      onClick={() => {
        addItem(product), handleCartClick();
      }}
      className="w-full bg-black hover:bg-gray-800 text-white px-4 sm:px-8 py-2 sm:py-3 text-xs sm:text-sm font-semibold"
    >
      ADD TO CART
    </Button>
  );
}
