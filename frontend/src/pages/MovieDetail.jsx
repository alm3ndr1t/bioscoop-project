import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import fetchMovie from "../api/movie";
import MovieDetailCard from "../components/MovieDetailCard";
import Seats from "../components/Seats";
import axios from "axios";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  // Define handleSeatSelect function
  const handleSeatSelect = (selectedSeats) => {
    // Your logic for handling selected seats
    console.log("Selected Seats:", selectedSeats);
    setSelectedSeats(selectedSeats);
  };

  // Define handleShowtimeSelect function
  const handleShowtimeSelect = (showtime) => {
    // Your logic for handling selected showtime
    console.log("Selected Showtime:", showtime);
    setSelectedShowtime(showtime);
  };

  useEffect(() => {
    const getMovieDetail = async () => {
      try {
        const movieData = await fetchMovie(id);
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie detail:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieDetail();
  }, [id]);

  const handlePurchase = async () => {
    try {
      if (movie && selectedShowtime && selectedShowtime.id) {
        // Make a POST request to your backend endpoint
        const response = await axios.post(
          "http://localhost:3000/api/bookings/book/purchase",
          {
            seats: selectedSeats,
            showtimeId: selectedShowtime.id,
          }
        );

        console.log(response.data);
      } else {
        console.error("Movie data or showtime ID is not available.");
      }
    } catch (error) {
      console.error("Error purchasing ticket:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin border-t-4 border-white rounded-full h-12 w-12"></div>
      </div>
    );
  }

  if (isError || !movie) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          Error loading movie or no movie available.
        </h2>
      </div>
    );
  }

  return (
    <div>
      <MovieDetailCard movie={movie} onShowtimeSelect={handleShowtimeSelect} />
      <Seats onSeatSelect={handleSeatSelect} />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handlePurchase}
      >
        Purchase Ticket
      </button>
    </div>
  );
};

export default MovieDetail;
