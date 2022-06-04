const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  pages: {
    type: Number,
    required: true,
    min: 0,
  },
  summary: {
    type: String,
    required: true,
  },
});

bookSchema.index({ title: "text" });

const Book = model("Book", bookSchema);

module.exports = Book;
