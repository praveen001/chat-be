const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const CLIENT_ID = '151756860734-ukvqf7thjuo7h6os3lr7vefihjd7mda5.apps.googleusercontent.com';
const client = new OAuth2Client(CLIENT_ID);

async function verifyGoogleIdToken(idToken) {
  const ticket = await client.verifyIdToken({
    idToken: idToken,
    audience: CLIENT_ID,
  });
  return ticket.getPayload();
}

async function getUserByEmail(email) {
  return await User.getUserByEmail(email);
}

async function registerUser(email, name, picture) {
  return await User.registerUser(email, name, picture);
}

function generateToken(email, name, id) {
  console.log('using id', id);
  return jwt.sign({ email, name, id }, 'secret');
}

async function verifyToken(token) {
  try {
    var decoded = jwt.verify(token, 'secret');
    return decoded;
  } catch (e) {
    return false;
  }
}

module.exports = {
  verifyGoogleIdToken,
  getUserByEmail,
  registerUser,
  generateToken,
  verifyToken,
};