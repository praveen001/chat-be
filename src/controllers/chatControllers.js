const chatService = require('../services/chatService');

async function getMessages(req, res) {
  const email1 = req.user.email;
  const email2 = req.params.email;

  const messages = await chatService.getMessages(email1, email2);

  res.send(messages);
}

module.exports = {
  getMessages,
};