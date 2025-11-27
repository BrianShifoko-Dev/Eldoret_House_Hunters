'use client';

import { X, Phone, Heart, Share2, MapPin, Bed, Bath, Square, Check } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Property } from './PropertyCard';
import { PropertyCard } from './PropertyCard';
import { useState } from 'react';

interface ListingDetailProps {
  property: Property;
  similarProperties: Property[];
  onClose: () => void;
  onViewDetails: (property: Property) => void;
}

export function ListingDetail({ property, similarProperties, onClose, onViewDetails }: ListingDetailProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock gallery images (in production, property would have multiple images)
  const galleryImages = [property.image, property.image, property.image];

  const amenities = [
    'Parking',
    'Security 24/7',
    'Water supply',
    'Backup generator',
    'CCTV',
    'Balcony',
    'Modern kitchen',
    'Wardrobe',
    'Internet ready',
  ];

  const handleWhatsApp = () => {
    window.open(
      `https://wa.me/254700000000?text=I'm interested in ${property.title} at KES ${property.price}`,
      '_blank'
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-md">
      <div className="min-h-screen pb-20">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-900"
                >
                  <X className="w-5 h-5" />
                </Button>
                <div>
                  <h3 className="text-gray-900">{property.title}</h3>
                  <div className="flex items-center gap-1 text-gray-600 text-sm">
                    <MapPin className="w-4 h-4" />
                    {property.location}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="bg-gray-100 hover:bg-gray-200"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'
                    }`}
                  />
                </Button>
                <Button variant="ghost" size="icon" className="bg-gray-100 hover:bg-gray-200 text-gray-700">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Gallery */}
              <div className="space-y-4">
                <div className="relative h-96 rounded-2xl overflow-hidden">
                  <ImageWithFallback
                    src={galleryImages[currentImageIndex]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  {property.status && (
                    <Badge
                      className={`absolute top-4 left-4 ${
                        property.status === 'New'
                          ? 'bg-green-500/90 backdrop-blur-sm'
                          : 'bg-amber-500/90 backdrop-blur-sm'
                      }`}
                    >
                      {property.status}
                    </Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-3 gap-3">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-24 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === idx
                          ? 'border-blue-600'
                          : 'border-gray-300'
                      }`}
                    >
                      <ImageWithFallback
                        src={img}
                        alt={`Gallery ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* About */}
              <div className="bg-white rounded-2xl p-6 space-y-4 border border-gray-200 shadow-sm">
                <h4 className="text-gray-900">About this property</h4>
                <p className="text-gray-700">{property.description}</p>
              </div>

              {/* Property Facts */}
              <div className="bg-white rounded-2xl p-6 space-y-4 border border-gray-200 shadow-sm">
                <h4 className="text-gray-900">Property Facts</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Bed className="w-4 h-4" />
                      <span className="text-sm">Bedrooms</span>
                    </div>
                    <div className="text-gray-900 font-semibold">{property.beds}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Bath className="w-4 h-4" />
                      <span className="text-sm">Bathrooms</span>
                    </div>
                    <div className="text-gray-900 font-semibold">{property.baths}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Square className="w-4 h-4" />
                      <span className="text-sm">Area</span>
                    </div>
                    <div className="text-gray-900 font-semibold">{property.sqft} sqft</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm text-gray-600">Type</div>
                    <div className="text-gray-900 font-semibold">{property.type}</div>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="bg-white rounded-2xl p-6 space-y-4 border border-gray-200 shadow-sm">
                <h4 className="text-gray-900">Amenities</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {amenities.map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-gray-700">
                      <Check className="w-5 h-5 text-green-600" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Similar Listings */}
              <div className="space-y-4">
                <h4 className="text-gray-900">Similar Listings</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {similarProperties.slice(0, 6).map((prop) => (
                    <div key={prop.id} className="scale-90 origin-top">
                      <PropertyCard
                        property={prop}
                        onViewDetails={onViewDetails}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-4">
                {/* Price & Actions */}
                <div className="bg-white rounded-2xl p-6 space-y-4 border border-gray-200 shadow-sm">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Price</div>
                    <div className="text-3xl text-blue-600 font-bold">
                      KES {property.price}
                      <span className="text-sm text-gray-600 ml-2 font-normal">/month</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button
                      onClick={handleWhatsApp}
                      className="w-full bg-green-600 hover:bg-green-700 gap-2 text-white"
                      size="lg"
                    >
                      <Phone className="w-5 h-5" />
                      WhatsApp Inquiry
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                      size="lg"
                    >
                      Book Viewing
                    </Button>
                  </div>

                  <div className="pt-4 border-t border-gray-200 space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Response time</span>
                      <span className="text-gray-900 font-medium">Within 1 hour</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Availability</span>
                      <span className="text-green-600 font-medium">Available Now</span>
                    </div>
                  </div>
                </div>

                {/* Featured Properties */}
                <div className="bg-white rounded-2xl p-6 space-y-4 border border-gray-200 shadow-sm">
                  <h5 className="text-gray-900">Featured Properties</h5>
                  {similarProperties.slice(0, 3).map((prop) => (
                    <button
                      key={prop.id}
                      onClick={() => onViewDetails(prop)}
                      className="w-full text-left bg-gray-50 rounded-xl p-3 hover:bg-blue-50 hover:border-blue-200 transition-all border border-gray-200"
                    >
                      <div className="flex gap-3">
                        <ImageWithFallback
                          src={prop.image}
                          alt={prop.title}
                          className="w-20 h-20 rounded-lg object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm text-gray-900 line-clamp-2 mb-1">
                            {prop.title}
                          </div>
                          <div className="text-sm text-blue-600 font-semibold">
                            KES {prop.price}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
