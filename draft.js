'use strict';

var mongoose = require('mongoose');

var Draft = new mongoose.Schema({

  principal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  title: {
    type: String,
    required: true,
    trim: true
  },

  kind: {
    type: 'String',
    required: true,
    enum: ['unit', 'item']
  },

  changes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DraftChange'
  }]

});

module.exports = exports = mongoose.model('Draft', Draft);
