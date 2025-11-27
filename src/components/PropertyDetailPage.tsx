'use client';

import { useState } from 'react';
import {
  Heart,
  Share2,
  Printer,
  MapPin,
  Bed,
  Bath,
  Square,
  Check,
  ChevronRight,
  Home as HomeIcon,
  Mail,
  Phone as PhoneIcon,
  User
} from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Property, PropertyCard } from './PropertyCard';
import { mockProperties } from './mockData';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { toast } from 'sonner';

interface PropertyDetailPageProps {
  propertyId: string;
}

export function PropertyDetailPage({ propertyId }: PropertyDetailPageProps) {
  const property = mockProperties.find(p => p.id === propertyId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    userType: '',
    message: ''
  });

  if (!property) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Property not found</h1>
        <p className="text-gray-600 mt-2">The property you're looking for doesn't exist.</p>
      </div>
    );
  }

  // Mock gallery images
  const galleryImages = [property.image, property.image, property.image, property.image];

  const amenities = [
    'Parking',
    'Security 24/7',
    'Water supply',
    'Backup generator',
    'CCTV',
    'Balcony',
    'Modern kitchen',
    'Wardrobe',
    'Internet ready',
    'Gym access',
    'Swimming pool',
    'Garden'
  ];

  const similarProperties = mockProperties.filter(p => p.id !== propertyId).slice(0, 6);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `Check out this property: ${property.title}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSubmit = (e: React.FormEvent, type: 'email' | 'whatsapp') => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.email || !formData.userType) {
      toast.error('Please fill in all required fields');
      return;
    }

    const message = formData.message ||
      `I'm interested in ${property.title} at KES ${property.price}. I am a ${formData.userType}.`;

    if (type === 'whatsapp') {
      const whatsappMessage = `Name: ${formData.name}%0APhone: ${formData.phone}%0AEmail: ${formData.email}%0AType: ${formData.userType}%0A%0AMessage:%0A${encodeURIComponent(message)}`;
      window.open(`https://wa.me/254700000000?text=${whatsappMessage}`, '_blank');
    } else {
      const mailtoLink = `mailto:info@realestate.com?subject=Inquiry about ${property.title}&body=${encodeURIComponent(
        `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nType: ${formData.userType}\n\nMessage:\n${message}`
      )}`;
      window.location.href = mailtoLink;
    }

    toast.success(`Inquiry sent via ${type === 'email' ? 'Email' : 'WhatsApp'}!`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-blue-600 transition-colors flex items-center gap-1">
              <HomeIcon className="w-4 h-4" />
              Home
            </a>
            <ChevronRight className="w-4 h-4" />
            <a href={`/${property.listingType?.toLowerCase().replace(' ', '-')}`} className="hover:text-blue-600 transition-colors">
              {property.listingType || 'Properties'}
            </a>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium truncate max-w-xs">{property.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header with Actions */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span className="text-lg">{property.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
                className="border-gray-300"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-700'
                  }`}
                />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleShare}
                className="border-gray-300"
              >
                <Share2 className="w-5 h-5 text-gray-700" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrint}
                className="border-gray-300"
              >
                <Printer className="w-5 h-5 text-gray-700" />
              </Button>
            </div>
          </div>

          {/* Status Badges */}
          <div className="flex gap-2">
            {property.status && (
              <Badge className={`${
                property.status === 'Featured' ? 'bg-orange-500' : 'bg-green-500'
              } text-white`}>
                {property.status}
              </Badge>
            )}
            {property.listingType && (
              <Badge className="bg-blue-600 text-white">
                {property.listingType}
              </Badge>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="space-y-4">
                <div className="relative h-96 rounded-xl overflow-hidden">
                  <ImageWithFallback
                    src={galleryImages[currentImageIndex]}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {galleryImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-24 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === idx
                          ? 'border-blue-600'
                          : 'border-gray-300 hover:border-blue-400'
                      }`}
                    >
                      <ImageWithFallback
                        src={img}
                        alt={`Gallery ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Overview */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Bed className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">Bedrooms</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{property.beds}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Bath className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">Bathrooms</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{property.baths}</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Square className="w-5 h-5 text-blue-600" />
                    <span className="text-sm">Area</span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{property.sqft} sqm</div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">Property Type</div>
                  <div className="text-2xl font-bold text-gray-900">{property.type}</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{property.description}</p>
            </div>

            {/* Address */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Address</h2>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="text-gray-900 font-medium text-lg">{property.location}</p>
                  <p className="text-gray-600 mt-1">Eldoret, Kenya</p>
                </div>
              </div>
            </div>

            {/* Features & Amenities */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Features & Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-700">
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Similar Properties */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Similar Properties</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {similarProperties.map((prop) => (
                  <div key={prop.id} className="scale-90 origin-top">
                    <PropertyCard
                      property={prop}
                      onViewDetails={(p) => window.location.href = `/property/${p.id}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Inquiry Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              {/* Price Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="mb-6">
                  <div className="text-sm text-gray-600 mb-1">Price</div>
                  <div className="text-3xl text-blue-600 font-bold">
                    KES {property.price}
                    <span className="text-sm text-gray-600 ml-2 font-normal">/month</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Availability</span>
                    <span className="text-green-600 font-medium">Available Now</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Response time</span>
                    <span className="text-gray-900 font-medium">Within 1 hour</span>
                  </div>
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Send Inquiry</h3>
                <form className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <PhoneIcon className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                      <Input
                        type="tel"
                        placeholder="+254 700 000 000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                      I am a *
                    </label>
                    <Select value={formData.userType} onValueChange={(value) => setFormData({ ...formData, userType: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="renter">Renter</SelectItem>
                        <SelectItem value="buyer">Buyer</SelectItem>
                        <SelectItem value="seller">Seller</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1.5 block">
                      Message (Optional)
                    </label>
                    <Textarea
                      placeholder={`I'm interested in ${property.title}...`}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Button
                      onClick={(e) => handleSubmit(e, 'whatsapp')}
                      className="w-full bg-green-600 hover:bg-green-700 text-white gap-2"
                      type="button"
                    >
                      <PhoneIcon className="w-4 h-4" />
                      Send via WhatsApp
                    </Button>
                    <Button
                      onClick={(e) => handleSubmit(e, 'email')}
                      variant="outline"
                      className="w-full gap-2"
                      type="button"
                    >
                      <Mail className="w-4 h-4" />
                      Send via Email
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
