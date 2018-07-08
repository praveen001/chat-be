const userService = require('../services/userService');

async function loginGoogleUser(req, res) {
  const payload = await userService.verifyGoogleIdToken(req.body.token);

  let userObject = await userService.getUserByEmail(payload.email);
  if (!userObject) {
    userObject = await userService.registerUser(payload.email, payload.name, payload.picture);
  }
  
  const token = userService.generateToken(userObject.email, userObject.name, userObject._id);

  res.send(Object.assign({}, payload, {token}));
}

module.exports = {
  loginGoogleUser,
};