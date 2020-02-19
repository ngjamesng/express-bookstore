const app = require("../app");
const db = require("../db");
const request = require("supertest");
const Book = require("../models/book");

describe("Post Books Routes Test", function () {
  let bookObj;
  beforeEach(async function () {
    await db.query("DELETE FROM books");

    bookObj = {isbn: "1234567789",
        amazon_url: "http://www.crazy.com",
        author: "James Ng",
        language: "Cobol",
        pages: 450,
        publisher: "Penguin",
        title: "How to succeed in Cobol",
        year: 1980};
  });

  describe("POST /books", function () {
    test("can create book", async function () {
      let result = await request(app).post("/books").send(bookObj);
      expect(result.body.book).toEqual(bookObj);
      })
    });

  describe("PUT /books", function () {
    test("can edit a book", async function () {
      
      await request(app).post("/books").send(bookObj);
      let bookObj2 = {...bookObj};
      bookObj2.title = "CHANGED forever by Cobol";
      let result = await request(app).put(`/books/${bookObj2.isbn}`).send(bookObj2);
      
      expect(result.body.book).toEqual(bookObj2);
      })
    });
  });

afterAll(async function () {
  await db.end();
});