"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Search, Instagram, Menu, X } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";
import SearchBar from "./SearchBar";
import { useState } from "react";

const links = [
  { name: "HOME", href: "/" },
  { name: "SHOP", href: "/all" },
  { name: "CRICKET", href: "/cricket" },
  { name: "FOOTBALL", href: "/football" },
  { name: "BASKETBALL", href: "/basketball" },
  { name: "TRACK ORDER", href: "/track" },
  { name: "FAQ", href: "/faq" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { handleCartClick } = useShoppingCart();
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  return (
    <>
      {/* Top Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex items-center mx-auto max-w-7xl px-4 py-2">
          {/* Left - Social (Hidden on small screens) */}
          <div className="hidden sm:flex items-center space-x-4">
            <Instagram className="w-4 h-4 text-gray-600" />
          </div>
          
          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-1"
            >
              {showMobileMenu ? (
                <X className="w-5 h-5 text-gray-600" />
              ) : (
                <Menu className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
          
          {/* Center - Brand */}
          <div className="flex-1 flex justify-center">
            <Link href="/" className="flex items-center">
              <div className="bg-black text-white px-3 sm:px-4 py-2 font-bold text-sm sm:text-lg">
                JERSEY-JUNCTION
              </div>
              <div className="text-xs text-gray-600 ml-2 hidden lg:block">
                SPORTS FAN STORE
              </div>
            </Link>
          </div>
          
          {/* Search Bar (Desktop) */}
          <div className="hidden lg:block flex-1 max-w-md">
            <SearchBar />
          </div>

          {/* Right - User Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleCartClick()}
                className="relative p-1"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
              <button
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="lg:hidden p-1"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation - Desktop */}
      <nav className="bg-black text-white hidden sm:block">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-center space-x-4 lg:space-x-8 py-4 overflow-x-auto">
            {links.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                className={`text-xs lg:text-sm font-medium whitespace-nowrap transition-colors duration-200 hover:text-gray-300 px-2 ${
                  pathname === link.href ? "text-white border-b-2 border-white pb-1" : "text-gray-300"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      {showMobileMenu && (
        <div className="sm:hidden bg-black text-white">
          <div className="px-4 py-2 space-y-1">
            {links.map((link, idx) => (
              <Link
                key={idx}
                href={link.href}
                onClick={() => setShowMobileMenu(false)}
                className={`block py-3 px-2 text-sm font-medium transition-colors duration-200 hover:text-gray-300 ${
                  pathname === link.href ? "text-white bg-gray-800 rounded" : "text-gray-300"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Search Bar */}
      {showMobileSearch && (
        <div className="border-t bg-white px-4 py-4 lg:hidden">
          <SearchBar />
        </div>
      )}
    </>
  );
}
