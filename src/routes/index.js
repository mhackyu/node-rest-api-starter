const router = require('express').Router();

const loginController = require('../controllers/login.controller');
const registerController = require('../controllers/register.controller');
const userController = require('../controllers/user.controller');

router.use('/login', loginController);
router.use('/register', registerController);
router.use('/users', userController);

module.exports = router;
