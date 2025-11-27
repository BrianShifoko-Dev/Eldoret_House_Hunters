"""
Application Configuration & Settings
Manages all environment variables and application settings
"""

from pydantic_settings import BaseSettings
from typing import List
from functools import lru_cache


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables
    """
    
    # Application Info
    APP_NAME: str = "Eldoret House Hunters API"
    APP_VERSION: str = "1.0.0"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    # Server Config
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    
    # Database
    DATABASE_URL: str
    DB_HOST: str = "localhost"
    DB_PORT: int = 3306
    DB_NAME: str = "eldoret_house_hunters"
    DB_USER: str
    DB_PASSWORD: str
    
    # Security
    SECRET_KEY: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 10080  # 7 days
    
    # CORS
    ALLOWED_ORIGINS: str = "http://localhost:3000"
    
    @property
    def cors_origins(self) -> List[str]:
        """Parse CORS origins from comma-separated string"""
        return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",")]
    
    # File Uploads
    UPLOAD_DIR: str = "uploads/properties"
    MAX_UPLOAD_SIZE: int = 5242880  # 5MB
    ALLOWED_EXTENSIONS: str = ".jpg,.jpeg,.png,.webp"
    
    @property
    def allowed_extensions_list(self) -> List[str]:
        """Parse allowed extensions"""
        return [ext.strip() for ext in self.ALLOWED_EXTENSIONS.split(",")]
    
    # Image Processing
    IMAGE_MAX_WIDTH: int = 1920
    IMAGE_MAX_HEIGHT: int = 1080
    IMAGE_QUALITY: int = 85
    THUMBNAIL_SIZE: int = 400
    
    # Logging
    ENABLE_LOGGING: bool = True
    LOG_LEVEL: str = "INFO"
    
    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache()
def get_settings() -> Settings:
    """
    Cached settings instance
    Returns the same instance for performance
    """
    return Settings()


# Global settings instance
settings = get_settings()

