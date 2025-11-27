"""
Amenity Routes
Endpoints for managing property amenities
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.amenity import Amenity
from app.models.admin import Admin
from app.schemas.amenity import AmenityCreate, AmenityUpdate, AmenityResponse
from app.utils.auth import get_current_admin

router = APIRouter()


@router.get("/amenities", response_model=List[AmenityResponse], tags=["Public"])
async def get_amenities(
    db: Session = Depends(get_db)
):
    """
    Get all available amenities (Public)
    """
    amenities = db.query(Amenity).order_by(Amenity.name).all()
    return amenities


@router.post("/admin/amenities", response_model=AmenityResponse, tags=["Admin"], status_code=status.HTTP_201_CREATED)
async def create_amenity(
    amenity_data: AmenityCreate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    """
    Create new amenity (Admin only)
    """
    # Check if amenity already exists
    existing = db.query(Amenity).filter(Amenity.name == amenity_data.name).first()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Amenity with this name already exists"
        )
    
    new_amenity = Amenity(
        name=amenity_data.name,
        icon=amenity_data.icon
    )
    
    db.add(new_amenity)
    db.commit()
    db.refresh(new_amenity)
    
    return new_amenity


@router.put("/admin/amenities/{amenity_id}", response_model=AmenityResponse, tags=["Admin"])
async def update_amenity(
    amenity_id: int,
    amenity_data: AmenityUpdate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    """
    Update amenity (Admin only)
    """
    amenity = db.query(Amenity).filter(Amenity.id == amenity_id).first()
    
    if not amenity:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Amenity not found"
        )
    
    # Update fields
    update_data = amenity_data.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(amenity, field, value)
    
    db.commit()
    db.refresh(amenity)
    
    return amenity


@router.delete("/admin/amenities/{amenity_id}", tags=["Admin"], status_code=status.HTTP_204_NO_CONTENT)
async def delete_amenity(
    amenity_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    """
    Delete amenity (Admin only)
    """
    amenity = db.query(Amenity).filter(Amenity.id == amenity_id).first()
    
    if not amenity:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Amenity not found"
        )
    
    db.delete(amenity)
    db.commit()
    
    return None

