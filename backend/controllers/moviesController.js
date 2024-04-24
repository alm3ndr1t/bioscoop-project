// controllers/moviesController.js

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { validationResult } = require("express-validator");
const moviesValidator = require("../validator/movieValidator");

// Get a list of all movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await prisma.movie.findMany({
      include: {
        genres: true,
        cast: true,
        showtimes: true,
      },
    });
    res.json(movies);
  } catch (error) {
    console.error("Error retrieving movies:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a movie by ID
const getMovieById = async (req, res) => {
  // Validation
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  try {
    const movieId = parseInt(req.params.id);
    const movie = await prisma.movie.findUnique({
      where: { id: movieId },
      include: {
        genres: true,
        cast: true,
        showtimes: true,
      },
    });

    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    console.error("Error retrieving movie by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a movie by title
const getMovieByTitle = async (req, res) => {
  // Validation
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    return res.status(400).json({ errors: validationErrors.array() });
  }

  try {
    const movieTitle = req.params.title;
    const movie = await prisma.movie.findFirst({
      where: { title: movieTitle },
      include: {
        genres: true,
        cast: true,
        showtimes: true,
      },
    });

    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: "Movie not found" });
    }
  } catch (error) {
    console.error("Error retrieving movie by title:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  getMovieByTitle,
};
