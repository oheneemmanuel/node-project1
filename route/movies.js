const express = require('express');

const router = express.Router();

const movieController = require('../controllers/movie');
const validate = require('../utilities/movies-validation');
const utilities = require('../utilities');
router.get('/', movieController.getAllMovies); 

router.get('/:id', movieController.getSingleMovie);

router.post(
    '/', 
    validate.CreateMovieRules(), 
    validate.checkMovieData, 
    utilities.handleErrors(movieController.createMovie)

);

router.put(
    '/:id', 
    validate.idParamRule(),
    validate.updateMovieRules(),
    validate.checkUpdateMovieData,
    movieController.updateMovie
);

router.delete('/:id', movieController.deleteMovie);

module.exports = router;