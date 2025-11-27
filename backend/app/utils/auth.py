"""
Authentication Utilities
JWT token generation, password hashing, and authentication
"""

from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.config import settings
from app.database import get_db
from app.models.admin import Admin
from app.schemas.admin import TokenData

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Bearer token security
security = HTTPBearer()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain password against a hashed password
    
    Args:
        plain_password: Plain text password
        hashed_password: Hashed password from database
        
    Returns:
        True if password matches, False otherwise
    """
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password: str) -> str:
    """
    Hash a password for storage
    
    Args:
        password: Plain text password
        
    Returns:
        Hashed password string
    """
    return pwd_context.hash(password)


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Create a JWT access token
    
    Args:
        data: Dictionary of data to encode in token
        expires_delta: Optional custom expiration time
        
    Returns:
        Encoded JWT token string
    """
    to_encode = data.copy()
    
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    
    return encoded_jwt


def decode_token(token: str) -> TokenData:
    """
    Decode and validate JWT token
    
    Args:
        token: JWT token string
        
    Returns:
        TokenData object with token payload
        
    Raises:
        HTTPException: If token is invalid or expired
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        admin_id: int = payload.get("sub")
        username: str = payload.get("username")
        
        if admin_id is None:
            raise credentials_exception
            
        return TokenData(admin_id=admin_id, username=username)
    except JWTError:
        raise credentials_exception


async def get_current_admin(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> Admin:
    """
    Get current authenticated admin from JWT token
    
    Args:
        credentials: Bearer token from request header
        db: Database session
        
    Returns:
        Admin object of authenticated user
        
    Raises:
        HTTPException: If authentication fails
    """
    token = credentials.credentials
    token_data = decode_token(token)
    
    admin = db.query(Admin).filter(Admin.id == token_data.admin_id).first()
    
    if admin is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Admin user not found",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    # Update last login timestamp
    admin.last_login = datetime.utcnow()
    db.commit()
    
    return admin


async def require_admin_role(
    current_admin: Admin = Depends(get_current_admin),
    required_role: str = "admin"
):
    """
    Dependency to require specific admin role
    
    Args:
        current_admin: Current authenticated admin
        required_role: Required role (admin or super_admin)
        
    Raises:
        HTTPException: If admin doesn't have required role
    """
    if current_admin.role.value not in [required_role, "super_admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"Admin role '{required_role}' or higher required"
        )
    
    return current_admin

