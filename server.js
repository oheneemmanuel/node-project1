const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const mongodb = require('./data/database');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
  origin: ['http://localhost:3000', 'https://node-project1-zjxy.onrender.com' ],
  credentials: true,               
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']
}));
app.enable('trust proxy'); // If behind a proxy (e.g., Heroku, Nginx)
// 1. Session Configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'secretkey', // Use env variable if possible
  resave: false,
  saveUninitialized: false, // Keep false for security
  cookie: { 
    secure: true, // true only if using HTTPS
    httpOnly: true, 
    sameSite: 'none',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  } 
}));

// 2. Passport Initialization (Crucial Order)
app.use(passport.initialize());
app.use(passport.session());

// 3. Serialization (Simplified to ensure it fits in a cookie)
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

// 4. GitHub Strategy
const GitHubStrategy = require('passport-github2').Strategy;
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

// 5. Test Route (Positioned after Passport)
app.get('/test-session', (req, res) => {
  res.json({
    isAuthenticated: req.isAuthenticated(),
    user: req.user || null,
    session: req.session
  });
});

// 6. Auth Routes
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/auth/login-failed', session: true }),
  (req, res) => {
    // FORCE SAVE the session before redirecting
    req.session.save((err) => {
      if (err) return next(err);
      res.redirect('/'); 
    });
  }
);

// 7. Main Routes
app.use('/', require('./route/index'));

// Home route (Uses req.user instead of manual session.user)
app.get('/', (req, res) => {
  res.send(req.isAuthenticated() 
    ? `Logged in as ${req.user.username || req.user.displayName}` 
    : 'User is not logged in');
});

app.get('/auth/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.json({ message: 'Logged out successfully' });
    });
  });
});

// Error handling & Database
app.use((err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  res.status(err.status || 500).json({ message: err.message });
});

mongodb.initDb(err => {
  if (err) console.error(err);
  else app.listen(port, () => console.log(`Server running on port ${port}`));
});