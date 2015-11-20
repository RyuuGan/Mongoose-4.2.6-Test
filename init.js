'use strict';

var mongoose = require('mongoose')
  , async = require('async');

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

mongoose.connect('mongodb://127.0.0.1/mongooseTest', function (err) {
  if (err) return done(err);

  // Creating First
  var queries = [];

  var user = new User({
    email: 'example@example.com',
    title: 'Testing user'
  });

  var draft = new Draft({
    principal: user,
    title: 'Some exciting title',
    kind: 'item'
  });

  var change1 = new DraftChange({
    draft: draft,
    status: 'submitted',
    source: 'Some exciting title'
  });

  var change2 = new DraftChange({
    draft: draft,
    status: 'submitted',
    source: 'Some exciting title changed'
  });

  draft.changes.push(change1);
  draft.changes.push(change2);

  queries.push(user.save.bind(user));
  queries.push(change1.save.bind(change1));
  queries.push(change2.save.bind(change2));
  queries.push(draft.save.bind(draft));

  async.series(queries, function (err) {
    if (err) return done(err);
    console.log('All done');
    done();
  });

});
