'use client';

import { MapPin, Clock, Phone, Mail, MessageCircle, Image as ImageIcon, Users, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { mockProperties } from './mockData';
import { useState } from 'react';

// Gallery Page
export function GalleryPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = ['All', 'Apartment', 'House', 'Commercial', 'Bedsitter'];

  const filteredProperties = selectedFilter === 'all'
    ? mockProperties
    : mockProperties.filter(p => p.type.toLowerCase().includes(selectedFilter.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-8">
      <div className="container mx-auto px-4 pb-16">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Property Gallery</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our complete collection of properties in Eldoret
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-4 mb-8 shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-sm font-medium text-gray-700">Filter by Type:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter.toLowerCase() ? 'default' : 'outline'}
                onClick={() => setSelectedFilter(filter.toLowerCase())}
                className={
                  selectedFilter === filter.toLowerCase()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }
              >
                {filter}
              </Button>
            ))}
          </div>
          <div className="mt-4 text-sm text-gray-600">
            Showing {filteredProperties.length} {selectedFilter === 'all' ? 'properties' : `${selectedFilter}${filteredProperties.length !== 1 ? 's' : ''}`}
          </div>
        </div>

        {/* Masonry Gallery */}
        <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          {filteredProperties.map((property) => (
            <div
              key={property.id}
              onClick={() => window.location.href = `/property/${property.id}`}
              className="bg-white rounded-xl overflow-hidden break-inside-avoid hover:shadow-xl transition-all cursor-pointer border border-gray-200"
            >
              <ImageWithFallback
                src={property.image}
                alt={property.title}
                className="w-full h-auto object-cover"
              />
              <div className="p-4">
                <h5 className="text-gray-900 font-semibold mb-2 line-clamp-2">{property.title}</h5>
                <div className="flex items-center gap-1.5 text-gray-600 text-sm mb-2">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  {property.location}
                </div>
                <div className="text-blue-600 font-bold text-lg">
                  KSh {property.price}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No properties found for this filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Visit Our Offices Page
export function OfficesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="container mx-auto px-4 pb-16">
        <div className="mb-12 text-center">
          <h1 className="text-gray-900 mb-4">Visit Our Offices</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Come see us in person. We're here to help you find your perfect home.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Office Image & Map */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl overflow-hidden h-64 shadow-sm border border-gray-200">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1676679879918-700f13372796?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MzQyNzM3NXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Office Building"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-white rounded-2xl p-6 h-96 flex items-center justify-center shadow-sm border border-gray-200">
              <div className="text-center text-gray-600">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                <p className="text-lg font-semibold text-gray-900">Office Location Map</p>
                <p className="text-sm">Oginga Odinga Street, Eldoret CBD</p>
              </div>
            </div>
          </div>

          {/* Office Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 space-y-6 shadow-sm border border-gray-200">
              <h3 className="text-gray-900">Office Information</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-gray-900 font-semibold mb-1">Address</div>
                    <div className="text-gray-600">
                      Oginga Odinga Street<br />
                      Eldoret CBD, Kenya<br />
                      Near Zion Mall
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-gray-900 font-semibold mb-1">Office Hours</div>
                    <div className="text-gray-600">
                      Monday - Friday: 8:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 4:00 PM<br />
                      Sunday: Closed
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-gray-900 font-semibold mb-1">Phone</div>
                    <div className="text-gray-600">+254 700 000 000</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-gray-900 font-semibold mb-1">WhatsApp</div>
                    <div className="text-gray-600">+254 700 000 000</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-gray-900 font-semibold mb-1">Email</div>
                    <div className="text-gray-600">info@eldorethousehunters.co.ke</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Parking Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h5 className="text-gray-900 font-semibold mb-3">Parking Information</h5>
              <p className="text-gray-600 text-sm">
                Free parking available on-site for visitors. Additional street parking available on Oginga Odinga Street.
              </p>
            </div>

            {/* Book Appointment */}
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 gap-2 text-white"
              size="lg"
            >
              <Calendar className="w-5 h-5" />
              Schedule a Visit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Community Page
export function CommunityPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="container mx-auto px-4 pb-16">
        <div className="mb-12 text-center">
          <h1 className="text-gray-900 mb-4">Join Our Community</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with fellow property seekers, get exclusive deals, and stay updated on the Eldoret real estate market.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Community Image */}
          <div className="bg-white rounded-2xl overflow-hidden h-96 shadow-sm border border-gray-200">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21tdW5pdHklMjBtZWV0aW5nfGVufDF8fHx8MTc2MzQ5MzgwN3ww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Community"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Join Options */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-8 space-y-4 shadow-sm border border-gray-200">
              <h3 className="text-gray-900">Connect with Us</h3>

              <Button
                onClick={() => window.open('https://wa.me/254700000000?text=I want to join the WhatsApp community', '_blank')}
                className="w-full bg-green-600 hover:bg-green-700 gap-2 text-white"
                size="lg"
              >
                <MessageCircle className="w-5 h-5" />
                Join WhatsApp Group
              </Button>

              <Button
                variant="outline"
                className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 gap-2"
                size="lg"
              >
                <Users className="w-5 h-5" />
                Join Telegram Channel
              </Button>
            </div>

            {/* Newsletter */}
            <div className="bg-white rounded-2xl p-8 space-y-4 shadow-sm border border-gray-200">
              <h3 className="text-gray-900">Newsletter Signup</h3>
              <p className="text-gray-600 text-sm">
                Get weekly property updates, market insights, and exclusive deals delivered to your inbox.
              </p>

              <div className="space-y-3">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white border-gray-300 text-gray-900"
                />
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Community Benefits */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white rounded-2xl p-6 text-center space-y-3 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto">
              <MessageCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h5 className="text-gray-900 font-semibold">Instant Notifications</h5>
            <p className="text-sm text-gray-600">
              Be the first to know about new listings that match your preferences
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center space-y-3 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h5 className="text-gray-900 font-semibold">Community Support</h5>
            <p className="text-sm text-gray-600">
              Connect with others searching for properties and share experiences
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 text-center space-y-3 shadow-sm border border-gray-200">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto">
              <ImageIcon className="w-6 h-6 text-blue-600" />
            </div>
            <h5 className="text-gray-900 font-semibold">Exclusive Deals</h5>
            <p className="text-sm text-gray-600">
              Access members-only properties and special pricing
            </p>
          </div>
        </div>

        {/* Submit Story */}
        <div className="bg-white rounded-2xl p-8 mt-12 shadow-sm border border-gray-200">
          <h3 className="text-gray-900 mb-6">Share Your Success Story</h3>
          <div className="space-y-4">
            <Input
              placeholder="Your Name"
              className="bg-white border-gray-300 text-gray-900"
            />
            <Input
              placeholder="Property Type"
              className="bg-white border-gray-300 text-gray-900"
            />
            <Textarea
              placeholder="Tell us about your experience..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-white border-gray-300 text-gray-900 min-h-32"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Submit Story
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sell Page
export function SellPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="container mx-auto px-4 pb-16">
        <div className="mb-12 text-center">
          <h1 className="text-gray-900 mb-4">Sell Your Property</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            List your property with Eldoret House Hunters and reach thousands of qualified buyers and renters.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center space-y-3 shadow-sm border border-gray-200">
              <div className="text-3xl text-blue-600 font-bold">1M+</div>
              <div className="text-gray-900 font-semibold">Monthly Visitors</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center space-y-3 shadow-sm border border-gray-200">
              <div className="text-3xl text-blue-600 font-bold">2 Weeks</div>
              <div className="text-gray-900 font-semibold">Average Selling Time</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center space-y-3 shadow-sm border border-gray-200">
              <div className="text-3xl text-blue-600 font-bold">98%</div>
              <div className="text-gray-900 font-semibold">Client Satisfaction</div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl p-8 space-y-6 shadow-sm border border-gray-200">
            <h3 className="text-gray-900">Property Details</h3>

            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Property Title"
                  className="bg-white border-gray-300 text-gray-900"
                />
                <Input
                  placeholder="Location"
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <Input
                  placeholder="Bedrooms"
                  type="number"
                  className="bg-white border-gray-300 text-gray-900"
                />
                <Input
                  placeholder="Bathrooms"
                  type="number"
                  className="bg-white border-gray-300 text-gray-900"
                />
                <Input
                  placeholder="Size (sqft)"
                  type="number"
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>

              <Input
                placeholder="Price (KES)"
                type="number"
                className="bg-white border-gray-300 text-gray-900"
              />

              <Textarea
                placeholder="Property Description"
                className="bg-white border-gray-300 text-gray-900 min-h-32"
              />

              <div className="space-y-2">
                <label className="text-gray-900 text-sm font-semibold">Property Images</label>
                <div className="bg-gray-50 rounded-xl p-8 text-center border-2 border-dashed border-gray-300 cursor-pointer hover:bg-gray-100 transition-all">
                  <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Click to upload images</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Your Name"
                  className="bg-white border-gray-300 text-gray-900"
                />
                <Input
                  placeholder="Phone Number"
                  className="bg-white border-gray-300 text-gray-900"
                />
              </div>

              <Input
                placeholder="Email"
                type="email"
                className="bg-white border-gray-300 text-gray-900"
              />

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                Submit Property Listing
              </Button>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-200">
            <p className="text-gray-600 mb-4">
              Need help listing your property? Our team is here to assist.
            </p>
            <Button
              onClick={() => window.open('https://wa.me/254700000000?text=I need help listing my property', '_blank')}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 gap-2"
            >
              <Phone className="w-4 h-4" />
              Contact Our Team
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
