const router = require('express').Router();
const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');

const validate = require('../middlewares/validator.middleware');
const registerValidationRules = require('../validators/register.validator');

const prisma = new PrismaClient();

router.post(
  '/',
  [registerValidationRules.register, validate],
  async (req, res) => {
    try {
      const { email, password, firstName, lastName } = req.body;

      // Check if the account is already existing
      const oldUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (oldUser) {
        return res.error('ALREADY_EXISTS', {
          message: `${email} already exists.`,
        });
      }

      // Encrpyt user password
      const encrpyptedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          password: encrpyptedPassword,
          firstName,
          lastName,
        },
      });


      // TODO: send a account verification email.
      // TODO: generate a new token and save it to token field

      return res.success('CREATED', '', user);
    } catch (error) {
      return res.error('INTERNAL_SERVER_ERROR', error);
    }
  },
);

module.exports = router;
