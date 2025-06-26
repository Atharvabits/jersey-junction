"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { client } from "../lib/sanity";
import { simplifiedProduct } from "../interface";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<simplifiedProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Search function
  const searchProducts = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    try {
      const searchQuery = `*[_type == "product" && (
        name match "*${searchTerm}*" || 
        category->name match "*${searchTerm}*" || 
        description match "*${searchTerm}*" ||
        "${searchTerm}" in size[]
      )][0...5] | order(name asc) {
        _id,
        price,
        name,
        "slug": slug.current,
        "categoryName": category->name,
        "imageUrl": images[0].asset->url,
        size
      }`;

      const searchResults = await client.fetch(searchQuery);
      setResults(searchResults);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        searchProducts(query);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
      setSelectedIndex(-1); // Reset selection when query changes
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => prev < results.length - 1 ? prev + 1 : prev);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < results.length) {
          router.push(`/product/${results[selectedIndex].slug}`);
          setIsOpen(false);
          setSelectedIndex(-1);
        } else if (query.trim()) {
          router.push(`/search?q=${encodeURIComponent(query.trim())}`);
          setIsOpen(false);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-10 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && (query || isLoading) && (
        <div className="absolute top-full z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-gray-500">
              Searching...
            </div>
          ) : results.length > 0 ? (
            <div>
              <div className="max-h-80 overflow-y-auto">
                {results.map((product, index) => (
                  <Link
                    key={product._id}
                    href={`/product/${product.slug}`}
                    onClick={() => {
                      setIsOpen(false);
                      setSelectedIndex(-1);
                    }}
                    className={`block border-b border-gray-100 p-3 last:border-b-0 ${
                      index === selectedIndex ? 'bg-gray-100' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          width={48}
                          height={48}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {product.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {product.categoryName}
                        </p>
                        <p className="text-sm font-medium text-primary">
                          ₹{product.price}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {results.length === 5 && (
                <div className="border-t border-gray-100 p-3">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
                    }}
                    className="w-full text-center text-sm text-primary hover:text-primary/80 font-medium"
                  >
                    View all results for &quot;{query}&quot;
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 text-center text-sm text-gray-500">
              No products found for &quot;{query}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  );
} 