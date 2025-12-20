-- Migration script to add timestamp columns for order status changes
-- Run this in MySQL Workbench or command line

USE CampusDine;

-- Add timestamp columns to OrderStatus table (if they don't exist)
-- Note: MySQL doesn't support IF NOT EXISTS for ALTER TABLE ADD COLUMN
-- If columns already exist, you'll get an error - that's okay, just ignore it

ALTER TABLE OrderStatus 
ADD COLUMN placedAt VARCHAR(255) DEFAULT NULL,
ADD COLUMN readyAt VARCHAR(255) DEFAULT NULL,
ADD COLUMN deliveredAt VARCHAR(255) DEFAULT NULL;

-- Update existing records: set placedAt to createdAt if status is 'placed' or later
UPDATE OrderStatus 
SET placedAt = createdAt 
WHERE status IN ('placed', 'ready', 'delivered') AND placedAt IS NULL;

-- Update existing records: set readyAt to updatedAt if status is 'ready' or 'delivered'
UPDATE OrderStatus 
SET readyAt = updatedAt 
WHERE status IN ('ready', 'delivered') AND readyAt IS NULL;

-- Update existing records: set deliveredAt to updatedAt if status is 'delivered'
UPDATE OrderStatus 
SET deliveredAt = updatedAt 
WHERE status = 'delivered' AND deliveredAt IS NULL;

SELECT '✅ OrderStatus table updated with timestamp columns!' AS Status;

