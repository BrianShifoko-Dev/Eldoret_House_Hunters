'use client';

import { Bed, Bath, Square, MapPin, Star, Phone, Eye } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';

export interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  type: string;
  status?: 'New' | 'Featured';
  description: string;
  listingType?: 'For Rent' | 'For Sale';
}

interface PropertyCardProps {
  property: Property;
  onViewDetails: (property: Property) => void;
}

export function PropertyCard({ property, onViewDetails }: PropertyCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(
      `https://wa.me/254700000000?text=I'm interested in ${property.title} at KES ${property.price}`,
      '_blank'
    );
  };

  const handleClick = () => {
    window.location.href = `/property/${property.id}`;
  };

  return (
    <div
      onClick={handleClick}
      className="group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl rounded-2xl overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
        <ImageWithFallback
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {property.status === 'Featured' && (
            <Badge className="bg-orange-500 text-white border-0 shadow-lg flex items-center gap-1">
              <Star className="w-3 h-3 fill-white" />
              Featured
            </Badge>
          )}
          {property.listingType && (
            <Badge className="bg-blue-600 text-white border-0 shadow-lg">
              {property.listingType}
            </Badge>
          )}
        </div>

        {/* Hover Overlay with Buttons */}
        <div
          className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-3 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Button
            onClick={(e) => {
              e.stopPropagation();
              window.location.href = `/property/${property.id}`;
            }}
            className="bg-white text-blue-600 hover:bg-blue-50 gap-2 shadow-lg"
          >
            <Eye className="w-4 h-4" />
            View Now
          </Button>
          <Button
            onClick={handleWhatsApp}
            className="bg-green-600 hover:bg-green-700 text-white gap-2 shadow-lg"
          >
            <Phone className="w-4 h-4" />
            WhatsApp Us
          </Button>
        </div>
      </div>

      {/* Content - Below Image */}
      <div className="bg-white p-3 sm:p-4 space-y-2">
        {/* Price - Top */}
        <div className="border-b border-gray-200 pb-2">
          <div className="text-xs sm:text-sm text-gray-600 mb-1">Price</div>
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-0 sm:gap-2">
            <span className="text-lg sm:text-xl font-bold text-blue-600">
              KSh {property.price}
            </span>
            <span className="text-xs sm:text-sm text-gray-600">per month</span>
          </div>
        </div>

        {/* Title */}
        <h5 className="text-gray-900 font-semibold line-clamp-2 text-sm sm:text-base">
          {property.title}
        </h5>

        {/* Location */}
        <div className="flex items-center gap-1 sm:gap-1.5 text-gray-600">
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
          <span className="text-xs sm:text-sm truncate">{property.location}</span>
        </div>

        {/* Property Features */}
        <div className="flex items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-700 pt-2 border-t border-gray-200">
          <span className="flex items-center gap-1">
            <Bed className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            <span className="hidden sm:inline">{property.beds} Beds</span>
            <span className="sm:hidden">{property.beds}</span>
          </span>
          <span className="flex items-center gap-1">
            <Bath className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            <span className="hidden sm:inline">{property.baths} Baths</span>
            <span className="sm:hidden">{property.baths}</span>
          </span>
          <span className="flex items-center gap-1">
            <Square className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
            <span className="hidden sm:inline">{property.sqft} sqm</span>
            <span className="sm:hidden">{property.sqft}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
