/**
 * Database module for PostgreSQL ecommerce functionality
 */

export {
  createPool,
  getPool,
  closePool,
  testConnection,
  type DatabaseConfig,
} from "./connection.js";

export {
  DatabaseClient,
  type User,
  type Category,
  type Product,
  type Order,
  type OrderItem,
} from "./client.js";

// Create a default database client instance
import { DatabaseClient } from "./client.js";
export const db = new DatabaseClient();