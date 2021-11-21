const router = require('express').Router();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const authMW = require('../middlewares/auth.middleware');

router.get('/', authMW.authenticate(), async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    return res.success('SUCCESS', '', { users, authUser: req.user });
  } catch (error) {
    return res.error('INTERNAL_SERVER_ERROR', error);
  }
});

module.exports = router;
