/**
 * TypeScript Type Definitions
 * Property-related types for type safety
 */

export interface Property {
  id: number;
  title: string;
  description: string;
  property_type: 'house' | 'apartment' | 'studio' | 'bedsitter' | 'commercial';
  listing_type: 'rent' | 'buy';
  price: string | number;
  location: string;
  latitude?: number;
  longitude?: number;
  bedrooms: number;
  bathrooms: number;
  area_sqm?: number;
  availability: 'available' | 'rented' | 'sold' | 'pending';
  featured: boolean;
  created_at: string;
  updated_at?: string;
  images: PropertyImage[];
  amenities: Amenity[];
  
  // Legacy fields for backward compatibility
  beds?: number;
  baths?: number;
  sqft?: number;
  image?: string;
  type?: string;
  status?: string;
  listingType?: string;
}

export interface PropertyImage {
  id: number;
  image_url: string;
  is_primary: boolean;
  display_order: number;
}

export interface Amenity {
  id: number;
  name: string;
  icon?: string;
}

export interface PropertyFormData {
  title: string;
  description: string;
  property_type: string;
  listing_type: string;
  price: number;
  location: string;
  latitude?: number;
  longitude?: number;
  bedrooms: number;
  bathrooms: number;
  area_sqm?: number;
  featured: boolean;
  availability: string;
  amenity_ids?: number[];
}

