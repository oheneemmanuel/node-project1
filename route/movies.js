const express = require('express');

const router = express.Router();

const movieController = require('../controllers/movie');
const validate = require('../utilities/movies-validation');
const utilities = require('../utilities');
const authenticate = require('../utilities/authenticate');
router.get('/', movieController.getAllMovies); 

router.get('/:id', movieController.getSingleMovie);

router.post(
    '/', 
    authenticate.isAuthenticated,
    validate.CreateMovieRules(), 
    validate.checkMovieData, 
    utilities.handleErrors(movieController.createMovie)

);

router.put(
    '/:id', 
    authenticate.isAuthenticated,
    validate.idParamRule(),
    validate.updateMovieRules(),
    validate.checkUpdateMovieData,
    movieController.updateMovie
);

router.delete('/:id', authenticate.isAuthenticated, movieController.deleteMovie);

module.exports = router;