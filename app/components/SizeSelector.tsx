"use client";

import { useState } from "react";

interface SizeSelectorProps {
  sizes: string[];
  onSizeChange?: (size: string) => void;
}

export default function SizeSelector({ sizes, onSizeChange }: SizeSelectorProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    if (onSizeChange) {
      onSizeChange(size);
    }
  };

  if (!sizes || sizes.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex space-x-3">
        {sizes.map((size) => (
          <button
            key={size}
            onClick={() => handleSizeSelect(size)}
            className={`w-12 h-12 border-2 rounded font-semibold text-sm transition-colors duration-200 ${
              selectedSize === size
                ? "border-black bg-black text-white"
                : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
            }`}
          >
            {size}
          </button>
        ))}
      </div>
      {selectedSize && (
        <p className="text-sm text-gray-600 mt-3">
          Selected size: <span className="font-medium">{selectedSize}</span>
        </p>
      )}
    </div>
  );
} 