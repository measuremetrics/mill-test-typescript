# PostgreSQL Ecommerce Database

This project includes a complete PostgreSQL-based ecommerce database implementation with a simple but comprehensive data model.

## Features

- **User Management**: User accounts with authentication support
- **Product Catalog**: Products organized by categories with inventory tracking
- **Order Management**: Complete order processing with line items
- **TypeScript Support**: Fully typed interfaces and classes
- **Connection Pooling**: Efficient database connection management
- **Test Suite**: Comprehensive tests for all database operations

## Database Schema

The database includes the following tables:

### Core Tables

- **`users`** - Customer accounts and profiles
- **`categories`** - Product categories for organization
- **`products`** - Product catalog with pricing and inventory
- **`orders`** - Customer orders with status tracking
- **`order_items`** - Individual line items for each order

### Key Features

- Foreign key relationships for data integrity
- Check constraints for data validation
- Indexes for optimal query performance
- Automatic timestamp tracking with triggers
- Support for order status workflow

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. PostgreSQL Setup

Make sure you have PostgreSQL installed and running. Create a database for the application:

```sql
CREATE DATABASE ecommerce;
```

### 3. Environment Configuration

Copy the environment example file and configure your database connection:

```bash
cp .env.example .env
```

Edit `.env` with your database settings:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecommerce
DB_USER=postgres
DB_PASSWORD=your_password
```

### 4. Initialize Database

Run the initialization script to create tables and add seed data:

```bash
npm run db:init
```

## Usage

### Basic Usage

```typescript
import { db, DatabaseClient } from './src/database/index.js';

// Using the default database client
const users = await db.getAllUsers();
const products = await db.getAllProducts();

// Or create your own client instance
const customDb = new DatabaseClient();
const user = await customDb.getUserById(1);
```

### User Operations

```typescript
// Create a new user
const newUser = await db.createUser({
  email: 'customer@example.com',
  first_name: 'John',
  last_name: 'Doe',
  password_hash: '$2b$10$hashedpassword'
});

// Get user by email
const user = await db.getUserByEmail('customer@example.com');

// Get all users
const allUsers = await db.getAllUsers();
```

### Product Operations

```typescript
// Create a new product
const product = await db.createProduct({
  name: 'New Widget',
  description: 'A fantastic widget',
  price: 29.99,
  category_id: 1,
  stock_quantity: 100,
  sku: 'WIDGET-001'
});

// Get products by category
const electronics = await db.getProductsByCategory(1);

// Update stock quantity
await db.updateProductStock(productId, 95);
```

### Order Operations

```typescript
// Create an order
const order = await db.createOrder({
  user_id: userId,
  status: 'pending',
  total_amount: 159.97,
  shipping_address: '123 Main St, City, State 12345',
  billing_address: '123 Main St, City, State 12345'
});

// Add items to the order
await db.createOrderItem({
  order_id: order.id!,
  product_id: productId,
  quantity: 2,
  unit_price: 29.99,
  total_price: 59.98
});

// Get order with full details
const orderDetails = await db.getOrderWithDetails(order.id!);

// Update order status
await db.updateOrderStatus(order.id!, 'processing');
```

## Available Scripts

- **`npm run build`** - Compile TypeScript to JavaScript
- **`npm run db:init`** - Initialize database with schema and seed data
- **`npm run db:demo`** - Run the interactive database demo
- **`npm run test`** - Run all tests
- **`npm run test:db`** - Run only database tests

## Demo

Run the interactive demo to see all database operations in action:

```bash
npm run db:demo
```

This will:
- Initialize the database with sample data
- Demonstrate all CRUD operations
- Show relationships between tables
- Create sample orders and users

## Database Schema Details

### Users Table
- Stores customer information and authentication data
- Includes automatic timestamps for tracking
- Email field is unique and indexed

### Categories Table
- Organizes products into logical groups
- Simple name and description structure
- Used for product filtering and navigation

### Products Table
- Complete product catalog with pricing
- Links to categories via foreign key
- Includes inventory tracking and SKU management
- Supports active/inactive status

### Orders Table
- Tracks customer orders through their lifecycle
- Supports multiple order statuses (pending, processing, shipped, delivered, cancelled)
- Stores both shipping and billing addresses
- Links to users via foreign key

### Order Items Table
- Individual line items for each order
- Links to both orders and products
- Captures pricing at time of order (historical data)
- Supports quantity and calculated totals

## Testing

The project includes comprehensive tests for all database operations. Tests are designed to work with or without a live database connection.

```bash
# Run all tests
npm test

# Run only database tests
npm run test:db

# Run tests in watch mode
npm run test:watch
```

## Connection Management

The database client uses connection pooling for optimal performance:

- **Pool Size**: Maximum 20 concurrent connections
- **Idle Timeout**: 30 seconds
- **Connection Timeout**: 2 seconds
- **Automatic Cleanup**: Connections are properly released

## Error Handling

All database operations include proper error handling:

- Connection failures are logged and propagated
- SQL errors include context information
- Pool errors trigger application restart for safety

## Security Considerations

- Use environment variables for database credentials
- Implement proper password hashing (bcrypt recommended)
- Use parameterized queries to prevent SQL injection
- Regularly update dependencies for security patches

## Performance Tips

- The schema includes strategic indexes for common queries
- Use connection pooling for concurrent operations
- Consider adding caching for frequently accessed data
- Monitor slow queries and add indexes as needed

## Migration Strategy

For production deployments:
1. Use a proper migration tool (e.g., db-migrate, Flyway)
2. Version your schema changes
3. Test migrations on staging environments
4. Backup databases before major changes

This implementation provides a solid foundation for an ecommerce application with room for extension based on specific business requirements.