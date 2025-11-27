"""
Property Models
Database models for property listings and related entities
"""

from sqlalchemy import Column, Integer, String, Text, DECIMAL, Boolean, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import datetime
import enum

from app.database import Base


class PropertyType(str, enum.Enum):
    """Property type enumeration"""
    HOUSE = "house"
    APARTMENT = "apartment"
    STUDIO = "studio"
    BEDSITTER = "bedsitter"
    COMMERCIAL = "commercial"


class ListingType(str, enum.Enum):
    """Listing type enumeration"""
    RENT = "rent"
    BUY = "buy"


class AvailabilityStatus(str, enum.Enum):
    """Availability status enumeration"""
    AVAILABLE = "available"
    RENTED = "rented"
    SOLD = "sold"
    PENDING = "pending"


class Property(Base):
    """
    Main property listing model
    Stores all property information
    """
    __tablename__ = "properties"
    
    # Primary Key
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    
    # Basic Information
    title = Column(String(255), nullable=False, index=True)
    description = Column(Text, nullable=False)
    property_type = Column(SQLEnum(PropertyType), nullable=False, index=True)
    listing_type = Column(SQLEnum(ListingType), nullable=False, index=True)
    
    # Pricing
    price = Column(DECIMAL(10, 2), nullable=False, index=True)
    
    # Location
    location = Column(String(255), nullable=False, index=True)
    latitude = Column(DECIMAL(10, 8), nullable=True)
    longitude = Column(DECIMAL(11, 8), nullable=True)
    
    # Property Details
    bedrooms = Column(Integer, nullable=False, default=1)
    bathrooms = Column(Integer, nullable=False, default=1)
    area_sqm = Column(DECIMAL(10, 2), nullable=True)
    
    # Status
    availability = Column(
        SQLEnum(AvailabilityStatus),
        nullable=False,
        default=AvailabilityStatus.AVAILABLE,
        index=True
    )
    featured = Column(Boolean, default=False, index=True)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), onupdate=func.now(), server_default=func.now())
    
    # Relationships
    images = relationship("PropertyImage", back_populates="property", cascade="all, delete-orphan")
    amenities = relationship("PropertyAmenity", back_populates="property", cascade="all, delete-orphan")
    
    def __repr__(self):
        return f"<Property(id={self.id}, title='{self.title}', price={self.price})>"
    
    @property
    def primary_image(self):
        """Get the primary image for this property"""
        for image in self.images:
            if image.is_primary:
                return image.image_url
        return self.images[0].image_url if self.images else None


class PropertyImage(Base):
    """
    Property images model
    Stores multiple images per property
    """
    __tablename__ = "property_images"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    property_id = Column(Integer, ForeignKey("properties.id", ondelete="CASCADE"), nullable=False)
    image_url = Column(String(500), nullable=False)
    is_primary = Column(Boolean, default=False)
    display_order = Column(Integer, default=0)
    
    # Relationships
    property = relationship("Property", back_populates="images")
    
    def __repr__(self):
        return f"<PropertyImage(id={self.id}, property_id={self.property_id}, primary={self.is_primary})>"


class PropertyAmenity(Base):
    """
    Property-Amenity relationship table (Many-to-Many)
    Links properties with their amenities
    """
    __tablename__ = "property_amenities"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    property_id = Column(Integer, ForeignKey("properties.id", ondelete="CASCADE"), nullable=False)
    amenity_id = Column(Integer, ForeignKey("amenities.id", ondelete="CASCADE"), nullable=False)
    
    # Relationships
    property = relationship("Property", back_populates="amenities")
    amenity = relationship("Amenity", back_populates="properties")
    
    def __repr__(self):
        return f"<PropertyAmenity(property_id={self.property_id}, amenity_id={self.amenity_id})>"

