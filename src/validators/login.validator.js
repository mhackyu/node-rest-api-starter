// Reference link: https://express-validator.github.io/docs/check-api.html
const { body } = require('express-validator');

// More validators here: https://github.com/validatorjs/validator.js
const login = [
  body('email').notEmpty().isEmail().withMessage('Must be a valid email.'),
  body('password').notEmpty().isString(),
];

module.exports = {
  login,
};
