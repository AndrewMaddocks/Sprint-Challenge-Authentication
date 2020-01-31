const request = require("supertest");
const server = require("../api/server");
describe("auth-router.js", function() {
  describe("enviroment", function() {
    it("should set enviroment to testing", function() {
      expect(process.env.DB_ENV).toBe("testing"); // make sure it fails put "development" in place of testing
    });
  });
  describe("post /Register", function() {
    it.skip("should return a 201 created", function() {
      return request(server) //make sure to put return
        .post("/api/auth/register")
        .send({
          username: "peter",
          password: "alaska"
        })
        .then(res => {
          expect(res.status).toBe(201); //test 400 to see if it fails
        });
    });
    it("should return a 500", function() {
      return request(server) //make sure to put return
        .post("/api/auth/register")
        .send({
          username: "peter",
          passwordhollio: "alaska"
        })
        .then(res => {
          expect(res.status).toBe(500); //test 400 to see if it fails
        });
    });
  });
  describe("post /login", function() {
    it.skip("should return a array", function() {
      return request(server) //make sure to put return
        .send({
          username: "peter",
          password: "alaska"
        })
        .then(res => {
          const token = res.body.token;
          return request(server)
            .post("/api/auth/login")
            .set("Authorization", token)
            .then(res => {
              expect(Object.isObject(res.body)).toBe(false);
            });
        });
    });
    it("should return a JSON Match", function() {
      // spin up the server
      return request(server) //make sure to put return
        .post("/api/auth/login")
        .then(res => {
          expect(res.type).toMatch(/json/i); //test Html to see if it fails
        });
    });
    it("should return a 200", function() {
      return request(server) //make sure to put return
        .post("/api/auth/login")
        .send({
          username: "peter",
          password: "alaska"
        })
        .then(res => {
          expect(res.status).toBe(200); //test 400 to see if it fails
        });
    });
  });
});
