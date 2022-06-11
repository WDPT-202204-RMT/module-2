const router = require('express').Router();

const Book_model = require('../models/Book.model');

router.get('/books/create', (req, res) => {
  res.render('books-folder/book-create');
});

router.post('/books/create', (req, res) => {
  const { title, author, description, rating } = req.body; // this is an object

  //   const small = new Tank({ size: 'small' });
  //   small.save(function (err) {
  //     if (err) return handleError(err);
  //     // saved!
  //   });

  //   or

  //   Tank.create({ size: 'small' }, function (err, small) {
  //     if (err) return handleError(err);
  //     // saved!
  //   });

  Book_model.create({ title, author, description, rating })
    .then(() => res.redirect('/books'))
    .catch((err) => console.log(err));
});

router.get('/books', (req, res) => {
  Book_model.find()
    .then((allBooks) => {
      console.log(allBooks);
      res.render('books-folder/books-view', { books: allBooks });
    })
    .catch((err) => console.log(err));
});

router.get('/books/:id', (req, res, next) => {
  console.log(req.params.id);
  const { id } = req.params;
  console.log(id);

  Book_model.findById(id)
    .then((TheBook) => {
      res.render('books-folder/book-details', { book: TheBook });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

router.get("/books/:id/edit", (req, res, next) => {
  const {id} = req.params;
  Book_model.findById(id).then((TheBook) => {
    res.render('books-folder/book-edit', {book: TheBook})
  }).catch((err) => {
    next(err);
  })
})

router.post("/books/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { title, description, author, rating } = req.body
  Book_model.findByIdAndUpdate(id, {title, description, author, rating}, {new:true}).then((updatedBook) => {
    res.redirect(`/books/${updatedBook._id}`);
  })
})

router.post("/books/:id/delete", (req, res, next) => {
  const {id} = req.params;

  Book_model.findByIdAndDelete(id).then(() => {
    res.redirect("/books")
  })
})

module.exports = router;
