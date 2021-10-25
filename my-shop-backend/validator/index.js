const User = require("../models/user");
const { check, validationResult } = require("express-validator");

exports.signupValidation = [
  check("f_name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("First name is required")
    .bail(),

  check("l_name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("Last name is required")
    .bail(),

  check("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Your email cannot be empty")
    .bail()
    .isEmail()
    .withMessage("Invalid email address")
    .bail()
    .custom((email) => {
      return User.findOne({ email: email }).then((user) => {
        if (user)
          return Promise.reject(
            "This email has already been in use. Please try again"
          );
      });
    }),

  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Your password cannot be empty")
    .bail()
    .isLength({ min: 6, max: 20 })
    .withMessage("Your password should be between 6 to 20 characters")
    .bail()
    .matches("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20}$")
    .withMessage(
      `Your password needs:
      • Minimum 6 and maximum 20 characters 
      • At least 1 UPPERCASE english letter 
      • At least 1 lowercase english letter 
      • At least 1 number`
    )
    .bail()
    .custom((password, { req }) => {
      return password == req.body.confirm_password;
    })
    .withMessage("Passwords do not match. Please try again"),

  (req, res, next) => {
    const validationRes = validationResult(req);
    if (!validationRes.isEmpty()) {
      let errors = { errors: true };
      const fields_name = ["f_name", "l_name", "email", "password"];
      validationRes.array().map((err) => {
        errors[err.param] = err.msg;
      });

      fields_name.forEach((key) => {
        errors.hasOwnProperty(key)
          ? (errors[key] = errors[key])
          : (errors[key] = "");
      });
      return res.status(400).send(errors);
    }
    next();
  },
];
