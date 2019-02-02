var bcrypt = require('bcryptjs');
var query = require('./query');
var codes = require('../config/status-code');

var auth = function (database, params, callback) {
  query.connect(database, function (err, db) {
    if (err) return callback(codes['0005']);
    var collection = db.collection('_app.user');
    collection.findOne({
      user: params.user
    }, function (err, user) {
      if (err) return callback(codes['0005']);
      if (!user) return callback(codes['0006']);
      var match = bcrypt.compareSync(params.password, user.password);
      //var hash = bcrypt.hashSync(params.password, 11);
      if (match) {
        return callback(null, user._id);
      } else {
        callback(codes['0004'], null);
      }
    });
  });
}

module.exports = auth;