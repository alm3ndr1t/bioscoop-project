const express = require("express");
const { authMiddleware } = require("../middlewares/auth_middleware");
const router = express.Router();

// const dbConnection = require("../config/db");
const prisma = require("../config/prisma_db");

const usersController = require("../controllers/usersController");
const usersValidator = require("../validator/userValidator");

router.get("/", authMiddleware, usersController.findAll);

// post "/users"
router.post("/", usersValidator.createUserValidator, usersController.create);

// POST "/users/login"
router.post("/login", usersController.login);

// GET "/users/:id"
router.get(
  "/:id([0-9]+)",
  usersValidator.findByIdValidator,
  usersController.findById
);

router.get(
  "/profile",
  (req, res, next) => {
    // Timestamp meegeven aan het request object
    req.timeStamp = new Date().toString();
    next();
  },
  (req, res) => {
    // REQUEST HANDLER
    // const timeStamp = new Date().toString()
    res.send(`Profiel met timestamp: ${req.timeStamp}`);
  }
);

router.get("/verify", authMiddleware, async (req, res) => {
  const userId = req.userId;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
      },
    });

    if (!user) {
      res.sendStatus(404);
    } else {
      res.status(200).json(user);
    }
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
