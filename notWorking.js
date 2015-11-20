'use strict';

var mongoose = require('mongoose');

var User = require('./user')
  , Draft = require('./draft')
  , DraftChange = require('./draftChange');

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
    return Draft.findOne({
      principal: user
    }).exec();
  }).then(function (draft) {
    if (!draft) return done('Draft not found');
    // Do some stuff with draft
    console.log(draft.title);
    // Populating draft changes
    return Draft.populate(draft, {
      path: 'changes',
      model: 'DraftChange'
    });
  }).then(function (draft) {
    console.log(draft.changes.length);
    console.log('All Done!');
    done();
  }).catch(done);

});
