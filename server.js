const express = require('express'); 
const mongodb = require('./data/database');
require('dotenv').config();
const session = require('express-session'); 
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const githubStrategy = require('passport-github2').Strategy;

const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
// this was for the CORS error handling and for swagger to work properly
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next(); 
});
// Session middleware
app.use(
  session({
    secret: 'secretkey',
    resave: false,
    saveUninitialized: true,
  })
);
// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE', 'UPDATE', 'PATCH'], origin: '*' }));

passport.use(new githubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    // Here, you would typically find or create a user in your database
    // For simplicity, we'll just return the GitHub profile
    return done(null, profile);
}));
// Import local strategy configuration
require('./utilities/localStrategy');



  // Routes
app.use('/', require('./route/index'));

app.get('/', (req, res) => {res.send(req.session.user !== undefined ? 'User is logged in' : 'User is not logged in');});

app.get('/github/callback', passport.authenticate('github', { failureRedirect: '/api-docs', session: false }), (req, res) => {
    // Successful authentication, redirect home.
    req.session.user = req.user;
    res.redirect('/');
});


// Serialize user
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user


passport.deserializeUser((obj, done) => {
  done(null, obj);
});
// Global error handling middleware
app.use(async (err, req, res, next) => {

    console.error(`Error at: "${req.path}": ${err.message}`);
    res.status(err.status || 500).json({
        message: err.message || "Internal Server Error"
    });
});


mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  }
});