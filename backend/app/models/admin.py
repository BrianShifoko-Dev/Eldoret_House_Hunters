"""
Admin User Model
Database model for admin authentication and authorization
"""

from sqlalchemy import Column, Integer, String, DateTime, Enum as SQLEnum, Text, Boolean, JSON, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import datetime
import enum
from typing import Optional, Dict, Any

from app.database import Base


class AdminRole(str, enum.Enum):
    """Admin role enumeration"""
    SUPER_ADMIN = "super_admin"
    ADMIN = "admin"
    USER = "user"


class Admin(Base):
    """
    Admin user model
    Stores admin credentials, permissions, and user management data
    """
    __tablename__ = "admins"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String(50), unique=True, nullable=False, index=True)
    email = Column(String(100), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(SQLEnum(AdminRole), nullable=False, default=AdminRole.USER, index=True)
    
    # User management fields
    permissions = Column(JSON, nullable=True, comment="Custom permissions for user role")
    instructions = Column(Text, nullable=True, comment="Admin instructions for this user")
    is_active = Column(Boolean, default=True, nullable=False, index=True)
    created_by = Column(Integer, ForeignKey("admins.id", ondelete="SET NULL"), nullable=True, index=True)
    
    # Relationships
    creator = relationship("Admin", remote_side=[id], backref="created_users")
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now(), nullable=False)
    last_login = Column(DateTime(timezone=True), nullable=True)
    
    def __repr__(self):
        return f"<Admin(id={self.id}, username='{self.username}', role='{self.role}', is_active={self.is_active})>"
    
    def to_dict(self, include_sensitive: bool = False) -> Dict[str, Any]:
        """Convert admin to dictionary"""
        data = {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "role": self.role.value if isinstance(self.role, AdminRole) else self.role,
            "permissions": self.permissions or {},
            "instructions": self.instructions,
            "is_active": self.is_active,
            "created_by": self.created_by,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
            "last_login": self.last_login.isoformat() if self.last_login else None,
        }
        
        if include_sensitive:
            data["password_hash"] = self.password_hash
        
        return data

