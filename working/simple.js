'use strict';

var mongoose = require('mongoose');

var User = require('../user');

var done = function (err) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  process.exit(0);
};

// Use init script first

mongoose.connect('mongodb://127.0.0.1/mongooseTest', function (err) {
  if (err) return done(err);

  User.findOne({
    email: 'example@example.com'
  }).then(function (user) {
    if (!user) return done('User not found');
    console.log(user.title);
    console.log('All done');
    done();
  }, done);

});
