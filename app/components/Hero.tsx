import Image from "next/image";
import { client, urlFor } from "../lib/sanity";
import Link from "next/link";

async function getData() {
  const query = "*[_type == 'heroImage'][0]";

  try {
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error('Error fetching hero images:', error);
    return null;
  }
}

// Fallback hero section component with stock images
function HeroFallback() {
  return (
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      <div className="mb-8 flex flex-wrap justify-between md:mb-16">
        <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
          <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl">
            Top Fashion for a top price!
          </h1>
          <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">
            We sell only the most exclusive and high quality products for you.
            We are the best so come and shop with us.
          </p>
        </div>

        <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
          <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80"
              alt="Fashion Collection - Hero Image 1"
              className="h-full w-full object-cover object-center"
              width={500}
              height={500}
              priority
            />
          </div>

          <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80"
              alt="Fashion Collection - Hero Image 2"
              className="h-full w-full object-cover object-center"
              width={500}
              height={500}
              priority
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex h-12 w-64 divide-x overflow-hidden rounded-lg border">
          <Link
            href="/Men"
            className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
          >
            Men
          </Link>
          <Link
            href="/Women"
            className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
          >
            Women
          </Link>
          <Link
            href="/Teens"
            className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
          >
            Teens
          </Link>
        </div>
      </div>
    </section>
  );
}

// Safe image component with error handling and stock image fallbacks
function SafeImage({ 
  imageData, 
  alt, 
  className, 
  priority = false, 
  width = 500, 
  height = 500,
  fallbackText,
  fallbackImageUrl
}: {
  imageData: any;
  alt: string;
  className: string;
  priority?: boolean;
  width?: number;
  height?: number;
  fallbackText: string;
  fallbackImageUrl: string;
}) {
  if (!imageData) {
    return (
      <Image
        src={fallbackImageUrl}
        alt={`${alt} (Stock Image)`}
        className={className}
        priority={priority}
        width={width}
        height={height}
        onError={(e) => {
          console.error('Fallback image failed to load:', e);
          // If even the fallback image fails, show a placeholder
          const target = e.target as HTMLImageElement;
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = `
              <div class="flex items-center justify-center h-full w-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500">
                <div class="text-center">
                  <div class="mb-2 text-2xl">🖼️</div>
                  <p class="text-xs">${fallbackText}</p>
                </div>
              </div>
            `;
          }
        }}
      />
    );
  }

  try {
    const imageUrl = urlFor(imageData).url();
    return (
      <Image
        src={imageUrl}
        alt={alt}
        className={className}
        priority={priority}
        width={width}
        height={height}
        onError={(e) => {
          console.error('Image failed to load, using fallback:', e);
          // Replace with fallback stock image if main image fails to load
          const target = e.target as HTMLImageElement;
          target.src = fallbackImageUrl;
          target.alt = `${alt} (Stock Image)`;
        }}
      />
    );
  } catch (error) {
    console.error('Error generating image URL, using fallback:', error);
    return (
      <Image
        src={fallbackImageUrl}
        alt={`${alt} (Stock Image)`}
        className={className}
        priority={priority}
        width={width}
        height={height}
        onError={(e) => {
          console.error('Fallback image failed to load:', e);
          const target = e.target as HTMLImageElement;
          const parent = target.parentElement;
          if (parent) {
            parent.innerHTML = `
              <div class="flex items-center justify-center h-full w-full bg-gradient-to-br from-gray-100 to-gray-200 text-gray-500">
                <div class="text-center">
                  <div class="mb-2 text-2xl">🖼️</div>
                  <p class="text-xs">${fallbackText}</p>
                </div>
              </div>
            `;
          }
        }}
      />
    );
  }
}

export default async function Hero() {
  const data = await getData();
  
  // If no data is available, show fallback
  if (!data) {
    console.warn('No hero image data available from Sanity');
    return <HeroFallback />;
  }

  return (
    <section className="mx-auto max-w-2xl px-4 sm:pb-6 lg:max-w-7xl lg:px-8">
      <div className="mb-8 flex flex-wrap justify-between md:mb-16">
        <div className="mb-6 flex w-full flex-col justify-center sm:mb-12 lg:mb-0 lg:w-1/3 lg:pb-24 lg:pt-48">
          <h1 className="mb-4 text-4xl font-bold text-black sm:text-5xl md:mb-8 md:text-6xl">
            Top Fashion for a top price!
          </h1>
          <p className="max-w-md leading-relaxed text-gray-500 xl:text-lg">
            We sell only the most exclusive and high quality products for you.
            We are the best so come and shop with us.
          </p>
        </div>

        <div className="mb-12 flex w-full md:mb-16 lg:w-2/3">
          <div className="relative left-12 top-12 z-10 -ml-12 overflow-hidden rounded-lg bg-gray-100 shadow-lg md:left-16 md:top-16 lg:ml-0">
            <SafeImage
              imageData={data.image1}
              alt="Hero Fashion Image 1"
              className="h-full w-full object-cover object-center"
              priority={true}
              width={500}
              height={500}
              fallbackText="Hero Image 1"
              fallbackImageUrl="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80"
            />
          </div>

          <div className="overflow-hidden rounded-lg bg-gray-100 shadow-lg">
            <SafeImage
              imageData={data.image2}
              alt="Hero Fashion Image 2"
              className="h-full w-full object-cover object-center"
              priority={true}
              width={500}
              height={500}
              fallbackText="Hero Image 2"
              fallbackImageUrl="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex h-12 w-64 divide-x overflow-hidden rounded-lg border">
          <Link
            href="/Men"
            className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
          >
            Men
          </Link>
          <Link
            href="/Women"
            className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
          >
            Women
          </Link>
          <Link
            href="/Teens"
            className="flex w-1/3 items-center justify-center text-gray-500 transition duration-100 hover:bg-gray-100 active:bg-gray-200"
          >
            Teens
          </Link>
        </div>
      </div>
    </section>
  );
}
