const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../../../index");
const User = require("../../../models/user");
const config = require("config");

describe("Tesing register and login", () => {
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
    // Clear all users before each test
    await User.deleteMany({});
  });

  describe("POST /api/register", () => {
    it("should register a new user", async () => {
      const response = await supertest(app).post("/api/register").send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
        userType: "customer",
      });

      expect(response.status).toBe(200);
      expect(response.header).toHaveProperty("x-auth-token");
      expect(response.body).toHaveProperty("_id");
      expect(response.body).toHaveProperty("name", "Test User");
      expect(response.body).toHaveProperty("email", "test@example.com");
      expect(response.body).toHaveProperty("userType", "customer");
    });

    it("should handle validation error for registration", async () => {
      const response = await supertest(app).post("/api/register").send({
        name: "Invalid User",
        email: "invalidemail",
        password: "pass",
        userType: "invalidType",
      });

      expect(response.status).toBe(400);
    });
  });

  describe("POST /api/login", () => {
    it("should log in a registered user", async () => {
      // Attempt to log in with the registered credentials
      const response = await supertest(app).post("/api/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("x-auth-token");
    });

    it("should handle invalid credentials during login", async () => {
      // Attempt to log in with invalid credentials
      const response = await supertest(app).post("/api/login").send({
        email: "nonexistent@example.com",
        password: "invalidpassword",
      });

      expect(response.status).toBe(400);
      expect(response.text).toContain("Invalid user or password");
    });

    it("should handle validation error for login", async () => {
      // Attempt to log in with invalid data
      const response = await supertest(app).post("/api/login").send({
        email: "invalidemail",
        password: "pass",
      });

      expect(response.status).toBe(400);
    });
  });
});
