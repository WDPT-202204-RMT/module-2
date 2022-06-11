const router = require("express").Router();

const User = require("../models/User.model");
const Post = require("../models/Post.model");

// ****************************************************************************************
// GET route to display the form to create a new post
// ****************************************************************************************

// localhost:3000/post-create
router.get("/post-create", (req, res) => {
  User.find()
    .then((dbUsers) => {
      res.render("posts/create", { dbUsers });
    })
    .catch((err) => console.log(`Err while displaying post input page: ${err}`));
});

// ****************************************************************************************
// POST route to submit the form to create a post
// ****************************************************************************************
router.post("/post-create", (req, res, next) => {
  const {title, author, content} = req.body;
  Post.create({title, author, content}).then((newPost) => {
    return User.findByIdAndUpdate(author, { $push: {posts: newPost._id}})
  })
  .then(() => {
    res.redirect("/posts")
  })
  .catch((err) => {
    next(err);
  })
})
// <form action="/post-create" method="POST">

// ... your code here

// ****************************************************************************************
// GET route to display all the posts
// ****************************************************************************************
router.get("/posts", (req, res, next) => {
  Post.find().populate("author").then((posts) => {
    res.render("posts/list", {posts})
  })
})
// ... your code here

// ****************************************************************************************
// GET route for displaying the post details page
// shows how to deep populate (populate the populated field)
// ****************************************************************************************
router.get("/posts/:id", (req, res) => {
  const {id} = req.params
  Post.findById(id).populate("author").populate("comments").populate({
    path: 'comments',
    populate: {
      path: 'author',
      model: 'User'
    }
  }).then((post) => {
    res.render('posts/details', {post});
  })
})
// ... your code here

module.exports = router;
