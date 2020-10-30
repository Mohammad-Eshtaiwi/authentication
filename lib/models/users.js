'use strict';

const mongoose = require('mongoose');

const user = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  capabilities: {
    type: Object,
    enum: [
      { user: ['read'] },
      { writers: ['read', 'create'] },
      { editor: ['read', 'create', 'update'] },
      { admin: ['read', 'create', 'update', 'delete'] },
    ],
    default: { user: ['read'] },
  },
});

module.exports = mongoose.model('user', user);
