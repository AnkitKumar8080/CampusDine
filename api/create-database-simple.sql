-- ============================================
-- Simple Database Creation Script
-- Copy and paste this into MySQL Workbench
-- ============================================

-- Step 1: Create the database
CREATE DATABASE IF NOT EXISTS CampusDine;
USE CampusDine;

-- Step 2: Create Users table
CREATE TABLE IF NOT EXISTS Users (
  userId VARCHAR(255), 
  avatar VARCHAR(255),
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(255) DEFAULT 'user',
  createdAt VARCHAR(255) NOT NULL, 
  updatedAt VARCHAR(255) NOT NULL,
  PRIMARY KEY (userId)
); 

-- Step 3: Create Categories table
CREATE TABLE IF NOT EXISTS Categories (
  categoryId VARCHAR(255) PRIMARY KEY,
  categoryName VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  categoryImage VARCHAR(255),
  createdAt VARCHAR(255) NOT NULL,
  updatedAt VARCHAR(255) NOT NULL
);

-- Step 4: Create Products table
CREATE TABLE IF NOT EXISTS Products (
  productId VARCHAR(255) PRIMARY KEY,
  productName VARCHAR(255) NOT NULL,
  image VARCHAR(255) DEFAULT "noImg.png",
  rating INT DEFAULT 0,
  description VARCHAR(255) DEFAULT "No Description",
  vegetarian BOOLEAN NOT NULL,
  price INT NOT NULL,
  categoryId VARCHAR(255) NOT NULL,
  createdAt VARCHAR(255) NOT NULL,
  updatedAt VARCHAR(255) NOT NULL,
  FOREIGN KEY (categoryId) REFERENCES Categories(categoryId) ON DELETE CASCADE ON UPDATE CASCADE 
); 

-- Step 5: Create Orders table
CREATE TABLE IF NOT EXISTS Orders (
  orderId VARCHAR(255) PRIMARY KEY, 
  userId VARCHAR(255) NOT NULL,
  orderNumber BIGINT UNIQUE AUTO_INCREMENT, 
  pickUpTime VARCHAR(255) NOT NULL,
  expiryDate VARCHAR(255) NOT NULL,
  total INT NOT NULL,
  createdAt VARCHAR(255) NOT NULL,
  updatedAt VARCHAR(255) NOT NULL,
  FOREIGN KEY (userId) REFERENCES Users(userId) ON DELETE CASCADE ON UPDATE CASCADE
); 

-- Step 6: Create OrderItems table
CREATE TABLE IF NOT EXISTS OrderItems (
  orderItemsId VARCHAR(255) PRIMARY KEY,
  orderId VARCHAR(255) NOT NULL, 
  productId VARCHAR(255) NOT NULL, 
  quantity INT DEFAULT 1, 
  subtotal INT NOT NULL, 
  createdAt VARCHAR(255) NOT NULL, 
  updatedAt VARCHAR(255) NOT NULL, 
  FOREIGN KEY (orderId) REFERENCES Orders(orderId) ON DELETE CASCADE ON UPDATE CASCADE, 
  FOREIGN KEY (productId) REFERENCES Products(productId) ON DELETE CASCADE ON UPDATE CASCADE
); 

-- Step 7: Create OrderStatus table
CREATE TABLE IF NOT EXISTS OrderStatus (
  orderStatusId VARCHAR(255) PRIMARY KEY,
  orderId VARCHAR(255) NOT NULL,
  status ENUM ('processing', 'placed', 'ready', 'delivered', 'cancelled', 'expired') DEFAULT 'processing', 
  createdAt VARCHAR(255) NOT NULL,
  updatedAt VARCHAR(255) NOT NULL,
  FOREIGN KEY (orderId) REFERENCES Orders(orderId) ON DELETE CASCADE ON UPDATE CASCADE
); 

-- Step 8: Verify everything was created
SELECT '✅ Database CampusDine created successfully!' AS Status;
SELECT '✅ All tables created!' AS Status;

-- Show all tables
SHOW TABLES;

