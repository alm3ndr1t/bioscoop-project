// Account.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext"; // Corrected the import path
import { getUserById } from "../api/user";
import AccountCard from "../components/AccountCard";

const Account = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user data only if the user is authenticated
        if (user) {
          const fetchedUserData = await getUserById(user.id);
          setUserData(fetchedUserData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  return (
    <div className="text-white text-center p-4">
      <h2 className="underline text-2xl pb-4">Account</h2>
      {userData && <AccountCard userData={userData} />}

      {/* Display user's bookings */}
      {userData && userData.tickets && userData.tickets.length > 0 && (
        <div className="mt-4">
          <h3 className="text-xl pb-2">My Tickets:</h3>
          <ul className="list-disc pl-4">
            {userData.tickets.map((ticket) => (
              <li key={ticket.id} className="mb-2">
                <strong>Showtime ID:</strong> {ticket.showtimeId},{" "}
                <strong>Seats:</strong> {ticket.seats}, <strong>Movie:</strong>{" "}
                {ticket.showtime.movie.title}{" "}
                <img
                  className="inline-block ml-2"
                  src={ticket.showtime.movie.thumbnail}
                  alt={`Thumbnail for ${ticket.showtime.movie.title}`}
                  style={{ width: "50px", height: "auto" }}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Account;
