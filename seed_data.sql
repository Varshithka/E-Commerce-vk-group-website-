-- SEED DATA FOR VK GROUP COMPANY E-COMMERCE
-- DB: ecommerce_db

USE ecommerce_db;

-- Clear existing data (in correct order of constraints)
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE wishlist;
TRUNCATE TABLE review;
TRUNCATE TABLE order_item;
TRUNCATE TABLE orders;
TRUNCATE TABLE cart_item;
TRUNCATE TABLE cart;
TRUNCATE TABLE products;
TRUNCATE TABLE category;
TRUNCATE TABLE addresses;
TRUNCATE TABLE users;
SET FOREIGN_KEY_CHECKS = 1;

-- Categories
INSERT INTO category (id, name, description) VALUES 
(1, 'Electronics', 'Premium gadgets and electronics'),
(2, 'Fashion', 'Latest trends in clothing and accessories'),
(3, 'Lifestyle', 'Items for your modern daily life'),
(4, 'Food', 'Gourmet snacks and fresh produce');

-- Users (Password is 'password123' hashed with BCrypt)
-- Hash for 'password123': $2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMp.O6.02wFS
INSERT INTO users (id, name, email, password, role, created_at) VALUES 
(1, 'Admin User', 'admin@vk-group.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMp.O6.02wFS', 'ADMIN', NOW()),
(2, 'Demo User', 'user@demo.com', '$2a$10$8.UnVuG9HHgffUDAlk8qfOuVGkqRzgVymGe07xd00DMp.O6.02wFS', 'USER', NOW());

-- Products
INSERT INTO products (id, name, description, price, original_price, brand, rating, reviews_count, image_url, category_id, stock_quantity, created_at) VALUES 
-- Electronics
(1, 'UltraView Pro Smartwatch', 'Experience 2.0-inch AMOLED display with Always-On feature and 10 days battery life.', 2499.0, 4999.0, 'VK-Tech', 4.8, 152, 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80', 1, 50, NOW()),
(2, 'Noise-Cancelling Elite Headphones', 'Immersive sound with 40dB active noise cancellation and premium ergonomics.', 8999.0, 15999.0, 'SoundMax', 4.9, 89, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80', 1, 30, NOW()),
(3, 'Pixel Tab 10 Gen 2', 'High-speed processor with vibrant 10-inch display for creative pros.', 12499.0, 18999.0, 'VK-Tech', 4.7, 45, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80', 1, 20, NOW()),

-- Fashion
(4, 'Premium Cotton Noir Hoodie', 'Minimalist design with 100% organic cotton. Perfect for cool evenings.', 1499.0, 2499.0, 'VK-Fashion', 4.6, 210, 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80', 2, 100, NOW()),
(5, 'Slate Grey Urban Sneakers', 'Lightweight, breathable, and designed for ultimate urban comfort.', 3299.0, 5999.0, 'StreetStep', 4.8, 128, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80', 2, 75, NOW()),

-- Lifestyle
(6, 'Arctic Steel Water Bottle', 'Insulated vacuum flask that keeps drinks cold for 24 hours.', 799.0, 1299.0, 'PureFlow', 4.9, 320, 'https://images.unsplash.com/photo-1602143399827-7217030c57ad?auto=format&fit=crop&q=80', 3, 150, NOW()),
(7, 'Eco-Leather Minimalist Wallet', 'Ultra-slim design with RFID protection and textured finish.', 1199.0, 1999.0, 'VK-Life', 4.7, 67, 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80', 3, 50, NOW());

-- Indexes for performance
CREATE INDEX idx_product_name ON products(name);
CREATE INDEX idx_product_category ON products(category_id);
CREATE INDEX idx_order_user ON orders(user_id);
CREATE INDEX idx_order_tracking ON orders(tracking_number);
