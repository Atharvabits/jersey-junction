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

  const product = {
    name: name,
    description: description,
    price: price,
    currency: currency,
    image: image ? urlFor(image).url() : "/placeholder-image.jpg",
    price_id: price_id,
  };
  return (
    <Button
      onClick={() => {
        addItem(product), handleCartClick();
      }}
      className="bg-black hover:bg-gray-800 text-white px-8 py-3 text-sm font-semibold flex-1"
    >
      ADD TO CART
    </Button>
  );
}
