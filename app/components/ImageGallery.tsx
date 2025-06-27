"use client";

import Image from "next/image";
import { urlFor } from "../lib/sanity";
import { useState } from "react";

interface iAppProps {
  images: any;
}

export default function ImageGallery({ images }: iAppProps) {
  // Handle case where images is null, undefined, or empty
  // Also filter out images that don't have proper asset references
  const imageArray = (images || []).filter((image: any) => {
    // Check if image has asset reference and not just _upload property
    return image && image.asset && !image._upload;
  });
  
  const [bigImage, setBigImage] = useState(imageArray.length > 0 ? imageArray[0] : null);

  const handleSmallImageClick = (image: any) => {
    setBigImage(image);
  };

  // Helper function to safely get image URL
  const getImageUrl = (image: any) => {
    try {
      if (!image || !image.asset) {
        return null;
      }
      return urlFor(image).url();
    } catch (error) {
      console.error('Error generating image URL:', error);
      return null;
    }
  };

  // If no valid images available, show a placeholder
  if (imageArray.length === 0) {
    return (
      <div className="grid gap-2 sm:gap-4 lg:grid-cols-5">
        <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-5">
          <div className="h-64 w-full sm:h-72 lg:h-96 flex items-center justify-center bg-gray-100">
            <p className="text-gray-500 text-sm sm:text-base">No images available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-2 sm:gap-4 lg:grid-cols-5">
      <div className="order-last flex gap-2 sm:gap-4 lg:order-none lg:flex-col">
        {imageArray.map((image: any, idx: any) => {
          const imageUrl = getImageUrl(image);
          if (!imageUrl) return null;
          
          return (
            <div key={idx} className="overflow-hidden rounded-lg bg-gray-100 flex-shrink-0">
              <Image
                src={imageUrl}
                width={100}
                height={100}
                alt="photo"
                className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 object-cover object-center cursor-pointer"
                onClick={() => handleSmallImageClick(image)}
              />
            </div>
          );
        })}
      </div>

      <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
        {bigImage && getImageUrl(bigImage) && (
          <Image
            src={getImageUrl(bigImage)!}
            alt="Photo"
            width={400}
            height={400}
            className="h-64 w-full sm:h-72 lg:h-96 lg:w-full object-cover object-center"
          />
        )}

        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm uppercase tracking-wider text-white">
          Sale
        </span>
      </div>
    </div>
  );
}
