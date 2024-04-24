// routes/movies.js

const express = require('express');
const router = express.Router();

const moviesController = require('../controllers/moviesController');
const moviesValidator = require('../validator/movieValidator');

// Route to get a list of all movies 
router.get('/', moviesController.getAllMovies);

// Route to get a movie by ID
router.get('/:id([0-9]+)', moviesValidator.findByIdValidator, moviesController.getMovieById);

// Corrected Route to get a movie by title
router.get('/:title', moviesValidator.findByTitleValidator, moviesController.getMovieByTitle);

module.exports = router;
