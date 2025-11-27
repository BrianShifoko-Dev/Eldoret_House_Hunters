'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated, createProperty, getAmenities, uploadPropertyImages } from '@/services/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import Link from 'next/link';

export default function NewPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [amenities, setAmenities] = useState<any[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    property_type: 'apartment',
    listing_type: 'rent',
    price: '',
    location: '',
    latitude: '',
    longitude: '',
    bedrooms: '1',
    bathrooms: '1',
    area_sqm: '',
    featured: false,
    availability: 'available',
    amenity_ids: [] as number[]
  });

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/admin');
      return;
    }
    loadAmenities();
  }, [router]);

  const loadAmenities = async () => {
    try {
      const data = await getAmenities();
      setAmenities(data);
    } catch (error) {
      console.error('Error loading amenities:', error);
    }
  };

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages(Array.from(e.target.files));
    }
  };

  const handleAmenityToggle = (amenityId: number) => {
    const newAmenities = formData.amenity_ids.includes(amenityId)
      ? formData.amenity_ids.filter(id => id !== amenityId)
      : [...formData.amenity_ids, amenityId];
    setFormData({ ...formData, amenity_ids: newAmenities });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create property
      const propertyData = {
        ...formData,
        price: parseFloat(formData.price),
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        area_sqm: formData.area_sqm ? parseFloat(formData.area_sqm) : undefined,
        latitude: formData.latitude ? parseFloat(formData.latitude) : undefined,
        longitude: formData.longitude ? parseFloat(formData.longitude) : undefined,
      };

      const property = await createProperty(propertyData);

      // Upload images if any
      if (selectedImages.length > 0) {
        await uploadPropertyImages(property.id, selectedImages);
      }

      alert('Property created successfully!');
      router.push('/admin/properties');
    } catch (error: any) {
      console.error('Error creating property:', error);
      alert(error.message || 'Failed to create property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin/properties">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Add New Property</h1>
              <p className="text-sm text-gray-600">Create a new property listing</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <form onSubmit={handleSubmit}>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Property Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="E.g. Modern 3-Bedroom Apartment in Pioneer"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Detailed property description..."
                  rows={5}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="property_type">Property Type *</Label>
                  <Select value={formData.property_type} onValueChange={(v) => handleChange('property_type', v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="bedsitter">Bedsitter</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="listing_type">Listing Type *</Label>
                  <Select value={formData.listing_type} onValueChange={(v) => handleChange('listing_type', v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rent">For Rent</SelectItem>
                      <SelectItem value="buy">For Sale</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="price">Price (KSh) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => handleChange('price', e.target.value)}
                    placeholder="35000"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleChange('location', e.target.value)}
                  placeholder="E.g. Pioneer, Eldoret"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="latitude">Latitude (Optional)</Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="any"
                    value={formData.latitude}
                    onChange={(e) => handleChange('latitude', e.target.value)}
                    placeholder="0.5143"
                  />
                </div>
                <div>
                  <Label htmlFor="longitude">Longitude (Optional)</Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="any"
                    value={formData.longitude}
                    onChange={(e) => handleChange('longitude', e.target.value)}
                    placeholder="35.2698"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="bedrooms">Bedrooms *</Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    value={formData.bedrooms}
                    onChange={(e) => handleChange('bedrooms', e.target.value)}
                    min="0"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="bathrooms">Bathrooms *</Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    value={formData.bathrooms}
                    onChange={(e) => handleChange('bathrooms', e.target.value)}
                    min="0"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="area_sqm">Area (sqm)</Label>
                  <Input
                    id="area_sqm"
                    type="number"
                    value={formData.area_sqm}
                    onChange={(e) => handleChange('area_sqm', e.target.value)}
                    placeholder="120"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="availability">Availability *</Label>
                  <Select value={formData.availability} onValueChange={(v) => handleChange('availability', v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="rented">Rented</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={formData.featured}
                      onCheckedChange={(checked) => handleChange('featured', checked)}
                    />
                    <span className="text-sm font-medium">Feature this property</span>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {amenities.map((amenity) => (
                  <label key={amenity.id} className="flex items-center gap-2 cursor-pointer">
                    <Checkbox
                      checked={formData.amenity_ids.includes(amenity.id)}
                      onCheckedChange={() => handleAmenityToggle(amenity.id)}
                    />
                    <span className="text-sm">{amenity.name}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="images">Upload Images</Label>
                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="cursor-pointer"
                />
                <p className="text-sm text-gray-600 mt-2">
                  {selectedImages.length > 0
                    ? `${selectedImages.length} image(s) selected`
                    : 'Max 5MB per image. JPG, PNG, WebP allowed'}
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-4">
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700" disabled={loading}>
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Creating...' : 'Create Property'}
            </Button>
            <Link href="/admin/properties">
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

