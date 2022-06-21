const isLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    console.log('cannot find a user in the session, the you got denied');
    req.session.error = 'you need to loggin to access this page';
    return res.redirect('/login');
  }
  next();
};

const isLoggedOut = (req, res, next) => {
  if (req.session.currentUser) {
    console.log(
      'You are already loggin in, why the helld do you to go to the login page ?!!!!'
    );
    return res.redirect('/profile');
  }
  next();
};

module.exports = {
  isLoggedIn,
  isLoggedOut,
};
