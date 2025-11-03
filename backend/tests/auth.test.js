// import { describe, it, expect, beforeAll, afterAll } from "vitest";
// import request from "supertest";
// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";
// import { MongoMemoryServer } from "mongodb-memory-server";
// import app from "../app.js";
// import User from "../models/User.js"; // ✅ import your User model

// let mongoServer;

// beforeAll(async () => {
//   // 🧠 Start temporary MongoDB
//   mongoServer = await MongoMemoryServer.create();
//   const uri = mongoServer.getUri();

//   await mongoose.connect(uri);

//   // ✅ Create a test user for login tests
//   const hashedPassword = await bcrypt.hash("password123", 12);
//   await User.create({
//     username: "loginuser01",
//     name: "Login User",
//     email: "loginuser01@example.com",
//     password: "password123",
//     passwordConfirm: "password123"
//   });
// });

// afterAll(async () => {
//   // 🧹 Clean up DB and close connection
//   await mongoose.connection.dropDatabase();
//   await mongoose.connection.close();
//   await mongoServer.stop();
// });

// describe("🧪 Auth API Tests", () => {
//   it("POST /api/auth/register → should successfully register a new user", async () => {
//     const res = await request(app)
//       .post("/api/auth/register")
//       .send({
//         username: "testuser01",
//         name: "Test User",
//         email: "testuser01@example.com",
//         password: "password123",
//         passwordConfirm: "password123"
//       });

//     expect(res.statusCode).toBe(200);
//     expect(res.body.status).toBe("success");
//     expect(res.body).toHaveProperty("token");
//     expect(res.body.data).toHaveProperty("user");
//     expect(res.body.data.user).toHaveProperty("email");
//   });

//   it("POST /api/auth/login → should successfully login with correct credentials", async () => {
//     const res = await request(app)
//       .post("/api/auth/login")
//       .send({
//         email: "loginuser01@example.com",
//         password: "password123",
//       });

//     expect(res.statusCode).toBe(200);
//     expect(res.body.status).toBe("success");
//     expect(res.body).toHaveProperty("token");
//     expect(res.body.data).toHaveProperty("user");
//     expect(res.body.data.user.email).toBe("loginuser01@example.com");
//   });

//   it("POST /api/auth/login → should fail for wrong credentials", async () => {
//     const res = await request(app)
//       .post("/api/auth/login")
//       .send({
//         email: "test@example.com",
//         password: "wrongpassword",
//       });
//     expect(res.statusCode).toBe(401);
//   });
// });

import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app.js";
import User from "../models/User.js"; // ✅ import your User model

let mongoServer;

beforeAll(async () => {
  // 🧠 Start temporary MongoDB
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);

  // ✅ Create a test user for login tests
  const hashedPassword = await bcrypt.hash("password123", 12);
  await User.create({
    username: "loginuser01",
    name: "Login User",
    email: "loginuser01@example.com",
    password: "password123",
    passwordConfirm: "password123",
  });
});

afterAll(async () => {
  // 🧹 Clean up DB and close connection
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe("🧪 Auth API Tests", () => {
  // ✅ Your existing 3 working tests
  it("POST /api/auth/register → should successfully register a new user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        username: "testuser01",
        name: "Test User",
        email: "testuser01@example.com",
        password: "password123",
        passwordConfirm: "password123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body).toHaveProperty("token");
    expect(res.body.data).toHaveProperty("user");
    expect(res.body.data.user).toHaveProperty("email");
  });

  it("POST /api/auth/login → should successfully login with correct credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "loginuser01@example.com",
        password: "password123",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(res.body).toHaveProperty("token");
    expect(res.body.data).toHaveProperty("user");
    expect(res.body.data.user.email).toBe("loginuser01@example.com");
  });

  it("POST /api/auth/login → should fail for wrong credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "test@example.com",
        password: "wrongpassword",
      });
    expect(res.statusCode).toBe(401);
  });

  // 🧠 Additional Edge Cases
  it("POST /api/auth/login → should fail when email is missing", async () => {
    const res = await request(app).post("/api/auth/login").send({
      password: "password123",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/email/i);
  });

  it("POST /api/auth/login → should fail when password is missing", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "loginuser01@example.com",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/password/i);
  });

  it("POST /api/auth/register → should reject invalid email format", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "invalidemail",
      name: "Invalid Email",
      email: "not-an-email",
      password: "password123",
      passwordConfirm: "password123",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/valid email/i);
  });

  it("POST /api/auth/register → should fail if password and confirm do not match", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "mismatchuser",
      name: "Mismatch User",
      email: "mismatch@example.com",
      password: "password123",
      passwordConfirm: "differentpass",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/match/i);
  });

  it("POST /api/auth/register → should fail if email already exists", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "duplicateuser",
      name: "Duplicate User",
      email: "loginuser01@example.com", // already used
      password: "password123",
      passwordConfirm: "password123",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/exists|duplicate/i);
  });

  it("POST /api/auth/register → should reject short passwords", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "shortpassuser",
      name: "Short Password",
      email: "shortpass@example.com",
      password: "12",
      passwordConfirm: "12",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/password/i);
  });

  it("POST /api/auth/register → should reject if username is missing", async () => {
    const res = await request(app).post("/api/auth/register").send({
      name: "No Username",
      email: "nousername@example.com",
      password: "password123",
      passwordConfirm: "password123",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/username/i);
  });
});
