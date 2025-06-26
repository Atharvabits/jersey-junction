import AddToBag from "@/app/components/AddToBag";
import CheckoutNow from "@/app/components/CheckoutNow";
import ImageGallery from "@/app/components/ImageGallery";
import SizeSelector from "@/app/components/SizeSelector";
import { fullProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import { Button } from "@/components/ui/button";
import { Star, Truck, Heart } from "lucide-react";
import { notFound } from "next/navigation";

async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
        _id,
          images,
          price,
          name,
          description,
          "slug": slug.current,
          "categoryName": category->name,
          price_id,
          size
      }`;

  const data = await client.fetch(query);

  return data;
}

export const dynamic = "force-dynamic";

export default async function ProductPge({
  params,
}: {
  params: { slug: string };
}) {
  const data: fullProduct = await getData(params.slug);

  // Handle case where no product is found
  if (!data) {
    notFound();
  }

  // Handle case where images array is null or undefined
  const images = data.images || [];
  const firstImage = images.length > 0 ? images[0] : null;

  // Calculate original price (show as crossed out)
  const originalPrice = Math.floor(data.price * 2.5);
  const discountPercent = Math.floor(((originalPrice - data.price) / originalPrice) * 100);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-3">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
            <span>Home</span>
            <span>/</span>
            <span>{data.categoryName}</span>
          </div>
        </div>
      </div>

      {/* Product Section */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:py-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid gap-4 sm:gap-8 lg:grid-cols-2">
            {/* Image Gallery */}
            <div className="relative">
              {/* Sale Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-green-500 text-white px-2 sm:px-3 py-1 text-xs sm:text-sm font-semibold rounded">
                  SALE
                </span>
              </div>
              <ImageGallery images={images} />
            </div>

            {/* Product Details */}
            <div className="p-4 sm:p-8">
              {/* Product Title */}
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                {data.name}
              </h1>
              
              {/* Breadcrumb Path */}
              <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 mb-4 sm:mb-6">
                <span>Home</span>
                <span>/</span>
                <span className="text-gray-900">{data.categoryName}</span>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-3 h-3 sm:w-4 sm:h-4 fill-yellow-400 text-yellow-400" 
                    />
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-gray-500">(4.8 out of 5)</span>
              </div>

              {/* Pricing */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center space-x-2 sm:space-x-3 mb-2">
                  <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                    ₹{data.price.toLocaleString()}.00
                  </span>
                  <span className="text-base sm:text-lg lg:text-xl text-gray-500 line-through">
                    ₹{originalPrice.toLocaleString()}.00
                  </span>
                  <span className="bg-red-100 text-red-800 px-1.5 sm:px-2 py-1 text-xs sm:text-sm font-semibold rounded">
                    -{discountPercent}%
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500">Inclusive of all taxes</p>
              </div>

              {/* Size Selection */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">SIZE</h3>
                <SizeSelector sizes={data.size || ["S", "M", "L", "XL"]} />
              </div>

              {/* Quantity and Actions */}
              <div className="space-y-4 mb-6 sm:mb-8">
                {/* Quantity Selector */}
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-gray-700">Quantity:</span>
                  <div className="flex items-center border rounded">
                    <button className="px-2 sm:px-3 py-2 hover:bg-gray-100 text-sm sm:text-base">-</button>
                    <span className="px-3 sm:px-4 py-2 border-x text-sm sm:text-base">1</span>
                    <button className="px-2 sm:px-3 py-2 hover:bg-gray-100 text-sm sm:text-base">+</button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="flex-1">
                    <AddToBag
                      currency="INR"
                      description={data.description}
                      image={firstImage}
                      name={data.name}
                      price={data.price}
                      key={data._id}
                      price_id={data.price_id}
                    />
                  </div>
                  <div className="flex-1">
                    <CheckoutNow
                      currency="INR"
                      description={data.description}
                      image={firstImage}
                      name={data.name}
                      price={data.price}
                      key={data._id}
                      price_id={data.price_id}
                      slug={data.slug}
                    />
                  </div>
                  <Button variant="outline" size="icon" className="self-center sm:self-auto">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="border-t pt-4 sm:pt-6">
                <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-4">
                  <Truck className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span>Free delivery on orders above ₹999</span>
                </div>
                
                {/* Product Description */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Product Details</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {data.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
