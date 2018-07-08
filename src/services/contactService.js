const User = require('../models/userModel');

async function getUserByEmail(email) {
  return await User.getUserByEmail(email);
}

async function addContact(userEmail, email) {
  try {
    const userObject = await User.getUserByEmail(userEmail);
    const contactObject = await User.getUserByEmail(email);
    await userObject.addContact(contactObject._id);
    return contactObject;
  } catch (e) {
    throw 'Failed to add contact';
  }
}

async function getContacts(email) {
  const userObject = await User.getUserByEmail(email);
  let contacts = await User.getUserByIds(userObject.contacts);

  contacts = contacts.map((contact) => ({
    name: contact.name,
    email: contact.email,
    picture: contact.picture,
    _id: contact._id,
  }));

  return contacts;
}

module.exports = {
  addContact,
  getContacts,
};