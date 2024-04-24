import axios from "axios";

const BASE_URL = "http://localhost:3000/api/movies";

const fetchMovie = async (movieId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie data:", error);
    throw error;
  }
};

export default fetchMovie;
