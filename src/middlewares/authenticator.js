const userService = require('../services/userService');

async function authenticator(req, res, next) {
  const payload = await userService.verifyToken(req.headers.authorization);
  if (!payload) {
    res.status(403).send('Unauthorized');
    return;
  }
  req.user = payload;
  next();
}

module.exports = authenticator;