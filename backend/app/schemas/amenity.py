"""
Amenity Schemas
Pydantic models for property amenities
"""

from pydantic import BaseModel, Field
from typing import Optional


class AmenityBase(BaseModel):
    """Base amenity schema"""
    name: str = Field(..., min_length=2, max_length=100, description="Amenity name")
    icon: Optional[str] = Field(None, max_length=50, description="Icon identifier")


class AmenityCreate(AmenityBase):
    """Schema for creating a new amenity"""
    pass


class AmenityUpdate(BaseModel):
    """Schema for updating an amenity"""
    name: Optional[str] = Field(None, min_length=2, max_length=100)
    icon: Optional[str] = Field(None, max_length=50)


class AmenityResponse(AmenityBase):
    """Schema for amenity API responses"""
    id: int
    
    class Config:
        from_attributes = True

