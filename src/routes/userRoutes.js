const express = require('express');
const router = express.Router();

const authenticator = require('../middlewares/authenticator');
const userControllers = require('../controllers/userControllers');

router.post('/login/google', userControllers.loginGoogleUser);

module.exports = router;