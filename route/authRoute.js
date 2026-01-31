const router = require('express').Router();
const passport = require('passport');
const { registerUser } = require('../controllers/authController');

// -----------------
// REGISTER
// -----------------
router.post('/register', registerUser);

// -----------------
// LOGIN (Local: email/password)
// -----------------
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(400).json({ message: info.message || 'Login failed' });

    req.logIn(user, (err) => {
      if (err) return next(err);
      res.json({
        message: 'Logged in successfully',
        user: { email: user.email, firstName: user.firstName }
      });
    });
  })(req, res, next);
});

// -----------------
// GITHUB LOGIN
// -----------------
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

// -----------------
// GITHUB CALLBACK
// -----------------
router.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/auth/login',
    session: true
  }),
  (req, res) => {
    // User is now logged in via GitHub
    req.session.user = req.user;

    res.json({
      message: 'GitHub login successful',
      user: {
        username: req.user.username,
        displayName: req.user.displayName
      }
    });
  }
);

// -----------------
// LOGOUT
// -----------------
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
