"""
Admin Schemas
Pydantic models for admin authentication and management
"""

from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional
from datetime import datetime

from app.models.admin import AdminRole


class AdminLogin(BaseModel):
    """Admin login credentials schema"""
    username: str = Field(..., min_length=3, max_length=50, description="Admin username")
    password: str = Field(..., min_length=6, description="Admin password")


class AdminCreate(BaseModel):
    """Schema for creating a new admin user"""
    username: str = Field(..., min_length=3, max_length=50, description="Admin username")
    email: EmailStr = Field(..., description="Admin email address")
    password: str = Field(..., min_length=8, description="Admin password (min 8 characters)")
    role: AdminRole = Field(AdminRole.USER, description="Admin role")
    
    @field_validator('password')
    def validate_password_strength(cls, v):
        """Validate password meets security requirements"""
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        if not any(c.isupper() for c in v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not any(c.islower() for c in v):
            raise ValueError('Password must contain at least one lowercase letter')
        if not any(c.isdigit() for c in v):
            raise ValueError('Password must contain at least one digit')
        return v


class AdminResponse(BaseModel):
    """Schema for admin API responses"""
    id: int
    username: str
    email: str
    role: AdminRole
    created_at: datetime
    last_login: Optional[datetime] = None
    
    class Config:
        from_attributes = True


class TokenResponse(BaseModel):
    """JWT token response schema"""
    access_token: str
    token_type: str = "bearer"
    expires_in: int  # seconds
    admin: AdminResponse


class TokenData(BaseModel):
    """Token payload data"""
    admin_id: Optional[int] = None
    username: Optional[str] = None

