process.env.ENV = "test";

const app = require("../../app");
const request = require("supertest");

describe("routes/index", () => {
  it("/ should return status of 200 and a response body of { message: express-blog-api }", () => {
    return request(app)
      .get("/")
      .set("Accept", "application/json")
      .expect(200)
      .expect("Content-Type", /json/)
      .expect({ message: "hello express-blog-api" });
  });

  it("you can also use promises", () => {
    return request(app)
      .get("/")
      .set("Accept", "application/json")
      .expect(200)
      .expect("Content-Type", /json/)
      .then(function(response) {
        // then you can jest's assertions which we're familiar with
        expect(response.body).toEqual({ message: "hello express-blog-api" });

        // another way of writing the same thing
        expect(response.body.message).toEqual("hello express-blog-api");
      })
      .catch(err => {
        expect(err).toEqual("");
      });
  });
});
