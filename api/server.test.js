// Write your tests here
const request = require("supertest");
const server = require("./server.js");
const db = require("../data/dbConfig.js");
const testUser = { username: "test", password: "test" };
// let token = undefined;

beforeAll(async () => {
  return await db("users").truncate();
});

test("sanity", () => {
  expect(true).toBe(true);

  describe("server.js", () => {
    describe("GET request for jokes", () => {
      it("should return status code 400 when not logged in", async () => {
        const res = await request(server).get("/api/jokes");
        expect(res.status).toBe(400);
      });
      it("should return json", async () => {
        const res = await request(server).get("/api/jokes");
        expect(res.type).toBe("application/json");
      });
    });
    describe("registering new user", () => {
      it("should return with status 201 when adding new user", async () => {
        await db("users").truncate();
        const res = await request(server)
          .post("/api/auth/register")
          .send(testUser);
        expect(res.status).toBe(201);
      });
      it("should return a status 500 with invalid user", async () => {
        const res = await request(server)
          .post("/api/auth/register")
          .send({ user: "test", pass: "test" });
        expect(res.status).toBe(500);
      });
    });
    describe("login w/ user", () => {
      it("returns 200 with test user", async () => {
        const res = await request(server)
          .post("/api/auth/login")
          .send(testUser);
        expect(res.status).toBe(200);
      });
      it("returns 401 when invalid creds entered", async () => {
        const res = await request(server)
          .post("/api/auth/login")
          .send({ username: "does not exist", password: "does not exist" });
      });
    });
  });
});
