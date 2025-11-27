"""
Eldoret House Hunters - FastAPI Main Application
Professional Real Estate Management API
"""

from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import logging
import time
from pathlib import Path

from app.config import settings
from app.database import init_db, check_db_connection
from app.routes import properties, admin, amenities, upload

# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.LOG_LEVEL),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Startup and shutdown events
    """
    # Startup
    logger.info("🚀 Starting Eldoret House Hunters API...")
    
    # Check database connection (non-blocking)
    try:
        if check_db_connection():
            # Initialize database tables
            try:
                init_db()
                logger.info("✅ Database initialized successfully")
            except Exception as e:
                logger.error(f"❌ Database initialization failed: {e}")
        else:
            logger.warning("⚠️  Database connection failed - API will start but database operations may fail")
    except Exception as e:
        logger.warning(f"⚠️  Could not check database connection: {e} - API will start but database operations may fail")
    
    # Ensure upload directory exists
    upload_path = Path(settings.UPLOAD_DIR)
    upload_path.mkdir(parents=True, exist_ok=True)
    logger.info(f"✅ Upload directory ready: {settings.UPLOAD_DIR}")
    
    logger.info(f"✅ API running on {settings.HOST}:{settings.PORT}")
    logger.info(f"📝 Documentation available at /docs")
    
    yield
    
    # Shutdown
    logger.info("👋 Shutting down Eldoret House Hunters API...")


# Create FastAPI application
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="""
    **Eldoret House Hunters** - Professional Real Estate Management Platform
    
    ## Features
    
    * 🏠 **Property Management** - Browse and manage property listings
    * 🔐 **Admin Authentication** - Secure JWT-based authentication
    * 📸 **Image Upload** - Property image management
    * 🎯 **Advanced Filtering** - Search and filter properties
    * 📊 **Analytics Dashboard** - Property statistics and insights
    
    ## Authentication
    
    Protected endpoints require Bearer token authentication.
    Login via `/api/admin/login` to receive your access token.
    """,
    docs_url="/docs",
    redoc_url="/redoc",
    openapi_url="/openapi.json",
    lifespan=lifespan
)


# ============================================
# MIDDLEWARE
# ============================================

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)


# Request Logging Middleware
@app.middleware("http")
async def log_requests(request: Request, call_next):
    """
    Log all incoming requests with timing
    """
    start_time = time.time()
    
    # Log request
    logger.info(f"➡️  {request.method} {request.url.path}")
    
    # Process request
    response = await call_next(request)
    
    # Calculate processing time
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    
    # Log response
    logger.info(f"⬅️  {request.method} {request.url.path} - {response.status_code} ({process_time:.3f}s)")
    
    return response


# ============================================
# STATIC FILES
# ============================================

# Mount uploads directory
upload_path = Path(settings.UPLOAD_DIR)
if upload_path.exists():
    app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")


# ============================================
# API ROUTES
# ============================================

# Include routers with /api prefix
app.include_router(properties.router, prefix="/api", tags=["Properties"])
app.include_router(admin.router, prefix="/api", tags=["Admin"])
app.include_router(amenities.router, prefix="/api", tags=["Amenities"])
app.include_router(upload.router, prefix="/api", tags=["Upload"])


# ============================================
# ROOT & HEALTH CHECK ENDPOINTS
# ============================================

@app.get("/", tags=["Root"])
async def root():
    """
    Root endpoint - API information
    """
    return {
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "status": "running",
        "environment": settings.ENVIRONMENT,
        "documentation": "/docs",
        "description": "Professional Real Estate Management API for Eldoret House Hunters"
    }


@app.get("/health", tags=["Health"])
async def health_check():
    """
    Health check endpoint for monitoring
    """
    db_status = check_db_connection()
    
    return {
        "status": "healthy" if db_status else "unhealthy",
        "database": "connected" if db_status else "disconnected",
        "api_version": settings.APP_VERSION
    }


@app.get("/api/info", tags=["Info"])
async def api_info():
    """
    API information and statistics
    """
    return {
        "app_name": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "environment": settings.ENVIRONMENT,
        "endpoints": {
            "properties": "/api/properties",
            "admin_login": "/api/admin/login",
            "amenities": "/api/amenities",
            "dashboard": "/api/admin/dashboard/stats"
        },
        "features": [
            "Property Listings Management",
            "JWT Authentication",
            "Image Upload & Processing",
            "Advanced Search & Filtering",
            "Analytics Dashboard",
            "RESTful API"
        ]
    }


# ============================================
# ERROR HANDLERS
# ============================================

@app.exception_handler(404)
async def not_found_handler(request: Request, exc):
    """
    Custom 404 error handler
    """
    return JSONResponse(
        status_code=status.HTTP_404_NOT_FOUND,
        content={
            "error": "Not Found",
            "message": f"The requested resource '{request.url.path}' was not found",
            "status_code": 404
        }
    )


@app.exception_handler(500)
async def internal_error_handler(request: Request, exc):
    """
    Custom 500 error handler
    """
    logger.error(f"Internal server error: {exc}")
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": "Internal Server Error",
            "message": "An unexpected error occurred. Please try again later.",
            "status_code": 500
        }
    )


# ============================================
# ENTRY POINT
# ============================================

if __name__ == "__main__":
    import uvicorn
    
    uvicorn.run(
        "app.main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=settings.DEBUG,
        log_level=settings.LOG_LEVEL.lower()
    )

