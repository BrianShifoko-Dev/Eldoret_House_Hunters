'use client';

import { Phone, MapPin, Clock } from 'lucide-react';
import { FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa6';

export function TopBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-blue-600 text-white py-2.5 text-sm border-b border-blue-700">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* Left side - Contact info */}
          <div className="flex items-center gap-3 md:gap-6">
            <a
              href="tel:+254745319042"
              className="flex items-center gap-1.5 hover:text-blue-100 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="text-xs md:text-sm">254 745 319 042</span>
            </a>
            <div className="hidden md:flex items-center gap-1.5 text-blue-100">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-xs md:text-sm">Mon-Fri: 8AM - 8PM</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5 text-blue-100">
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-xs md:text-sm">Eldoret, Kenya</span>
            </div>
          </div>

          {/* Right side - Social media */}
          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-100 transition-colors"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-100 transition-colors"
              aria-label="X (Twitter)"
            >
              <FaXTwitter className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-100 transition-colors"
              aria-label="Instagram"
            >
              <FaInstagram className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-100 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
