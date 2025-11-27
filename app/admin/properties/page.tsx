'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, getProperties, deleteProperty } from '@/services/api';
import { Property } from '@/types/property';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Home,
  Edit,
  Trash2,
  Plus,
  Search,
  ArrowLeft,
  MapPin,
  Bed,
  Bath,
  Square
} from 'lucide-react';
import Link from 'next/link';

export default function AdminPropertiesPage() {
  const router = useRouter();
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    listing_type: 'all',
    availability: 'all',
    page: 1,
    page_size: 20
  });
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin');
      return;
    }
    loadProperties();
  }, [filters, router]);

  const loadProperties = async () => {
    setLoading(true);
    try {
      const params: any = { ...filters };
      if (params.listing_type === 'all') delete params.listing_type;
      if (params.availability === 'all') delete params.availability;
      
      const response = await getProperties(params);
      setProperties(response.properties);
      setTotalPages(response.total_pages);
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    
    try {
      await deleteProperty(deleteId);
      setDeleteId(null);
      loadProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
      alert('Failed to delete property');
    }
  };

  const getImageUrl = (property: Property) => {
    if (property.images && property.images.length > 0) {
      const primaryImage = property.images.find(img => img.is_primary);
      return primaryImage?.image_url || property.images[0].image_url;
    }
    return '/placeholder-property.jpg';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Manage Properties</h1>
                <p className="text-sm text-gray-600">View, edit, and delete property listings</p>
              </div>
            </div>
            <Link href="/admin/properties/new">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Filters */}
      <div className="container mx-auto px-4 py-6">
        <Card>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative md:col-span-2">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search properties..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value, page: 1 })}
                  className="pl-10"
                />
              </div>

              <Select
                value={filters.listing_type}
                onValueChange={(value) => setFilters({ ...filters, listing_type: value, page: 1 })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Listing Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="rent">For Rent</SelectItem>
                  <SelectItem value="buy">For Sale</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={filters.availability}
                onValueChange={(value) => setFilters({ ...filters, availability: value, page: 1 })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="rented">Rented</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Properties List */}
      <div className="container mx-auto px-4 pb-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading properties...</p>
          </div>
        ) : properties.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Home className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-600 mb-6">Get started by creating your first property listing</p>
              <Link href="/admin/properties/new">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Property
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 mb-6">
              {properties.map((property) => (
                <Card key={property.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Image */}
                      <div className="relative w-full md:w-64 h-48 flex-shrink-0">
                        <img
                          src={getImageUrl(property)}
                          alt={property.title}
                          className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-t-none"
                        />
                        <div className="absolute top-3 left-3 flex gap-2 flex-wrap">
                          {property.featured && (
                            <Badge className="bg-yellow-500 text-white">Featured</Badge>
                          )}
                          <Badge className="bg-blue-600 text-white capitalize">
                            {property.listing_type}
                          </Badge>
                          <Badge
                            className={
                              property.availability === 'available'
                                ? 'bg-green-500 text-white'
                                : property.availability === 'rented'
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-500 text-white'
                            }
                          >
                            {property.availability}
                          </Badge>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {property.title}
                            </h3>
                            <div className="flex items-center gap-2 text-gray-600 mb-3">
                              <MapPin className="w-4 h-4" />
                              <span className="text-sm">{property.location}</span>
                            </div>
                            <p className="text-gray-700 line-clamp-2 text-sm mb-4">
                              {property.description}
                            </p>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-sm text-gray-600 mb-1">Price</div>
                            <div className="text-2xl font-bold text-blue-600">
                              KSh {typeof property.price === 'number' 
                                ? property.price.toLocaleString() 
                                : property.price}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-gray-700 text-sm">
                            <span className="flex items-center gap-1.5">
                              <Bed className="w-4 h-4" />
                              {property.bedrooms} Beds
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Bath className="w-4 h-4" />
                              {property.bathrooms} Baths
                            </span>
                            {property.area_sqm && (
                              <span className="flex items-center gap-1.5">
                                <Square className="w-4 h-4" />
                                {property.area_sqm} sqm
                              </span>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <Link href={`/admin/properties/edit/${property.id}`}>
                              <Button variant="outline" size="sm">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit
                              </Button>
                            </Link>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => setDeleteId(property.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={filters.page === page ? 'default' : 'outline'}
                    onClick={() => setFilters({ ...filters, page })}
                    className={filters.page === page ? 'bg-blue-600' : ''}
                  >
                    {page}
                  </Button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Property</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this property? This action cannot be undone.
              All images and data associated with this property will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

