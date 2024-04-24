// import React from "react";
import { useRouteError, useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const handleGoHome = () => {
    // Navigate to the home screen
    navigate('/');
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-white">
      <p className="text-5xl font-bold">{error.status}</p>
      <p className="font-thin">{error.statusText}</p>

      {/* Button to go to home screen */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handleGoHome}
      >
        Go to Home Screen
      </button>
    </div>
  );
};

export default ErrorPage;
