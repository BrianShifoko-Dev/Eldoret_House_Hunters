-- ============================================
-- MIGRATION: Add User Management Features
-- Version: 1.1.0
-- Date: Current
-- ============================================
-- Run this migration to add user management features to existing database
-- ============================================

USE eldoret_house_hunters;

-- ============================================
-- 1. ALTER ADMINS TABLE
-- ============================================

-- Add new columns to admins table
ALTER TABLE `admins`
ADD COLUMN IF NOT EXISTS `permissions` JSON NULL COMMENT 'Custom permissions for user role' AFTER `role`,
ADD COLUMN IF NOT EXISTS `instructions` TEXT NULL COMMENT 'Admin instructions for this user' AFTER `permissions`,
ADD COLUMN IF NOT EXISTS `is_active` BOOLEAN DEFAULT TRUE AFTER `instructions`,
ADD COLUMN IF NOT EXISTS `created_by` INT NULL COMMENT 'ID of admin who created this user' AFTER `is_active`,
ADD COLUMN IF NOT EXISTS `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER `created_at`;

-- Update role enum to include 'user' instead of 'editor'
-- Note: MySQL doesn't support ALTER ENUM easily, so we'll need to handle this carefully
-- For existing databases, you may need to:
-- 1. Export data
-- 2. Drop and recreate table
-- 3. Import data
-- OR use a workaround:

-- If you have 'editor' role users, update them to 'user'
UPDATE `admins` SET `role` = 'user' WHERE `role` = 'editor';

-- Add foreign key for created_by
ALTER TABLE `admins`
ADD CONSTRAINT `fk_admins_created_by` 
FOREIGN KEY (`created_by`) REFERENCES `admins`(`id`) ON DELETE SET NULL;

-- Add indexes
ALTER TABLE `admins`
ADD INDEX IF NOT EXISTS `idx_role` (`role`),
ADD INDEX IF NOT EXISTS `idx_is_active` (`is_active`),
ADD INDEX IF NOT EXISTS `idx_created_by` (`created_by`);

-- Update default admin email to use correct domain
UPDATE `admins` 
SET `email` = 'admin@eldorethousehunters.co.ke' 
WHERE `username` = 'admin' AND `email` LIKE '%@eldorethouses.com';

-- ============================================
-- 2. CREATE USER PERMISSIONS TABLE
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
-- 3. SET DEFAULT VALUES FOR EXISTING USERS
-- ============================================

-- Set is_active to TRUE for all existing users
UPDATE `admins` SET `is_active` = TRUE WHERE `is_active` IS NULL;

-- Set default permissions for existing users based on role
UPDATE `admins` 
SET `permissions` = JSON_OBJECT(
    'view_all_properties', TRUE,
    'edit_properties', TRUE,
    'delete_properties', TRUE,
    'create_properties', TRUE,
    'view_users', TRUE,
    'create_users', TRUE,
    'edit_users', TRUE,
    'delete_users', TRUE
)
WHERE `role` = 'super_admin' AND `permissions` IS NULL;

UPDATE `admins` 
SET `permissions` = JSON_OBJECT(
    'view_all_properties', TRUE,
    'edit_properties', TRUE,
    'delete_properties', TRUE,
    'create_properties', TRUE,
    'view_users', FALSE,
    'create_users', FALSE,
    'edit_users', FALSE,
    'delete_users', FALSE
)
WHERE `role` = 'admin' AND `permissions` IS NULL;

UPDATE `admins` 
SET `permissions` = JSON_OBJECT(
    'view_all_properties', FALSE,
    'edit_properties', FALSE,
    'delete_properties', FALSE,
    'create_properties', FALSE,
    'view_users', FALSE,
    'create_users', FALSE,
    'edit_users', FALSE,
    'delete_users', FALSE
)
WHERE `role` = 'user' AND `permissions` IS NULL;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check table structure
-- DESCRIBE `admins`;
-- DESCRIBE `user_permissions`;

-- Check existing users
-- SELECT id, username, email, role, is_active, created_by FROM `admins`;

-- ============================================
-- MIGRATION COMPLETE
-- ============================================

