const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

const CLIENT_ID = '151756860734-q0d7uo2i53tceo05m314ddd14ogs0qo0.apps.googleusercontent.com';
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