'use client';

import { Hero, SearchFilters } from './Hero';
import { PropertyCard, Property } from './PropertyCard';
import { mockProperties, successStories } from './mockData';
import { useState } from 'react';
import { ListingDetail } from './ListingDetail';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Quote, SlidersHorizontal, LayoutGrid, List, MapPin, Bed, Bath, Square, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export function HomePage() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filteredProperties, setFilteredProperties] = useState(mockProperties);
  const [locationFilter, setLocationFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<{ [key: number]: 'challenge' | 'solution' }>({
    1: 'challenge',
    2: 'challenge',
    3: 'challenge',
  });

  const handleSearch = (filters: SearchFilters) => {
    let filtered = mockProperties;

    if (filters.location) {
      filtered = filtered.filter(p =>
        p.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.type) {
      filtered = filtered.filter(p =>
        p.type.toLowerCase().includes(filters.type.toLowerCase())
      );
    }

    if (filters.bedrooms && filters.bedrooms !== 'any') {
      const bedroomNum = parseInt(filters.bedrooms);
      if (bedroomNum === 4) {
        filtered = filtered.filter(p => p.beds >= 4);
      } else {
        filtered = filtered.filter(p => p.beds === bedroomNum);
      }
    }

    setFilteredProperties(filtered);
  };

  const applyFilters = () => {
    let filtered = mockProperties;

    if (locationFilter !== 'all') {
      filtered = filtered.filter(p =>
        p.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(p =>
        p.type.toLowerCase() === typeFilter.toLowerCase()
      );
    }

    if (priceFilter !== 'all') {
      const priceNum = parseInt(priceFilter);
      filtered = filtered.filter(p => {
        const propPrice = parseInt(p.price.replace(/,/g, ''));
        if (priceFilter === '50000') {
          return propPrice < 50000;
        } else if (priceFilter === '100000') {
          return propPrice >= 50000 && propPrice < 100000;
        } else if (priceFilter === '200000') {
          return propPrice >= 100000 && propPrice < 200000;
        } else if (priceFilter === '200001') {
          return propPrice >= 200000;
        }
        return true;
      });
    }

    setFilteredProperties(filtered);
  };

  const resetFilters = () => {
    setLocationFilter('all');
    setTypeFilter('all');
    setPriceFilter('all');
    setFilteredProperties(mockProperties);
  };

  const featuredProperties = mockProperties.filter(p => p.status === 'Featured');
  const newProperties = mockProperties.filter(p => p.status === 'New');

  return (
    <div>
      {/* Hero */}
      <Hero onSearch={handleSearch} />

      {/* Featured Listings */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <div className="mb-8">
          <h2 className="text-gray-900 mb-2">Featured Properties</h2>
          <p className="text-gray-600">Handpicked luxury homes in Eldoret</p>
        </div>

        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {featuredProperties.map((property) => (
              <CarouselItem key={property.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <PropertyCard
                  property={property}
                  onViewDetails={setSelectedProperty}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50" />
          <CarouselNext className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50" />
        </Carousel>
      </section>

      {/* New Listings - Airbnb Grid Style */}
      <section className="container mx-auto px-4 py-16 bg-gray-50">
        <div className="mb-8">
          <h2 className="text-gray-900 mb-2">New Listings</h2>
          <p className="text-gray-600">Fresh properties added this week</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-10">
          {newProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onViewDetails={setSelectedProperty}
            />
          ))}
        </div>
      </section>

      {/* All Properties Grid */}
      <section id="properties-section" className="container mx-auto px-4 py-16 bg-white">
        <div className="mb-6">
          <h2 className="text-gray-900 mb-2">All Properties</h2>
          <p className="text-gray-600">Browse all available properties</p>
        </div>

        {/* Filter Bar */}
        <div className="bg-gray-50 rounded-xl p-4 mb-8 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
            <div className="flex-1 w-full md:w-auto">
              <label className="text-sm font-medium text-gray-700 mb-1.5 block flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-gray-600" />
                Filter by Location
              </label>
              <Select value={locationFilter} onValueChange={setLocationFilter}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="annex">Annex</SelectItem>
                  <SelectItem value="cbd">CBD</SelectItem>
                  <SelectItem value="pioneer">Pioneer</SelectItem>
                  <SelectItem value="zion">Zion Mall Area</SelectItem>
                  <SelectItem value="rupa">Rupa Mall</SelectItem>
                  <SelectItem value="langas">Langas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 w-full md:w-auto">
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Property Type
              </label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="bedsitter">Bedsitter</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 w-full md:w-auto">
              <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                Price Range
              </label>
              <Select value={priceFilter} onValueChange={setPriceFilter}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="All Prices" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="50000">Under KES 50,000</SelectItem>
                  <SelectItem value="100000">KES 50,000 - 100,000</SelectItem>
                  <SelectItem value="200000">KES 100,000 - 200,000</SelectItem>
                  <SelectItem value="200001">Above KES 200,000</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={applyFilters}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Apply Filters
              </Button>
              <Button
                onClick={resetFilters}
                variant="outline"
                className="border-gray-300"
              >
                Reset
              </Button>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {filteredProperties.length} of {mockProperties.length} properties
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 hidden sm:inline">View:</span>
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className={`rounded-none ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                  <span className="ml-2 hidden sm:inline">Grid</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className={`rounded-none ${
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <List className="w-4 h-4" />
                  <span className="ml-2 hidden sm:inline">List</span>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Grid View */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-10">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onViewDetails={setSelectedProperty}
              />
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="space-y-4">
            {filteredProperties.map((property) => (
              <div
                key={property.id}
                onClick={() => window.location.href = `/property/${property.id}`}
                className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="relative w-full sm:w-64 h-48 sm:h-auto flex-shrink-0">
                    <ImageWithFallback
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      {property.status === 'Featured' && (
                        <Badge className="bg-orange-500 text-white border-0 shadow-lg">
                          Featured
                        </Badge>
                      )}
                      {property.listingType && (
                        <Badge className="bg-blue-600 text-white border-0 shadow-lg">
                          {property.listingType}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 sm:p-6">
                    <div className="flex flex-col h-full justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                          {property.title}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-600 mb-4">
                          <MapPin className="w-5 h-5 text-blue-600" />
                          <span>{property.location}</span>
                        </div>
                        <p className="text-gray-700 line-clamp-2 mb-4">
                          {property.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-4">
                        {/* Features */}
                        <div className="flex items-center gap-4 text-gray-700">
                          <span className="flex items-center gap-1.5">
                            <Bed className="w-5 h-5 text-gray-600" />
                            {property.beds} Beds
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Bath className="w-5 h-5 text-gray-600" />
                            {property.baths} Baths
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Square className="w-5 h-5 text-gray-600" />
                            {property.sqft} sqm
                          </span>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-sm text-gray-600 mb-1">Price</div>
                          <div className="text-2xl font-bold text-blue-600">
                            KSh {property.price}
                            <span className="text-sm font-normal text-gray-600 ml-2">/month</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Success Stories */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <div className="mb-12 text-center space-y-4">
          {/* Stars */}
          <div className="flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className="w-8 h-8 fill-blue-600"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real stories from real people who found their perfect homes with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {successStories.map((story) => (
            <div key={story.id} className="bg-white rounded-xl p-6 space-y-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all">
              {/* Verified Client Badge */}
              <div className="inline-block bg-blue-600 text-white px-3 py-1 rounded text-sm font-medium">
                Verified Client
              </div>

              {/* Profile */}
              <div className="flex items-center gap-4">
                {/* Avatar with Photo */}
                <ImageWithFallback
                  src={story.image}
                  alt={story.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-blue-100"
                />
                <div className="flex-1">
                  <div className="text-gray-900 font-semibold text-lg">{story.name}</div>
                  <div className="text-sm text-gray-600">{story.role}</div>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 fill-blue-600"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              {/* Challenge/Solution Toggle */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 bg-gray-50 p-1 rounded-lg">
                  <button
                    onClick={() => setActiveTab({ ...activeTab, [story.id]: 'challenge' })}
                    className={`text-center py-2 rounded-md text-sm font-medium transition-all ${
                      activeTab[story.id] === 'challenge'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Challenge
                  </button>
                  <button
                    onClick={() => setActiveTab({ ...activeTab, [story.id]: 'solution' })}
                    className={`text-center py-2 rounded-md text-sm font-medium transition-all ${
                      activeTab[story.id] === 'solution'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Solution
                  </button>
                </div>

                {/* Content Area */}
                <div className="min-h-[180px] relative">
                  {activeTab[story.id] === 'challenge' ? (
                    <div className="space-y-3 animate-fadeIn">
                      <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                        <span className="text-blue-600">Challenge</span>
                        <ChevronRight className="w-4 h-4 text-blue-600" />
                      </h4>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {story.challenge}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-blue-50 rounded-lg p-4 space-y-3 relative animate-fadeIn">
                      <Quote className="w-8 h-8 text-blue-600 absolute top-2 left-2 opacity-50" />
                      <div className="pl-6">
                        <h4 className="font-semibold text-blue-600 mb-2">Solution</h4>
                        <p className="text-gray-800 text-sm italic leading-relaxed">
                          {story.solution}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Client Since */}
              <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
                Client since {story.memberSince}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community CTA */}
      <section className="container mx-auto px-4 py-16 bg-white">
        <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl p-12 text-center space-y-8 shadow-2xl">
          <div>
            <h2 className="text-white mb-3">
              Get Started Today
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto">
              Whether you're buying, selling, or just exploring, we're here to help you find your perfect home in Eldoret.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Book a Viewing */}
            <div className="bg-white/10 rounded-xl p-6 space-y-3 border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm">
              <div className="text-3xl">📅</div>
              <h5 className="text-white font-semibold">Book a Viewing</h5>
              <p className="text-sm text-white/90">
                Schedule a tour of your favorite properties
              </p>
              <button
                onClick={() => window.open('https://wa.me/254700000000?text=I want to book a viewing', '_blank')}
                className="w-full bg-white text-blue-600 px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-all font-semibold"
              >
                Book Now
              </button>
            </div>

            {/* Join Community */}
            <div className="bg-white/10 rounded-xl p-6 space-y-3 border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm">
              <div className="text-3xl">👥</div>
              <h5 className="text-white font-semibold">Join Our Community</h5>
              <p className="text-sm text-white/90">
                Get exclusive deals and market insights
              </p>
              <button
                onClick={() => window.open('https://wa.me/254700000000?text=I want to join the community', '_blank')}
                className="w-full bg-white text-blue-600 px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-all font-semibold"
              >
                Join WhatsApp
              </button>
            </div>

            {/* Visit Offices */}
            <div className="bg-white/10 rounded-xl p-6 space-y-3 border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm">
              <div className="text-3xl">🏢</div>
              <h5 className="text-white font-semibold">Visit Our Offices</h5>
              <p className="text-sm text-white/90">
                Meet our team at Oginga Odinga St, CBD
              </p>
              <button
                onClick={() => window.open('https://wa.me/254700000000?text=I want to visit your offices', '_blank')}
                className="w-full bg-white text-blue-600 px-6 py-2.5 rounded-lg hover:bg-gray-50 transition-all font-semibold"
              >
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </section>

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
