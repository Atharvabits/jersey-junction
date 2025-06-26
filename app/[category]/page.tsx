import Link from "next/link";
import { simplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import Image from "next/image";
import TeamDropdownWrapper from "../components/TeamDropdownWrapper";

async function getData(category: string, team?: string) {
  // Handle URL to category name conversion
  let categoryName = category;
  
  // Special handling for specific URL patterns
  if (category === '25 26 season' || category === '25-26-season') {
    categoryName = '25/26 SEASON';
  } else if (category === 'basketball-jerseys') {
    categoryName = 'basketball-jerseys';
  } else if (category === 'cricket-jerseys') {
    categoryName = 'cricket-jerseys';
  } else if (category === 'international-jerseys') {
    categoryName = 'international-jerseys';
  } else if (category === 'vintage-jerseys') {
    categoryName = 'vintage-jerseys';
  } else if (category === 'training-jackets') {
    categoryName = 'training-jackets';
  } else {
    // For other categories, try both original and uppercase versions
    categoryName = category.toUpperCase().replace(/-/g, ' ');
  }
  
  let query = `*[_type == "product" && (category->name == "${categoryName}" || category->name == "${category}" || category->name == "${category.toUpperCase()}" || category->name == "${category.replace(/-/g, ' ').toUpperCase()}" || category->name == "${category.replace(/-/g, ' ')}")`;
  
  // If team is specified, filter by team as well
  if (team) {
    const teamFormatted = team.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    query += ` && team match "${teamFormatted}*"`;
  }
  
  query += `] {
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

  const data = await client.fetch(query);
  
  // Debug logging
  console.log('=== CATEGORY PAGE DEBUG ===');
  console.log('Original category param:', category);
  console.log('Resolved categoryName:', categoryName);
  console.log('Query:', query);
  console.log('Data found:', data);
  console.log('Data length:', data.length);
  
  return data;
}

async function getTeamsForCategory(category: string) {
  // Handle URL to category name conversion (same logic as getData)
  let categoryName = category;
  
  if (category === '25 26 season' || category === '25-26-season') {
    categoryName = '25/26 SEASON';
  } else if (category === 'basketball-jerseys') {
    categoryName = 'basketball-jerseys';
  } else if (category === 'cricket-jerseys') {
    categoryName = 'cricket-jerseys';
  } else if (category === 'international-jerseys') {
    categoryName = 'international-jerseys';
  } else if (category === 'vintage-jerseys') {
    categoryName = 'vintage-jerseys';
  } else if (category === 'training-jackets') {
    categoryName = 'training-jackets';
  } else {
    categoryName = category.toUpperCase().replace(/-/g, ' ');
  }
  
  const query = `*[_type == "product" && (category->name == "${categoryName}" || category->name == "${category}" || category->name == "${category.toUpperCase()}" || category->name == "${category.replace(/-/g, ' ').toUpperCase()}" || category->name == "${category.replace(/-/g, ' ')}") && defined(team)] {
    team
  }`;
  
  const products = await client.fetch(query);
  const teamSet = new Set(products.map((p: any) => p.team));
  const teams = Array.from(teamSet).filter(Boolean) as string[];
  return teams;
}

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: { team?: string };
}) {
  console.log('=== MAIN COMPONENT DEBUG ===');
  console.log('Raw params.category:', params.category);
  
  const categoryName = decodeURIComponent(params.category).replace(/-/g, ' ');
  const teamFilter = searchParams.team;
  
  console.log('Processed categoryName:', categoryName);
  console.log('Original params.category:', params.category);
  
  const data: simplifiedProduct[] = await getData(params.category, teamFilter);
  const availableTeams = await getTeamsForCategory(params.category);

  const formatCategoryName = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
  };

  const formatTeamName = (teamSlug: string) => {
    return teamSlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between items-start flex-wrap gap-4 pb-6">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              {formatCategoryName(categoryName)}
              {teamFilter && ` - ${formatTeamName(teamFilter)}`}
            </h2>
            {teamFilter && (
              <p className="text-sm text-gray-600 mt-1">
                Showing {formatTeamName(teamFilter)} jerseys
              </p>
            )}
          </div>
          
          {/* Team Filter Dropdown - Show for 25/26 Season category */}
          {(categoryName.toLowerCase().includes('25/26') || categoryName.toLowerCase().includes('season')) && availableTeams.length > 0 && (
            <TeamDropdownWrapper 
              teams={availableTeams}
              currentTeam={teamFilter}
              categorySlug={params.category}
            />
          )}
        </div>

        {data.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500">
              {teamFilter 
                ? `No ${formatTeamName(teamFilter)} jerseys available yet.`
                : `No products available in ${formatCategoryName(categoryName)} category yet.`
              }
            </p>
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
                    ₹{product.price}
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
