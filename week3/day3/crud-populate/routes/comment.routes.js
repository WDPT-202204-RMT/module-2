const router = require("express").Router();

const User = require("../models/User.model");
const Post = require("../models/Post.model");
const Comment = require("../models/Comment.model");

// ****************************************************************************************
// POST route - create a comment of a specific post
// ****************************************************************************************
router.post("/posts/:postId/comment", async(req, res) => {
  const {postId} = req.params;
  const {author, content} = req.body

  let user = await User.findOne({username: author});
  if (!user) {
    user = await User.create({username: author});
  }
  const comment = await Comment.create({author: user._id, content})
  await Post.findByIdAndUpdate(postId, {$push: {"comments": comment._id}});
  res.redirect(`/posts/${postId}`)
})
// ... your code here

module.exports = router;
