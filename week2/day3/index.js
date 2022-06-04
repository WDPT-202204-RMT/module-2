const express = require("express");
const app = express();
const hbs = require("hbs");
const bodyParser = require("body-parser");
require("./database");
const Book = require("./models/Book");

app.set("views", __dirname + "/views");
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  const { search } = req.query;
  let books;
  if (!search) {
    books = await Book.find();
  } else {
    books = await Book.find({ $text: { $search: search } });
  }
  res.render("home", { books });
});

app.get("/search/:search", async (req, res) => {
  let books = await Book.find({ $text: { $search: req.params.search } });
  res.render("home", { books });
});

app.get("/books/create", (req, res) => {
  res.render("book/create");
});

app.post("/books/create", async (req, res) => {
  const { title, pages, summary } = req.body;
  await Book.create({ title, pages, summary });
  res.redirect("/");
});

app.get("/books/:bookId", async (req, res) => {
  const { bookId } = req.params;
  const book = await Book.findById(bookId);
  res.render("book/details", book);
});

app.listen(3000, () => console.log("App listening on port 3000!"));
