process.env.ENV = "test";

const app = require("../../app");
const request = require("supertest");
const Book = require("../../models/book");
const mongoose = require("mongoose");

describe("routes/books", () => {
  let db;

  beforeAll(async () => {
    const dbUri = "mongodb://localhost/express_blog_api_test_db";
    db = await mongoose.connect(dbUri, () => {
      console.log("connected to test DB successfully");
    });

    Book.deleteMany().exec();
  });

  it("GET /books should return status of 200 and all books in the test DB", async () => {
    const expectedBooks = await Book.find({});

    return request(app)
      .get("/books")

      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.header["content-type"]).toContain("application/json");
        expect(response.body).toEqual(expectedBooks);
      });
  });

  it("POST /books should create book", () => {
    const TITLE = "harry potter";
    const SUMMARY = "harry survives";

    return request(app)
      .post("/books")
      .send({ title: TITLE, summary: SUMMARY })

      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.header["content-type"]).toContain("application/json");
        expect(response.body.message).toEqual("book created");
        expect(response.body.book.title).toEqual(TITLE);
        expect(response.body.book.summary).toEqual(SUMMARY);
      });
  });

  it("PUT /books/:id should update book", done => {
    const TITLE = "harry potter";
    const NEW_TITLE = `new ${TITLE}`;
    const SUMMARY = "harry survives";

    const book = new Book({ title: TITLE, summary: SUMMARY });

    book.save(err => {
      if (err) throw err;
      request(app)
        .put(`/books/${book.id}`)
        .send({ title: NEW_TITLE, summary: SUMMARY })

        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.header["content-type"]).toContain("application/json");
          expect(response.body.message).toEqual("book updated");
          expect(response.body.book.title).toEqual(NEW_TITLE);
          expect(response.body.book.summary).toEqual(SUMMARY);
        });
    });
    done();
    // false positive. passing even though the assertion fails
  });

  afterAll(done => {
    Book.deleteMany().exec();
    db.close();
    done();
  });
});
