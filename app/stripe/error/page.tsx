import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function OrderError() {
  return (
    <div className="h-screen">
      <div className="mt-32 md:max-w-[50vw] mx-auto">
        <AlertCircle className="text-red-600 w-16 h-16 mx-auto my-6" />
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Something went wrong!
          </h3>
          <p className="text-gray-600 my-2">
            Don't worry, you can still contact us directly on WhatsApp to place your order.
          </p>
          <p className="text-gray-500 mb-4">WhatsApp: +91 90760 56680</p>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/">Back to Shopping</Link>
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => window.open('https://wa.me/919076056680?text=Hi! I need help with placing an order.', '_blank')}
            >
              Contact us on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
