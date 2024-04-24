import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AppLayout from "./layout/AppLayout.jsx";
import ErrorPage from "./pages/error/ErrorPage.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import UserAuthPage from "./pages/UserAuthPage.jsx";
import Account from "./pages/Account.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

const browserRouter = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "movies/:id",
        element: <MovieDetail />,
      },
      {
        path: "/auth",
        element: <UserAuthPage />,
      },
      {
        path: "/account",
        element: <Account />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={browserRouter} />
    </AuthProvider>
  </React.StrictMode>
);
