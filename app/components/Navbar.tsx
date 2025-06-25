"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, Instagram, Heart, RotateCcw } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";
import SearchBar from "./SearchBar";
import { useState } from "react";

const links = [
  { name: "HOME", href: "/" },
  { name: "SHOP", href: "/all" },
  { name: "SLEEVELESS JERSEYS", href: "/sleeveless" },
  { name: "CRICKET JERSEY", href: "/cricket" },
  { name: "TRACK YOUR ORDER", href: "/track" },
  { name: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { handleCartClick } = useShoppingCart();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  
  return (
    <>
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center mx-auto max-w-7xl px-4 py-2">
          {/* Left - Social */}
          <div className="flex items-center space-x-4">
            <Instagram className="w-4 h-4 text-gray-600" />
          </div>
          
          {/* Center - Brand */}
          <div className="flex-1 flex justify-center">
            <Link href="/" className="flex items-center">
              <div className="bg-black text-white px-4 py-2 font-bold text-lg">
                JERSEY-JUNCTION
              </div>
              <div className="text-xs text-gray-600 ml-2 hidden sm:block">
                FOOTBALL FAN STORE
              </div>
            </Link>
          </div>
          
          {/* Search Bar (Desktop) */}
          <div className="hidden lg:block flex-1 max-w-md">
            <SearchBar />
          </div>

          {/* Right - User Actions */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleCartClick()}
                className="relative"
              >
                <ShoppingBag className="w-4 h-4 text-gray-600" />
              </button>
              <Heart className="w-4 h-4 text-gray-600" />
              <RotateCcw className="w-4 h-4 text-gray-600" />
              <button
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="lg:hidden"
              >
                <Search className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-black text-white">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-center space-x-8 py-4 overflow-x-auto">
            {links.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className={`text-sm font-medium whitespace-nowrap transition-colors duration-200 hover:text-gray-300 ${
                  pathname === link.href ? "text-white border-b-2 border-white pb-1" : "text-gray-300"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="border-t bg-white px-4 py-4 lg:hidden">
          <SearchBar />
        </div>
      )}
    </>
  );
}
