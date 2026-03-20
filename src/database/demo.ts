#!/usr/bin/env node
/**
 * Demo script showing how to use the PostgreSQL ecommerce database
 *
 * To run this demo:
 * 1. Ensure PostgreSQL is running
 * 2. Create a database named 'ecommerce'
 * 3. Set environment variables if needed (DB_HOST, DB_PORT, etc.)
 * 4. Run: node dist/database/demo.js (after compilation)
 */

import { db, closePool } from "./index.js";

async function runDemo() {
  try {
    console.log("🚀 Starting PostgreSQL Ecommerce Database Demo");

    // Initialize database with schema and seed data
    console.log("\n📊 Initializing database...");
    await db.initializeDatabase();
    console.log("✅ Database initialized successfully");

    // Test basic operations
    console.log("\n👥 Getting all users...");
    const users = await db.getAllUsers();
    console.log(`Found ${users.length} users:`);
    users.slice(0, 3).forEach(user => {
      console.log(`  - ${user.first_name} ${user.last_name} (${user.email})`);
    });

    console.log("\n🏷️  Getting all categories...");
    const categories = await db.getAllCategories();
    console.log(`Found ${categories.length} categories:`);
    categories.forEach(category => {
      console.log(`  - ${category.name}: ${category.description}`);
    });

    console.log("\n📦 Getting all products...");
    const products = await db.getAllProducts(true); // Active products only
    console.log(`Found ${products.length} active products:`);
    products.slice(0, 5).forEach(product => {
      console.log(`  - ${product.name}: $${product.price} (Stock: ${product.stock_quantity})`);
    });

    // Get products by category
    if (categories.length > 0) {
      console.log(`\n📱 Getting products in category '${categories[0].name}'...`);
      const categoryProducts = await db.getProductsByCategory(categories[0].id!);
      console.log(`Found ${categoryProducts.length} products in this category:`);
      categoryProducts.forEach(product => {
        console.log(`  - ${product.name}: $${product.price}`);
      });
    }

    // Get user orders
    if (users.length > 0) {
      const firstUser = users[0];
      console.log(`\n🛍️  Getting orders for ${firstUser.first_name} ${firstUser.last_name}...`);
      const userOrders = await db.getOrdersByUser(firstUser.id!);
      console.log(`Found ${userOrders.length} orders:`);

      for (const order of userOrders.slice(0, 2)) {
        console.log(`  - Order #${order.id}: ${order.status} - $${order.total_amount}`);

        // Get order details
        const orderDetails = await db.getOrderWithDetails(order.id!);
        if (orderDetails?.items) {
          console.log(`    Items:`);
          orderDetails.items.forEach((item: any) => {
            console.log(`      * ${item.product.name} x${item.quantity} = $${item.total_price}`);
          });
        }
      }
    }

    // Demo creating a new user
    console.log("\n➕ Creating a new user...");
    const newUser = await db.createUser({
      email: `demo-${Date.now()}@example.com`,
      first_name: "Demo",
      last_name: "User",
      password_hash: "$2b$10$demohash"
    });
    console.log(`✅ Created user: ${newUser.first_name} ${newUser.last_name} (ID: ${newUser.id})`);

    // Demo creating a new product
    console.log("\n➕ Creating a new product...");
    const newProduct = await db.createProduct({
      name: "Demo Widget",
      description: "A demonstration product",
      price: 49.99,
      category_id: categories[0]?.id || null,
      stock_quantity: 25,
      sku: `DEMO-${Date.now()}`,
      image_url: "https://example.com/demo-widget.jpg"
    });
    console.log(`✅ Created product: ${newProduct.name} (ID: ${newProduct.id}) - $${newProduct.price}`);

    // Demo creating a new order
    console.log("\n➕ Creating a new order...");
    const newOrder = await db.createOrder({
      user_id: newUser.id!,
      status: "pending",
      total_amount: 149.97,
      shipping_address: "456 Demo Ave, Demo City, DC 12345",
      billing_address: "456 Demo Ave, Demo City, DC 12345"
    });
    console.log(`✅ Created order: #${newOrder.id} for user ${newUser.id} - $${newOrder.total_amount}`);

    // Add items to the order
    console.log("\n➕ Adding items to the order...");
    await db.createOrderItem({
      order_id: newOrder.id!,
      product_id: newProduct.id!,
      quantity: 3,
      unit_price: newProduct.price,
      total_price: newProduct.price * 3
    });

    // Get the complete order details
    const completeOrder = await db.getOrderWithDetails(newOrder.id!);
    console.log(`✅ Order #${completeOrder.id} now has ${completeOrder.items?.length || 0} item(s)`);

    // Update order status
    console.log("\n🔄 Updating order status...");
    const updatedOrder = await db.updateOrderStatus(newOrder.id!, "processing");
    console.log(`✅ Order #${updatedOrder?.id} status updated to: ${updatedOrder?.status}`);

    // Update product stock
    console.log("\n📦 Updating product stock...");
    const updatedProduct = await db.updateProductStock(newProduct.id!, newProduct.stock_quantity - 3);
    console.log(`✅ Product ${updatedProduct?.name} stock updated to: ${updatedProduct?.stock_quantity}`);

    console.log("\n🎉 Demo completed successfully!");
    console.log("\n📋 Summary of operations performed:");
    console.log("  ✅ Database initialization with schema and seed data");
    console.log("  ✅ User management (create, read)");
    console.log("  ✅ Category management (read)");
    console.log("  ✅ Product management (create, read, update stock)");
    console.log("  ✅ Order management (create, read, update status)");
    console.log("  ✅ Order item management (create, read with details)");
    console.log("\n💡 Check your PostgreSQL database to see the data!");

  } catch (error) {
    console.error("❌ Demo failed with error:", error);

    if (error instanceof Error) {
      if (error.message.includes("ECONNREFUSED")) {
        console.log("\n💡 Troubleshooting:");
        console.log("  - Make sure PostgreSQL is running");
        console.log("  - Check your connection settings (host, port, credentials)");
        console.log("  - Ensure the database 'ecommerce' exists");
      } else if (error.message.includes("authentication failed")) {
        console.log("\n💡 Troubleshooting:");
        console.log("  - Check your database username and password");
        console.log("  - Verify PostgreSQL authentication settings");
      }
    }
  } finally {
    // Close database connection
    await closePool();
    console.log("\n🔌 Database connection closed");
  }
}

// Run the demo
if (import.meta.url === `file://${process.argv[1]}`) {
  runDemo().catch(console.error);
}