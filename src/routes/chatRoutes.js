const express = require('express');
const router = express.Router();

const authenticator = require('../middlewares/authenticator');
const chatControllers = require('../controllers/chatControllers');

router.get('/:email', authenticator, chatControllers.getMessages);

module.exports = router;