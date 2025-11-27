-- ============================================
-- ELDORET HOUSE HUNTERS - DATABASE SCHEMA
-- MySQL/MariaDB Database Schema
-- Version: 1.0.0
-- ============================================

-- Create database (if deploying manually)
-- CREATE DATABASE IF NOT EXISTS eldoret_house_hunters CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE eldoret_house_hunters;

-- ============================================
-- 1. ADMINS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS `admins` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `username` VARCHAR(50) NOT NULL UNIQUE,
    `email` VARCHAR(100) NOT NULL UNIQUE,
    `password_hash` VARCHAR(255) NOT NULL,
    `role` ENUM('super_admin', 'admin', 'user') NOT NULL DEFAULT 'user',
    `permissions` JSON NULL COMMENT 'Custom permissions for user role',
    `instructions` TEXT NULL COMMENT 'Admin instructions for this user',
    `is_active` BOOLEAN DEFAULT TRUE,
    `created_by` INT NULL COMMENT 'ID of admin who created this user',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `last_login` TIMESTAMP NULL,
    INDEX `idx_username` (`username`),
    INDEX `idx_email` (`email`),
    INDEX `idx_role` (`role`),
    INDEX `idx_is_active` (`is_active`),
    INDEX `idx_created_by` (`created_by`),
    FOREIGN KEY (`created_by`) REFERENCES `admins`(`id`) ON DELETE SET NULL,
    CONSTRAINT `chk_email_domain` CHECK (`email` LIKE '%@eldorethousehunters.co.ke')
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================
-- 2. PROPERTIES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS `properties` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `property_type` ENUM('house', 'apartment', 'studio', 'bedsitter', 'commercial') NOT NULL,
    `listing_type` ENUM('rent', 'buy') NOT NULL,
    `price` DECIMAL(10, 2) NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `latitude` DECIMAL(10, 8) NULL,
    `longitude` DECIMAL(11, 8) NULL,
    `bedrooms` INT NOT NULL DEFAULT 1,
    `bathrooms` INT NOT NULL DEFAULT 1,
    `area_sqm` DECIMAL(10, 2) NULL,
    `availability` ENUM('available', 'rented', 'sold', 'pending') NOT NULL DEFAULT 'available',
    `featured` BOOLEAN DEFAULT FALSE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_title` (`title`),
    INDEX `idx_property_type` (`property_type`),
    INDEX `idx_listing_type` (`listing_type`),
    INDEX `idx_price` (`price`),
    INDEX `idx_location` (`location`),
    INDEX `idx_availability` (`availability`),
    INDEX `idx_featured` (`featured`),
    FULLTEXT `idx_search` (`title`, `description`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================
-- 3. PROPERTY_IMAGES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS `property_images` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `property_id` INT NOT NULL,
    `image_url` VARCHAR(500) NOT NULL,
    `is_primary` BOOLEAN DEFAULT FALSE,
    `display_order` INT DEFAULT 0,
    FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON DELETE CASCADE,
    INDEX `idx_property_id` (`property_id`),
    INDEX `idx_is_primary` (`is_primary`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================
-- 4. AMENITIES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS `amenities` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(100) NOT NULL UNIQUE,
    `icon` VARCHAR(50) NULL,
    INDEX `idx_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================
-- 5. PROPERTY_AMENITIES TABLE (Many-to-Many)
-- ============================================

CREATE TABLE IF NOT EXISTS `property_amenities` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `property_id` INT NOT NULL,
    `amenity_id` INT NOT NULL,
    FOREIGN KEY (`property_id`) REFERENCES `properties`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`amenity_id`) REFERENCES `amenities`(`id`) ON DELETE CASCADE,
    UNIQUE KEY `unique_property_amenity` (`property_id`, `amenity_id`),
    INDEX `idx_property_id` (`property_id`),
    INDEX `idx_amenity_id` (`amenity_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- ============================================
-- SEED DATA - DEFAULT ADMIN USER
-- ============================================
-- Default Password: Admin@123
-- IMPORTANT: Change this password immediately after first login!

INSERT INTO `admins` (`username`, `email`, `password_hash`, `role`, `created_by`, `is_active`)
VALUES (
    'admin',
    'admin@eldorethousehunters.co.ke',
    '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5eTj3rJmLJqfG',
    'super_admin',
    NULL,
    TRUE
) ON DUPLICATE KEY UPDATE `username` = `username`;


-- ============================================
-- SEED DATA - DEFAULT AMENITIES
-- ============================================

INSERT INTO `amenities` (`name`, `icon`) VALUES
('WiFi', 'wifi'),
('Parking', 'parking'),
('Security', 'shield'),
('Water Supply', 'droplet'),
('Electricity', 'zap'),
('Garden', 'tree'),
('Balcony', 'home'),
('Gym', 'dumbbell'),
('Swimming Pool', 'waves'),
('Elevator', 'arrow-up'),
('Air Conditioning', 'wind'),
('Furnished', 'sofa'),
('Pet Friendly', 'paw-print'),
('Laundry', 'washing-machine'),
('CCTV', 'camera')
ON DUPLICATE KEY UPDATE `name` = `name`;


-- ============================================
-- SAMPLE PROPERTIES (For Testing)
-- ============================================

-- Sample Property 1
INSERT INTO `properties` (
    `title`, `description`, `property_type`, `listing_type`, `price`,
    `location`, `bedrooms`, `bathrooms`, `area_sqm`, `featured`, `availability`
) VALUES (
    'Modern 3-Bedroom Apartment in Pioneer',
    'Spacious and modern 3-bedroom apartment with stunning views. Features include a large living room, modern kitchen, master ensuite, and ample parking. Located in the heart of Pioneer with easy access to shopping centers and schools.',
    'apartment',
    'rent',
    35000.00,
    'Pioneer, Eldoret',
    3,
    2,
    120.00,
    TRUE,
    'available'
) ON DUPLICATE KEY UPDATE `title` = `title`;

-- Sample Property 2
INSERT INTO `properties` (
    `title`, `description`, `property_type`, `listing_type`, `price`,
    `location`, `bedrooms`, `bathrooms`, `area_sqm`, `featured`, `availability`
) VALUES (
    'Luxury Studio Apartment Near Zion Mall',
    'Brand new studio apartment with modern finishes. Perfect for young professionals. Features include built-in wardrobes, modern bathroom, kitchenette, and reliable water supply. Walking distance to Zion Mall.',
    'studio',
    'rent',
    18000.00,
    'Zion Mall Area, Eldoret',
    1,
    1,
    45.00,
    TRUE,
    'available'
) ON DUPLICATE KEY UPDATE `title` = `title`;

-- Sample Property 3
INSERT INTO `properties` (
    `title`, `description`, `property_type`, `listing_type`, `price`,
    `location`, `bedrooms`, `bathrooms`, `area_sqm`, `availability`
) VALUES (
    'Spacious 4-Bedroom House in Annex',
    'Beautiful 4-bedroom house with a large compound and garden. Features include a modern kitchen, spacious living room, dining area, master ensuite, and servant quarter. Ideal for families.',
    'house',
    'buy',
    8500000.00,
    'Annex, Eldoret',
    4,
    3,
    200.00,
    'available'
) ON DUPLICATE KEY UPDATE `title` = `title`;

-- Sample Property 4
INSERT INTO `properties` (
    `title`, `description`, `property_type`, `listing_type`, `price`,
    `location`, `bedrooms`, `bathrooms`, `area_sqm`, `featured`, `availability`
) VALUES (
    'Affordable Bedsitter in Langas',
    'Clean and affordable bedsitter with own bathroom. Perfect for students and young professionals. Features include 24/7 water supply, electricity, and secure neighborhood.',
    'bedsitter',
    'rent',
    8000.00,
    'Langas, Eldoret',
    1,
    1,
    25.00,
    FALSE,
    'available'
) ON DUPLICATE KEY UPDATE `title` = `title`;


-- ============================================
-- 6. USER PERMISSIONS TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS `user_permissions` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `user_id` INT NOT NULL,
    `permission_key` VARCHAR(100) NOT NULL COMMENT 'e.g., view_all_properties, edit_properties, delete_properties',
    `permission_value` BOOLEAN DEFAULT FALSE,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `admins`(`id`) ON DELETE CASCADE,
    UNIQUE KEY `unique_user_permission` (`user_id`, `permission_key`),
    INDEX `idx_user_id` (`user_id`),
    INDEX `idx_permission_key` (`permission_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- DATABASE OPTIMIZATION QUERIES
-- ============================================

-- Analyze tables for optimization
ANALYZE TABLE `properties`;
ANALYZE TABLE `property_images`;
ANALYZE TABLE `amenities`;
ANALYZE TABLE `property_amenities`;
ANALYZE TABLE `admins`;

-- ============================================
-- USEFUL QUERIES FOR MAINTENANCE
-- ============================================

-- Count properties by type
-- SELECT property_type, COUNT(*) as count FROM properties GROUP BY property_type;

-- Count properties by location
-- SELECT location, COUNT(*) as count FROM properties GROUP BY location ORDER BY count DESC;

-- Get properties with image count
-- SELECT p.id, p.title, COUNT(pi.id) as image_count 
-- FROM properties p 
-- LEFT JOIN property_images pi ON p.id = pi.property_id 
-- GROUP BY p.id;

-- Get properties with amenities
-- SELECT p.title, GROUP_CONCAT(a.name SEPARATOR ', ') as amenities
-- FROM properties p
-- LEFT JOIN property_amenities pa ON p.id = pa.property_id
-- LEFT JOIN amenities a ON pa.amenity_id = a.id
-- GROUP BY p.id;

