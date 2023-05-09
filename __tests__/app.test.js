const request = require("supertest");
const app = require("../app/app");
const connection = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index.js");
const endpoints = require("../endpoints.json");

afterAll(() => {
  connection.end();
});

beforeEach(() => {
  return seed(data);
});

describe("app", () => {
  describe("/api", () => {
    test("GET: 200, responds with the conents of the endpoint.json file", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.endpoints).toEqual(endpoints);
        });
    });
    describe("/api/topics", () => {
      test("GET: 200, responds with an array of topics", () => {
        return request(app)
          .get("/api/topics")
          .expect(200)
          .then((result) => {
            expect(result.body.topics.length).toBe(3);
            result.body.topics.forEach((topic) => {
              expect(typeof topic.description).toBe("string");
                expect(typeof topic.slug).toBe("string");
                
            });
              console.log(result)
          });
      });
    });
  })
    describe("err handeling ", () => {
        test("when and url is invalid, respond with a 404", () => {
            return request(app)
                .get("/api/setirsti")
                .expect(404)
                .then(({ body }) => {
                    expect(body.msg).toBe("please enter a valid url");
                })
        })
    })
});
