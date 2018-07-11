const io = require('socket.io');

const userService = require('../services/userService');
const chatService = require('../services/chatService');

const connectedSockets = {};

function init(server) {
  socket = io(server);

  socket.on('connection', async (connection) => {

    const payload = await userService.verifyToken(connection.handshake.query.token);
    if (!payload) {
      connection.close();
    } else {
      connection.email = payload.email;
      if (!connectedSockets[connection.email]) {
        connectedSockets[connection.email] = [];
      }
      connectedSockets[connection.email].push(connection);
      console.log(connection.email, 'connected');
    }

    /* When chat message is sent, send it to the recipient, and send back a delivery report to the sender */
    connection.on('chatMessage', (data) => {
      chatService.sendMessage(connectedSockets, connection.email, data.to, data.message);
    });

    /* Send video call request to recipient */
    connection.on('onSendVideoRequest', (data) => {
      chatService.sendVideoRequest(connectedSockets, connection.email, data.to, data.description);
    });

    connection.on('disconnect', () => {
      delete connectedSockets[connection.userId];
    });

  });
}

module.exports = init;

