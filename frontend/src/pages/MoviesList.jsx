import { useQuery } from "react-query";
import axios from "axios";
import MovieCard from "../components/MovieCard";
// import { FaSearch } from "react-icons/fa"; // Placeholder icon for search

const MoviesList = () => {
  const {
    data: movies,
    isLoading,
    isError,
  } = useQuery(
    "movies",
    async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/movies");
        return response.data;
      } catch (error) {
        console.error("Error fetching movies:", error);
        throw error; // Re-throw the error to be caught by the useQuery hook
      }
    },
    {
      refetchInterval: 300000, // 300,000 milliseconds = 5 minutes
    }
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin border-t-4 border-white rounded-full h-12 w-12"></div>
      </div>
    );
  }

  if (isError || !movies || movies.length === 0) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Error loading movies or no movies available.
        </h2>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-9">
        {movies.slice(0, 54).map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
