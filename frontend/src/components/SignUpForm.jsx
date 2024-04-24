// import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    }),
    onSubmit: async (values, { setFieldError }) => {
      try {
        // Send a POST request to the backend with user data
        const response = await axios.post(
          "http://localhost:3000/api/users/",
          values
        );

        console.log("User created successfully:", response.data);
        // Redirect to "/account" after successful signup
        navigate("/");
      } catch (error) {
        console.error("Error creating user:", error.response.data);
        // Handle signup error, e.g., display an error message to the user
        if (error.response && error.response.data.errors) {
          // Set backend errors as form errors
          error.response.data.errors.forEach((err) => {
            setFieldError(err.param, err.msg);
          });
        } else {
          setFieldError("password", "Error creating user");
        }
      }
    },
  });
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-600"
          >
            <FontAwesomeIcon icon={faUser} className="mr-2" />
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {formik.touched.username && formik.errors.username && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.username}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600"
          >
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.email}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600"
          >
            <FontAwesomeIcon icon={faLock} className="mr-2" />
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </div>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-600"
          >
            <FontAwesomeIcon icon={faLock} className="mr-2" />
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-500 text-sm mt-1">
              {formik.errors.confirmPassword}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
