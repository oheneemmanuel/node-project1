const bcrypt = require('bcryptjs');
const { getUsersCollection } = require('../model/user-model');

const registerUser = async (req, res, next) => {
  try {
    const { firstName, email, password } = req.body;

    // basic check
    if (!firstName || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const users = getUsersCollection();

    // check if user exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save user
    await users.insertOne({
      firstName,
      email,
      password: hashedPassword,
      createdAt: new Date()
    });

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { registerUser };
