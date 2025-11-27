"""
Property Schemas
Pydantic models for property API requests/responses
"""

from pydantic import BaseModel, Field, field_validator
from typing import Optional, List
from datetime import datetime
from decimal import Decimal

from app.models.property import PropertyType, ListingType, AvailabilityStatus


class PropertyImageSchema(BaseModel):
    """Property image schema"""
    id: Optional[int] = None
    image_url: str
    is_primary: bool = False
    display_order: int = 0
    
    class Config:
        from_attributes = True


class AmenitySchema(BaseModel):
    """Amenity schema for property responses"""
    id: int
    name: str
    icon: Optional[str] = None
    
    class Config:
        from_attributes = True


class PropertyBase(BaseModel):
    """Base property schema with common fields"""
    title: str = Field(..., min_length=5, max_length=255, description="Property title")
    description: str = Field(..., min_length=20, description="Property description")
    property_type: PropertyType = Field(..., description="Type of property")
    listing_type: ListingType = Field(..., description="Listing type (rent/buy)")
    price: Decimal = Field(..., gt=0, description="Property price")
    location: str = Field(..., min_length=3, max_length=255, description="Property location")
    latitude: Optional[Decimal] = Field(None, ge=-90, le=90, description="Latitude coordinate")
    longitude: Optional[Decimal] = Field(None, ge=-180, le=180, description="Longitude coordinate")
    bedrooms: int = Field(..., ge=0, le=20, description="Number of bedrooms")
    bathrooms: int = Field(..., ge=0, le=20, description="Number of bathrooms")
    area_sqm: Optional[Decimal] = Field(None, gt=0, description="Area in square meters")
    featured: bool = Field(False, description="Is property featured?")
    availability: AvailabilityStatus = Field(AvailabilityStatus.AVAILABLE, description="Availability status")


class PropertyCreate(PropertyBase):
    """Schema for creating a new property"""
    amenity_ids: Optional[List[int]] = Field(default_factory=list, description="List of amenity IDs")


class PropertyUpdate(BaseModel):
    """Schema for updating a property (all fields optional)"""
    title: Optional[str] = Field(None, min_length=5, max_length=255)
    description: Optional[str] = Field(None, min_length=20)
    property_type: Optional[PropertyType] = None
    listing_type: Optional[ListingType] = None
    price: Optional[Decimal] = Field(None, gt=0)
    location: Optional[str] = Field(None, min_length=3, max_length=255)
    latitude: Optional[Decimal] = Field(None, ge=-90, le=90)
    longitude: Optional[Decimal] = Field(None, ge=-180, le=180)
    bedrooms: Optional[int] = Field(None, ge=0, le=20)
    bathrooms: Optional[int] = Field(None, ge=0, le=20)
    area_sqm: Optional[Decimal] = Field(None, gt=0)
    featured: Optional[bool] = None
    availability: Optional[AvailabilityStatus] = None
    amenity_ids: Optional[List[int]] = None


class PropertyResponse(PropertyBase):
    """Schema for property API responses"""
    id: int
    images: List[PropertyImageSchema] = []
    amenities: List[AmenitySchema] = []
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class PropertyListResponse(BaseModel):
    """Schema for paginated property list response"""
    total: int
    page: int
    page_size: int
    total_pages: int
    properties: List[PropertyResponse]


class PropertyFilterParams(BaseModel):
    """Schema for property filtering parameters"""
    location: Optional[str] = None
    property_type: Optional[PropertyType] = None
    listing_type: Optional[ListingType] = None
    min_price: Optional[Decimal] = Field(None, ge=0)
    max_price: Optional[Decimal] = Field(None, ge=0)
    bedrooms: Optional[int] = Field(None, ge=0)
    bathrooms: Optional[int] = Field(None, ge=0)
    availability: Optional[AvailabilityStatus] = None
    featured: Optional[bool] = None
    page: int = Field(1, ge=1, description="Page number")
    page_size: int = Field(12, ge=1, le=100, description="Items per page")
    
    @field_validator('max_price')
    def validate_price_range(cls, v, info):
        """Ensure max_price is greater than min_price"""
        if v is not None and info.data.get('min_price') is not None:
            if v < info.data['min_price']:
                raise ValueError('max_price must be greater than min_price')
        return v

