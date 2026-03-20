export { capitalize, slugify, truncate, kebabCase } from "./strings.js";
export { chunk, unique, groupBy, flatten } from "./arrays.js";
export { clamp, lerp, roundTo } from "./math.js";
export {
  db,
  DatabaseClient,
  createPool,
  getPool,
  closePool,
  testConnection,
  type User,
  type Category,
  type Product,
  type Order,
  type OrderItem,
  type DatabaseConfig
} from "./database/index.js";
