const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Get all contacts
const getAllMovies = async (req, res) => {
  try {
    const db = mongodb.getDatabase();
    const results = await db.collection('movies').find().toArray();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleMovie = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const db = mongodb.getDatabase();
    const result = await db.collection('movies').findOne({ _id: userId });

    if (!result) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createMovie = async (req, res) => {
    // Implementation for creating a movie
    try {
        const db = mongodb.getDatabase();
        const newMovie = {
            title: req.body.title,
            director: req.body.director,
            releaseYear: req.body.releaseYear,
            description: req.body.description,
            genre: req.body.genre,
            rating: req.body.rating,
            duration: req.body.duration
        };
        const result = await db.collection('movies').insertOne(newMovie);
        if (result.acknowledged && result.insertedId) {
            res.status(201).json({ message: 'Movie created Successfully', movieId: result.insertedId });
        }
        else {
            res.status(500).json({ message: 'Failed to create movie' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMovie = async (req, res) => {
  try {
    const movieId = new ObjectId(req.params.id);
    const movie = {
      title: req.body.title,
      director: req.body.director,
      releaseYear: req.body.releaseYear,
      description: req.body.description,
      genre: req.body.genre,
      rating: req.body.rating,
      duration: req.body.duration
    
    };

    const db = mongodb.getDatabase();
    const result = await db
      .collection('movies')
      .replaceOne({ _id: movieId }, movie);

    if (result.matchedCount > 0) {
      res.status(200).json({ message: 'Movie updated successfully!' });
    } else {
      res.status(404).json({ message: 'Movie not found!' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movieId = new ObjectId(req.params.id);
    const db = mongodb.getDatabase();
    const result = await db.collection('movies').deleteOne({ _id: movieId });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Movie deleted successfully!' });
    } else {
      res.status(404).json({ message: 'Movie not found!' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllMovies,
  getSingleMovie,
  createMovie,
  updateMovie,
  deleteMovie
}