'use client';

import { useState } from 'react';
import { PropertyCard, Property } from './PropertyCard';
import { FilterBar } from './FilterBar';
import { mockProperties } from './mockData';
import { ListingDetail } from './ListingDetail';
import { MapPin, Grid3x3, Map } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface BuyRentPageProps {
  mode: 'buy' | 'rent';
}

export function BuyRentPage({ mode }: BuyRentPageProps) {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const handleFilterChange = (filters: any) => {
    let filtered = mockProperties;
    
    if (filters.types && filters.types.length > 0) {
      filtered = filtered.filter(p => filters.types.some((t: string) => 
        p.type.toLowerCase().includes(t.toLowerCase())
      ));
    }
    
    if (filters.locations && filters.locations.length > 0) {
      filtered = filtered.filter(p => filters.locations.some((l: string) => 
        p.location.toLowerCase().includes(l.toLowerCase())
      ));
    }
    
    setFilteredProperties(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-gray-900 mb-2">
            {mode === 'buy' ? 'Properties for Sale' : 'Properties for Rent'}
          </h1>
          <p className="text-gray-600">
            {filteredProperties.length} properties available in Eldoret
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <FilterBar onFilterChange={handleFilterChange} />
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-end gap-2 mb-6">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className={viewMode === 'grid' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'text-gray-700 hover:bg-gray-100'}
          >
            <Grid3x3 className="w-4 h-4 mr-2" />
            Grid
          </Button>
          <Button
            variant={viewMode === 'map' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('map')}
            className={viewMode === 'map' ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'text-gray-700 hover:bg-gray-100'}
          >
            <Map className="w-4 h-4 mr-2" />
            Map
          </Button>
        </div>

        {/* Content */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-16">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onViewDetails={setSelectedProperty}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-6 grid lg:grid-cols-2 gap-6 min-h-[600px] mb-16 shadow-sm border border-gray-200">
            {/* List */}
            <div className="space-y-4 overflow-y-auto max-h-[600px]">
              {filteredProperties.map((property) => (
                <button
                  key={property.id}
                  onClick={() => setSelectedProperty(property)}
                  className="w-full text-left bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-all border border-gray-200"
                >
                  <div className="flex gap-4">
                    <ImageWithFallback
                      src={property.image}
                      alt={property.title}
                      className="w-32 h-24 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h5 className="text-gray-900 font-semibold line-clamp-1 mb-2">{property.title}</h5>
                      <div className="flex items-center gap-1 text-gray-600 text-sm mb-2">
                        <MapPin className="w-4 h-4" />
                        {property.location}
                      </div>
                      <div className="text-blue-600 font-semibold">KES {property.price}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Map */}
            <div className="bg-gray-50 rounded-xl flex items-center justify-center border border-gray-200">
              <div className="text-center text-gray-600">
                <MapPin className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                <p className="text-lg font-semibold text-gray-900">Interactive Map View</p>
                <p className="text-sm">Properties shown on map with markers</p>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {filteredProperties.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-200">
            <p className="text-gray-600">No properties found matching your filters.</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your search criteria.</p>
          </div>
        )}
      </div>

      {/* Listing Detail Modal */}
      {selectedProperty && (
        <ListingDetail
          property={selectedProperty}
          similarProperties={mockProperties.filter(p => p.id !== selectedProperty.id)}
          onClose={() => setSelectedProperty(null)}
          onViewDetails={setSelectedProperty}
        />
      )}
    </div>
  );
}
