// Reference link: https://express-validator.github.io/docs/check-api.html
const { body } = require('express-validator');

// More validators here: https://github.com/validatorjs/validator.js
const register = [
  body('email').notEmpty().isEmail().withMessage('Must be a valid email.'),
  body('password').notEmpty().isString(),
  body('firstName').notEmpty().isString(),
  body('lastName').notEmpty().isString(),
];

module.exports = {
  register,
};
