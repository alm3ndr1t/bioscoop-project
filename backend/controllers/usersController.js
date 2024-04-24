const prisma = require("../config/prisma_db");
const { ValidationResult, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const usersController = {
  findAll: async (req, res) => {
    console.log("AUTH MIDDLEWARE REQUEST: ", req.userId);

    try {
      // select * from users
      const users = await prisma.user.findMany({
        orderBy: {
          username: "asc",
          email: "asc",
        },
      });
      res.json(users);
    } catch (error) {
      res.status(500).send("Er is een fout opgetreden.");
    }
  },
  findById: async (req, res) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(500).json(validationErrors.array());
    }
    const requestId = req.params.id;

    try {
      const user = await prisma.user.findUnique({
        where: {
          id: Number.parseInt(requestId),
        },
        include: {
          tickets: {
            include: {
              showtime: {
                include: {
                  movie: true // Include the movie related to the showtime
                }
              }
            }
          }
        }
      });

      if (user) {
        res.status(200).json(user);
      } else {
        res.status(500).send("Er is een fout opgetreden.");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("Er is een fout opgetreden.");
    }
  },
  create: async (req, res) => {
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(500).json(validationErrors.array());
    }

    const newUser = req.body;
    const hashedPassword = await bcrypt.hash(newUser.password, 12);

    try {
      const user = await prisma.user.create({
        data: {
          username: newUser.username,
          email: newUser.email,
          password: hashedPassword,
        },
      });
      res.status(201).json(user);
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send("Er is een fout gebeurd bij het aanmaken van de gebruiker.");
    }
  },
  login: async (req, res) => {
    // validatie
    const credentials = req.body;

    try {
      // user object uit databank halen
      const user = await prisma.user.findUnique({
        where: {
          username: credentials.username,
        },
        select: {
          id: true,
          username: true,
          email: true,
          password: true,
        },
      });

      if (!user) {
        return res.status(404).send("Er is geen gebruiker gevonden.");
      }

      const result = await bcrypt.compare(credentials.password, user.password);

      if (result) {
        // token aanmaken

        const payload = {
          sub: user.id,
          iat: new Date().getMilliseconds(), // issuad at
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: 5 * 60,
        });

        res.cookie("movie_token", token, {
          // Server cookie gaat worden - Niet te manipuleren met JS op de client
          httpOnly: true,
          // Cookies worden enkel verstuurd naar de server met HTTPS
          secure: false,
          expiresIn: new Date(Date.now() + 5 * 60 * 1000),
        });
        res.status(200).json(user);
      } else {
        res.status(401).send("Ongeldige gebruikersnaam en/of wachtwoord.");
      }
    } catch (error) {
      res.status(500).send("Er is een fout opgetreden tijdens het inloggen.");
    }
  },
};
module.exports = usersController;
