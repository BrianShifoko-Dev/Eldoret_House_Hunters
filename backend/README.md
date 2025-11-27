# 🏠 Eldoret House Hunters - Backend API

**Professional FastAPI Backend for Real Estate Management**

![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the API](#-running-the-api)
- [API Documentation](#-api-documentation)
- [Database Setup](#-database-setup)
- [Authentication](#-authentication)
- [Deployment](#-deployment)

---

## ✨ Features

- ✅ **RESTful API** - Well-structured REST API with proper HTTP methods
- ✅ **JWT Authentication** - Secure token-based admin authentication
- ✅ **Property Management** - Full CRUD operations for properties
- ✅ **Image Upload** - Multiple image upload with optimization
- ✅ **Advanced Filtering** - Search, filter, and paginate properties
- ✅ **Admin Dashboard** - Statistics and analytics endpoints
- ✅ **Role-Based Access** - Super Admin, Admin, Editor roles
- ✅ **Auto Documentation** - Swagger UI and ReDoc included
- ✅ **CORS Enabled** - Ready for frontend integration
- ✅ **Production Ready** - Optimized for CPanel deployment

---

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **FastAPI** | Web Framework | 0.115+ |
| **SQLAlchemy** | ORM | 2.0+ |
| **Pydantic** | Validation | 2.10+ |
| **MySQL/MariaDB** | Database | 8.0+ |
| **JWT** | Authentication | - |
| **Pillow** | Image Processing | 11.0+ |
| **Uvicorn** | ASGI Server | 0.32+ |

---

## 📁 Project Structure

```
backend/
├── app/
│   ├── __init__.py              # Package initialization
│   ├── main.py                  # FastAPI application entry
│   ├── config.py                # Configuration & settings
│   ├── database.py              # Database connection
│   │
│   ├── models/                  # SQLAlchemy ORM models
│   │   ├── __init__.py
│   │   ├── property.py          # Property, PropertyImage, PropertyAmenity
│   │   ├── admin.py             # Admin user model
│   │   └── amenity.py           # Amenity model
│   │
│   ├── schemas/                 # Pydantic validation schemas
│   │   ├── __init__.py
│   │   ├── property.py          # Property request/response schemas
│   │   ├── admin.py             # Admin & auth schemas
│   │   └── amenity.py           # Amenity schemas
│   │
│   ├── routes/                  # API endpoints
│   │   ├── __init__.py
│   │   ├── properties.py        # Property endpoints (public & admin)
│   │   ├── admin.py             # Admin authentication
│   │   ├── amenities.py         # Amenity management
│   │   └── upload.py            # Image upload endpoints
│   │
│   └── utils/                   # Utility functions
│       ├── __init__.py
│       ├── auth.py              # JWT & password hashing
│       └── image.py             # Image upload & processing
│
├── database/
│   ├── schema.sql               # MySQL database schema
│   └── ERD.md                   # Database documentation
│
├── uploads/                     # Uploaded images (gitignored)
│   └── .gitkeep
│
├── requirements.txt             # Python dependencies
├── .env.example                 # Environment variables template
├── .gitignore                   # Git ignore rules
└── README.md                    # This file
```

---

## 🚀 Installation

### Prerequisites

- **Python 3.10+**
- **MySQL 8.0+** or **MariaDB 10.x**
- **pip** (Python package manager)
- **virtualenv** (recommended)

### Step 1: Clone Repository

```bash
cd backend
```

### Step 2: Create Virtual Environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies

```bash
pip install -r requirements.txt
```

---

## ⚙️ Configuration

### Step 1: Create Environment File

```bash
cp .env.example .env
```

### Step 2: Update `.env` File

```env
# Database Configuration
DATABASE_URL="mysql+pymysql://username:password@localhost:3306/eldoret_house_hunters"
DB_HOST="localhost"
DB_PORT=3306
DB_NAME="eldoret_house_hunters"
DB_USER="your_username"
DB_PASSWORD="your_password"

# Security
SECRET_KEY="your-super-secret-key-change-this-in-production-min-32-characters"
ALGORITHM="HS256"
ACCESS_TOKEN_EXPIRE_MINUTES=10080  # 7 days

# CORS (Frontend URLs)
ALLOWED_ORIGINS="http://localhost:3000,https://yourdomain.com"
```

**🔐 Generate Secure SECRET_KEY:**
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

---

## 🗄️ Database Setup

### Step 1: Create Database

**Option A: Using MySQL Command Line**
```bash
mysql -u root -p
CREATE DATABASE eldoret_house_hunters CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
exit;
```

**Option B: Using CPanel PHPMyAdmin**
1. Login to CPanel
2. Open PHPMyAdmin
3. Create new database: `eldoret_house_hunters`

### Step 2: Import Schema

```bash
mysql -u username -p eldoret_house_hunters < database/schema.sql
```

**Or via PHPMyAdmin:**
1. Select database
2. Click "Import" tab
3. Choose `database/schema.sql`
4. Click "Go"

### Step 3: Verify Tables

```bash
mysql -u username -p eldoret_house_hunters -e "SHOW TABLES;"
```

**Expected Output:**
```
+--------------------------------+
| Tables_in_eldoret_house_hunters|
+--------------------------------+
| admins                         |
| amenities                      |
| properties                     |
| property_amenities             |
| property_images                |
+--------------------------------+
```

---

## ▶️ Running the API

### Development Mode

```bash
# From backend directory
python -m app.main

# Or with uvicorn directly
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**API will be available at:**
- **API Base:** http://localhost:8000
- **Swagger Docs:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc

### Production Mode

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

---

## 📚 API Documentation

### Swagger UI (Interactive)
Open your browser: **http://localhost:8000/docs**

### ReDoc (Clean Documentation)
Open your browser: **http://localhost:8000/redoc**

---

## 🔑 Authentication

### Default Admin Credentials

**⚠️ CHANGE IMMEDIATELY AFTER FIRST LOGIN!**

```
Username: admin
Password: Admin@123
Email: admin@eldorethouses.com
Role: super_admin
```

### Login Process

**1. Login to Get Token**
```bash
curl -X POST "http://localhost:8000/api/admin/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "Admin@123"
  }'
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer",
  "expires_in": 604800,
  "admin": {
    "id": 1,
    "username": "admin",
    "email": "admin@eldorethouses.com",
    "role": "super_admin"
  }
}
```

**2. Use Token in Protected Endpoints**
```bash
curl -X GET "http://localhost:8000/api/admin/dashboard/stats" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 🌐 API Endpoints

### Public Endpoints (No Authentication)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/properties` | List properties (with filters & pagination) |
| GET | `/api/properties/{id}` | Get single property details |
| GET | `/api/properties/featured/list` | Get featured properties |
| GET | `/api/properties/trending/list` | Get trending properties |
| GET | `/api/neighborhoods` | Get neighborhoods with counts |
| GET | `/api/amenities` | Get all amenities |

### Admin Endpoints (Authentication Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Admin login |
| GET | `/api/admin/me` | Get current admin info |
| POST | `/api/admin/properties` | Create property |
| PUT | `/api/admin/properties/{id}` | Update property |
| DELETE | `/api/admin/properties/{id}` | Delete property |
| POST | `/api/admin/upload/property-image/{id}` | Upload property image |
| GET | `/api/admin/dashboard/stats` | Get dashboard statistics |

---

## 🚀 Deployment (CPanel)

### Step 1: Prepare Files

1. **Zip backend folder**
2. **Upload to CPanel File Manager** (`/home/username/api/`)

### Step 2: Setup Python App

1. **CPanel → Setup Python App**
2. **Python Version:** 3.10+
3. **Application Root:** `/home/username/api/backend`
4. **Application URL:** `api.yourdomain.com`
5. **Application Startup File:** `app/main.py`
6. **Application Entry Point:** `app`

### Step 3: Install Dependencies

```bash
cd /home/username/api/backend
source /home/username/virtualenv/api/3.10/bin/activate
pip install -r requirements.txt
```

### Step 4: Configure Environment

Create `.env` file in backend directory with production values

### Step 5: Restart Application

CPanel → Python App → Restart

**Detailed deployment guide:** See `/deployment/cpanel-setup.md`

---

## 🧪 Testing

### Test API is Running

```bash
curl http://localhost:8000/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "database": "connected",
  "api_version": "1.0.0"
}
```

### Test Database Connection

```bash
curl http://localhost:8000/api/properties?page=1&page_size=5
```

---

## 🐛 Troubleshooting

### Database Connection Error

```
Error: Can't connect to MySQL server
```

**Solution:**
- Verify MySQL is running
- Check database credentials in `.env`
- Ensure database exists
- Check firewall settings

### Import Error: No module named 'app'

```bash
# Ensure you're in the backend directory
cd backend

# Activate virtual environment
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows

# Run from backend directory
python -m app.main
```

### CORS Error in Frontend

Update `ALLOWED_ORIGINS` in `.env`:
```env
ALLOWED_ORIGINS="http://localhost:3000,http://localhost:3001,https://yourdomain.com"
```

---

## 📞 Support

For issues or questions:
- **Email:** admin@eldorethouses.com
- **Documentation:** Check `/docs` endpoint
- **Database Docs:** See `database/ERD.md`

---

## 📄 License

**Proprietary** - Eldoret House Hunters © 2025

---

**Built with ❤️ using FastAPI**

