/**
 * API Service Layer
 * Centralized API client for backend communication
 */

import { Property } from '../types/property';

// Get API URL from environment variables
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

/**
 * Generic fetch wrapper with error handling
 */
async function fetchAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  // Add authorization header if token exists
  const token = getAuthToken();
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }
  
  const config: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };
  
  try {
    const response = await fetch(url, config);
    
    // Handle 204 No Content
    if (response.status === 204) {
      return {} as T;
    }
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.detail || 'API request failed');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

/**
 * Auth Token Management
 */
export function setAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('admin_token', token);
  }
}

export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('admin_token');
  }
  return null;
}

export function removeAuthToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('admin_token');
  }
}

export function isAuthenticated(): boolean {
  return getAuthToken() !== null;
}

// ============================================
// PROPERTY API
// ============================================

export interface PropertyFilters {
  page?: number;
  page_size?: number;
  location?: string;
  property_type?: string;
  listing_type?: 'rent' | 'buy';
  min_price?: number;
  max_price?: number;
  bedrooms?: number;
  bathrooms?: number;
  featured?: boolean;
  availability?: string;
  search?: string;
}

export interface PropertyListResponse {
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  properties: Property[];
}

/**
 * Get paginated properties with filters
 */
export async function getProperties(
  filters: PropertyFilters = {}
): Promise<PropertyListResponse> {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, String(value));
    }
  });
  
  return fetchAPI<PropertyListResponse>(`/properties?${params.toString()}`);
}

/**
 * Get single property by ID
 */
export async function getPropertyById(id: number): Promise<Property> {
  return fetchAPI<Property>(`/properties/${id}`);
}

/**
 * Get featured properties
 */
export async function getFeaturedProperties(limit: number = 6): Promise<Property[]> {
  return fetchAPI<Property[]>(`/properties/featured/list?limit=${limit}`);
}

/**
 * Get trending properties
 */
export async function getTrendingProperties(limit: number = 6): Promise<Property[]> {
  return fetchAPI<Property[]>(`/properties/trending/list?limit=${limit}`);
}

/**
 * Get neighborhoods
 */
export async function getNeighborhoods(): Promise<{ name: string; property_count: number }[]> {
  return fetchAPI<{ name: string; property_count: number }[]>('/neighborhoods');
}

// ============================================
// ADMIN - PROPERTY MANAGEMENT
// ============================================

export interface CreatePropertyData {
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

/**
 * Create new property (Admin only)
 */
export async function createProperty(data: CreatePropertyData): Promise<Property> {
  return fetchAPI<Property>('/admin/properties', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Update property (Admin only)
 */
export async function updateProperty(
  id: number,
  data: Partial<CreatePropertyData>
): Promise<Property> {
  return fetchAPI<Property>(`/admin/properties/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * Delete property (Admin only)
 */
export async function deleteProperty(id: number): Promise<void> {
  return fetchAPI<void>(`/admin/properties/${id}`, {
    method: 'DELETE',
  });
}

// ============================================
// ADMIN - IMAGE UPLOAD
// ============================================

/**
 * Upload single property image
 */
export async function uploadPropertyImage(
  propertyId: number,
  file: File,
  isPrimary: boolean = false
): Promise<{ message: string; image: any }> {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('is_primary', String(isPrimary));
  
  const token = getAuthToken();
  const response = await fetch(
    `${API_BASE_URL}/admin/upload/property-image/${propertyId}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Upload failed');
  }
  
  return response.json();
}

/**
 * Upload multiple property images
 */
export async function uploadPropertyImages(
  propertyId: number,
  files: File[]
): Promise<{ message: string; images: any[] }> {
  const formData = new FormData();
  files.forEach(file => formData.append('files', file));
  
  const token = getAuthToken();
  const response = await fetch(
    `${API_BASE_URL}/admin/upload/property-images/${propertyId}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    }
  );
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Upload failed');
  }
  
  return response.json();
}

/**
 * Delete property image
 */
export async function deletePropertyImage(imageId: number): Promise<void> {
  return fetchAPI<void>(`/admin/upload/property-image/${imageId}`, {
    method: 'DELETE',
  });
}

/**
 * Set image as primary
 */
export async function setPrimaryImage(imageId: number): Promise<void> {
  return fetchAPI<void>(`/admin/upload/property-image/${imageId}/set-primary`, {
    method: 'PUT',
  });
}

// ============================================
// ADMIN - AUTHENTICATION
// ============================================

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AdminUser {
  id: number;
  username: string;
  email: string;
  role: string;
  created_at: string;
  last_login?: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  admin: AdminUser;
}

/**
 * Admin login
 */
export async function adminLogin(credentials: LoginCredentials): Promise<LoginResponse> {
  const response = await fetchAPI<LoginResponse>('/admin/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
  
  // Save token
  setAuthToken(response.access_token);
  
  return response;
}

/**
 * Get current admin info
 */
export async function getCurrentAdmin(): Promise<AdminUser> {
  return fetchAPI<AdminUser>('/admin/me');
}

/**
 * Logout
 */
export function adminLogout(): void {
  removeAuthToken();
}

// ============================================
// ADMIN - DASHBOARD
// ============================================

export interface DashboardStats {
  total_properties: number;
  available_properties: number;
  rented_properties: number;
  sold_properties: number;
  featured_properties: number;
  properties_by_type: { type: string; count: number }[];
  properties_by_location: { location: string; count: number }[];
}

/**
 * Get dashboard statistics
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  return fetchAPI<DashboardStats>('/admin/dashboard/stats');
}

// ============================================
// AMENITIES
// ============================================

export interface Amenity {
  id: number;
  name: string;
  icon?: string;
}

/**
 * Get all amenities
 */
export async function getAmenities(): Promise<Amenity[]> {
  return fetchAPI<Amenity[]>('/amenities');
}

/**
 * Create amenity (Admin only)
 */
export async function createAmenity(data: { name: string; icon?: string }): Promise<Amenity> {
  return fetchAPI<Amenity>('/admin/amenities', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * Update amenity (Admin only)
 */
export async function updateAmenity(
  id: number,
  data: { name?: string; icon?: string }
): Promise<Amenity> {
  return fetchAPI<Amenity>(`/admin/amenities/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * Delete amenity (Admin only)
 */
export async function deleteAmenity(id: number): Promise<void> {
  return fetchAPI<void>(`/admin/amenities/${id}`, {
    method: 'DELETE',
  });
}

// ============================================
// HEALTH CHECK
// ============================================

export async function checkHealth(): Promise<{ status: string; database: string; api_version: string }> {
  const response = await fetch(`${API_BASE_URL.replace('/api', '')}/health`);
  return response.json();
}

export default {
  // Properties
  getProperties,
  getPropertyById,
  getFeaturedProperties,
  getTrendingProperties,
  getNeighborhoods,
  
  // Admin - Properties
  createProperty,
  updateProperty,
  deleteProperty,
  
  // Admin - Images
  uploadPropertyImage,
  uploadPropertyImages,
  deletePropertyImage,
  setPrimaryImage,
  
  // Admin - Auth
  adminLogin,
  getCurrentAdmin,
  adminLogout,
  isAuthenticated,
  
  // Admin - Dashboard
  getDashboardStats,
  
  // Amenities
  getAmenities,
  createAmenity,
  updateAmenity,
  deleteAmenity,
  
  // Health
  checkHealth,
};

