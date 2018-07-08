const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  picture: String,
  contacts: [String]
});

userSchema.statics.getUserByIds = async function(ids) {
  return new Promise((resolve, reject) => {
    this.find({
      '_id': {
        '$in': ids
      }
    }, (err, userObjects) => {
      if (err) {
        reject(err);
      } else {
        resolve(userObjects);
      }
    })
  });
}

userSchema.statics.getUserByEmail = async function(email) {
  return new Promise((resolve, reject) => {
    this.findOne({ email }, (err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
}

userSchema.statics.registerUser = async function(email, name, picture) {
  return new Promise((resolve, reject) => {
    const u = new this({
      email,
      name,
      picture,
    });
    u.save((err, user) => {
      if (err) {
        reject(err);
      } else {
        resolve(user);
      }
    })
  });
}

userSchema.methods.addContact = async function(email) {
  return new Promise((resolve, reject) => {
    this.contacts.push(email);
    this.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

const User = mongoose.model('User', userSchema, 'User');

module.exports = User;