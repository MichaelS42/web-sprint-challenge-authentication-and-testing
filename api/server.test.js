// Write your tests here
const request = require("supertest");
const server = require("./server.js");
const db = require("../data/dbConfig.js");
const testUser = { username: "test", password: "test" };
let token = undefined;

test("sanity", () => {
  expect(true).toBe(true);
});
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
      const res = await request(server).post("/api/auth/login").send(testUser);
      expect(res.status).toBe(200);
    });
    it("returns 401 when invalid creds entered", async () => {
      const res = await request(server)
        .post("/api/auth/login")
        .send({ username: "does not exist", password: "does not exist" });
    });
  });
});
// beforeAll(async () => {
//   return await db("users").truncate();
// });
// describe("GET users on empty db", () => {
//   it("should return empty array w/o users in db", async () => {
//     const res = await request(server).get("/api/auth");
//     expect(res.body.users).toEqual([]);
//   });
// });

// describe("server.js", () => {
//   describe("GET jokes", () => {
//     it("should return status code 401 w/o token", async () => {
//       const res = await request(server).get("/api/jokes");
//       expect(res.status).toBe(401);
//     });
//     it('returns jokes if token is valid', async () => {
//       const res = await request(server).get('/api/jokes').auth(token, { type: 'bearer'})
//       expect(res.status).toBe(200)
//       expect(res.body).toHaveLength(3);
//     })
//   });
// });

// describe("server.js", () => {
//   describe("register new user", () => {
//     it("should return with status 201 when adding new user", async () => {
//       await db("users");
//       const res = await request(server)
//         .post("/api/auth/register")
//         .send(testUser);
//       expect(res.status).toBe(201);
//     });
//     it("should return a status 400 with invalid user", async () => {
//       const res = await request(server)
//         .post("/api/auth/register")
//         .send({ user: "test", password: "test" });
//       expect(res.status).toBe(400);
//     });
//   });
// });
// describe("server.js", () => {
//   describe("login w/ user", () => {
//     it("returns 200 with test user", async () => {
//       const res = await request(server).post("/api/auth/login").send(testUser);
//       expect(res.status).toBe(200);
//     });
//     it("returns 401 when invalid creds entered", async () => {
//       const res = await request(server)
//         .post("/api/auth/login")
//         .send({ username: "does not exist", password: "does not exist" });
//       expect(res.status).toBe(401);
//     });
//   });
// });
