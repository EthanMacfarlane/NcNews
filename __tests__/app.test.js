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
            console.log(result);
          });
      });
    });
    describe("/api/articles/:article_id", () => {
      test("GET: 200, respond with the article corosponding to the article id", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then((result) => {
            expect(typeof result.body.article.author).toBe("string");
            expect(typeof result.body.article.title).toBe("string");
            expect(typeof result.body.article.article_id).toBe("number");
            expect(typeof result.body.article.body).toBe("string");
            expect(typeof result.body.article.topic).toBe("string");
            expect(typeof result.body.article.created_at).toBe("string");
            expect(typeof result.body.article.votes).toBe("number");
            expect(typeof result.body.article.article_img_url).toBe("string");
          });
      });
    });
  });

  describe("error handeling ", () => {
    describe("/api/INVALID ", () => {
      test("when and url is invalid, respond with a 404", () => {
        return request(app)
          .get("/api/setirsti")
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe("please enter a valid url");
          });
      });
    });
  });
  describe("/api/articles/INVALID", () => {
    test('status 400 responds with error message "Bad request!"', () => {
      return request(app)
        .get("/api/articles/nonsense")
        .expect(400)
        .then((result) => {
          expect(result.body.msg).toBe("Bad request!");
        });
    });
  });
  describe("/api/articles/2000000", () => {
    test('status 404 responds with error message "Not found!"', () => {
      return request(app)
        .get("/api/articles/200000")
        .expect(404)
        .then((result) => {
          expect(result.body.msg).toBe("Not found!");
        });
    });
  });
});
