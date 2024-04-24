// import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { MdAccountCircle } from "react-icons/md";
import logo from "../assets/logo.png";
import { useAuth } from "../contexts/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here, e.g., calling your logout function
    logout();

    // Redirect to the home page after logout
    navigate("/");
  };

  return (
    <div className="bg-headerBlue p-5 flex justify-between items-center rounded-2xl">
      {/* Logo */}
      <div className="flex items-center pl-5 md:pl-10">
        <Link to="/">
          <img
            src={logo}
            alt="Web 3 - Bioscoop"
            className="h-14 md:h-28 rounded-lg"
          />
        </Link>
      </div>

      {/* User Icon and Login/Logout Section */}
      <div className="flex items-center pr-5 md:pr-10">
        {/* User Icon */}
        {user ? (
          <div className="bg-indigo-950 rounded-full pr-1 mr-2">
            <MdAccountCircle size={24} color="white" />
          </div>
        ) : null}

        {/* Login/Username Section */}
        <div>
          {user ? (
            <div className="flex items-center">
              <NavLink
                to="/account"
                className="text-white font-bold text-lg font-montserrat"
                activeClassName="text-indigo-950"
              >
                {user.username}
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-white ml-4 font-bold text-lg font-montserrat underline"
              >
                | Logout
              </button>
            </div>
          ) : (
            <Link to="/auth">
              <button className="text-white font-bold text-lg font-montserrat">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
