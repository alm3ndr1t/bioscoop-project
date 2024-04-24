import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes

// Create an authentication context
const AuthContext = createContext();

// Authentication provider component
export const AuthProvider = ({ children }) => {
  // State to hold user information
  const [user, setUser] = useState(null);

  // Function to simulate user login
  const login = (userData) => {
    // Assume the server responds with user data including the user ID
    setUser(userData);
  };

  // Function to simulate user logout
  const logout = () => {
    setUser(null);
  };

  return (
    // Provide user information and authentication functions to the context
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Add PropTypes validation for children
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to conveniently access the authentication context
export const useAuth = () => {
  return useContext(AuthContext);
};
