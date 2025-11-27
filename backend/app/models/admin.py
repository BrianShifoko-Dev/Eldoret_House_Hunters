"""
Admin User Model
Database model for admin authentication and authorization
"""

from sqlalchemy import Column, Integer, String, DateTime, Enum as SQLEnum
from sqlalchemy.sql import func
from datetime import datetime
import enum

from app.database import Base


class AdminRole(str, enum.Enum):
    """Admin role enumeration"""
    SUPER_ADMIN = "super_admin"
    ADMIN = "admin"
    EDITOR = "editor"


class Admin(Base):
    """
    Admin user model
    Stores admin credentials and permissions
    """
    __tablename__ = "admins"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String(50), unique=True, nullable=False, index=True)
    email = Column(String(100), unique=True, nullable=False, index=True)
    password_hash = Column(String(255), nullable=False)
    role = Column(SQLEnum(AdminRole), nullable=False, default=AdminRole.EDITOR)
    
    # Timestamps
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    last_login = Column(DateTime(timezone=True), nullable=True)
    
    def __repr__(self):
        return f"<Admin(id={self.id}, username='{self.username}', role='{self.role}')>"

