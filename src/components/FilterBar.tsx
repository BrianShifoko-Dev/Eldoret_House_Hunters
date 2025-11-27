'use client';

import { useState } from 'react';
import { SlidersHorizontal, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from './ui/sheet';
import { Badge } from './ui/badge';

interface FilterBarProps {
  onFilterChange: (filters: any) => void;
}

export function FilterBar({ onFilterChange }: FilterBarProps) {
  const [open, setOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState('');
  const [priceMax, setPriceMax] = useState('');

  const quickFilters = [
    'Apartments 1B',
    'Apartments 2B',
    'Short-term',
    'Student Housing',
    'House for Sale 3B',
    'Bedsitters',
  ];

  const propertyTypes = {
    'Residential': [
      'Apartments 1B',
      'Apartments 2B',
      'Apartments 3B',
      'Apartments 4B+',
      'Bedsitters & Studio',
      'Condo',
      'House for Rent 1B',
      'House for Rent 2B',
      'House for Rent 3B',
      'House for Rent 4B+',
    ],
    'House for Sale': ['1B', '2B', '3B', '4B+'],
    'Commercial': [
      'Cowork',
      'Hotel & Lounge',
      'Office',
      'Shop & Retail',
      'Warehouse',
    ],
    'Lands & Plots': [
      'Agricultural Land',
      'Commercial Plots',
      'Industrial Plots',
      'Residential Plots',
    ],
    'Special': ['Short Term Rentals', 'Student Houses', 'Under Construction'],
  };

  const locations = [
    'Eldoret CBD',
    'Annex',
    'Zion Mall Area',
    'Rupa Mall Area',
    'Pioneer',
    'Langas',
    'Elgon View',
    'West Indies',
    'Kimumu',
  ];

  const handleApply = () => {
    onFilterChange({
      types: selectedTypes,
      locations: selectedLocations,
      priceMin,
      priceMax,
    });
    setOpen(false);
  };

  const handleReset = () => {
    setSelectedTypes([]);
    setSelectedLocations([]);
    setPriceMin('');
    setPriceMax('');
    onFilterChange({});
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location) ? prev.filter((l) => l !== location) : [...prev, location]
    );
  };

  return (
    <div className="space-y-4">
      {/* Quick Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {quickFilters.map((filter) => (
          <Badge
            key={filter}
            variant="outline"
            className="bg-white border-gray-300 text-gray-700 cursor-pointer hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700 transition-all"
            onClick={() => toggleType(filter)}
          >
            {filter}
          </Badge>
        ))}
      </div>

      {/* Filter Button & Sheet */}
      <div className="flex items-center gap-3">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button className="bg-white border border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700 gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              All Filters
              {(selectedTypes.length > 0 || selectedLocations.length > 0) && (
                <Badge className="ml-1 bg-blue-600 text-white">
                  {selectedTypes.length + selectedLocations.length}
                </Badge>
              )}
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="bg-white border-gray-200 w-full sm:max-w-lg overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-gray-900">Filters</SheetTitle>
            </SheetHeader>

            <div className="space-y-6 py-6">
              {/* Price Range */}
              <div className="space-y-3">
                <Label className="text-gray-900 font-semibold">Price Range (KES)</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Min"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400"
                  />
                  <Input
                    placeholder="Max"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="bg-gray-50 border-gray-300 text-gray-900 placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Property Types */}
              <div className="space-y-3">
                <Label className="text-gray-900 font-semibold">Property Type</Label>
                {Object.entries(propertyTypes).map(([category, types]) => (
                  <div key={category} className="space-y-2">
                    <div className="text-sm text-blue-600 font-semibold">{category}</div>
                    {types.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={selectedTypes.includes(type)}
                          onCheckedChange={() => toggleType(type)}
                          className="border-gray-400"
                        />
                        <label
                          htmlFor={type}
                          className="text-sm text-gray-700 cursor-pointer"
                        >
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Locations */}
              <div className="space-y-3">
                <Label className="text-gray-900 font-semibold">Location</Label>
                {locations.map((location) => (
                  <div key={location} className="flex items-center space-x-2">
                    <Checkbox
                      id={location}
                      checked={selectedLocations.includes(location)}
                      onCheckedChange={() => toggleLocation(location)}
                      className="border-gray-400"
                    />
                    <label
                      htmlFor={location}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {location}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <SheetFooter className="gap-2">
              <Button
                variant="outline"
                onClick={handleReset}
                className="bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                Reset
              </Button>
              <Button onClick={handleApply} className="bg-blue-600 hover:bg-blue-700 text-white">
                Apply Filters
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>

        {/* Active Filters */}
        {(selectedTypes.length > 0 || selectedLocations.length > 0) && (
          <div className="flex flex-wrap gap-2">
            {[...selectedTypes, ...selectedLocations].slice(0, 3).map((filter) => (
              <Badge
                key={filter}
                className="bg-blue-100 text-blue-700 border-blue-300 gap-2"
              >
                {filter}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-blue-900"
                  onClick={() => {
                    if (selectedTypes.includes(filter)) toggleType(filter);
                    if (selectedLocations.includes(filter)) toggleLocation(filter);
                  }}
                />
              </Badge>
            ))}
            {selectedTypes.length + selectedLocations.length > 3 && (
              <Badge className="bg-blue-100 text-blue-700 border-blue-300">
                +{selectedTypes.length + selectedLocations.length - 3} more
              </Badge>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
