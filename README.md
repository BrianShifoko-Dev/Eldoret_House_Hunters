# 🏠 Eldoret House Hunters

**Professional Full-Stack Real Estate Management Platform**

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)

---

## 📖 Overview

**Eldoret House Hunters** is a production-ready, full-stack real estate management platform designed for property listings, rental management, and real estate operations in Eldoret, Kenya. Built with modern technologies and best practices, it offers a seamless experience for both users and administrators.

### 🎯 Key Features

#### **For Users (Public)**
- 🏘️ **Browse Properties** - View rental and sale properties with beautiful UI
- 🔍 **Advanced Search** - Filter by location, price, type, bedrooms, and more
- 📱 **Mobile Responsive** - Fully optimized for mobile and desktop
- 🖼️ **Image Galleries** - High-quality property images with lightbox view
- 📍 **Location-Based** - Find properties in specific neighborhoods
- ⭐ **Featured Listings** - Highlighted premium properties
- 💬 **WhatsApp Integration** - Direct contact with property managers

#### **For Administrators**
- 🔐 **Secure Admin Panel** - JWT-based authentication
- ➕ **Property Management** - Full CRUD operations
- 📸 **Image Upload** - Multi-image upload with optimization
- 📊 **Dashboard Analytics** - Property statistics and insights
- 🏷️ **Amenity Management** - Manage property features
- 👥 **User Management** - Role-based admin access (Super Admin, Admin, Editor)
- 📝 **Content Management** - Easy-to-use interface

---

## 🛠️ Technology Stack

### **Frontend**
| Technology | Purpose | Version |
|------------|---------|---------|
| **Next.js** | React Framework | 15.1+ |
| **React** | UI Library | 18.3+ |
| **TypeScript** | Type Safety | 5.x |
| **Tailwind CSS** | Styling | 3.4+ |
| **shadcn/ui** | UI Components | Latest |
| **Lucide Icons** | Icons | Latest |

### **Backend**
| Technology | Purpose | Version |
|------------|---------|---------|
| **FastAPI** | API Framework | 0.115+ |
| **Python** | Programming Language | 3.10+ |
| **SQLAlchemy** | ORM | 2.0+ |
| **Pydantic** | Data Validation | 2.10+ |
| **JWT** | Authentication | - |
| **Pillow** | Image Processing | 11.0+ |

### **Database**
| Technology | Purpose |
|------------|---------|
| **MySQL 8.0** | Primary Database |
| **PHPMyAdmin** | Database Management |

### **Deployment**
| Platform | Purpose |
|----------|---------|
| **CPanel** | Web Hosting |
| **Passenger** | Python WSGI Server |

---

## 📁 Project Structure

```
eldoret-house-hunters/
├── frontend/                          # Next.js Application
│   ├── app/                          # App router pages
│   │   ├── page.tsx                  # Home page
│   │   ├── layout.tsx                # Root layout
│   │   ├── buy/                      # Buy properties page
│   │   ├── rent/                     # Rent properties page
│   │   ├── sell/                     # Sell property page
│   │   ├── property/[id]/            # Property details
│   │   ├── admin/                    # Admin dashboard (NEW)
│   │   ├── community/                # Community page
│   │   ├── neighborhoods/            # Neighborhoods
│   │   ├── gallery/                  # Gallery
│   │   └── resources/                # Resources
│   │
│   ├── src/
│   │   ├── components/               # React components
│   │   │   ├── ui/                   # shadcn/ui components
│   │   │   ├── Navbar.tsx            # Navigation bar
│   │   │   ├── Hero.tsx              # Hero section
│   │   │   ├── PropertyCard.tsx      # Property card
│   │   │   ├── FilterBar.tsx         # Filter controls
│   │   │   └── Footer.tsx            # Footer
│   │   │
│   │   ├── services/                 # API service layer (NEW)
│   │   │   └── api.ts                # API client
│   │   │
│   │   └── types/                    # TypeScript types
│   │       └── property.ts           # Property types
│   │
│   ├── public/                       # Static assets
│   ├── package.json                  # Dependencies
│   └── tailwind.config.ts            # Tailwind config
│
├── backend/                          # FastAPI Backend
│   ├── app/
│   │   ├── main.py                   # FastAPI app
│   │   ├── config.py                 # Configuration
│   │   ├── database.py               # Database connection
│   │   ├── models/                   # SQLAlchemy models
│   │   ├── schemas/                  # Pydantic schemas
│   │   ├── routes/                   # API endpoints
│   │   └── utils/                    # Utilities
│   │
│   ├── database/
│   │   ├── schema.sql                # MySQL schema
│   │   └── ERD.md                    # Database docs
│   │
│   ├── uploads/                      # Property images
│   ├── requirements.txt              # Python dependencies
│   └── README.md                     # Backend docs
│
├── deployment/
│   └── cpanel-setup.md              # Deployment guide
│
└── README.md                        # This file
```

---

## 🚀 Quick Start

### **Prerequisites**

**Frontend:**
- Node.js 18+ and npm
- Git

**Backend:**
- Python 3.10+
- MySQL 8.0+ or MariaDB 10.x
- pip (Python package manager)

### **1. Clone Repository**

```bash
git clone https://github.com/BrianShifoko-Dev/Eldoret_House_Hunters.git
cd Eldoret_House_Hunters
```

### **2. Backend Setup**

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env with your database credentials

# Create database
mysql -u root -p
CREATE DATABASE eldoret_house_hunters;
exit;

# Import schema
mysql -u root -p eldoret_house_hunters < database/schema.sql

# Run backend
python -m app.main
```

**Backend will be available at:** http://localhost:8000  
**API Documentation:** http://localhost:8000/docs

### **3. Frontend Setup**

```bash
cd ../my-next-app

# Install dependencies
npm install

# Create environment file
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local

# Run development server
npm run dev
```

**Frontend will be available at:** http://localhost:3000

---

## 🔑 Default Admin Credentials

**⚠️ IMPORTANT: Change immediately after first login!**

```
Username: admin
Password: Admin@123
Email: admin@eldorethouses.com
```

**Login URL:** `http://localhost:3000/admin`

---

## 📚 Documentation

### **API Documentation**
- **Swagger UI:** http://localhost:8000/docs
- **ReDoc:** http://localhost:8000/redoc
- **Backend README:** [backend/README.md](backend/README.md)
- **Database Schema:** [backend/database/ERD.md](backend/database/ERD.md)

### **Deployment**
- **CPanel Guide:** [deployment/cpanel-setup.md](deployment/cpanel-setup.md)

---

## 🎨 Design & Branding

### **Color Palette**
```css
Primary Blue: #1e40af (rgb(30, 64, 175))
Secondary Blue: #3b82f6 (rgb(59, 130, 246))
Light Blue: #60a5fa (rgb(96, 165, 250))
Sky Blue: #0ea5e9 (rgb(14, 165, 233))
White: #ffffff
Gray: #6b7280 (rgb(107, 114, 128))
```

### **Typography**
- **Font Family:** Poppins (Google Fonts)
- **Headings:** Bold, tracking-tight
- **Body:** Regular, leading-relaxed

### **Components**
- Clean, modern cards with subtle shadows
- Smooth hover transitions
- Responsive grid layouts
- Mobile-first design approach

---

## 🌐 API Endpoints

### **Public Endpoints**
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/properties` | List all properties (paginated, filtered) |
| GET | `/api/properties/{id}` | Get property details |
| GET | `/api/properties/featured/list` | Get featured properties |
| GET | `/api/properties/trending/list` | Get trending properties |
| GET | `/api/neighborhoods` | List neighborhoods |
| GET | `/api/amenities` | List all amenities |

### **Admin Endpoints** (Authentication Required)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Admin login |
| POST | `/api/admin/properties` | Create property |
| PUT | `/api/admin/properties/{id}` | Update property |
| DELETE | `/api/admin/properties/{id}` | Delete property |
| POST | `/api/admin/upload/property-image/{id}` | Upload image |
| GET | `/api/admin/dashboard/stats` | Dashboard statistics |

**Full API documentation:** http://localhost:8000/docs

---

## 🗄️ Database Schema

### **Tables**
1. **properties** - Property listings
2. **property_images** - Property photos
3. **amenities** - Available amenities (WiFi, Parking, etc.)
4. **property_amenities** - Property-amenity relationships
5. **admins** - Admin users

### **Key Features**
- ✅ Normalized to 3NF
- ✅ Foreign key constraints with CASCADE DELETE
- ✅ Indexed for performance
- ✅ Full-text search support

**Detailed schema:** [backend/database/ERD.md](backend/database/ERD.md)

---

## 🔒 Security Features

- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Password Hashing** - Bcrypt encryption
- ✅ **Role-Based Access** - Super Admin, Admin, Editor
- ✅ **CORS Protection** - Configured origins
- ✅ **Input Validation** - Pydantic schemas
- ✅ **SQL Injection Prevention** - Prepared statements
- ✅ **File Upload Validation** - Type and size checks
- ✅ **HTTPS Ready** - SSL certificate support

---

## 📱 Mobile Responsiveness

- ✅ **Mobile-First Design** - Optimized for phones
- ✅ **Responsive Grid** - Adapts to screen size
- ✅ **Touch-Friendly** - Large tap targets
- ✅ **Fast Loading** - Optimized images
- ✅ **Progressive Enhancement** - Works on all devices

---

## 🚀 Deployment

### **CPanel Deployment**

**Full guide:** [deployment/cpanel-setup.md](deployment/cpanel-setup.md)

**Quick Steps:**
1. Create MySQL database
2. Import schema
3. Upload backend files
4. Configure Python app
5. Install dependencies
6. Configure environment
7. Build and deploy frontend
8. Configure domain

**Estimated deployment time:** 30-45 minutes

---

## 🧪 Testing

### **Backend Testing**

```bash
cd backend

# Test health check
curl http://localhost:8000/health

# Test database connection
curl http://localhost:8000/api/properties?page=1&page_size=5

# Test authentication
curl -X POST http://localhost:8000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin@123"}'
```

### **Frontend Testing**

```bash
cd my-next-app

# Run development server
npm run dev

# Visit pages
http://localhost:3000
http://localhost:3000/rent
http://localhost:3000/property/1
```

---

## 🤝 Contributing

### **Development Workflow**

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes**
   - Follow code style guidelines
   - Write clean, documented code
   - Test thoroughly

3. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **Push to GitHub**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**

### **Commit Message Format**

```
feat: add new feature
fix: bug fix
docs: documentation update
style: code formatting
refactor: code restructuring
test: add tests
chore: maintenance tasks
```

---

## 📊 Project Statistics

| Metric | Value |
|--------|-------|
| **Lines of Code** | ~15,000+ |
| **Components** | 40+ React components |
| **API Endpoints** | 20+ endpoints |
| **Database Tables** | 5 tables |
| **Pages** | 10+ pages |
| **Technologies** | 15+ technologies |

---

## 🐛 Troubleshooting

### **Common Issues**

**Issue: Database connection error**
```
Solution: Check DATABASE_URL in .env file
Verify MySQL is running
Ensure database exists
```

**Issue: Frontend can't connect to backend**
```
Solution: Verify NEXT_PUBLIC_API_URL in .env.local
Check backend is running on correct port
Verify CORS settings in backend
```

**Issue: Images not uploading**
```
Solution: Check uploads directory permissions
Verify MAX_UPLOAD_SIZE in backend .env
Ensure allowed file extensions are correct
```

---

## 📞 Support & Contact

- **Email:** admin@eldorethouses.com
- **GitHub:** [Eldoret_House_Hunters](https://github.com/BrianShifoko-Dev/Eldoret_House_Hunters)
- **Issues:** [Report a bug](https://github.com/BrianShifoko-Dev/Eldoret_House_Hunters/issues)

---

## 📝 License

**Proprietary** - © 2025 Eldoret House Hunters. All rights reserved.

---

## 🎯 Roadmap

### **Phase 1** ✅ (Current)
- [x] Property listings with filtering
- [x] Admin dashboard
- [x] Image upload
- [x] User authentication
- [x] Database design
- [x] API development
- [x] Frontend UI

### **Phase 2** 🔄 (Next)
- [ ] Email notifications
- [ ] WhatsApp API integration
- [ ] Property comparison feature
- [ ] Saved favorites
- [ ] Virtual tours
- [ ] Payment integration

### **Phase 3** 📅 (Future)
- [ ] Mobile apps (iOS/Android)
- [ ] AI-powered recommendations
- [ ] Chatbot support
- [ ] Advanced analytics
- [ ] Multi-language support
- [ ] Property valuation tools

---

## 🏆 Achievements

- ✅ **Production-Ready** - Enterprise-grade code quality
- ✅ **Fully Responsive** - Works on all devices
- ✅ **SEO Optimized** - Search engine friendly
- ✅ **Fast Performance** - Optimized loading times
- ✅ **Secure** - Industry-standard security practices
- ✅ **Well Documented** - Comprehensive documentation
- ✅ **Scalable** - Ready for growth

---

## 🌟 Features in Detail

### **Advanced Property Search**
- Filter by location, price range, property type
- Search by bedrooms, bathrooms, area
- Availability status filtering
- Featured properties highlighting
- Sort by newest, price, relevance

### **Image Management**
- Multiple images per property
- Primary image selection
- Automatic image optimization
- Thumbnail generation
- Drag-and-drop upload
- Image preview before upload

### **Admin Dashboard**
- Property statistics
- Recent listings
- Quick actions
- Analytics charts
- User management
- Activity logs

### **User Experience**
- Clean, modern interface
- Smooth animations
- Loading skeletons
- Error handling
- Toast notifications
- Responsive navigation

---

## 💡 Best Practices Used

- ✅ **Clean Code** - Readable and maintainable
- ✅ **Component-Based** - Reusable components
- ✅ **Type Safety** - TypeScript throughout
- ✅ **API-First Design** - RESTful principles
- ✅ **Security First** - Secure by default
- ✅ **Mobile-First** - Responsive design
- ✅ **Performance** - Optimized for speed
- ✅ **Documentation** - Well-documented code

---

**Built with ❤️ by Brian Shifoko for Eldoret House Hunters**

🚀 **Ready to deploy and win tenders!**
