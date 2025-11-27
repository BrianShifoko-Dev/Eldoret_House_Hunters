"""
Amenity Model
Database model for property amenities (WiFi, Parking, etc.)
"""

from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship

from app.database import Base


class Amenity(Base):
    """
    Amenity model
    Stores available property amenities
    """
    __tablename__ = "amenities"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False, unique=True, index=True)
    icon = Column(String(50), nullable=True)  # Icon name (e.g., 'wifi', 'parking')
    
    # Relationships
    properties = relationship("PropertyAmenity", back_populates="amenity")
    
    def __repr__(self):
        return f"<Amenity(id={self.id}, name='{self.name}')>"

