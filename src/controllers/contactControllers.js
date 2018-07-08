const userService = require('../services/userService');
const contactService = require('../services/contactService');

async function emailExist(req, res) {
  const email = req.params.email;

  res.send((await userService.getUserByEmail(email)));
}

async function addContact(req, res) {
  const email = req.body.email;
  try {
    const addedUser = await contactService.addContact(req.user.email, email);
    res.send(addedUser);
  } catch (e) {
    res.status(200).send(e);
  }
}

async function getContacts(req, res) {
  const contacts = await contactService.getContacts(req.user.email);
  res.send(contacts);
}

module.exports = {
  emailExist,
  addContact,
  getContacts,
};