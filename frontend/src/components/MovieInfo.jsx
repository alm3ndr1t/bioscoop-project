// import React from "react";
import PropTypes from "prop-types";

const MovieInfo = ({ movie }) => {
  return (
    <div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Extract:</h3>
        <p className="text-sm mb-4 text-gray-400">{movie.extract}</p>
      </div>

      <div className="mb-2">
        <p className="pb-1 text-gray-400">
          <strong className="text-white">Release Year:</strong>{" "}
          <span className="text-gray-400">{movie.year}</span>
        </p>
        <p className="pb-1 text-gray-400">
          <strong className="text-white">Genres:</strong>{" "}
          {movie.genres &&
            movie.genres.map((genre) => genre.name).join(" | ")}
        </p>
      </div>

      <h3 className="text-xl font-semibold mb-2">Cast:</h3>
      {movie.cast ? (
        <p className="mb-4 text-gray-400">
          {movie.cast.map((actor) => actor.name).join(" | ")}
        </p>
      ) : (
        <p className="mb-4 text-gray-400">No cast information available</p>
      )}
    </div>
  );
};

MovieInfo.propTypes = {
  movie: PropTypes.shape({
    extract: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ),
    cast: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ),
  }),
};

export default MovieInfo;
