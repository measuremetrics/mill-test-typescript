import { Pool, QueryResult } from "pg";
import { getPool } from "./connection.js";

/**
 * User interface
 */
export interface User {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  password_hash: string;
  created_at?: Date;
  updated_at?: Date;
}

/**
 * Category interface
 */
export interface Category {
  id?: number;
  name: string;
  description?: string;
  created_at?: Date;
}

/**
 * Product interface
 */
export interface Product {
  id?: number;
  name: string;
  description?: string;
  price: number;
  category_id?: number;
  stock_quantity: number;
  sku?: string;
  image_url?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

/**
 * Order interface
 */
export interface Order {
  id?: number;
  user_id: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  shipping_address: string;
  billing_address?: string;
  created_at?: Date;
  updated_at?: Date;
}

/**
 * Order item interface
 */
export interface OrderItem {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  created_at?: Date;
}

/**
 * Database client for ecommerce operations
 */
export class DatabaseClient {
  private pool: Pool;

  constructor(pool?: Pool) {
    this.pool = pool || getPool();
  }

  /**
   * Execute a raw SQL query
   */
  async query(text: string, params?: any[]): Promise<QueryResult> {
    const client = await this.pool.connect();
    try {
      return await client.query(text, params);
    } finally {
      client.release();
    }
  }

  // User operations
  async createUser(user: Omit<User, 'id' | 'created_at' | 'updated_at'>): Promise<User> {
    const result = await this.query(
      `INSERT INTO users (email, first_name, last_name, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [user.email, user.first_name, user.last_name, user.password_hash]
    );
    return result.rows[0];
  }

  async getUserById(id: number): Promise<User | null> {
    const result = await this.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const result = await this.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0] || null;
  }

  async getAllUsers(): Promise<User[]> {
    const result = await this.query('SELECT * FROM users ORDER BY created_at DESC');
    return result.rows;
  }

  // Category operations
  async createCategory(category: Omit<Category, 'id' | 'created_at'>): Promise<Category> {
    const result = await this.query(
      `INSERT INTO categories (name, description)
       VALUES ($1, $2)
       RETURNING *`,
      [category.name, category.description]
    );
    return result.rows[0];
  }

  async getCategoryById(id: number): Promise<Category | null> {
    const result = await this.query('SELECT * FROM categories WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async getAllCategories(): Promise<Category[]> {
    const result = await this.query('SELECT * FROM categories ORDER BY name');
    return result.rows;
  }

  // Product operations
  async createProduct(product: Omit<Product, 'id' | 'created_at' | 'updated_at'>): Promise<Product> {
    const result = await this.query(
      `INSERT INTO products (name, description, price, category_id, stock_quantity, sku, image_url, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        product.name,
        product.description,
        product.price,
        product.category_id,
        product.stock_quantity,
        product.sku,
        product.image_url,
        product.is_active ?? true,
      ]
    );
    return result.rows[0];
  }

  async getProductById(id: number): Promise<Product | null> {
    const result = await this.query('SELECT * FROM products WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    const result = await this.query(
      'SELECT * FROM products WHERE category_id = $1 AND is_active = true ORDER BY name',
      [categoryId]
    );
    return result.rows;
  }

  async getAllProducts(activeOnly: boolean = false): Promise<Product[]> {
    const whereClause = activeOnly ? 'WHERE is_active = true' : '';
    const result = await this.query(
      `SELECT * FROM products ${whereClause} ORDER BY created_at DESC`
    );
    return result.rows;
  }

  async updateProductStock(id: number, stockQuantity: number): Promise<Product | null> {
    const result = await this.query(
      'UPDATE products SET stock_quantity = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [stockQuantity, id]
    );
    return result.rows[0] || null;
  }

  // Order operations
  async createOrder(order: Omit<Order, 'id' | 'created_at' | 'updated_at'>): Promise<Order> {
    const result = await this.query(
      `INSERT INTO orders (user_id, status, total_amount, shipping_address, billing_address)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [order.user_id, order.status, order.total_amount, order.shipping_address, order.billing_address]
    );
    return result.rows[0];
  }

  async getOrderById(id: number): Promise<Order | null> {
    const result = await this.query('SELECT * FROM orders WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async getOrdersByUser(userId: number): Promise<Order[]> {
    const result = await this.query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  }

  async updateOrderStatus(id: number, status: Order['status']): Promise<Order | null> {
    const result = await this.query(
      'UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
      [status, id]
    );
    return result.rows[0] || null;
  }

  // Order item operations
  async createOrderItem(orderItem: Omit<OrderItem, 'id' | 'created_at'>): Promise<OrderItem> {
    const result = await this.query(
      `INSERT INTO order_items (order_id, product_id, quantity, unit_price, total_price)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [orderItem.order_id, orderItem.product_id, orderItem.quantity, orderItem.unit_price, orderItem.total_price]
    );
    return result.rows[0];
  }

  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    const result = await this.query(
      'SELECT * FROM order_items WHERE order_id = $1',
      [orderId]
    );
    return result.rows;
  }

  /**
   * Get order with items and product details
   */
  async getOrderWithDetails(orderId: number): Promise<any> {
    const result = await this.query(
      `SELECT
         o.*,
         json_agg(
           json_build_object(
             'id', oi.id,
             'quantity', oi.quantity,
             'unit_price', oi.unit_price,
             'total_price', oi.total_price,
             'product', json_build_object(
               'id', p.id,
               'name', p.name,
               'description', p.description,
               'sku', p.sku,
               'image_url', p.image_url
             )
           )
         ) as items
       FROM orders o
       LEFT JOIN order_items oi ON o.id = oi.order_id
       LEFT JOIN products p ON oi.product_id = p.id
       WHERE o.id = $1
       GROUP BY o.id`,
      [orderId]
    );
    return result.rows[0] || null;
  }

  /**
   * Initialize database with schema and seed data
   */
  async initializeDatabase(): Promise<void> {
    // Note: In a real application, you'd typically use a migration tool
    // This is a simple implementation for demonstration
    const fs = await import('fs/promises');
    const path = await import('path');
    const { fileURLToPath } = await import('url');

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    try {
      // Execute schema
      const schemaSQL = await fs.readFile(path.join(__dirname, 'schema.sql'), 'utf-8');
      await this.query(schemaSQL);

      // Execute seed data
      const seedSQL = await fs.readFile(path.join(__dirname, 'seed.sql'), 'utf-8');
      await this.query(seedSQL);

      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }
}