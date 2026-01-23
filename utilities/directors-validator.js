
const { body, validationResult, param } = require("express-validator")
const validate = {}

/*  **********************************
  *  Creating New Director Validation Rules
  * ********************************* */
validate.CreateDirectorRules = () => {
  return [
      // firstName is required and must be string
      body("firstName")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a first name."), // on error this message is sent.

      // lastName is required and must be string
      body("lastName")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide a last name."), // on error this message is sent.


      body("nationality")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide a nationality."),
       
      body("birthYear")
        .notEmpty()
        .isInt({ min: 1800, max: new Date().getFullYear() })
        .withMessage("Please provide a valid birth year."),



      body("famousFor")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .withMessage("Please provide a something for which we know of."),

    
      body("createdAt")
        .notEmpty()
        .isISO8601({ strict: true, strictSeparator: true })
        .withMessage("Please provide a valid creation date in YYYY-MM-DD."),


  ]
}






/**
 * Check director data and return errors or continue to login
 */
validate.checkDirectorData = (req, res, next) => {
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {

    return res.status(400).json({ errors: errors.array() })

  }
  next()
}

//Update Director Validation Rules can be similar to Create Director Rules
validate.updateDirectorRules = () => {
    return [
        //all fields can be optional but if provided should be validated
        body("firstName")
          .optional()
          .trim()
          .escape()
          .isLength({ min: 1 })
          .withMessage("Please provide a first name."),

        body("lastName")
          .optional()
          .trim()
          .escape()
          .isLength({ min: 2 })
          .withMessage("Please provide a last name."),

        body("nationality")
          .optional()
          .trim()
          .escape()
          .isLength({ min: 2 })
          .withMessage("Please provide a nationality."),

        body("birthYear")
          .optional()
          .isInt({ min: 1800, max: new Date().getFullYear() })
          .withMessage("Please provide a valid birth year."),

        body("famousFor")
          .optional()
          .trim()
          .escape()
          .isLength({ min: 1 })
          .withMessage("Please provide a something for which we know of."),

        body("createdAt")
          .optional()
          .isISO8601({ strict: true, strictSeparator: true })
          .withMessage("Please provide a valid creation date in YYYY-MM-DD."),
    ]
}


/* **********************************
 * ID Param Validator → Validate MongoDB ObjectId
 * ********************************* */
validate.idParamRule = () => {
  return [
    param("id")
      .isMongoId()
      .withMessage("Invalid director ID")
  ];
};



// checking validation results 
validate.checkUpdateDirectorData = (req, res, next) => {
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {

      return res.status(400).json({ errors: errors.array() })
    }
    next()
}

module.exports = validate