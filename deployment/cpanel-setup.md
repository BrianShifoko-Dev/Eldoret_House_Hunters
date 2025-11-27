# 🚀 CPanel Deployment Guide - Eldoret House Hunters

**Complete step-by-step guide for deploying to CPanel hosting**

---

## 📋 Prerequisites

Before starting deployment, ensure you have:

- ✅ CPanel hosting account with:
  - **Python 3.10+** support
  - **MySQL 8.0+** or **MariaDB 10.x**
  - **SSH access** (recommended) or File Manager
- ✅ Domain or subdomain configured
- ✅ Project files ready for upload
- ✅ Database credentials

---

## 🗄️ STEP 1: Database Setup

### 1.1 Create MySQL Database

**Via CPanel:**

1. **Login to CPanel**
2. Navigate to **"MySQL® Databases"**
3. **Create New Database:**
   - Database Name: `username_eldoret_houses`
   - Click **"Create Database"**

4. **Create Database User:**
   - Username: `username_dbuser`
   - Password: Generate secure password (save it!)
   - Click **"Create User"**

5. **Add User to Database:**
   - User: `username_dbuser`
   - Database: `username_eldoret_houses`
   - Privileges: **ALL PRIVILEGES**
   - Click **"Add"**

### 1.2 Import Database Schema

**Via PHPMyAdmin:**

1. CPanel → **"phpMyAdmin"**
2. Select database: `username_eldoret_houses`
3. Click **"Import"** tab
4. **Choose File:** Upload `backend/database/schema.sql`
5. Click **"Go"**
6. **Verify:** Check that 5 tables are created:
   - admins
   - properties
   - property_images
   - amenities
   - property_amenities

**Via SSH (Alternative):**

```bash
mysql -u username_dbuser -p username_eldoret_houses < backend/database/schema.sql
```

### 1.3 Verify Database

```sql
USE username_eldoret_houses;
SHOW TABLES;
SELECT * FROM admins;  -- Should show default admin
```

---

## 📦 STEP 2: Upload Backend Files

### Option A: Via File Manager

1. **Compress backend folder** on your computer:
   ```
   backend.zip
   ```

2. **Upload to CPanel:**
   - CPanel → **"File Manager"**
   - Navigate to: `/home/username/`
   - Create folder: `api`
   - Upload `backend.zip`
   - **Extract** the zip file
   - You should have: `/home/username/api/backend/`

3. **Set Permissions:**
   - Folder permissions: `755`
   - File permissions: `644`

### Option B: Via SSH (Recommended)

```bash
# Connect via SSH
ssh username@yourdomain.com

# Create directory
mkdir -p ~/api
cd ~/api

# Upload via SCP from your computer
scp -r /path/to/backend username@yourdomain.com:~/api/

# Or use git
git clone https://github.com/BrianShifoko-Dev/Eldoret_House_Hunters.git
cd Eldoret_House_Hunters
mv backend ~/api/
```

---

## 🐍 STEP 3: Setup Python Application

### 3.1 Create Python App in CPanel

1. CPanel → **"Setup Python App"**

2. **Click "Create Application"**

3. **Configure Application:**
   ```
   Python Version: 3.10 or higher
   Application root: /home/username/api/backend
   Application URL: api.yourdomain.com (or subdirectory)
   Application startup file: app/main.py
   Application entry point: app
   Passenger log file: (leave default)
   ```

4. **Click "Create"**

### 3.2 Configure Environment Variables

**In Python App settings, add:**

```env
APP_NAME=Eldoret House Hunters API
APP_VERSION=1.0.0
ENVIRONMENT=production
DEBUG=False

DATABASE_URL=mysql+pymysql://username_dbuser:YOUR_PASSWORD@localhost:3306/username_eldoret_houses
DB_HOST=localhost
DB_PORT=3306
DB_NAME=username_eldoret_houses
DB_USER=username_dbuser
DB_PASSWORD=YOUR_DB_PASSWORD

SECRET_KEY=GENERATE_SECURE_KEY_32_CHARS_MINIMUM
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080

ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com

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

**🔐 Generate SECRET_KEY:**

```bash
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
```

### 3.3 Create .env File (Alternative Method)

**Via SSH:**

```bash
cd ~/api/backend
nano .env
```

Paste the environment variables above, then:
- Press `Ctrl + X`
- Press `Y`
- Press `Enter`

---

## 📚 STEP 4: Install Dependencies

### Via CPanel Python App Interface

1. **Click "Run Pip Install"**
2. Wait for installation to complete (may take 2-5 minutes)

### Via SSH (Alternative)

```bash
cd ~/api/backend
source /home/username/virtualenv/api/3.10/bin/activate
pip install -r requirements.txt
```

### Verify Installation

```bash
pip list | grep -i fastapi
pip list | grep -i sqlalchemy
```

---

## 🌐 STEP 5: Configure Domain/Subdomain

### Option A: Subdomain (Recommended)

1. CPanel → **"Subdomains"**
2. **Create subdomain:**
   - Subdomain: `api`
   - Domain: `yourdomain.com`
   - Document Root: `/home/username/api/backend/public`
3. Click **"Create"**

### Option B: Subdirectory

Your API will be accessible at: `https://yourdomain.com/api`

---

## ⚙️ STEP 6: Configure .htaccess

**Create/Edit `.htaccess` in Python app root:**

```apache
# /home/username/api/backend/.htaccess

# Enable RewriteEngine
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Passenger Configuration
PassengerEnabled On
PassengerAppRoot /home/username/api/backend
PassengerPython /home/username/virtualenv/api/3.10/bin/python3
PassengerStartupFile app/main.py
PassengerAppType wsgi

# CORS Headers
Header always set Access-Control-Allow-Origin "*"
Header always set Access-Control-Allow-Methods "GET, POST, PUT, DELETE, OPTIONS"
Header always set Access-Control-Allow-Headers "Content-Type, Authorization"

# Static Files (uploads)
<IfModule mod_alias.c>
    Alias /uploads /home/username/api/backend/uploads
</IfModule>

<Directory /home/username/api/backend/uploads>
    Options -Indexes +FollowSymLinks
    AllowOverride None
    Require all granted
</Directory>
```

---

## 📁 STEP 7: Create Uploads Directory

```bash
cd ~/api/backend
mkdir -p uploads/properties
chmod 755 uploads
chmod 755 uploads/properties
```

**Via File Manager:**
1. Navigate to `/home/username/api/backend/`
2. Create folder: `uploads`
3. Inside `uploads`, create folder: `properties`
4. Set permissions: `755` for both folders

---

## 🔄 STEP 8: Restart Application

### Via CPanel

1. **Setup Python App** → Find your app
2. Click **"Restart"** button
3. Wait for restart to complete

### Via SSH

```bash
cd ~/api/backend
touch tmp/restart.txt
```

---

## ✅ STEP 9: Verify Deployment

### Test API Health

Open browser or use curl:

```bash
curl https://api.yourdomain.com/health
```

**Expected Response:**
```json
{
  "status": "healthy",
  "database": "connected",
  "api_version": "1.0.0"
}
```

### Test API Documentation

**Swagger UI:**
```
https://api.yourdomain.com/docs
```

### Test Database Connection

```bash
curl https://api.yourdomain.com/api/properties?page=1&page_size=5
```

Should return sample properties from database.

### Test Admin Login

```bash
curl -X POST "https://api.yourdomain.com/api/admin/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "Admin@123"
  }'
```

**⚠️ IMPORTANT: Change default password immediately!**

---

## 🎨 STEP 10: Deploy Frontend

### Option A: Same CPanel Account

1. **Upload Next.js build:**
   ```bash
   cd frontend
   npm run build
   # Upload 'out' folder to /home/username/public_html/
   ```

2. **Configure API URL:**
   - Create `.env.production` in frontend:
   ```env
   NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
   ```

### Option B: Separate Hosting

Configure CORS in backend `.env`:
```env
ALLOWED_ORIGINS=https://yourfrontend.com
```

---

## 🐛 Troubleshooting

### Issue 1: Application Not Starting

**Check Python App logs:**
- CPanel → Setup Python App → Click on app → View Logs

**Common causes:**
- Missing `.env` file
- Wrong database credentials
- Missing dependencies

**Solution:**
```bash
cd ~/api/backend
source /home/username/virtualenv/api/3.10/bin/activate
python -m app.main  # Test locally
```

### Issue 2: Database Connection Error

**Error:** `Can't connect to MySQL server`

**Solutions:**
1. Verify database exists
2. Check credentials in `.env`
3. Ensure user has privileges:
   ```sql
   GRANT ALL PRIVILEGES ON username_eldoret_houses.* TO 'username_dbuser'@'localhost';
   FLUSH PRIVILEGES;
   ```

### Issue 3: Import Errors

**Error:** `ModuleNotFoundError: No module named 'fastapi'`

**Solution:**
```bash
cd ~/api/backend
source /home/username/virtualenv/api/3.10/bin/activate
pip install -r requirements.txt
touch tmp/restart.txt
```

### Issue 4: Permission Denied on Uploads

**Error:** `Permission denied: uploads/properties`

**Solution:**
```bash
chmod -R 755 ~/api/backend/uploads
```

### Issue 5: 500 Internal Server Error

**Check error logs:**
```bash
tail -f ~/api/backend/logs/error.log
# Or check CPanel Error Logs
```

**Common causes:**
- Python syntax errors
- Missing environment variables
- Database connection issues

### Issue 6: CORS Errors

**Update `.env`:**
```env
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com,http://localhost:3000
```

Restart application after changes.

---

## 🔒 Security Checklist

- [ ] Changed default admin password
- [ ] Generated secure `SECRET_KEY`
- [ ] Database user has limited privileges
- [ ] HTTPS enabled (SSL certificate)
- [ ] `.env` file has restricted permissions (600)
- [ ] Uploads directory has safe permissions (755)
- [ ] Debug mode disabled in production
- [ ] CORS configured properly
- [ ] Regular backups enabled

---

## 📊 Performance Optimization

### Enable Gzip Compression

Add to `.htaccess`:
```apache
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE application/json
    AddOutputFilterByType DEFLATE text/html text/plain text/xml
</IfModule>
```

### Enable Caching

```apache
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
</IfModule>
```

### Database Optimization

```sql
-- Optimize tables monthly
OPTIMIZE TABLE properties;
OPTIMIZE TABLE property_images;
OPTIMIZE TABLE amenities;
```

---

## 🔄 Updating Application

### Via SSH

```bash
cd ~/api/backend
git pull origin main  # If using git
pip install -r requirements.txt --upgrade
touch tmp/restart.txt
```

### Via File Manager

1. Upload new files
2. Replace old files
3. Restart application via CPanel

---

## 📞 Support Resources

- **CPanel Documentation:** Your hosting provider's docs
- **FastAPI Deployment:** https://fastapi.tiangolo.com/deployment/
- **Passenger Documentation:** https://www.phusionpassenger.com/docs/

---

## ✅ Deployment Complete!

Your API should now be live at:
- **API:** `https://api.yourdomain.com`
- **Docs:** `https://api.yourdomain.com/docs`
- **Health:** `https://api.yourdomain.com/health`

**Next Steps:**
1. Change default admin password
2. Upload property images
3. Create property listings via admin panel
4. Connect frontend to API
5. Test all features thoroughly

---

**Deployed with ❤️ on CPanel**

