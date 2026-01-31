
const { body, validationResult, param } = require("express-validator")
const validate = {}

/*  **********************************
  *  Creating New User Validation Rules
  * ********************************* */
validate.CreateUserRules = () => {
  return [
      // firstName is required and must be string
      body("firstName")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 1 })
        .isEmail()
        .withMessage("Please provide a first name."), // on error this message is sent.

      // Email is required and must be string
      body("email")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 6 })
        .withMessage("Please provide a valid email address."), // on error this message is sent.


      body("password")
        .trim()
        .escape()
        .notEmpty()
        .isLength({ min: 2 })
        .withMessage("Please provide a password."),


  ]
}






/**
 * Check user data and return errors or continue to login
 */
validate.checkUserData = (req, res, next) => {
  let errors = []
  errors = validationResult(req)
  if (!errors.isEmpty()) {

    return res.status(400).json({ errors: errors.array() })

  }
  next()
}

//Update User Validation Rules can be similar to Create User Rules
validate.updateUserRules = () => {
    return [
        //all fields can be optional but if provided should be validated
        body("firstName")
          .optional()
          .trim()
          .escape()
          .isLength({ min: 1 })
          .withMessage("Please provide a first name."),

        body("email")
          .optional()
          .trim()
          .escape()
          .isLength({ min: 2 })
          .isEmail()
          .withMessage("Please provide a valid email address."),

        body("password")
          .optional()
          .trim()
          .escape()
          .isLength({ min: 6 })
          .withMessage("Please provide a password."),
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
validate.checkUpdateUserData = (req, res, next) => {
    let errors = []
    errors = validationResult(req)
    if (!errors.isEmpty()) {

      return res.status(400).json({ errors: errors.array() })
    }
    next()
}

module.exports = validate