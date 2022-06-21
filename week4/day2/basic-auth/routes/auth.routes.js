const { Router, application } = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const { isLoggedIn, isLoggedOut } = require('../middleware/route-guard');

const saltRounds = 10;
const router = Router();

// Route that renders the from
router.get('/signup', isLoggedOut, (req, res) => {
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
});

// We are going to implement the login route

router.get('/login', isLoggedOut, (req, res) => {
  res.render('auth/signin', { error: req.session.error });
});

router.get('/profile', isLoggedIn, (req, res) => {
  //console.log(req.session);
  console.log('Verification passed, you can acces this page');
  res.render('users/user-profile', { user: req.session.currentUser });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // If the from is empty
  if (!email || !password) {
    res.render('auth/signin', {
      errorMessage: 'Please fill all the fields',
    });
    return;
  }

  // I need to check is I have a user inside my db that has this email.
  // {email: "enes@ironhack.com"}
  User.findOne({ email: email }).then((userFromDb) => {
    // If the person does not exists. Send an error.
    if (!userFromDb) {
      res.render('auth/signin', {
        errorMessage:
          'There is no user with this email adress. Please create an account or verify you credentials',
      });
      return;
    }

    // We need to verify if the password that we recive from the FROM matches the password of the userFromDb

    // This function tells us if the password that we recieve from the FORM matches the password that we stored in the DB
    if (!bcrypt.compareSync(password, userFromDb.password)) {
      res.render('auth/signin', {
        errorMessage: 'Invalid Credentials',
      });
      return;
    }

    req.session.currentUser = userFromDb;
    res.redirect('/profile');
  });
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/login');
  });
});

module.exports = router;
