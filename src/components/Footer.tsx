import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h5 className="text-blue-600 font-bold text-lg">Eldoret House Hunters</h5>
            <p className="text-gray-600 text-sm">
              Your trusted partner in finding the perfect home in Eldoret and surrounding areas.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h6 className="text-gray-900 font-semibold">Contact Us</h6>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2 text-gray-600">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-blue-600" />
                <span>Oginga Odinga Street, Eldoret CBD</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4 flex-shrink-0 text-blue-600" />
                <span>+254 700 000 000</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MessageCircle className="w-4 h-4 flex-shrink-0 text-blue-600" />
                <span>WhatsApp: +254 700 000 000</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4 flex-shrink-0 text-blue-600" />
                <span>info@eldorethousehunters.co.ke</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h6 className="text-gray-900 font-semibold">Quick Links</h6>
            <div className="space-y-2 text-sm">
              <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">
                Buy Properties
              </a>
              <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">
                Rent Properties
              </a>
              <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">
                Sell Your Property
              </a>
              <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">
                Neighborhoods
              </a>
              <a href="#" className="block text-gray-600 hover:text-blue-600 transition-colors">
                Resources
              </a>
            </div>
          </div>

          {/* Office Hours */}
          <div className="space-y-4">
            <h6 className="text-gray-900 font-semibold">Office Hours</h6>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Monday - Friday</span>
                <span>8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday</span>
                <span>9:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday</span>
                <span>Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social & Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-600">
              © 2025 Eldoret House Hunters. All rights reserved.
            </div>

            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-blue-50 hover:border-blue-400 transition-all"
              >
                <Facebook className="w-5 h-5 text-gray-700 hover:text-blue-600" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-blue-50 hover:border-blue-400 transition-all"
              >
                <Instagram className="w-5 h-5 text-gray-700 hover:text-blue-600" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white border border-gray-300 rounded-full flex items-center justify-center hover:bg-blue-50 hover:border-blue-400 transition-all"
              >
                <Twitter className="w-5 h-5 text-gray-700 hover:text-blue-600" />
              </a>
              <a
                href="https://wa.me/254700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 border border-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 hover:border-blue-700 transition-all"
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
