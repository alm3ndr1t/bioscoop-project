const { body, param } = require("express-validator");

const moviesValidator = {
  findByIdValidator: [
    param("id").isNumeric().withMessage("Moet nummerieke waarde zijn."),
  ],
  findByTitleValidator: [
    param("title").notEmpty().withMessage("Title cannot be empty"),
  ],
};

module.exports = moviesValidator;
