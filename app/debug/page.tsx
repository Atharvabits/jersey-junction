import { client } from "../lib/sanity";

async function getAllCategories() {
  const query = `*[_type == "category"] {
    name,
    "slug": slug.current
  }`;
  return await client.fetch(query);
}

async function getAllProducts() {
  const query = `*[_type == "product"] {
    name,
    "categoryName": category->name,
    team,
    season,
    "slug": slug.current
  }`;
  return await client.fetch(query);
}

// New function to specifically debug 25/26 season
async function debug25Season() {
  // Try different category name variations
  const variations = ['25/26 SEASON', '25 26 season', '25-26-season', '25/26 Season'];
  const results: Record<string, any> = {};
  
  for (const variation of variations) {
    const query = `*[_type == "product" && category->name == "${variation}"] {
      name,
      "categoryName": category->name,
      team,
      season
    }`;
    const data = await client.fetch(query);
    results[variation] = data;
  }
  
  return results;
}

export default async function DebugPage() {
  const categories = await getAllCategories();
  const products = await getAllProducts();
  const seasonDebug = await debug25Season();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Debug Information</h1>
      
      {/* 25/26 Season Specific Debug */}
      <div className="mb-8 bg-yellow-50 p-4 rounded">
        <h2 className="text-xl font-semibold mb-4 text-yellow-800">25/26 Season Debug:</h2>
        <div className="space-y-4">
          {Object.entries(seasonDebug).map(([variation, products]) => (
            <div key={variation}>
              <h3 className="font-medium text-yellow-700">Category name: "{variation}"</h3>
              <div className="bg-white p-3 rounded text-sm">
                {Array.isArray(products) && products.length > 0 ? (
                  <ul>
                    {products.map((product: any, idx: number) => (
                      <li key={idx}>• {product.name} - {product.team} - {product.season}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No products found with this category name</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Categories in Sanity:</h2>
        <div className="bg-gray-100 p-4 rounded">
          {categories.length === 0 ? (
            <p>No categories found</p>
          ) : (
            <ul className="space-y-2">
              {categories.map((cat: any, index: number) => (
                <li key={index} className="text-sm">
                  <strong>Name:</strong> "{cat.name}" | <strong>Slug:</strong> {cat.slug}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Products in Sanity:</h2>
        <div className="bg-gray-100 p-4 rounded max-h-96 overflow-y-auto">
          {products.length === 0 ? (
            <p>No products found</p>
          ) : (
            <ul className="space-y-3">
              {products.map((product: any, index: number) => (
                <li key={index} className="text-sm border-b pb-2">
                  <strong>Name:</strong> {product.name}<br/>
                  <strong>Category:</strong> "{product.categoryName}"<br/>
                  <strong>Team:</strong> {product.team || 'Not set'}<br/>
                  <strong>Season:</strong> {product.season || 'Not set'}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded">
        <h3 className="font-semibold mb-2">URL Format Guide:</h3>
        <p className="text-sm mb-2">Based on your categories and teams, try these URLs:</p>
        <ul className="text-sm space-y-1">
          {categories.map((cat: any) => {
            const categorySlug = cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const teamsForCategory = products
              .filter((p: any) => p.categoryName === cat.name && p.team)
              .map((p: any) => p.team as string);
            const uniqueTeams = [...new Set(teamsForCategory)] as string[];
            
            return (
              <li key={cat.name}>
                <strong>{cat.name}:</strong>
                <ul className="ml-4 mt-1">
                  <li>• <code>/[category]</code> → <a href={`/${categorySlug}`} className="text-blue-600 hover:underline">/{categorySlug}</a></li>
                  {uniqueTeams.map((team: string) => {
                    const teamSlug = team.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                    return (
                      <li key={team}>• <code>/[category]/[team]</code> → <a href={`/${categorySlug}/${teamSlug}`} className="text-blue-600 hover:underline">/{categorySlug}/{teamSlug}</a></li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
} 