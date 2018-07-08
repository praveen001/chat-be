const cluster = require('cluster');
const fs = require('fs');
const http = require('http');
const https = require('https');
const os = require('os');

const bodyParser = require('body-parser');
const compression = require('compression');
const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const io = require('socket.io');

const config = require('./config');
const routes = require('./routes');
const socket = require('./controllers/socketControllers');

// Initializations
const app = express();
const env = process.env.NODE_ENV || 'development';

// DB Connection
let user = config.databaseUser ? `${config.databaseUser}:${config.databasePassword}@` : '';
mongoose.connect(`mongodb://${user}${config.databaseHost}/${config.databaseName}`);

// Middlewares
app.use(bodyParser.json());
app.use(compression());
app.use(cors());

// Routes
routes(app);

// Starting server
if (env == 'production' && cluster.isMaster) {
  let cpuCount = os.cpus().length;
  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }
  cluster.on('exit', () => {
    cluster.fork();
  });
} else {
  let server;
  if (config.enableSSL) {
    server = https.createServer({
      key: fs.readFileSync(config.sslKey),
      cert: fs.readFileSync(config.sslCert)
    }, app).listen(config.port, onServerStart);
  } else {
    server = http.createServer(app).listen(config.port, onServerStart);
  }

  // Web socket initialization
  socket(server);
}

function onServerStart() {
  console.log(`${env} server running at port ${config.port}`);
}