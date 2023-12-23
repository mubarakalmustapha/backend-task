const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../../../index");
const Category = require("../../../models/category").Category;

describe("Product Categories API", () => {
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
    // Clear all categories before each test
    await Category.deleteMany({});
  });

  describe("GET /api/product-categories", () => {
    it("should get all product categories", async () => {
      // Insert some sample categories for testing
      await Category.insertMany([
        { name: "Category 1" },
        { name: "Category 2" },
      ]);

      const response = await supertest(app).get("/api/product-categories");

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(2);
    });
  });

  describe("POST /api/product-categories", () => {
    it("should create a new product category", async () => {
      const category = { name: "New Category" };

      const response = await supertest(app)
        .post("/api/product-categories")
        .send(clearIntervalategory);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("_id");
      expect(response.body.name).toBe("New Category");

      // Check if the category was actually added to the database
      const categoryInDB = await Category.findOne({ name: "New Category" });
      expect(categoryInDB).not.toBeNull();
    });

    it("should handle validation error for creating a category", async () => {
      const invalidCategory = { name: "" };

      const response = await supertest(app)
        .post("/api/product-categories")
        .send(invalidCategory);

      expect(response.status).toBe(400);
      expect(response.text).toContain("Name is required");
    });
  });
});
