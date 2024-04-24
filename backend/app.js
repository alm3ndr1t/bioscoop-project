// Dotenv gebruiken
require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const moviesRouter = require("./routes/movies");
const bookingRouter = require("./routes/booking");
const { authMiddleware } = require("./middlewares/auth_middleware");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  // React server (Vite)
  // origin: "http://localhost:5173"
};

app.use(cors(corsOptions));
// app.use(express.static(path.join(__dirname, "public")));

// Application level middleware
app.use((req, res, next) => {
  console.log("Logger: ", req.ip, req.url);
  next();
});

// PADEN - ondersteunen in de app
app.use("/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/bookings", bookingRouter)
// app.use(authMiddleware)

// Fallback route
app.all("*", (req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `The requested URL ${req.originalUrl} was not found on this server.`,
  });
});


module.exports = app;
