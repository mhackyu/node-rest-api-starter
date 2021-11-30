const router = require('express').Router();
const bcrypt = require('bcrypt');

const validate = require('../middlewares/validator.middleware');
const loginValidationRules = require('../validators/login.validator');
const { issueJWT } = require('../helpers/security.helper');
const { prisma } = require('../lib');

router.post('/', [loginValidationRules.login, validate], async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the account is already existing and enabled by default
    const user = await prisma.user.findFirst({
      where: {
        email,
        enabled: true,
      },
    });

    if (!user) {
      return res.error('UNAUTHORIZED', {
        message: 'Invalid username or password.',
      });
    }

    // Check if the password is valid
    const isValid = bcrypt.compareSync(password, user.password);

    if (isValid) {
      // Issue JWT
      const jwt = issueJWT(user);
      delete user.password;

      const { useragent } = req;

      return res.success('SUCCESS', '', { user, auth: jwt, useragent });
    }

    return res.error('UNAUTHORIZED', {
      message: 'Invalid username or password.',
    });

    // return res.success('SUCCESS', '', { users });
  } catch (error) {
    return res.error('INTERNAL_SERVER_ERROR', error);
  }
});

module.exports = router;
