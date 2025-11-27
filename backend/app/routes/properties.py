"""
Property Routes
Public and admin endpoints for property management
"""

from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.orm import Session
from sqlalchemy import and_, or_
from typing import List, Optional
import math

from app.database import get_db
from app.models.property import Property, PropertyImage, PropertyAmenity, PropertyType, ListingType, AvailabilityStatus
from app.models.amenity import Amenity
from app.models.admin import Admin
from app.schemas.property import (
    PropertyCreate,
    PropertyUpdate,
    PropertyResponse,
    PropertyListResponse,
    PropertyImageSchema
)
from app.utils.auth import get_current_admin

router = APIRouter()


# ============================================
# PUBLIC ENDPOINTS
# ============================================

@router.get("/properties", response_model=PropertyListResponse, tags=["Public"])
async def get_properties(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(12, ge=1, le=100, description="Items per page"),
    location: Optional[str] = Query(None, description="Filter by location"),
    property_type: Optional[PropertyType] = Query(None, description="Filter by property type"),
    listing_type: Optional[ListingType] = Query(None, description="Filter by listing type"),
    min_price: Optional[float] = Query(None, ge=0, description="Minimum price"),
    max_price: Optional[float] = Query(None, ge=0, description="Maximum price"),
    bedrooms: Optional[int] = Query(None, ge=0, description="Number of bedrooms"),
    bathrooms: Optional[int] = Query(None, ge=0, description="Number of bathrooms"),
    featured: Optional[bool] = Query(None, description="Featured properties only"),
    availability: Optional[AvailabilityStatus] = Query(None, description="Availability status"),
    search: Optional[str] = Query(None, description="Search in title and description"),
    db: Session = Depends(get_db)
):
    """
    Get paginated list of properties with filters
    """
    # Build query
    query = db.query(Property)
    
    # Apply filters
    filters = []
    
    if location:
        filters.append(Property.location.ilike(f"%{location}%"))
    
    if property_type:
        filters.append(Property.property_type == property_type)
    
    if listing_type:
        filters.append(Property.listing_type == listing_type)
    
    if min_price is not None:
        filters.append(Property.price >= min_price)
    
    if max_price is not None:
        filters.append(Property.price <= max_price)
    
    if bedrooms is not None:
        filters.append(Property.bedrooms >= bedrooms)
    
    if bathrooms is not None:
        filters.append(Property.bathrooms >= bathrooms)
    
    if featured is not None:
        filters.append(Property.featured == featured)
    
    if availability:
        filters.append(Property.availability == availability)
    
    if search:
        search_filter = or_(
            Property.title.ilike(f"%{search}%"),
            Property.description.ilike(f"%{search}%")
        )
        filters.append(search_filter)
    
    # Apply all filters
    if filters:
        query = query.filter(and_(*filters))
    
    # Get total count
    total = query.count()
    
    # Calculate pagination
    total_pages = math.ceil(total / page_size)
    offset = (page - 1) * page_size
    
    # Get paginated results
    properties = query.order_by(Property.created_at.desc()).offset(offset).limit(page_size).all()
    
    return PropertyListResponse(
        total=total,
        page=page,
        page_size=page_size,
        total_pages=total_pages,
        properties=properties
    )


@router.get("/properties/{property_id}", response_model=PropertyResponse, tags=["Public"])
async def get_property(
    property_id: int,
    db: Session = Depends(get_db)
):
    """
    Get single property by ID
    """
    property_obj = db.query(Property).filter(Property.id == property_id).first()
    
    if not property_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found"
        )
    
    return property_obj


@router.get("/properties/featured/list", response_model=List[PropertyResponse], tags=["Public"])
async def get_featured_properties(
    limit: int = Query(6, ge=1, le=20, description="Number of featured properties"),
    db: Session = Depends(get_db)
):
    """
    Get featured properties
    """
    properties = db.query(Property)\
        .filter(Property.featured == True)\
        .filter(Property.availability == AvailabilityStatus.AVAILABLE)\
        .order_by(Property.created_at.desc())\
        .limit(limit)\
        .all()
    
    return properties


@router.get("/properties/trending/list", response_model=List[PropertyResponse], tags=["Public"])
async def get_trending_properties(
    limit: int = Query(6, ge=1, le=20, description="Number of trending properties"),
    db: Session = Depends(get_db)
):
    """
    Get recently added properties (trending)
    """
    properties = db.query(Property)\
        .filter(Property.availability == AvailabilityStatus.AVAILABLE)\
        .order_by(Property.created_at.desc())\
        .limit(limit)\
        .all()
    
    return properties


@router.get("/neighborhoods", tags=["Public"])
async def get_neighborhoods(db: Session = Depends(get_db)):
    """
    Get unique neighborhoods with property counts
    """
    from sqlalchemy import func
    
    neighborhoods = db.query(
        Property.location,
        func.count(Property.id).label('count')
    ).group_by(Property.location)\
     .order_by(func.count(Property.id).desc())\
     .all()
    
    return [
        {"name": location, "property_count": count}
        for location, count in neighborhoods
    ]


# ============================================
# ADMIN ENDPOINTS (Protected)
# ============================================

@router.post("/admin/properties", response_model=PropertyResponse, tags=["Admin"], status_code=status.HTTP_201_CREATED)
async def create_property(
    property_data: PropertyCreate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    """
    Create a new property listing (Admin only)
    """
    # Create property
    new_property = Property(
        title=property_data.title,
        description=property_data.description,
        property_type=property_data.property_type,
        listing_type=property_data.listing_type,
        price=property_data.price,
        location=property_data.location,
        latitude=property_data.latitude,
        longitude=property_data.longitude,
        bedrooms=property_data.bedrooms,
        bathrooms=property_data.bathrooms,
        area_sqm=property_data.area_sqm,
        featured=property_data.featured,
        availability=property_data.availability
    )
    
    db.add(new_property)
    db.commit()
    db.refresh(new_property)
    
    # Add amenities if provided
    if property_data.amenity_ids:
        for amenity_id in property_data.amenity_ids:
            amenity = db.query(Amenity).filter(Amenity.id == amenity_id).first()
            if amenity:
                property_amenity = PropertyAmenity(
                    property_id=new_property.id,
                    amenity_id=amenity_id
                )
                db.add(property_amenity)
        
        db.commit()
        db.refresh(new_property)
    
    return new_property


@router.put("/admin/properties/{property_id}", response_model=PropertyResponse, tags=["Admin"])
async def update_property(
    property_id: int,
    property_data: PropertyUpdate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    """
    Update property listing (Admin only)
    """
    property_obj = db.query(Property).filter(Property.id == property_id).first()
    
    if not property_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found"
        )
    
    # Update fields that are provided
    update_data = property_data.model_dump(exclude_unset=True, exclude={'amenity_ids'})
    for field, value in update_data.items():
        setattr(property_obj, field, value)
    
    # Update amenities if provided
    if property_data.amenity_ids is not None:
        # Remove existing amenities
        db.query(PropertyAmenity).filter(PropertyAmenity.property_id == property_id).delete()
        
        # Add new amenities
        for amenity_id in property_data.amenity_ids:
            property_amenity = PropertyAmenity(
                property_id=property_id,
                amenity_id=amenity_id
            )
            db.add(property_amenity)
    
    db.commit()
    db.refresh(property_obj)
    
    return property_obj


@router.delete("/admin/properties/{property_id}", tags=["Admin"], status_code=status.HTTP_204_NO_CONTENT)
async def delete_property(
    property_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    """
    Delete property listing (Admin only)
    """
    property_obj = db.query(Property).filter(Property.id == property_id).first()
    
    if not property_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found"
        )
    
    # Delete associated images from disk
    from app.utils.image import delete_file
    for image in property_obj.images:
        delete_file(image.image_url)
    
    # Delete property (cascade will delete images and amenities)
    db.delete(property_obj)
    db.commit()
    
    return None


@router.get("/admin/dashboard/stats", tags=["Admin"])
async def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    """
    Get dashboard statistics (Admin only)
    """
    from sqlalchemy import func
    
    total_properties = db.query(func.count(Property.id)).scalar()
    available_properties = db.query(func.count(Property.id))\
        .filter(Property.availability == AvailabilityStatus.AVAILABLE).scalar()
    rented_properties = db.query(func.count(Property.id))\
        .filter(Property.availability == AvailabilityStatus.RENTED).scalar()
    sold_properties = db.query(func.count(Property.id))\
        .filter(Property.availability == AvailabilityStatus.SOLD).scalar()
    featured_properties = db.query(func.count(Property.id))\
        .filter(Property.featured == True).scalar()
    
    # Properties by type
    properties_by_type = db.query(
        Property.property_type,
        func.count(Property.id).label('count')
    ).group_by(Property.property_type).all()
    
    # Properties by location
    properties_by_location = db.query(
        Property.location,
        func.count(Property.id).label('count')
    ).group_by(Property.location)\
     .order_by(func.count(Property.id).desc())\
     .limit(10)\
     .all()
    
    return {
        "total_properties": total_properties,
        "available_properties": available_properties,
        "rented_properties": rented_properties,
        "sold_properties": sold_properties,
        "featured_properties": featured_properties,
        "properties_by_type": [
            {"type": prop_type.value, "count": count}
            for prop_type, count in properties_by_type
        ],
        "properties_by_location": [
            {"location": location, "count": count}
            for location, count in properties_by_location
        ]
    }

