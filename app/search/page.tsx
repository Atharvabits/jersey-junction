import { Suspense } from "react";
import { client } from "../lib/sanity";
import { simplifiedProduct } from "../interface";
import Link from "next/link";
import Image from "next/image";

async function getSearchResults(query: string): Promise<simplifiedProduct[]> {
  if (!query.trim()) return [];

  const searchQuery = `*[_type == "product" && (
    name match "*${query}*" || 
    category->name match "*${query}*" || 
    description match "*${query}*" ||
    "${query}" in size[]
  )] | order(name asc) {
    _id,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name,
    "imageUrl": images[0].asset->url,
    size
  }`;

  try {
    const data = await client.fetch(searchQuery);
    return data;
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
}

function SearchResults({ query }: { query: string }) {
  return <SearchResultsContent query={query} />;
}

async function SearchResultsContent({ query }: { query: string }) {
  const results = await getSearchResults(query);

  if (!query.trim()) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Search Products
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Enter a search term to find products
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Search Results
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          {results.length} {results.length === 1 ? 'result' : 'results'} for &quot;{query}&quot;
        </p>
      </div>

      {results.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No products found
          </h3>
          <p className="text-gray-500 mb-8">
            Try adjusting your search or browse our categories
          </p>
          <div className="flex justify-center">
            <Link
              href="/all"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90"
            >
              Shop All Products
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {results.map((product) => (
            <div key={product._id} className="group">
              <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                <Link href={`/product/${product.slug}`}>
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover object-center cursor-pointer"
                    width={300}
                    height={300}
                  />
                </Link>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/product/${product.slug}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.categoryName}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams?.q || "";

  return (
    <div className="bg-white">
      <Suspense fallback={
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-lg text-gray-500">Searching...</p>
          </div>
        </div>
      }>
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
} 