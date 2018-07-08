const userRoutes = require('./userRoutes');
const contactRoutes = require('./contactRoutes');
const chatRoutes = require('./chatRoutes');

function initRoutes(app) {
  app.use('/users', userRoutes);
  app.use('/contacts', contactRoutes);
  app.use('/chats', chatRoutes);
}

module.exports = initRoutes;