"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ShoppingBag, Search, Instagram, Menu, X, ChevronDown } from "lucide-react";
import { useShoppingCart } from "use-shopping-cart";
import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";

const links = [
  { name: "HOME", href: "/" },
  { name: "SHOP", href: "/all" },
  { 
    name: "25/26 SEASON", 
    href: "/25-26-season",
    hasDropdown: true,
    teams: [
      { name: "Arsenal", href: "/25-26-season/arsenal" },
      { name: "Aston Villa", href: "/25-26-season/aston-villa" },
      { name: "Bournemouth", href: "/25-26-season/bournemouth" },
      { name: "Brentford", href: "/25-26-season/brentford" },
      { name: "Brighton & Hove Albion", href: "/25-26-season/brighton-hove-albion" },
      { name: "Burnley", href: "/25-26-season/burnley" },
      { name: "Chelsea", href: "/25-26-season/chelsea" },
      { name: "Crystal Palace", href: "/25-26-season/crystal-palace" },
      { name: "Everton", href: "/25-26-season/everton" },
      { name: "Fulham", href: "/25-26-season/fulham" },
      { name: "Leeds United", href: "/25-26-season/leeds-united" },
      { name: "Liverpool", href: "/25-26-season/liverpool" },
      { name: "Manchester City", href: "/25-26-season/manchester-city" },
      { name: "Manchester United", href: "/25-26-season/manchester-united" },
      { name: "Newcastle United", href: "/25-26-season/newcastle-united" },
      { name: "Nottingham Forest", href: "/25-26-season/nottingham-forest" },
      { name: "Sunderland", href: "/25-26-season/sunderland" },
      { name: "Tottenham", href: "/25-26-season/tottenham" },
      { name: "West Ham", href: "/25-26-season/west-ham" },
      { name: "Wolverhampton", href: "/25-26-season/wolverhampton" },
    ]
  },
  { name: "INTERNATIONAL JERSEYS", href: "/international-jerseys" },
  { name: "VINTAGE JERSEYS", href: "/vintage-jerseys" },
  { name: "TRAINING JACKETS", href: "/training-jackets" },
  { name: "CRICKET JERSEYS", href: "/cricket-jerseys" },
  { name: "BASKETBALL JERSEYS", href: "/basketball-jerseys" },
];

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const { handleCartClick } = useShoppingCart();

  const handleDropdownEnter = (linkName: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setActiveDropdown(linkName);
  };

  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 150); // Give 150ms for user to move to dropdown content
    setDropdownTimeout(timeout);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted to prevent hydration mismatches
  if (!mounted) {
    return (
      <div className="h-[120px] bg-white border-b border-gray-200">
        <div className="flex items-center mx-auto max-w-7xl px-4 py-2 h-[60px]">
          <div className="flex-1 flex justify-center">
            <div className="bg-black text-white px-3 sm:px-4 py-2 font-bold text-sm sm:text-lg">
              JERSEY-JUNCTION
            </div>
          </div>
        </div>
        <div className="h-[60px] bg-black"></div>
      </div>
    );
  }
  
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
      <nav className="bg-black text-white hidden sm:block relative overflow-visible">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-center space-x-4 lg:space-x-8 py-4 overflow-x-auto overflow-y-visible">
            {links.map((link, idx) => (
              <div key={idx} className="relative">
                {link.hasDropdown ? (
                  <div
                    className="relative static"
                    onMouseEnter={() => handleDropdownEnter(link.name)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link
                      href={link.href}
                      className="text-xs lg:text-sm font-medium whitespace-nowrap transition-colors duration-200 hover:text-gray-300 px-2 flex items-center text-gray-300"
                    >
                      {link.name}
                      <ChevronDown className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="text-xs lg:text-sm font-medium whitespace-nowrap transition-colors duration-200 hover:text-gray-300 px-2 text-gray-300"
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </nav>

      {/* Dropdown Menu Portal - positioned outside nav to avoid clipping */}
      {activeDropdown && (
        <div 
          className="absolute left-1/2 transform -translate-x-1/2 w-[800px] max-w-[90vw] bg-white text-black shadow-xl rounded-md border border-gray-200 z-[9999]"
          style={{ top: '120px' }}
          onMouseEnter={() => handleDropdownEnter(activeDropdown || '')}
          onMouseLeave={handleDropdownLeave}
        >
          <div className="py-4">
            <div className="px-6 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-200 mb-4">
              Choose Your Team
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 px-4">
              {links.find(link => link.name === activeDropdown)?.teams?.map((team, teamIdx) => (
                <Link
                  key={teamIdx}
                  href={team.href}
                  className="block px-4 py-3 text-sm hover:bg-gray-100 transition-colors duration-200 rounded-md font-medium text-center"
                >
                  {team.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Navigation Menu */}
      {showMobileMenu && (
        <div className="sm:hidden bg-black text-white">
          <div className="px-4 py-2 space-y-1">
            {links.map((link, idx) => (
              <div key={idx}>
                <Link
                  href={link.href}
                  onClick={() => setShowMobileMenu(false)}
                  className="block py-3 px-2 text-sm font-medium transition-colors duration-200 hover:text-gray-300 text-gray-300"
                >
                  {link.name}
                </Link>
                
                {/* Mobile Team Submenu */}
                {link.hasDropdown && link.teams && (
                  <div className="ml-4 mt-2 space-y-1">
                    {link.teams.map((team, teamIdx) => (
                      <Link
                        key={teamIdx}
                        href={team.href}
                        onClick={() => setShowMobileMenu(false)}
                        className="block py-2 px-2 text-xs text-gray-400 hover:text-gray-200"
                      >
                        {team.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
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
