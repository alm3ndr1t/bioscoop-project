const { body, param } = require("express-validator");

const usersValidator = {
  createUserValidator: [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Gebruikersnaam mag niet leeg zijn.")
      .isLength({ min: 5 })
      .withMessage("Gebruikersnaam moet minstens 5 karakters bevatten."),
    body("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Ongeldig emailadres."),
    body("password")
      .isLength({ min: 8, max: 20 })
      .withMessage(
        "Wachtwoord moet uit minstens 8 en maximaal 20 karakters bestaan."
      ),
    body("confirmPassword")
      .notEmpty()
      .withMessage("Bevestiging wachtwoord mag niet leeg zijn.")
      .custom((value, { req }) => {
        if (value === req.body.password) {
          return true;
        } else {
          throw new Error("Wachtwoorden komen niet overeen.");
        }
      }),
  ],
  findByIdValidator: [
    param("id").isNumeric().withMessage("ID moet een numerieke waarde zijn."),
  ],
};

module.exports = usersValidator;
