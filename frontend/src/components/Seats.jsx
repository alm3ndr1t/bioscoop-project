import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Seats = ({ onSeatSelect }) => {
  const seatsPerRow = 7;
  const [seatData, setSeatData] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    const fetchSeatData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/bookings/book/seats');
        if (response.status === 200) {
          setSeatData(response.data);
        } else {
          console.error('Failed to fetch seat data:', response.statusText);
        }
      } catch (error) {
        console.error('Error while fetching seat data:', error.message);
      }
    };

    fetchSeatData();
  }, []);

  const handleSeatClick = (seatNumber) => {
    // Check if the seat is already selected
    const isSeatSelected = selectedSeats.includes(seatNumber);

    // Update selected seats based on current state
    if (isSeatSelected) {
      setSelectedSeats(selectedSeats.filter((selectedSeat) => selectedSeat !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }

    // Call the callback function to notify the parent component (MovieDetail) about the selected seats
    onSeatSelect(selectedSeats);
  };

  const renderSeats = () => {
    return seatData.map((seat) => (
      <button
        key={seat.id}
        className={`bg-${selectedSeats.includes(seat.seatNumber) ? 'green' : 'blue'}-500 w-[60px] md:w-[40px] lg:w-[80px] font-bold py-2 rounded mx-3 mb-3 flex flex-col items-center transition duration-300 hover:bg-${selectedSeats.includes(seat.seatNumber) ? 'green' : 'blue'}-700 hover:text-white focus:outline-none focus:ring focus:border-${selectedSeats.includes(seat.seatNumber) ? 'green' : 'blue'}-300`}
        onClick={() => handleSeatClick(seat.seatNumber)}
      >
        {seat.seatNumber}
        <span className="text-xs mt-1">Seat {seat.seatNumber}</span>
      </button>
    ));
  };

  const renderSeatRows = () => {
    const seatRows = [];

    for (let i = 0; i < seatData.length; i += seatsPerRow) {
      seatRows.push(
        <div key={i} className="flex flex-wrap justify-center">
          {renderSeats().slice(i, i + seatsPerRow)}
        </div>
      );
    }

    return seatRows;
  };

  return (
    <div className="seats-container text-center">
      <h2 className="text-3xl font-bold mb-0.5 text-white">Seats</h2>
      <p className="pb-3 text-white text-sm">(screen this way)</p>
      {renderSeatRows()}
    </div>
  );
};

Seats.propTypes = {
  onSeatSelect: PropTypes.func.isRequired,
};

export default Seats;
