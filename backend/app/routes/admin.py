"""
Admin Authentication Routes
Login, registration, and admin management endpoints
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta

from app.database import get_db
from app.models.admin import Admin
from app.schemas.admin import AdminLogin, AdminCreate, AdminResponse, TokenResponse
from app.utils.auth import (
    verify_password,
    get_password_hash,
    create_access_token,
    get_current_admin
)
from app.config import settings

router = APIRouter()


@router.post("/admin/login", response_model=TokenResponse, tags=["Authentication"])
async def admin_login(
    credentials: AdminLogin,
    db: Session = Depends(get_db)
):
    """
    Admin login endpoint
    Returns JWT access token on successful authentication
    """
    # Find admin by username
    admin = db.query(Admin).filter(Admin.username == credentials.username).first()
    
    if not admin or not verify_password(credentials.password, admin.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": admin.id, "username": admin.username},
        expires_delta=access_token_expires
    )
    
    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
        expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,  # Convert to seconds
        admin=AdminResponse.model_validate(admin)
    )


@router.post("/admin/register", response_model=AdminResponse, tags=["Authentication"], status_code=status.HTTP_201_CREATED)
async def create_admin(
    admin_data: AdminCreate,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    """
    Create new admin user (Super Admin only)
    Requires authentication with super_admin role
    """
    # Check if current admin is super_admin
    if current_admin.role.value != "super_admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only super admins can create new admin users"
        )
    
    # Check if username already exists
    existing_admin = db.query(Admin).filter(Admin.username == admin_data.username).first()
    if existing_admin:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already registered"
        )
    
    # Check if email already exists
    existing_email = db.query(Admin).filter(Admin.email == admin_data.email).first()
    if existing_email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create new admin
    new_admin = Admin(
        username=admin_data.username,
        email=admin_data.email,
        password_hash=get_password_hash(admin_data.password),
        role=admin_data.role
    )
    
    db.add(new_admin)
    db.commit()
    db.refresh(new_admin)
    
    return new_admin


@router.get("/admin/me", response_model=AdminResponse, tags=["Authentication"])
async def get_current_admin_info(
    current_admin: Admin = Depends(get_current_admin)
):
    """
    Get current authenticated admin information
    """
    return current_admin


@router.get("/admin/users", response_model=list[AdminResponse], tags=["Admin"])
async def list_admins(
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    """
    List all admin users (Admin only)
    """
    admins = db.query(Admin).order_by(Admin.created_at.desc()).all()
    return admins


@router.delete("/admin/users/{admin_id}", tags=["Admin"], status_code=status.HTTP_204_NO_CONTENT)
async def delete_admin(
    admin_id: int,
    db: Session = Depends(get_db),
    current_admin: Admin = Depends(get_current_admin)
):
    """
    Delete admin user (Super Admin only)
    """
    # Check if current admin is super_admin
    if current_admin.role.value != "super_admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only super admins can delete admin users"
        )
    
    # Prevent self-deletion
    if admin_id == current_admin.id:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete your own account"
        )
    
    admin_to_delete = db.query(Admin).filter(Admin.id == admin_id).first()
    
    if not admin_to_delete:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Admin user not found"
        )
    
    db.delete(admin_to_delete)
    db.commit()
    
    return None

