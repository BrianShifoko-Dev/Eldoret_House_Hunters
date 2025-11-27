"""
File Upload Routes
Image upload endpoints for property images
"""

from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models.property import Property, PropertyImage
from app.models.admin import Admin
from app.utils.auth import get_current_admin
from app.utils.image import save_uploaded_file, delete_file

router = APIRouter()


@router.post("/admin/upload/property-image/{property_id}", tags=["Admin"])
async def upload_property_image(
    property_id: int,
    file: UploadFile = File(..., description="Image file"),
    is_primary: bool = Form(False, description="Set as primary image"),
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    """
    Upload image for a property (Admin only)
    """
    # Check if property exists
    property_obj = db.query(Property).filter(Property.id == property_id).first()
    if not property_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found"
        )
    
    # Save uploaded file
    try:
        file_path = await save_uploaded_file(file, subfolder=str(property_id))
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error uploading file: {str(e)}"
        )
    
    # If setting as primary, unset other primary images
    if is_primary:
        db.query(PropertyImage)\
            .filter(PropertyImage.property_id == property_id)\
            .update({"is_primary": False})
    
    # Get next display order
    max_order = db.query(PropertyImage)\
        .filter(PropertyImage.property_id == property_id)\
        .count()
    
    # Create property image record
    property_image = PropertyImage(
        property_id=property_id,
        image_url=file_path,
        is_primary=is_primary,
        display_order=max_order
    )
    
    db.add(property_image)
    db.commit()
    db.refresh(property_image)
    
    return {
        "message": "Image uploaded successfully",
        "image": {
            "id": property_image.id,
            "url": property_image.image_url,
            "is_primary": property_image.is_primary
        }
    }


@router.post("/admin/upload/property-images/{property_id}", tags=["Admin"])
async def upload_multiple_property_images(
    property_id: int,
    files: List[UploadFile] = File(..., description="Image files"),
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    """
    Upload multiple images for a property (Admin only)
    First image is set as primary if no primary exists
    """
    # Check if property exists
    property_obj = db.query(Property).filter(Property.id == property_id).first()
    if not property_obj:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Property not found"
        )
    
    # Check if property has primary image
    has_primary = db.query(PropertyImage)\
        .filter(PropertyImage.property_id == property_id)\
        .filter(PropertyImage.is_primary == True)\
        .first() is not None
    
    # Get current max order
    max_order = db.query(PropertyImage)\
        .filter(PropertyImage.property_id == property_id)\
        .count()
    
    uploaded_images = []
    
    for index, file in enumerate(files):
        try:
            # Save file
            file_path = await save_uploaded_file(file, subfolder=str(property_id))
            
            # First image is primary if none exists
            is_primary = (not has_primary and index == 0)
            
            # Create image record
            property_image = PropertyImage(
                property_id=property_id,
                image_url=file_path,
                is_primary=is_primary,
                display_order=max_order + index
            )
            
            db.add(property_image)
            db.commit()
            db.refresh(property_image)
            
            uploaded_images.append({
                "id": property_image.id,
                "url": property_image.image_url,
                "is_primary": property_image.is_primary
            })
            
        except Exception as e:
            # Continue with other files if one fails
            print(f"Error uploading file {file.filename}: {e}")
            continue
    
    if not uploaded_images:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to upload any images"
        )
    
    return {
        "message": f"Uploaded {len(uploaded_images)} images successfully",
        "images": uploaded_images
    }


@router.delete("/admin/upload/property-image/{image_id}", tags=["Admin"], status_code=status.HTTP_204_NO_CONTENT)
async def delete_property_image(
    image_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    """
    Delete property image (Admin only)
    """
    image = db.query(PropertyImage).filter(PropertyImage.id == image_id).first()
    
    if not image:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Image not found"
        )
    
    # Delete file from disk
    delete_file(image.image_url)
    
    # Delete database record
    db.delete(image)
    db.commit()
    
    return None


@router.put("/admin/upload/property-image/{image_id}/set-primary", tags=["Admin"])
async def set_primary_image(
    image_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    """
    Set image as primary for its property (Admin only)
    """
    image = db.query(PropertyImage).filter(PropertyImage.id == image_id).first()
    
    if not image:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Image not found"
        )
    
    # Unset other primary images for this property
    db.query(PropertyImage)\
        .filter(PropertyImage.property_id == image.property_id)\
        .filter(PropertyImage.id != image_id)\
        .update({"is_primary": False})
    
    # Set this image as primary
    image.is_primary = True
    db.commit()
    
    return {
        "message": "Primary image updated successfully",
        "image_id": image_id
    }

