'use client';

import { useState, useEffect } from 'react';
import { Search, MapPin, Bed, Home, Clock, Bath, Square } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface HeroProps {
  onSearch: (filters: SearchFilters) => void;
}

export interface SearchFilters {
  location: string;
  bedrooms: string;
  type: string;
}

export function Hero({ onSearch }: HeroProps) {
  const [location, setLocation] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [type, setType] = useState('');
  const [largeIndex, setLargeIndex] = useState(0);
  const [smallIndex1, setSmallIndex1] = useState(0);
  const [smallIndex2, setSmallIndex2] = useState(1);
  const [smallIndex3, setSmallIndex3] = useState(2);

  const handleSearch = () => {
    onSearch({ location, bedrooms, type });
  };

  const trendingSearches = [
    {
      label: '2B Apartments',
      location: 'Annex',
      price: '35,000',
      type: 'apartments-2b',
      beds: 2,
      baths: 2,
      sqft: 1200,
      image: 'https://images.unsplash.com/photo-1662454419736-de132ff75638?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBiZWRyb29tfGVufDF8fHx8MTc2MzQxNDU0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      label: 'Short-term Rentals',
      location: 'CBD',
      price: '3,500/day',
      type: 'short-term',
      beds: 1,
      baths: 1,
      sqft: 800,
      image: 'https://images.unsplash.com/photo-1736580601998-5cbc03c5742c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWRzaXR0ZXIlMjBzdHVkaW98ZW58MXx8fHwxNzYzNDk1NjM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      label: 'Student Housing',
      location: 'Eldoret',
      price: '12,000',
      type: 'student',
      beds: 1,
      baths: 1,
      sqft: 600,
      image: 'https://images.unsplash.com/photo-1680264370818-659352fa16f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwaG91c2luZyUyMHJvb218ZW58MXx8fHwxNzYzNDk1NjM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      label: '3B Houses',
      location: 'Zion Mall Area',
      price: '85,000',
      type: 'house-3b',
      beds: 3,
      baths: 3,
      sqft: 2000,
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MzQ4MDQ5MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      label: 'Bedsitters',
      location: 'Rupa Mall',
      price: '18,000',
      type: 'bedsitter',
      beds: 1,
      baths: 1,
      sqft: 500,
      image: 'https://images.unsplash.com/photo-1651752523215-9bf678c29355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MzM3Mzc3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      label: 'Luxury Villa',
      location: 'Pioneer',
      price: '150,000',
      type: 'villa',
      beds: 4,
      baths: 4,
      sqft: 3000,
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWxsYSUyMGV4dGVyaW9yfGVufDB8fHx8MTcwMDAwMDAwMHww&ixlib=rb-4.1.0&q=80&w=1080'
    },
  ];

  // Auto-rotation for large carousel (60 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setLargeIndex((prev) => (prev + 1) % trendingSearches.length);
    }, 60000); // 60 seconds
    return () => clearInterval(timer);
  }, [trendingSearches.length]);

  // Auto-rotation for small carousels (30 seconds each)
  useEffect(() => {
    const timer1 = setInterval(() => {
      setSmallIndex1((prev) => (prev + 1) % trendingSearches.length);
    }, 30000);
    const timer2 = setInterval(() => {
      setSmallIndex2((prev) => (prev + 1) % trendingSearches.length);
    }, 30000);
    const timer3 = setInterval(() => {
      setSmallIndex3((prev) => (prev + 1) % trendingSearches.length);
    }, 30000);
    return () => {
      clearInterval(timer1);
      clearInterval(timer2);
      clearInterval(timer3);
    };
  }, [trendingSearches.length]);

  return (
    <div className="relative min-h-[calc(100vh-64px)] flex items-start justify-center overflow-hidden pt-24 pb-8 md:pt-28 md:pb-12">
      {/* Hero Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1703435525194-9d96cefa7f7c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhZnJpY2FuJTIwaG91c2UlMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzYzNDk1MTE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`,
        }}
      ></div>

      {/* Blue Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-blue-800/85 to-blue-700/80"></div>

      {/* Subtle Blue Accent Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 z-10 w-full">
        <div className="max-w-6xl mx-auto space-y-6 md:space-y-12">
          {/* Glassy Search Panel */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-2xl max-w-5xl mx-auto border border-white/20">
            <div className="flex flex-col md:flex-row gap-3 md:gap-3 items-stretch md:items-end">
              {/* Location */}
              <div className="w-full md:flex-1 space-y-1.5">
                <label className="text-xs text-white font-medium flex items-center gap-1.5 px-1">
                  <MapPin className="w-3.5 h-3.5 text-white" />
                  Location
                </label>
                <Input
                  placeholder="e.g., Annex, CBD, Pioneer"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="bg-white/90 border-white/20 text-gray-900 placeholder:text-gray-500 h-11 md:h-12 focus:bg-white focus:border-blue-400 text-sm md:text-base"
                />
              </div>

              {/* Property Type */}
              <div className="w-full md:flex-1 space-y-1.5">
                <label className="text-xs text-white font-medium flex items-center gap-1.5 px-1">
                  <Home className="w-3.5 h-3.5 text-white" />
                  Property Type
                </label>
                <Select value={type} onValueChange={setType}>
                  <SelectTrigger className="bg-white/90 border-white/20 text-gray-900 h-11 md:h-12 focus:bg-white focus:border-blue-400 text-sm md:text-base">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 text-gray-900">
                    <SelectItem value="apartment">Apartments</SelectItem>
                    <SelectItem value="house-rent">House for Rent</SelectItem>
                    <SelectItem value="house-sale">House for Sale</SelectItem>
                    <SelectItem value="bedsitter">Bedsitter & Studio</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="land">Lands & Plots</SelectItem>
                    <SelectItem value="short-term">Short Term Rentals</SelectItem>
                    <SelectItem value="student">Student Houses</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Bedrooms */}
              <div className="w-full md:flex-1 space-y-1.5">
                <label className="text-xs text-white font-medium flex items-center gap-1.5 px-1">
                  <Bed className="w-3.5 h-3.5 text-white" />
                  Bedrooms
                </label>
                <Select value={bedrooms} onValueChange={setBedrooms}>
                  <SelectTrigger className="bg-white/90 border-white/20 text-gray-900 h-11 md:h-12 focus:bg-white focus:border-blue-400 text-sm md:text-base">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 text-gray-900">
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1 Bedroom</SelectItem>
                    <SelectItem value="2">2 Bedrooms</SelectItem>
                    <SelectItem value="3">3 Bedrooms</SelectItem>
                    <SelectItem value="4">4+ Bedrooms</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Search Button */}
              <Button
                onClick={handleSearch}
                size="lg"
                className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white gap-2 shadow-lg h-11 md:h-12 px-8 md:px-12 whitespace-nowrap font-semibold"
              >
                <Search className="w-5 h-5" />
                Search Properties
              </Button>
            </div>
          </div>

          {/* Top Trending Carousel */}
          <div className="space-y-3 md:space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-white text-left text-lg md:text-2xl font-bold">
                Top Trending Properties
              </h3>
            </div>

            {/* Row 1: Large Carousel (60 seconds) */}
            <div
              className="relative h-64 md:h-80 rounded-2xl overflow-hidden group cursor-pointer"
              onClick={() => {
                setType(trendingSearches[largeIndex].type);
                setLocation(trendingSearches[largeIndex].location);
                handleSearch({
                  location: trendingSearches[largeIndex].location,
                  type: trendingSearches[largeIndex].type,
                  bedrooms: ''
                });
                // Scroll to properties section
                setTimeout(() => {
                  const element = document.getElementById('properties-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
            >
              <img
                src={trendingSearches[largeIndex].image}
                alt={trendingSearches[largeIndex].label}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

              {/* Content */}
              <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                <Badge className="bg-orange-500 text-white border-0 shadow-lg w-fit mb-3">
                  Featured
                </Badge>
                <h4 className="text-xl md:text-3xl font-bold text-white mb-2 line-clamp-2">
                  {trendingSearches[largeIndex].label}
                </h4>
                <div className="flex items-center gap-2 text-white/90 mb-3">
                  <MapPin className="w-5 h-5" />
                  <span className="text-base md:text-lg">{trendingSearches[largeIndex].location}</span>
                </div>
                <div className="flex items-center gap-4 text-white/90 mb-4">
                  <span className="flex items-center gap-1.5">
                    <Bed className="w-5 h-5" />
                    {trendingSearches[largeIndex].beds}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Bath className="w-5 h-5" />
                    {trendingSearches[largeIndex].baths}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Square className="w-5 h-5" />
                    {trendingSearches[largeIndex].sqft} sqm
                  </span>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white">
                  KSh {trendingSearches[largeIndex].price}
                  <span className="text-base md:text-lg font-normal text-white/80 ml-2">/month</span>
                </div>
              </div>
            </div>

            {/* Row 2: Three Small Carousels (30 seconds each) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {[
                { index: smallIndex1, timer: '30s' },
                { index: smallIndex2, timer: '30s' },
                { index: smallIndex3, timer: '30s' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="relative h-48 md:h-56 rounded-xl overflow-hidden group cursor-pointer"
                  onClick={() => {
                    setType(trendingSearches[item.index].type);
                    setLocation(trendingSearches[item.index].location);
                    handleSearch({
                      location: trendingSearches[item.index].location,
                      type: trendingSearches[item.index].type,
                      bedrooms: ''
                    });
                    // Scroll to properties section
                    setTimeout(() => {
                      const element = document.getElementById('properties-section');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }, 100);
                  }}
                >
                  <img
                    src={trendingSearches[item.index].image}
                    alt={trendingSearches[item.index].label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

                  {/* Content */}
                  <div className="absolute inset-0 p-3 md:p-4 flex flex-col justify-end">
                    <h5 className="text-base md:text-lg font-bold text-white mb-2 line-clamp-2">
                      {trendingSearches[item.index].label}
                    </h5>
                    <div className="flex items-center gap-1.5 text-white/90 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm truncate">{trendingSearches[item.index].location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80 text-xs mb-2">
                      <span className="flex items-center gap-1">
                        <Bed className="w-3.5 h-3.5" />
                        {trendingSearches[item.index].beds}
                      </span>
                      <span className="flex items-center gap-1">
                        <Bath className="w-3.5 h-3.5" />
                        {trendingSearches[item.index].baths}
                      </span>
                      <span className="flex items-center gap-1">
                        <Square className="w-3.5 h-3.5" />
                        {trendingSearches[item.index].sqft}
                      </span>
                    </div>
                    <div className="text-lg md:text-xl font-bold text-white">
                      KSh {trendingSearches[item.index].price}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
