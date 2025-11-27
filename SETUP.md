# 🚀 Eldoret House Hunters - Setup Guide

**Professional setup guide for getting your real estate platform running**

---

## 📋 What We've Built

✅ **Backend API (FastAPI)**
- Complete REST API with 20+ endpoints
- JWT authentication
- MySQL database integration
- Image upload & processing
- Admin dashboard statistics

✅ **Frontend (Next.js + React)**
- Modern, responsive UI
- Property listings with filtering
- Admin dashboard
- Property management interface
- Image gallery

✅ **Database Schema**
- 5 optimized tables
- Sample data included
- Full-text search support

✅ **Documentation**
- API documentation (Swagger)
- Database ERD
- Deployment guide (CPanel)

---

## 🏗️ Quick Setup (Local Development)

### **Step 1: Backend Setup**

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file (important!)
# Copy .env.example and update with your values
```

**Create `.env` file in `backend/` folder:**

```env
APP_NAME=Eldoret House Hunters API
APP_VERSION=1.0.0
ENVIRONMENT=development
DEBUG=True

DATABASE_URL=mysql+pymysql://root:yourpassword@localhost:3306/eldoret_house_hunters
DB_HOST=localhost
DB_PORT=3306
DB_NAME=eldoret_house_hunters
DB_USER=root
DB_PASSWORD=yourpassword

SECRET_KEY=your-secret-key-min-32-chars-change-this
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080

ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001

UPLOAD_DIR=uploads/properties
MAX_UPLOAD_SIZE=5242880
ALLOWED_EXTENSIONS=.jpg,.jpeg,.png,.webp

IMAGE_MAX_WIDTH=1920
IMAGE_MAX_HEIGHT=1080
IMAGE_QUALITY=85
THUMBNAIL_SIZE=400

ENABLE_LOGGING=True
LOG_LEVEL=INFO
```

**Generate SECRET_KEY:**
```bash
python -c "import secrets; print(secrets.token_urlsafe(32))"
```

**Create Database:**

```bash
# Login to MySQL
mysql -u root -p

# Create database
CREATE DATABASE eldoret_house_hunters CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
exit;

# Import schema
mysql -u root -p eldoret_house_hunters < database/schema.sql
```

**Start Backend:**

```bash
python -m app.main
```

**Backend will be running at:**
- API: http://localhost:8000
- Docs: http://localhost:8000/docs

---

### **Step 2: Frontend Setup**

```bash
# Navigate to frontend (in new terminal)
cd my-next-app

# Install dependencies
npm install

# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local

# Start development server
npm run dev
```

**Frontend will be running at:** http://localhost:3000

---

### **Step 3: Test the Application**

**1. Test Backend:**
```bash
# Health check
curl http://localhost:8000/health

# Get properties
curl http://localhost:8000/api/properties
```

**2. Test Frontend:**
- Visit: http://localhost:3000
- Browse properties
- Try filtering and search

**3. Test Admin Panel:**
- Visit: http://localhost:3000/admin
- **Login:**
  - Username: `admin`
  - Password: `Admin@123`
- ⚠️ **Change password immediately after first login!**

---

## 📱 Testing All Features

### **Public Features:**
1. ✅ Browse properties on homepage
2. ✅ Filter by location, price, type
3. ✅ View property details
4. ✅ View featured properties
5. ✅ Browse neighborhoods
6. ✅ Mobile responsive design

### **Admin Features:**
1. ✅ Admin login
2. ✅ Dashboard with statistics
3. ✅ Create new property
4. ✅ Upload property images
5. ✅ Edit existing properties
6. ✅ Delete properties
7. ✅ Manage amenities

---

## 🌐 Production Deployment (CPanel)

**See detailed guide:** `deployment/cpanel-setup.md`

**Quick Steps:**
1. Create MySQL database in CPanel
2. Import database schema
3. Upload backend files
4. Configure Python app
5. Set environment variables
6. Build & upload frontend
7. Configure domain

**Estimated Time:** 30-45 minutes

---

## 🔐 Security Checklist

Before going live:

- [ ] Change default admin password
- [ ] Generate secure SECRET_KEY
- [ ] Update ALLOWED_ORIGINS in .env
- [ ] Enable HTTPS (SSL certificate)
- [ ] Set DEBUG=False in production
- [ ] Review database user permissions
- [ ] Set proper file permissions (755/644)
- [ ] Enable database backups

---

## 📚 Documentation

| Document | Location | Purpose |
|----------|----------|---------|
| **Main README** | `/README.md` | Project overview |
| **Backend README** | `/backend/README.md` | API documentation |
| **Database Schema** | `/backend/database/ERD.md` | Database structure |
| **CPanel Deployment** | `/deployment/cpanel-setup.md` | Hosting guide |
| **API Documentation** | `http://localhost:8000/docs` | Interactive API docs |

---

## 🎯 Next Steps

### **Immediate:**
1. ✅ Test all features locally
2. ✅ Change default admin password
3. ✅ Add your own property images
4. ✅ Create test property listings
5. ✅ Verify all CRUD operations

### **Before Deployment:**
1. ✅ Review security settings
2. ✅ Update branding/colors if needed
3. ✅ Add your logo to `public/` folder
4. ✅ Test on mobile devices
5. ✅ Prepare CPanel credentials

### **After Deployment:**
1. ✅ Add real property data
2. ✅ Set up SSL certificate
3. ✅ Configure email notifications (optional)
4. ✅ Set up backups
5. ✅ Monitor performance

---

## 🐛 Common Issues & Solutions

### **Issue: Database connection error**

```
Error: Can't connect to MySQL server
```

**Solution:**
- Verify MySQL is running
- Check credentials in `.env`
- Ensure database exists
- Test connection: `mysql -u root -p`

### **Issue: Module not found errors**

```
ModuleNotFoundError: No module named 'fastapi'
```

**Solution:**
```bash
# Ensure virtual environment is activated
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows

# Reinstall dependencies
pip install -r requirements.txt
```

### **Issue: CORS errors in browser**

```
Access to fetch blocked by CORS policy
```

**Solution:**
- Update `ALLOWED_ORIGINS` in backend `.env`
- Include your frontend URL
- Restart backend server

### **Issue: Images not displaying**

**Solution:**
- Check `UPLOAD_DIR` exists
- Verify file permissions (755)
- Check image paths in database
- Ensure API_URL is correct in frontend

---

## 📞 Support

Need help? Check these resources:

1. **API Documentation:** http://localhost:8000/docs
2. **Database Schema:** `/backend/database/ERD.md`
3. **Deployment Guide:** `/deployment/cpanel-setup.md`
4. **GitHub Issues:** [Report a bug](https://github.com/BrianShifoko-Dev/Eldoret_House_Hunters/issues)

---

## ✅ Setup Verification Checklist

**Backend:**
- [ ] Virtual environment created
- [ ] Dependencies installed
- [ ] `.env` file configured
- [ ] Database created
- [ ] Schema imported
- [ ] Backend running on port 8000
- [ ] `/health` endpoint returns "healthy"
- [ ] Swagger docs accessible at `/docs`

**Frontend:**
- [ ] Dependencies installed
- [ ] `.env.local` file created
- [ ] Frontend running on port 3000
- [ ] Homepage loads successfully
- [ ] Properties display
- [ ] Filtering works
- [ ] Mobile responsive

**Admin:**
- [ ] Can login with default credentials
- [ ] Dashboard loads with statistics
- [ ] Can create new property
- [ ] Can upload images
- [ ] Can edit properties
- [ ] Can delete properties

**Database:**
- [ ] Database created
- [ ] All 5 tables exist
- [ ] Default admin user exists
- [ ] Amenities loaded
- [ ] Sample properties created

---

## 🎉 You're All Set!

Your professional real estate platform is ready! 

**What you have:**
- ✅ Production-ready backend API
- ✅ Modern, responsive frontend
- ✅ Secure admin panel
- ✅ Full CRUD operations
- ✅ Image management
- ✅ Advanced filtering
- ✅ Mobile-optimized
- ✅ Deployment-ready

**Ready to win tenders!** 🚀

---

**Built with ❤️ for Eldoret House Hunters**

