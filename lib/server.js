const express = require('express');
require('dotenv').config();
const notFoundHandler = require('./middlewares/404');
const errorHandler = require('./middlewares/500');
const basicAuth = require('./middlewares/basic-auth');
const users = require('./auth/users');

const app = express();
app.use(express.json());

app.post('/signup', async (req, res, next) => {
  try {
    await users.save(req.body).then(user => {
      const token = users.generateToken(user);
      console.log(token);
      res.json({ token });
    });
  } catch (error) {
    console.log(error);
    // return Promise.reject('Invalid Login');
    console.log(error);
    next('error');
  }
});

app.post('/signin', basicAuth, (req, res) => {
  //req.token is coming from the mw
  res.json({ token: req.token });
});

app.get('/users', async (req, res) => {
  console.log('__users__');
  res.json(await users.list());
});

// make bad request
app.get('/bad', (req, res) => {
  throw new Error('a test error');
});
// all other routes
app.use('*', notFoundHandler);
// app.use(errorHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: port => {
    app.listen(port, () => {
      const PORT = port || process.env.PORT || 5000;
      console.log(`up and running on port ${PORT}`);
    });
  },
};
