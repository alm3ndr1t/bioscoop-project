import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import backgroundImage from "../assets/formPicture.jpg"; // Import the image

const UserAuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <div
        className="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "750px 850px",
        }}
      ></div>
      <div className="z-10 bg-white bg-opacity-40 p-8 rounded-md shadow-md w-full max-w-md">
        {showLogin ? (
          <>
            <LoginForm />
            <p
              className="mt-4 text-center font-bold text-bodyBlue cursor-pointer"
              onClick={toggleForm}
            >
              Don&apos;t have an account? Sign up here.
            </p>
          </>
        ) : (
          <>
            <SignUpForm />
            <p
              className="mt-4 text-center font-bold text-bodyBlue cursor-pointer"
              onClick={toggleForm}
            >
              Already have an account? Log in here.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default UserAuthPage;
