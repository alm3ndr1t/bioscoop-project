import PropTypes from "prop-types";
import MovieInfo from "./MovieInfo";
import Showtimes from "./Showtimes";

const MovieDetailCard = ({ movie, onShowtimeSelect }) => {
  if (!movie) {
    return null;
  }

  const thumbnailStyle = {
    backgroundImage: `url(${movie.thumbnail})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "300px",
    width: "95%",
    margin: "20px auto",
    borderRadius: "10px",
  };

  return (
    <div className="flex flex-col">
      {/* Thumbnail as background */}
      <div style={thumbnailStyle}></div>

      {/* Movie details underneath */}
      <div className="p-2 pl-14 text-left text-white">
        <h1 className="text-4xl font-bold mb-2 underline underline-offset-8">
          {movie.title}
        </h1>

        <MovieInfo movie={movie} />

        {/* Pass showtimes directly to Showtimes component */}
        <Showtimes
          showtimes={movie.showtimes}
          onShowtimeSelect={onShowtimeSelect}
        />
      </div>
    </div>
  );
};

MovieDetailCard.propTypes = {
  movie: PropTypes.shape({
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    extract: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ),
    showtimes: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.oneOfType([
          PropTypes.instanceOf(Date),
          PropTypes.string,
        ]).isRequired,
      })
    ),
    cast: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
      })
    ),
  }),
  onShowtimeSelect: PropTypes.func,
};

export default MovieDetailCard;
