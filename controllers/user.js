const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Get all contacts
const getAllUsers = async (req, res) => {
  try {
    const db = mongodb.getDatabase();
    const results = await db.collection('user').find().toArray();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const db = mongodb.getDatabase();
    const result = await db.collection('user').findOne({ _id: userId });
    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createUser = async (req, res) => {
    // Implementation for creating a user
    try {
        const db = mongodb.getDatabase();
        const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        };
        const result = await db.collection('user').insertOne(newUser);
        if (result.acknowledged && result.insertedId) {
            res.status(201).json({ message: 'User created Successfully', userId: result.insertedId });
        }
        else {
            res.status(500).json({ message: 'Failed to create user' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const updateUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const user = {
      firstName: req.body.firstName,
      email: req.body.email,
      password: req.body.password,
    };

    const db = mongodb.getDatabase();
    const result = await db
      .collection('user')
      .replaceOne({ _id: userId }, user);

    if (result.matchedCount > 0) {
      res.status(200).json({ message: 'User updated successfully!' });
    } else {
      res.status(404).json({ message: 'User not found!' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const db = mongodb.getDatabase();
    const result = await db.collection('user').deleteOne({ _id: userId });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'user deleted successfully!' });
    } else {
      res.status(404).json({ message: 'user not found!' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser    
}