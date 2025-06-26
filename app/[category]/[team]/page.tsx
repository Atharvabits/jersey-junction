import Link from "next/link";
import { simplifiedProduct } from "../../interface";
import { client } from "../../lib/sanity";
import Image from "next/image";
import { redirect } from "next/navigation";

async function getData(category: string, team: string) {
  const teamFormatted = team.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  // Handle URL to category name conversion
  let categoryName = category;
  
  if (category === '25 26 season' || category === '25-26-season') {
    categoryName = '25/26 SEASON';
  } else {
    categoryName = category.toUpperCase();
  }
  
  console.log('=== QUERY DEBUG ===');
  console.log('Original category:', category);
  console.log('Resolved category name:', categoryName);
  console.log('Original team:', team);
  console.log('Formatted team:', teamFormatted);
  
  // First, let's try a simpler query to see all products in category
  const allProductsQuery = `*[_type == "product" && (category->name == "${categoryName}" || category->name == "${category}" || category->name == "${category.toUpperCase()}")] {
        _id,
          name,
          "categoryName": category->name,
          team,
          season
      }`;
  
  console.log('ALL PRODUCTS QUERY:', allProductsQuery);
  const allProducts = await client.fetch(allProductsQuery);
  console.log('ALL PRODUCTS RESULT:', allProducts);
  
  // Now the specific team query
  const query = `*[_type == "product" && (category->name == "${categoryName}" || category->name == "${category}" || category->name == "${category.toUpperCase()}") && team match "${teamFormatted}*"] {
        _id,
          "imageUrl": images[0].asset->url,
          price,
          name,
          "slug": slug.current,
          "categoryName": category->name,
          size,
          team,
          season
      }`;

  console.log('TEAM SPECIFIC QUERY:', query);
  const data = await client.fetch(query);
  console.log('TEAM SPECIFIC RESULT:', data);
  console.log('=== END DEBUG ===');
  return data;
}

async function getCategoryExists(category: string) {
  const query = `*[_type == "category" && name == "${category}"][0]`;
  const categoryData = await client.fetch(query);
  return !!categoryData;
}

export const dynamic = "force-dynamic";

export default async function CategoryTeamPage({
  params,
}: {
  params: { category: string; team: string };
}) {
  const categoryName = decodeURIComponent(params.category).replace(/-/g, ' ');
  const teamSlug = params.team;
  
  // Check if category exists (temporarily disabled for debugging)
  // const categoryExists = await getCategoryExists(categoryName);
  // if (!categoryExists) {
  //   redirect('/');
  // }
  
  const data: simplifiedProduct[] = await getData(categoryName, teamSlug);

  // Debug information
  console.log('Debug info:');
  console.log('URL params.category:', params.category);
  console.log('URL params.team:', params.team);
  console.log('Converted categoryName:', categoryName);
  console.log('Converted teamSlug:', teamSlug);
  console.log('Found products:', data.length);

  const formatCategoryName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
  };

  const formatTeamName = (teamSlug: string) => {
    return teamSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const teamName = formatTeamName(teamSlug);

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-start flex-wrap gap-4 pb-6">
          <div className="flex-1 min-w-0">
            <nav className="text-sm text-gray-600 mb-2">
              <Link href={`/${params.category}`} className="hover:text-blue-600">
                {formatCategoryName(categoryName)}
              </Link>
              <span className="mx-2">›</span>
              <span className="text-gray-900 font-medium">{teamName}</span>
            </nav>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {teamName} - {formatCategoryName(categoryName)}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Showing {teamName} jerseys from {formatCategoryName(categoryName)}
            </p>
          </div>
        </div>

        {data.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 mb-4">
              No {teamName} jerseys available in {formatCategoryName(categoryName)} yet.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 text-left">
              <h4 className="font-semibold text-yellow-800 mb-2">Debug Info:</h4>
              <p className="text-sm text-yellow-700">
                <strong>Looking for category:</strong> "{categoryName}"<br/>
                <strong>Looking for team:</strong> "{teamName}"<br/>
                <strong>URL category param:</strong> {params.category}<br/>
                <strong>URL team param:</strong> {params.team}
              </p>
            </div>
            <Link 
              href={`/${params.category}`}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 transition-colors"
            >
              ← Back to {formatCategoryName(categoryName)}
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {data.map((product) => (
              <div key={product._id} className="group relative">
                <div className="aspect-square w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-80">
                  <Link href={`/product/${product.slug}`}>
                    <Image
                      src={product.imageUrl}
                      alt="Product image"
                      className="w-full h-full object-cover object-center lg:h-full lg:w-full cursor-pointer"
                      width={300}
                      height={300}
                    />
                  </Link>
                </div>

                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link href={`/product/${product.slug}`}>
                        {product.name}
                      </Link>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.categoryName}
                      {product.team && ` • ${product.team}`}
                      {product.season && ` • ${product.season}`}
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
    </div>
  );
} 