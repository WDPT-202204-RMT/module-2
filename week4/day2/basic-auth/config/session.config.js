// config/session.config.js

// require session
const session = require('express-session');

// require connect-mongo
const MongoStore = require('connect-mongo');

// since we are going to USE this middleware in the app.js,
// let's export it and have it receive a parameter
module.exports = (app) => {
  // <== app is just a placeholder here
  // but will become a real "app" in the app.js
  // when this file gets imported/required there

  // required for the app when deployed to Heroku (in production)
  app.set('trust proxy', 1);

  // use session
  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: true,

      // If we want to save a session that stores information put to false.
      // If we want to save all the session even the ones that does not store information. Put to true
      saveUninitialized: false,
      cookie: {
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 60000 * 60, // 60 * 1000 ms === 1 min
      },
      store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/basic-auth',
      }),
    })
  );
};
