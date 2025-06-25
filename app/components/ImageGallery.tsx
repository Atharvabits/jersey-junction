"use client";

import Image from "next/image";
import { urlFor } from "../lib/sanity";
import { useState } from "react";

interface iAppProps {
  images: any;
}

export default function ImageGallery({ images }: iAppProps) {
  // Handle case where images is null, undefined, or empty
  const imageArray = images || [];
  const [bigImage, setBigImage] = useState(imageArray.length > 0 ? imageArray[0] : null);

  const handleSmallImageClick = (image: any) => {
    setBigImage(image);
  };

  // If no images available, show a placeholder
  if (imageArray.length === 0) {
    return (
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-5">
          <div className="h-72 w-full flex items-center justify-center bg-gray-100">
            <p className="text-gray-500">No images available</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <div className="order-last flex gap-4 lg:order-none lg:flex-col">
        {imageArray.map((image: any, idx: any) => (
          <div key={idx} className="overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={urlFor(image).url()}
              width={100}
              height={100}
              alt="photo"
              className="h-20 w-20 lg:h-24 lg:w-24 object-cover object-center cursor-pointer"
              onClick={() => handleSmallImageClick(image)}
            />
          </div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
        {bigImage && (
          <Image
            src={urlFor(bigImage).url()}
            alt="Photo"
            width={400}
            height={400}
            className="h-72 w-full lg:h-96 lg:w-full object-cover object-center"
          />
        )}

        <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
          Sale
        </span>
      </div>
    </div>
  );
}
