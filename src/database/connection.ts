import { Pool, PoolConfig } from "pg";

/**
 * Database connection configuration
 */
export interface DatabaseConfig extends PoolConfig {
  host?: string;
  port?: number;
  database?: string;
  user?: string;
  password?: string;
}

/**
 * Default database configuration
 */
const defaultConfig: DatabaseConfig = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  database: process.env.DB_NAME || "ecommerce",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

/**
 * PostgreSQL connection pool
 */
let pool: Pool | null = null;

/**
 * Create a new database connection pool
 */
export function createPool(config: DatabaseConfig = {}): Pool {
  if (pool) {
    return pool;
  }

  const finalConfig = { ...defaultConfig, ...config };
  pool = new Pool(finalConfig);

  // Handle pool errors
  pool.on("error", (err) => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1);
  });

  return pool;
}

/**
 * Get the current database connection pool
 */
export function getPool(): Pool {
  if (!pool) {
    pool = createPool();
  }
  return pool;
}

/**
 * Close the database connection pool
 */
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

/**
 * Test database connection
 */
export async function testConnection(): Promise<boolean> {
  try {
    const client = await getPool().connect();
    const result = await client.query("SELECT NOW()");
    client.release();
    return result.rowCount !== null && result.rowCount > 0;
  } catch (error) {
    console.error("Database connection test failed:", error);
    return false;
  }
}