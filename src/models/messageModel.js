const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  from: String,
  to: String,
  message: String,
  sent_at: Date,
  sent: Boolean,
  received: Boolean,
  read: Boolean,
});

messageSchema.statics.getMessagesByEmail = async function(email1, email2) {
  return new Promise((resolve, reject) => {
    this.find({
      $or: [
        {
          from: email1,
          to: email2,
        },
        {
          from: email2,
          to: email1,
        }
      ]
    }, (err, messages) => {
      if (err) {
        reject(arr);
      } else {
        resolve(messages);
      }
    })
  });
}

const Message = mongoose.model('Message', messageSchema, 'Message');

module.exports = Message;