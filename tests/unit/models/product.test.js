const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../../../index");
const Category = require("../../../models/category").Category;
const Product = require("../../../models/product").Product;

describe("Product API", () => {
  beforeAll(async () => {
    // Connect to the test database
    const db = config.get("db");
    await mongoose.connect(db);
  });

  afterAll(async () => {
    // Disconnect from the test database
    await mongoose.disconnect();
  });

  beforeEach(async () => {
    // Clear all categories and products before each test
    await Category.deleteMany({});
    await Product.deleteMany({});
  });

  describe("POST /api/products", () => {
    it("should create a new product", async () => {
      // Create a category first
      const category = await Category.create({ name: "Test Category" });

      const product = {
        name: "Test Product",
        description: "Test description",
        ingredients: "Test ingredients",
        categoryId: category._id,
        defaultPrice: 10.99,
        salesPrice: 8.99,
        productImage: "test.jpg",
        requiredOptions: [
          { name: "Option 1", choice: "Choice 1", required: true },
          { name: "Option 2", choice: "Choice 2", required: false },
        ],
      };

      const response = await supertest(app).post("/api/products").send(product);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("_id");
      expect(response.body.name).toBe("Test Product");

      // Check if the product was actually added to the database
      const productInDB = await Product.findOne({ name: "Test Product" });
      expect(productInDB).not.toBeNull();
    });

    it("should handle validation error for creating a product", async () => {
      const invalidProduct = { name: "Invalid Product" };

      const response = await supertest(app)
        .post("/api/products")
        .send(invalidProduct);

      expect(response.status).toBe(400);
      expect(response.text).toContain("Category ID is required");
    });
  });
});
