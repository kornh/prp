var bcrypt = require('bcryptjs');
var query = require('./query');
var codes = require('../config/status-code');

var salt = 11;

var auth = {};
auth.user = function (database, params, callback) {
  query.connect(database, function (err, db) {
    if (err) return callback(codes['0005']);
    var collection = db.collection('_app.user');
    collection.findOne({
      user: params.user
    }, function (err, user) {
      if (err) return callback(codes['0005']);
      if (!user) return callback(codes['0006']);
      var match = bcrypt.compareSync(params.password, user.password);
      if (match) {
        var isAdmin = (!!user.roles && (user.roles.indexOf('admin') >= 0))
        return callback(null, user._id, isAdmin);
      } else {
        callback(codes['0004'], null);
      }
    });
  });
}
auth.hashString = function (string) {
  return bcrypt.hashSync(string, salt);
}

module.exports = auth;