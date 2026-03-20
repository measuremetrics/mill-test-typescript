-- Seed data for ecommerce database

-- Insert categories
INSERT INTO categories (name, description) VALUES
    ('Electronics', 'Electronic devices and gadgets'),
    ('Clothing', 'Apparel and fashion items'),
    ('Books', 'Physical and digital books'),
    ('Home & Garden', 'Home improvement and gardening supplies'),
    ('Sports', 'Sports equipment and accessories');

-- Insert users
INSERT INTO users (email, first_name, last_name, password_hash) VALUES
    ('john.doe@example.com', 'John', 'Doe', '$2b$10$hash1'),
    ('jane.smith@example.com', 'Jane', 'Smith', '$2b$10$hash2'),
    ('bob.johnson@example.com', 'Bob', 'Johnson', '$2b$10$hash3'),
    ('alice.williams@example.com', 'Alice', 'Williams', '$2b$10$hash4'),
    ('charlie.brown@example.com', 'Charlie', 'Brown', '$2b$10$hash5');

-- Insert products
INSERT INTO products (name, description, price, category_id, stock_quantity, sku, image_url) VALUES
    -- Electronics
    ('Smartphone X1', 'Latest smartphone with advanced features', 799.99, 1, 50, 'PHONE-X1', 'https://example.com/smartphone.jpg'),
    ('Laptop Pro 15"', 'High-performance laptop for professionals', 1299.99, 1, 25, 'LAPTOP-PRO15', 'https://example.com/laptop.jpg'),
    ('Wireless Headphones', 'Noise-cancelling wireless headphones', 199.99, 1, 100, 'HEADPHONES-WL', 'https://example.com/headphones.jpg'),
    ('Smart Watch', 'Fitness tracking smartwatch', 299.99, 1, 75, 'WATCH-SMART', 'https://example.com/smartwatch.jpg'),

    -- Clothing
    ('Cotton T-Shirt', 'Comfortable 100% cotton t-shirt', 24.99, 2, 200, 'TSHIRT-COTTON', 'https://example.com/tshirt.jpg'),
    ('Denim Jeans', 'Classic blue denim jeans', 59.99, 2, 150, 'JEANS-DENIM', 'https://example.com/jeans.jpg'),
    ('Running Shoes', 'Lightweight running shoes', 89.99, 2, 80, 'SHOES-RUNNING', 'https://example.com/shoes.jpg'),
    ('Winter Jacket', 'Warm winter jacket with hood', 129.99, 2, 60, 'JACKET-WINTER', 'https://example.com/jacket.jpg'),

    -- Books
    ('JavaScript Guide', 'Complete guide to modern JavaScript', 39.99, 3, 120, 'BOOK-JS', 'https://example.com/jsbook.jpg'),
    ('Cooking Basics', 'Learn fundamental cooking techniques', 29.99, 3, 90, 'BOOK-COOKING', 'https://example.com/cookbook.jpg'),
    ('Fiction Novel', 'Bestselling fiction novel', 19.99, 3, 200, 'BOOK-FICTION', 'https://example.com/novel.jpg'),

    -- Home & Garden
    ('Plant Pot Set', 'Set of 3 ceramic plant pots', 34.99, 4, 40, 'POTS-CERAMIC', 'https://example.com/pots.jpg'),
    ('Garden Tool Kit', 'Complete garden tool set', 79.99, 4, 30, 'TOOLS-GARDEN', 'https://example.com/tools.jpg'),
    ('LED Desk Lamp', 'Adjustable LED desk lamp', 49.99, 4, 65, 'LAMP-LED', 'https://example.com/lamp.jpg'),

    -- Sports
    ('Yoga Mat', 'Non-slip yoga mat', 29.99, 5, 100, 'MAT-YOGA', 'https://example.com/yoga.jpg'),
    ('Basketball', 'Professional basketball', 24.99, 5, 50, 'BALL-BASKETBALL', 'https://example.com/basketball.jpg'),
    ('Tennis Racket', 'Lightweight tennis racket', 89.99, 5, 35, 'RACKET-TENNIS', 'https://example.com/racket.jpg');

-- Insert orders
INSERT INTO orders (user_id, status, total_amount, shipping_address, billing_address) VALUES
    (1, 'delivered', 1099.98, '123 Main St, City, State 12345', '123 Main St, City, State 12345'),
    (2, 'shipped', 199.99, '456 Oak Ave, Town, State 67890', '456 Oak Ave, Town, State 67890'),
    (3, 'processing', 154.97, '789 Pine Rd, Village, State 11111', '789 Pine Rd, Village, State 11111'),
    (4, 'pending', 89.99, '321 Elm St, Hamlet, State 22222', '321 Elm St, Hamlet, State 22222'),
    (1, 'delivered', 169.98, '123 Main St, City, State 12345', '123 Main St, City, State 12345');

-- Insert order items
INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price) VALUES
    -- Order 1: Smartphone + Laptop
    (1, 1, 1, 799.99, 799.99),
    (1, 2, 1, 1299.99, 1299.99),

    -- Order 2: Wireless Headphones
    (2, 3, 1, 199.99, 199.99),

    -- Order 3: T-shirt + Jeans + Book
    (3, 5, 2, 24.99, 49.98),
    (3, 6, 1, 59.99, 59.99),
    (3, 9, 1, 39.99, 39.99),

    -- Order 4: Running Shoes
    (4, 7, 1, 89.99, 89.99),

    -- Order 5: Plant Pot Set + Yoga Mat
    (5, 12, 1, 34.99, 34.99),
    (5, 15, 1, 29.99, 29.99);