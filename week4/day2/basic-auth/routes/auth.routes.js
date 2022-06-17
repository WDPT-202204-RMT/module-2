const { Router } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

const saltRounds = 10;
const router = Router();

router.get("/signup", (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({ email, username, password: hash });
    res.redirect("/profile");
  } catch (error) {
    next(error);
  }
  /*   bcrypt
    .genSalt(saltRounds)
    .then((salt) => bcrypt.hash(password, salt))
    .then((hash) => User.create({ username, email, password: hash }))
    .then((user) => {
      console.log(user);
    })
    .catch((err) => next(err)); */
});

router.get("/profile", (req, res) => {
  res.render("users/user-profile");
});

module.exports = router;
