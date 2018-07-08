const Message = require('../models/messageModel');

async function sendMessage(connections, from, to, message) {
  /* Put message in db */
  const messageObject = new Message({
    from,
    to,
    message,
    sent_at: new Date(),
    sent: true,
    received: false,
    read: false,
  });
  messageObject.save((err, savedMessage) => {

    /* Send to all recipient sockets */
    (connections[to] || []).forEach(recipient => {
      recipient.emit('onReceiveMessage', savedMessage, () => {
        /* mark message as received in db */
        messageObject.received = true;
        messageObject.save();

        /* let sender know */
        (connections[from] || []).forEach(sender => {
          sender.emit('onAcknowledgement', messageObject);
        });
      });
    });

    /* Send to all sender sockets as well */
    (connections[from] || []).forEach(sender => {
      sender.emit('onSentMessage', savedMessage);
    });
  });

}

async function getMessages(email1, email2) {
  return await Message.getMessagesByEmail(email1, email2);
}

module.exports = {
  sendMessage,
  getMessages,
};