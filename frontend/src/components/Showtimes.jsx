import { useState } from "react";
import PropTypes from "prop-types";

const Showtimes = ({ showtimes, onShowtimeSelect }) => {
  // State to track the selected showtime
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  // Handle click on a showtime button
  const handleShowtimeClick = (showtime) => {
    // Toggle the selected showtime
    setSelectedShowtime((prevSelectedShowtime) =>
      prevSelectedShowtime === showtime ? null : showtime
    );

    // Call the callback function with the selected showtime
    onShowtimeSelect(showtime);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Showtimes:</h3>
      {showtimes ? (
        <div>
          {showtimes.map((showtime) => (
            <button
              key={showtime.id}
              // Simplified classnames and removed unnecessary transition duration
              className={`showtime-button border p-2 rounded-md mx-1 ${
                selectedShowtime === showtime
                  ? "bg-blue-700 text-white"
                  : "hover:bg-blue-700 hover:text-white"
              }`}
              onClick={() => handleShowtimeClick(showtime)}
            >
              <div>{new Date(showtime.date).toLocaleDateString()}</div>
              <div>{new Date(showtime.date).toLocaleTimeString()}</div>
            </button>
          ))}
        </div>
      ) : (
        <p className="mb-4 text-gray-400">No showtimes available</p>
      )}
    </div>
  );
};

// PropTypes for input validation
Showtimes.propTypes = {
  showtimes: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.string])
        .isRequired,
    })
  ),
  onShowtimeSelect: PropTypes.func.isRequired,
};

export default Showtimes;
