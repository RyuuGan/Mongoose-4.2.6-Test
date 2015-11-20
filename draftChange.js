'use strict';

var mongoose = require('mongoose');

var DraftChange = new mongoose.Schema({

  draft: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Draft',
    required: true
  },

  status: {
    type: String,
    required: true,
    enum: ['submitted', 'returned', 'published']
  },

  source: {
    type: String,
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = exports = mongoose.model('DraftChange', DraftChange);
