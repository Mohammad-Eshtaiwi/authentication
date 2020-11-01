require('dotenv').config();
const mongoose = require('mongoose');
const server = require('./lib/server');

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost/auth', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server.start(3000);
  })
  .catch(err => {
    console.error(err.message);
  });
