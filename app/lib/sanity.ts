import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "gk4xzq5b",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2022-03-25",
  useCdn: false, // Disable CDN caching for development to get fresh data
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Utility function to safely generate image URLs with fallback
export function safeImageUrl(source: any, fallbackUrl: string = "/placeholder-image.svg"): string {
  try {
    // Check if source has proper asset reference and not just _upload property
    if (!source || !source.asset || source._upload) {
      return fallbackUrl;
    }
    return builder.image(source).url();
  } catch (error) {
    console.error('Error generating image URL:', error);
    return fallbackUrl;
  }
}

// Utility function to filter valid images from an array
export function filterValidImages(images: any[]): any[] {
  if (!Array.isArray(images)) {
    return [];
  }
  return images.filter((image: any) => {
    // Check if image has asset reference and not just _upload property
    return image && image.asset && !image._upload;
  });
}
