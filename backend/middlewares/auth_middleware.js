// Lokale module
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const cookie = req.cookies;
  console.log("Cookie:", cookie);

  const token = cookie?.movie_token;

  // Als er geen token inzit of geen cookie is -> Fout terugsturen
  if (!token) {
    console.log("No token found in the cookie.");
    return res.sendStatus(401);
  }

  console.log("Token:", token);

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        console.log("Token has expired.");
        return res.status(401).send("Token has expired.");
      } else {
        console.error("Token verification error:", err);
        return res.status(400).send("Geen geldige token.");
      }
    }

    req.userId = payload.sub;
    console.log("Token verified successfully. User ID:", req.userId);
    next();
  });
};

const isAdminMiddleware = (req, res, next) => {
  next();
};

module.exports = {
  authMiddleware: authMiddleware,
  isAdminMiddleware: isAdminMiddleware,
};
