const { Schema, model } = require('mongoose');

const BookSchema = new Schema(
  {
    title: String,
    description: String,
    author: String,
    rating: Number,
    // creationDate: {
    //     type: Date,
    //     default: Date.now()
    // }
  },
  {
    timestamps: true,
  }
);

const Book = model('Book', BookSchema);

module.exports = Book;
