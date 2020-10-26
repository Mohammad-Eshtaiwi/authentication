require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./lib/server');

mongoose.connect('mongodb://localhost/auth', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

server.start(3000);
