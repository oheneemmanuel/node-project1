const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Get all contacts
const getAllDirectors = async (req, res) => {
  try {
    const db = mongodb.getDatabase();
    const results = await db.collection('directors').find().toArray();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleDirector = async (req, res) => {
  try {
    const directorId = new ObjectId(req.params.id);
    const db = mongodb.getDatabase();
    const result = await db.collection('directors').findOne({ _id: directorId });

    if (!result) {
      return res.status(404).json({ message: 'Director not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createDirector = async (req, res) => {
    // Implementation for creating a director
    try {
        const db = mongodb.getDatabase();
        const newDirector = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            nationality: req.body.nationality,
            birthYear: req.body.birthYear,
            famousFor: req.body.famousFor,
            createdAt: req.body.createdAt
        };
        const result = await db.collection('directors').insertOne(newDirector);
        if (result.acknowledged && result.insertedId) {
            res.status(201).json({ message: 'Director created Successfully', directorId: result.insertedId });
        }
        else {
            res.status(500).json({ message: 'Failed to create director' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const updateDirector = async (req, res) => {
  try {
    const directorId = new ObjectId(req.params.id);
    const director = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      birthYear: req.body.birthYear,
      famousFor: req.body.famousFor,
      createdAt: req.body.createdAt
    };

    const db = mongodb.getDatabase();
    const result = await db
      .collection('directors')
      .replaceOne({ _id: directorId }, director);

    if (result.matchedCount > 0) {
      res.status(200).json({ message: 'Director updated successfully!' });
    } else {
      res.status(404).json({ message: 'Director not found!' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteDirector = async (req, res) => {
  try {
    const directorId = new ObjectId(req.params.id);
    const db = mongodb.getDatabase();
    const result = await db.collection('directors').deleteOne({ _id: directorId });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Director deleted successfully!' });
    } else {
      res.status(404).json({ message: 'Director not found!' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllDirectors,
  getSingleDirector,
  createDirector,
  updateDirector,
  deleteDirector    
}