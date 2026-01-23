
const { body, validationResult, param } = require("express-validator")
const validate = {}

/*  **********************************
  *  Creating New Movie Validation Rules
  * ********************************* */
validate.CreateMovieRules = () => {
  return [
      // title is required and must be string
      body("title")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a title."), // on error this message is sent.

      // director is required and must be string
      body("director")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide a director name."), // on error this message is sent.


      // releaseYear is required and must be a valid year
      body("releaseYear")
        .notEmpty()
        .isInt({ min: 1888, max: new Date().getFullYear() }) // first film made in 1888
        .withMessage("Please provide a valid release year."),

      body("description")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 10 })
        .withMessage("Please provide a description of at least 10 characters."),

    
      body("genre")
        .trim()
        .escape()
        .notEmpty()
        .withMessage("Please provide a genre."),

      body("rating")
        .notEmpty()
        .isFloat({ min: 0, max: 10 })
        .withMessage("Please provide a valid rating between 0 and 10."),


      body("duration")
        .notEmpty()
        .isInt({ min: 1 })
        .withMessage("Please provide a valid duration in minutes."),

  ]
}






/**
 * Check movie data and return errors or continue to login
 */
validate.checkMovieData = (req, res, next) => {
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {

    return res.status(400).json({ errors: errors.array() })

  }
  next()
}

//Update Movie Validation Rules can be similar to Create Movie Rules
validate.updateMovieRules = () => {
    return [
        //all fields can be optional but if provided should be validated
        body("title")
          .optional()
          .trim()
          .escape()
          .isLength({ min: 1 })
          .withMessage("Please provide a title."),

        body("director")
          .optional()
          .trim()
          .escape()
          .isLength({ min: 2 })
          .withMessage("Please provide a director name."),

        body("releaseYear")
          .optional()
          .isInt({ min: 1888, max: new Date().getFullYear() })
          .withMessage("Please provide a valid release year."),

        body("description")
          .optional()
          .trim()
          .escape()
          .isLength({ min: 10 })
          .withMessage("Please provide a description of at least 10 characters."),

        body("genre")
          .optional()
          .trim()
          .escape()
          .notEmpty()
          .withMessage("Please provide a genre."),

        body("rating")
          .optional()
          .isFloat({ min: 0, max: 10 })
          .withMessage("Please provide a valid rating between 0 and 10."),

        body("duration")
          .optional()
          .isInt({ min: 1 })
          .withMessage("Please provide a valid duration in minutes."),
    ]
}

/* **********************************
 * ID Param Validator → Validate MongoDB ObjectId
 * ********************************* */
validate.idParamRule = () => {
  return [
    param("id")
      .isMongoId()
      .withMessage("Invalid movie ID")
  ];
};



// checking validation results 
validate.checkUpdateMovieData = (req, res, next) => {
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {

      return res.status(400).json({ errors: errors.array() })
    }
    next()
}

module.exports = validate