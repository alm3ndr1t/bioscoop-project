import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import fetchMovie from "../api/movie";
import { useNavigate } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery(['movie', movie.id], () => fetchMovie(movie.id));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching movie data</div>;
  }

  return (
    <div className="mx-auto p-4 transition-transform transform hover:scale-125"
      onClick={() => {
        navigate(`/movies/${movie.id}`);
      }}
    >
      <img src={data.thumbnail} alt={data.title} className="rounded-2xl h-[250px] w-[350px] object-contain mb-2" />
      <h2 className="text-xl font-semibold mb-2 text-white">{data.title}</h2>
      <p className="text-sm text-gray-100">{data.year}</p>
    </div>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieCard;
