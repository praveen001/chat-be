const express = require('express');
const router = express.Router();

const authenticator = require('../middlewares/authenticator');
const contactControllers = require('../controllers/contactControllers');

router.get('/', authenticator, contactControllers.getContacts);
router.get('/exist/:email', authenticator, contactControllers.emailExist);
router.post('/add', authenticator, contactControllers.addContact);

module.exports = router;