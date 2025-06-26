import Link from "next/link";
import { Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="bg-white text-black px-4 py-2 font-bold text-lg inline-block">
              JERSEY-JUNCTION
            </div>
            <p className="text-gray-300 text-sm">
              Premium cricket, football, and basketball jerseys and fan merchandise
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Home
              </Link>
              <Link href="/all" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Shop All
              </Link>
              <Link href="/25-26-season" className="block text-gray-300 hover:text-white transition-colors text-sm">
                25/26 Season
              </Link>
              <Link href="/vintage-jerseys" className="block text-gray-300 hover:text-white transition-colors text-sm">
                Vintage Jerseys
              </Link>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect With Us</h3>
            <div className="space-y-3">
              <p className="text-gray-300 text-sm">
                WhatsApp: +91 90760 56680
              </p>
              <div className="flex items-center space-x-4">
                <Link
                  href="https://www.instagram.com/jjfash.ash?igsh=MTI1bmxkYmZ3aTNiZA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors text-sm"
                  aria-label="Follow us on Instagram"
                >
                  <Instagram className="w-6 h-6" />
                  <span>@jjfash.ash</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Jersey Junction. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 