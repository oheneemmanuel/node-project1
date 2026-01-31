// route/authRoute.js
//const router = require('express').Router();
//const passport = require('passport');
//const { registerUser } = require('../controllers/authController');
//
//// -----------------
//// REGISTER (Local)
//// -----------------
//router.post('/register', registerUser);
//
//// -----------------
//// LOGIN (Local: email/password)
//// -----------------
//router.post('/login', (req, res, next) => {
//  passport.authenticate('local', (err, user, info) => {
//    if (err) return next(err);
//    if (!user) return res.status(400).json({ message: info?.message || 'Login failed' });
//
//    // Log in user and save to session
//    req.logIn(user, err => {
//      if (err) return next(err);
//      req.session.user = user;
//      res.json({
//        message: 'Logged in successfully',
//        user: {
//          email: user.email,
//          firstName: user.firstName
//        }
//      });
//    });
//  })(req, res, next);
//});
//
//// -----------------
//// GITHUB LOGIN
//// -----------------
//router.get(
//  '/github',
//  passport.authenticate('github', { scope: ['user:email'] }) // triggers GitHub login page
//);
//
//// -----------------
//// GITHUB CALLBACK
//// -----------------
//router.get(
//  '/github/callback',
//  passport.authenticate('github', {
//    failureRedirect: '/auth/login-failed',
//    session: true
//  }),
//  (req, res) => {
//    // Successful login, save user to session
//    req.session.user = req.user;
//    res.redirect('/'); // Redirect to homepage or your dashboard
//  }
//);
//
//// -----------------
//// LOGIN FAILED
//// -----------------
//router.get('/login-failed', (req, res) => {
//  res.status(401).json({ message: 'Authentication failed' });
//});
//
//// -----------------
//// LOGOUT
//// -----------------
//router.get('/logout', (req, res) => {
//  req.logout(() => {
//    req.session.destroy();
//    res.json({ message: 'Logged out successfully' });
//  });
//});
//
//module.exports = router;
//

const router = require('express').Router();
const passport = require('passport');

// -----------------
// LOGIN (Local)
// -----------------
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info?.message || 'Login failed' });

    req.logIn(user, (err) => {
      if (err) return next(err);
      // NOTE: We don't manually set req.session.user here. 
      // Passport handles it. req.user is now available.
      res.json({
        message: 'Logged in successfully',
        user: { email: user.email, firstName: user.firstName }
      });
    });
  })(req, res, next);
});

// -----------------
// GITHUB CALLBACK
// -----------------
router.get(
  '/github/callback',
  passport.authenticate('github', { 
    failureRedirect: '/auth/login-failed',
    session: true 
  }),
  (req, res) => {
    // Passport has already attached the user to req.user here.
    // If using a frontend framework, redirect to your frontend URL:
    res.redirect('http://localhost:3000/'); 
  }
);

// -----------------
// LOGOUT
// -----------------
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy((err) => {
      if (err) return next(err);
      res.clearCookie('connect.sid'); // Clean up the cookie
      res.json({ message: 'Logged out successfully' });
    });
  });
});

module.exports = router;