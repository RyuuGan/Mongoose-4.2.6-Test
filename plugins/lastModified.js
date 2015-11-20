'use strict';

module.exports = exports = function (schema) {

  schema.add({
    lastModifiedAt: {
      type: Date,
      default: Date.now
    }
  });

  schema.pre('save', function (next) {
    this.lastModifiedAt = Date.now();
    next();
  });

};
