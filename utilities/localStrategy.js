const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const { getUsersCollection } = require('../model/user-model');

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const users = getUsersCollection();
      const user = await users.findOne({ email });
      if (!user) return done(null, false, { message: 'Incorrect email' });

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return done(null, false, { message: 'Incorrect password' });

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;
