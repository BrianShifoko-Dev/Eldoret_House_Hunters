'use client';

import { useState, useEffect } from 'react';
import { Clock, MapPin, Bed, Bath, Square, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Property } from './PropertyCard';
import { mockProperties } from './mockData';

interface TrendingProperty extends Property {
  views: number;
  postedTime: string;
}

export function TrendingPage() {
  const [mainIndex, setMainIndex] = useState(0);
  const [smallIndex1, setSmallIndex1] = useState(0);
  const [smallIndex2, setSmallIndex2] = useState(0);
  const [smallIndex3, setSmallIndex3] = useState(0);

  // Convert mock properties to trending format
  const trendingProperties: TrendingProperty[] = mockProperties
    .filter(p => p.status === 'Featured' || p.status === 'New')
    .map((p, i) => ({
      ...p,
      views: Math.floor(Math.random() * 5000) + 1000,
      postedTime: `${Math.floor(Math.random() * 24) + 1}h ago`,
    }));

  const mainProperties = trendingProperties.slice(0, 4);
  const smallSet1 = trendingProperties.slice(4, 7);
  const smallSet2 = trendingProperties.slice(7, 10);
  const smallSet3 = trendingProperties.slice(10, 13);

  // Auto advance - main: 60 seconds, small: 30 seconds
  useEffect(() => {
    const mainTimer = setInterval(() => {
      setMainIndex((prev) => (prev + 1) % mainProperties.length);
    }, 60000); // 60 seconds

    const smallTimer1 = setInterval(() => {
      setSmallIndex1((prev) => (prev + 1) % smallSet1.length);
    }, 30000); // 30 seconds

    const smallTimer2 = setInterval(() => {
      setSmallIndex2((prev) => (prev + 1) % smallSet2.length);
    }, 30000);

    const smallTimer3 = setInterval(() => {
      setSmallIndex3((prev) => (prev + 1) % smallSet3.length);
    }, 30000);

    return () => {
      clearInterval(mainTimer);
      clearInterval(smallTimer1);
      clearInterval(smallTimer2);
      clearInterval(smallTimer3);
    };
  }, [mainProperties.length, smallSet1.length, smallSet2.length, smallSet3.length]);

  const currentMain = mainProperties[mainIndex];
  const currentSmall1 = smallSet1[smallIndex1];
  const currentSmall2 = smallSet2[smallIndex2];
  const currentSmall3 = smallSet3[smallIndex3];

  const TrendingCard = ({ property, duration, onView }: { property: TrendingProperty; duration: number; onView: () => void }) => (
    <div className="relative h-full rounded-2xl overflow-hidden group cursor-pointer" onClick={onView}>
      <ImageWithFallback
        src={property.image}
        alt={property.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      {/* Content */}
      <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between">
        {/* Top badges */}
        <div className="flex items-start justify-between">
          <div className="flex gap-2">
            {property.status && (
              <Badge className="bg-orange-500 text-white border-0 shadow-lg">
                {property.status}
              </Badge>
            )}
            {property.listingType && (
              <Badge className="bg-blue-600 text-white border-0 shadow-lg">
                {property.listingType}
              </Badge>
            )}
          </div>
          <div className="bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-white" />
            <span className="text-xs text-white font-medium">{duration}s</span>
          </div>
        </div>

        {/* Bottom content */}
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="text-2xl md:text-3xl font-bold text-white line-clamp-2">
              {property.title}
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{property.location}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-white/90 text-sm">
            <span className="flex items-center gap-1.5">
              <Bed className="w-4 h-4" />
              {property.beds}
            </span>
            <span className="flex items-center gap-1.5">
              <Bath className="w-4 h-4" />
              {property.baths}
            </span>
            <span className="flex items-center gap-1.5">
              <Square className="w-4 h-4" />
              {property.sqft} sqm
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs text-white/70 mb-1">Price</div>
              <div className="text-2xl font-bold text-white">
                KSh {property.price}
                <span className="text-sm font-normal text-white/80 ml-2">/month</span>
              </div>
            </div>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white gap-2"
              onClick={(e) => {
                e.stopPropagation();
                onView();
              }}
            >
              <Eye className="w-4 h-4" />
              View Details
            </Button>
          </div>

          <div className="flex items-center gap-4 text-xs text-white/70">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {property.views.toLocaleString()} views
            </span>
            <span>{property.postedTime}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const SmallTrendingCard = ({ property, duration, onView }: { property: TrendingProperty; duration: number; onView: () => void }) => (
    <div className="relative h-full rounded-xl overflow-hidden group cursor-pointer" onClick={onView}>
      <ImageWithFallback
        src={property.image}
        alt={property.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

      <div className="absolute inset-0 p-3 md:p-4 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          {property.status && (
            <Badge className="bg-orange-500 text-white border-0 shadow-lg text-xs">
              {property.status}
            </Badge>
          )}
          <div className="bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1">
            <Clock className="w-2.5 h-2.5 text-white" />
            <span className="text-[10px] text-white font-medium">{duration}s</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-base md:text-lg font-bold text-white line-clamp-2">
            {property.title}
          </div>
          <div className="flex items-center gap-1.5 text-white/90">
            <MapPin className="w-3 h-3" />
            <span className="text-xs truncate">{property.location}</span>
          </div>
          <div className="text-lg font-bold text-white">
            KSh {property.price}
          </div>
          <div className="flex items-center gap-3 text-white/80 text-xs">
            <span className="flex items-center gap-1">
              <Bed className="w-3 h-3" />
              {property.beds}
            </span>
            <span className="flex items-center gap-1">
              <Bath className="w-3 h-3" />
              {property.baths}
            </span>
            <span className="flex items-center gap-1">
              <Square className="w-3 h-3" />
              {property.sqft}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const handleView = (property: TrendingProperty) => {
    // Navigate to property detail or open modal
    console.log('View property:', property);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Top Trending Properties
          </h1>
          <p className="text-gray-600">
            Most viewed and popular listings right now
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Large Main Property - Left */}
          <div className="lg:row-span-3 h-[500px] md:h-[700px]">
            {currentMain && (
              <TrendingCard
                property={currentMain}
                duration={60}
                onView={() => handleView(currentMain)}
              />
            )}
          </div>

          {/* Three Small Properties - Right */}
          <div className="h-[500px] md:h-[220px]">
            {currentSmall1 && (
              <SmallTrendingCard
                property={currentSmall1}
                duration={30}
                onView={() => handleView(currentSmall1)}
              />
            )}
          </div>

          <div className="h-[500px] md:h-[220px]">
            {currentSmall2 && (
              <SmallTrendingCard
                property={currentSmall2}
                duration={30}
                onView={() => handleView(currentSmall2)}
              />
            )}
          </div>

          <div className="h-[500px] md:h-[220px]">
            {currentSmall3 && (
              <SmallTrendingCard
                property={currentSmall3}
                duration={30}
                onView={() => handleView(currentSmall3)}
              />
            )}
          </div>
        </div>

        {/* All Trending Properties Grid */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            All Trending Properties
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {trendingProperties.map((property) => (
              <div
                key={property.id}
                className="relative aspect-[4/3] rounded-xl overflow-hidden group cursor-pointer"
                onClick={() => handleView(property)}
              >
                <ImageWithFallback
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute inset-0 p-3 flex flex-col justify-end">
                  <div className="text-white font-semibold line-clamp-1 text-sm mb-1">
                    {property.title}
                  </div>
                  <div className="text-white font-bold text-lg">
                    KSh {property.price}
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-xs mt-1">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {property.views}
                    </span>
                    <span>{property.postedTime}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
