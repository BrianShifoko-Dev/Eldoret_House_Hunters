"""
Image Upload & Processing Utilities
Handle file uploads, image resizing, and optimization
"""

import os
import uuid
from pathlib import Path
from typing import Optional
from PIL import Image
from fastapi import UploadFile, HTTPException, status

from app.config import settings


def ensure_upload_dir() -> Path:
    """
    Ensure upload directory exists
    Creates directory if it doesn't exist
    
    Returns:
        Path object for upload directory
    """
    upload_path = Path(settings.UPLOAD_DIR)
    upload_path.mkdir(parents=True, exist_ok=True)
    return upload_path


def validate_image_file(file: UploadFile) -> None:
    """
    Validate uploaded image file
    
    Args:
        file: Uploaded file object
        
    Raises:
        HTTPException: If file is invalid
    """
    # Check file extension
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in settings.allowed_extensions_list:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid file type. Allowed: {', '.join(settings.allowed_extensions_list)}"
        )
    
    # Check file size (read first chunk)
    file.file.seek(0, 2)  # Seek to end
    file_size = file.file.tell()
    file.file.seek(0)  # Reset to beginning
    
    if file_size > settings.MAX_UPLOAD_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File too large. Maximum size: {settings.MAX_UPLOAD_SIZE / (1024*1024):.1f}MB"
        )


async def save_uploaded_file(file: UploadFile, subfolder: str = "") -> str:
    """
    Save uploaded file to disk
    
    Args:
        file: Uploaded file object
        subfolder: Optional subfolder within upload directory
        
    Returns:
        Relative path to saved file
        
    Raises:
        HTTPException: If file save fails
    """
    # Validate file
    validate_image_file(file)
    
    # Generate unique filename
    file_ext = os.path.splitext(file.filename)[1].lower()
    unique_filename = f"{uuid.uuid4()}{file_ext}"
    
    # Create full path
    upload_dir = ensure_upload_dir()
    if subfolder:
        upload_dir = upload_dir / subfolder
        upload_dir.mkdir(parents=True, exist_ok=True)
    
    file_path = upload_dir / unique_filename
    
    try:
        # Save file
        contents = await file.read()
        with open(file_path, "wb") as f:
            f.write(contents)
        
        # Optimize image
        resize_image(str(file_path))
        
        # Return relative path
        if subfolder:
            return f"{settings.UPLOAD_DIR}/{subfolder}/{unique_filename}"
        return f"{settings.UPLOAD_DIR}/{unique_filename}"
        
    except Exception as e:
        # Clean up on error
        if file_path.exists():
            file_path.unlink()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error saving file: {str(e)}"
        )


def resize_image(image_path: str) -> None:
    """
    Resize and optimize image
    
    Args:
        image_path: Path to image file
    """
    try:
        with Image.open(image_path) as img:
            # Convert RGBA to RGB if necessary
            if img.mode == 'RGBA':
                img = img.convert('RGB')
            
            # Resize if larger than max dimensions
            if img.width > settings.IMAGE_MAX_WIDTH or img.height > settings.IMAGE_MAX_HEIGHT:
                img.thumbnail(
                    (settings.IMAGE_MAX_WIDTH, settings.IMAGE_MAX_HEIGHT),
                    Image.Resampling.LANCZOS
                )
            
            # Save with optimization
            img.save(
                image_path,
                format='JPEG',
                quality=settings.IMAGE_QUALITY,
                optimize=True
            )
    except Exception as e:
        print(f"Error resizing image {image_path}: {e}")


def create_thumbnail(image_path: str, thumbnail_path: str) -> None:
    """
    Create thumbnail version of image
    
    Args:
        image_path: Path to original image
        thumbnail_path: Path to save thumbnail
    """
    try:
        with Image.open(image_path) as img:
            if img.mode == 'RGBA':
                img = img.convert('RGB')
            
            img.thumbnail(
                (settings.THUMBNAIL_SIZE, settings.THUMBNAIL_SIZE),
                Image.Resampling.LANCZOS
            )
            
            img.save(
                thumbnail_path,
                format='JPEG',
                quality=settings.IMAGE_QUALITY,
                optimize=True
            )
    except Exception as e:
        print(f"Error creating thumbnail: {e}")


def delete_file(file_path: str) -> bool:
    """
    Delete a file from disk
    
    Args:
        file_path: Path to file
        
    Returns:
        True if deleted successfully, False otherwise
    """
    try:
        path = Path(file_path)
        if path.exists():
            path.unlink()
            return True
        return False
    except Exception as e:
        print(f"Error deleting file {file_path}: {e}")
        return False

