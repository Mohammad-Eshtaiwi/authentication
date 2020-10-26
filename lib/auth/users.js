'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/users');
const SECRET = process.env.SECRET || 'mysecret';

const users = {};

users.save = async function (record, next) {
  try {
    console.log('__recor__', record);
    record.password = await bcrypt.hash(record.password, 5);

    const newUser = await db(record);
    const result = await newUser.save();
    console.log('saaaaaaave');
    return result;
  } catch (error) {
    console.log(error.message);
    // next('Invalid Login');
    return Promise.reject();
  }
};

users.authenticateBasic = async function (user, password) {
  try {
    console.log('userrr', user);
    console.log(password);
    user = await db.find({ username: user });
    console.log('__user__', user);

    const valid = await bcrypt.compare(password, user[0].password);
    if (!valid) throw new Error('wrong password');
    return user;
  } catch (error) {
    console.log('authenticateBasic', error);
    return Promise.reject();
  }
};

users.generateToken = function (user) {
  const token = jwt.sign({ username: user.username }, SECRET);
  return token;
};

users.list = async function () {
  return await db.find({});
};

module.exports = users;
