# 📊 Eldoret House Hunters - Database Schema Documentation

## Entity Relationship Diagram (ERD)

### Database Overview
The database consists of **5 main tables** with well-defined relationships to support property management, image storage, amenities, and admin authentication.

---

## 📋 Tables Structure

### 1. **ADMINS** 
Stores admin user credentials and roles

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique admin ID |
| `username` | VARCHAR(50) | NOT NULL, UNIQUE | Admin username |
| `email` | VARCHAR(100) | NOT NULL, UNIQUE | Admin email |
| `password_hash` | VARCHAR(255) | NOT NULL | Bcrypt hashed password |
| `role` | ENUM | NOT NULL, DEFAULT 'editor' | super_admin, admin, editor |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Account creation date |
| `last_login` | TIMESTAMP | NULL | Last login timestamp |

**Indexes:** `username`, `email`

---

### 2. **PROPERTIES** 
Main table storing property listings

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique property ID |
| `title` | VARCHAR(255) | NOT NULL | Property title |
| `description` | TEXT | NOT NULL | Detailed description |
| `property_type` | ENUM | NOT NULL | house, apartment, studio, bedsitter, commercial |
| `listing_type` | ENUM | NOT NULL | rent, buy |
| `price` | DECIMAL(10,2) | NOT NULL | Price in KES |
| `location` | VARCHAR(255) | NOT NULL | Property location |
| `latitude` | DECIMAL(10,8) | NULL | GPS latitude |
| `longitude` | DECIMAL(11,8) | NULL | GPS longitude |
| `bedrooms` | INT | NOT NULL, DEFAULT 1 | Number of bedrooms |
| `bathrooms` | INT | NOT NULL, DEFAULT 1 | Number of bathrooms |
| `area_sqm` | DECIMAL(10,2) | NULL | Area in square meters |
| `availability` | ENUM | NOT NULL, DEFAULT 'available' | available, rented, sold, pending |
| `featured` | BOOLEAN | DEFAULT FALSE | Featured property flag |
| `created_at` | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP | Creation timestamp |
| `updated_at` | TIMESTAMP | ON UPDATE CURRENT_TIMESTAMP | Last update timestamp |

**Indexes:** `title`, `property_type`, `listing_type`, `price`, `location`, `availability`, `featured`  
**Full-Text Index:** `title`, `description` (for search functionality)

---

### 3. **PROPERTY_IMAGES** 
Stores multiple images per property

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique image ID |
| `property_id` | INT | NOT NULL, FOREIGN KEY | Reference to properties(id) |
| `image_url` | VARCHAR(500) | NOT NULL | Relative path to image file |
| `is_primary` | BOOLEAN | DEFAULT FALSE | Primary image flag |
| `display_order` | INT | DEFAULT 0 | Display order for gallery |

**Foreign Key:** `property_id` → `properties(id)` ON DELETE CASCADE  
**Indexes:** `property_id`, `is_primary`

---

### 4. **AMENITIES** 
Master list of available property amenities

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique amenity ID |
| `name` | VARCHAR(100) | NOT NULL, UNIQUE | Amenity name (e.g., WiFi, Parking) |
| `icon` | VARCHAR(50) | NULL | Icon identifier (e.g., 'wifi', 'parking') |

**Indexes:** `name`

---

### 5. **PROPERTY_AMENITIES** 
Many-to-Many relationship between properties and amenities

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INT | PRIMARY KEY, AUTO_INCREMENT | Unique record ID |
| `property_id` | INT | NOT NULL, FOREIGN KEY | Reference to properties(id) |
| `amenity_id` | INT | NOT NULL, FOREIGN KEY | Reference to amenities(id) |

**Foreign Keys:**
- `property_id` → `properties(id)` ON DELETE CASCADE
- `amenity_id` → `amenities(id)` ON DELETE CASCADE

**Unique Constraint:** (`property_id`, `amenity_id`) - Prevents duplicate amenity assignments  
**Indexes:** `property_id`, `amenity_id`

---

## 🔗 Relationships

```
┌─────────────┐
│   ADMINS    │
│  (No FK)    │
└─────────────┘


┌──────────────────┐
│   PROPERTIES     │◄──────────┐
│  id (PK)         │           │
└────────┬─────────┘           │
         │                     │
         │ 1:N                 │ N:1
         │                     │
         ▼                     │
┌──────────────────┐    ┌──────────────────┐
│ PROPERTY_IMAGES  │    │ PROPERTY_        │
│  id (PK)         │    │ AMENITIES        │
│  property_id(FK) │    │  property_id(FK) │◄──┐
└──────────────────┘    │  amenity_id(FK)  │   │
                        └──────────┬────────┘   │
                                   │            │
                                   │ N:1        │
                                   │            │
                                   ▼            │
                        ┌──────────────────┐    │
                        │   AMENITIES      │────┘
                        │  id (PK)         │
                        └──────────────────┘
```

### Relationship Summary:
1. **Properties ↔ Property Images**: One-to-Many (1:N)
   - One property can have multiple images
   - CASCADE DELETE: Deleting a property deletes all its images

2. **Properties ↔ Property Amenities**: One-to-Many (1:N)
   - One property can have multiple amenities
   - CASCADE DELETE: Deleting a property removes amenity associations

3. **Amenities ↔ Property Amenities**: One-to-Many (1:N)
   - One amenity can be associated with multiple properties
   - CASCADE DELETE: Deleting an amenity removes all associations

4. **Admins**: Independent table (no foreign key relationships)

---

## 🎯 Key Design Features

### 1. **Normalization**
- Database follows **3NF (Third Normal Form)**
- No redundant data storage
- Amenities stored separately and linked via junction table

### 2. **Data Integrity**
- Foreign key constraints with CASCADE DELETE
- UNIQUE constraints prevent duplicates
- ENUMs ensure valid values for types and statuses

### 3. **Performance Optimization**
- Strategic indexes on frequently queried columns
- Full-text search index on title and description
- Composite unique index on property_amenities

### 4. **Scalability**
- Designed to handle thousands of properties
- Efficient pagination support
- Optimized for complex filtering queries

### 5. **Security**
- Passwords stored as bcrypt hashes
- Role-based access control (RBAC)
- Prepared statements prevent SQL injection

---

## 📈 Indexing Strategy

### Properties Table
- **B-Tree Indexes:** price, location, property_type, listing_type, availability, featured
- **Full-Text Index:** title, description (for search)
- **Composite Index:** Consider adding (`listing_type`, `availability`, `price`) for common filters

### Property Images Table
- **B-Tree Indexes:** property_id, is_primary
- Optimizes image lookup and primary image identification

### Property Amenities Table
- **Unique Composite:** (property_id, amenity_id)
- **B-Tree Indexes:** property_id, amenity_id
- Optimizes join operations

---

## 🔐 Default Admin Credentials

**⚠️ IMPORTANT: Change immediately after first login!**

```
Username: admin
Email: admin@eldorethouses.com
Password: Admin@123
Role: super_admin
```

---

## 📝 Sample Queries

### Get All Properties with Images Count
```sql
SELECT 
    p.id, 
    p.title, 
    p.price,
    COUNT(pi.id) as image_count
FROM properties p
LEFT JOIN property_images pi ON p.id = pi.property_id
GROUP BY p.id;
```

### Get Property with All Amenities
```sql
SELECT 
    p.title,
    p.price,
    GROUP_CONCAT(a.name SEPARATOR ', ') as amenities
FROM properties p
LEFT JOIN property_amenities pa ON p.id = pa.property_id
LEFT JOIN amenities a ON pa.amenity_id = a.id
WHERE p.id = 1
GROUP BY p.id;
```

### Search Properties by Location and Price Range
```sql
SELECT * FROM properties
WHERE location LIKE '%Pioneer%'
  AND price BETWEEN 20000 AND 50000
  AND availability = 'available'
ORDER BY created_at DESC;
```

---

## 🚀 Migration & Deployment

### Initial Setup
1. Import `schema.sql` into your MySQL database
2. Default admin user and amenities will be created automatically
3. Sample properties included for testing

### CPanel Deployment
1. Create MySQL database via CPanel
2. Import schema via PHPMyAdmin
3. Update `.env` file with database credentials
4. Verify tables created successfully

---

## 📊 Database Statistics (Expected)

| Metric | Estimated Value |
|--------|----------------|
| Storage per property (avg) | ~5 KB |
| Storage per image record | ~500 bytes |
| Images per property (avg) | 3-5 |
| Total database size (1000 properties) | ~20-30 MB |
| Query response time (indexed) | <50ms |

---

**Last Updated:** November 2025  
**Version:** 1.0.0  
**Database Engine:** MySQL 8.0 / MariaDB 10.x

