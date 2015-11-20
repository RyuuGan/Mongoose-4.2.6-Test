'use strict';

var mongoose = require('mongoose');

var User = new mongoose.Schema({

  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: /.+@.+\..+/
  },
  title: {
    type: String,
    required: true,
    trim: true
  }
});

User.index({ email: 1 }, { unique: true });

module.exports = exports = mongoose.model('User', User);
