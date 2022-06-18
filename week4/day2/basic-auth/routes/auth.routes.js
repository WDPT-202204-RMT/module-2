const { Router } = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');

const saltRounds = 10;
const router = Router();

// Route that renders the from
router.get('/signup', (req, res) => {
  res.render('auth/signup');
});

// Route that process the form request
router.post('/signup', async (req, res, next) => {
  const { username, email, password } = req.body;

  // Check if the fields are empty. If so, sends an error message.
  if (!username || !email || !password) {
    res.render('auth/signup', {
      errorMessage:
        'All fields are mandatory. Please provide your username, email and password.',
    });
    return;
  }

  // Does the password contains digits, lowercase lettres, uppurcase lettres and is at least 6 char long
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

  if (!regex.test(password)) {
    res.status(501).render('auth/signup', {
      errorMessage:
        'The password must contain uppercase and lowercase letter, digits and be at least 6 characters long',
    });
    return;
  }

  try {
    // pLain => Is the Unhashed password // Tanvie123
    // Hashed => Is the "safe" password // e2p9dplojspogz477 == Tanvie123
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    const user = await User.create({ email, username, password: hash });
    res.status(201).redirect('/profile');
  } catch (error) {
    //console.log(error);
    //Checks if the Mongoose validation passes. If not, send the mongoose error to the view
    if (error instanceof mongoose.Error.ValidationError) {
      // Is my error comming from mongoose.
      res.render('auth/signup', {
        errorMessage: error.message,
      });
    }
    // If this error comes from mongo and the code is 11000 => Wich means unique validation failed
    else if (error.code === 11000) {
      res.render('auth/signup', {
        errorMessage: ' Username and email already exist',
      });
    }

    //console.log(error);
    //next(error);
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

router.get('/profile', (req, res) => {
  res.render('users/user-profile');
});

module.exports = router;
