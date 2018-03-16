var express = require("express");
var router = express.Router();
var Book = require("../models/book");

/* GET books listing. */
router.get("/", async (req, res, next) => {
  try {
    const books = await Book.find({});
    res.json(books);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", (req, res) => {
  res.json({ message: `get book with id ${req.params.id}` });
});

router.post("/", async (req, res, next) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      summary: req.body.summary
    });
    const book = await newBook.save();
    console.log("saving book");
    res.json({ message: "book created", book: book });
  } catch (err) {
    console.log("catcing error");
    next(err);
  }
});

router.put("/:id", async (req, res) => {
  requestBody = {
    title: req.body.title,
    summary: req.body.summary
  };

  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      requestBody,
      { new: true }
    );

    res.json({
      message: "book updated",
      book: updatedBook
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", (req, res) => {
  res.json({ message: `delete book with id ${req.params.id}` });
});

module.exports = router;
