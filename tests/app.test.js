const request = require("supertest");
const app = require("../src/app");

describe("Microservice API", () => {
  describe("GET /health", () => {
    it("should return health status", async () => {
      const response = await request(app).get("/health").expect(200);

      expect(response.body).toHaveProperty("status", "OK");
      expect(response.body).toHaveProperty("timestamp");
      expect(response.body).toHaveProperty("service", "my-microservice");
      expect(response.body).toHaveProperty("version");
    });
  });

  describe("GET /api/v1/status", () => {
    it("should return service status", async () => {
      const response = await request(app).get("/api/v1/status").expect(200);

      expect(response.body).toHaveProperty("message");
      expect(response.body).toHaveProperty("environment");
    });
  });

  describe("GET /api/v1/users", () => {
    it("should return list of users", async () => {
      const response = await request(app).get("/api/v1/users").expect(200);

      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toHaveProperty("id");
      expect(response.body[0]).toHaveProperty("name");
      expect(response.body[0]).toHaveProperty("email");
    });
  });

  describe("POST /api/v1/users", () => {
    it("should create a new user", async () => {
      const userData = {
        name: "Test User",
        email: "test@example.com",
      };

      const response = await request(app)
        .post("/api/v1/users")
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("name", userData.name);
      expect(response.body).toHaveProperty("email", userData.email);
      expect(response.body).toHaveProperty("createdAt");
    });

    it("should return 400 if name is missing", async () => {
      const userData = {
        email: "test@example.com",
      };

      const response = await request(app)
        .post("/api/v1/users")
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty("error");
    });

    it("should return 400 if email is missing", async () => {
      const userData = {
        name: "Test User",
      };

      const response = await request(app)
        .post("/api/v1/users")
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty("error");
    });
  });

  describe("404 handler", () => {
    it("should return 404 for unknown routes", async () => {
      const response = await request(app).get("/api/v1/unknown").expect(404);

      expect(response.body).toHaveProperty("error", "Route not found");
    });
  });
});
