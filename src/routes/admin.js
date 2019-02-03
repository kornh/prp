var express = require('express');
var router = express.Router();
var auth = require('../middleware/auth');

router.post('/:database/login', function (req, res, next) {
  var database = req.params.database
  auth.user(database, req.body, function (err, userId, isAdmin) {
    if (err || !isAdmin) return res.redirect('login');
    req.session[database].userId = userId;
    req.session[database].isAdmin = isAdmin;
    return res.redirect('.');
  })
});

router.get('/:database/logout', function (req, res, next) {
  var database = req.params.database
  delete req.session[database].userId;
  res.redirect('login');
});

router.use('/:database/login', function (req, res, next) {
  res.render('login', {
    login: true
  });
});

/** Exit if not logged in */
router.use('/:database', function (req, res, next) {
  var database = req.params.database
  if (!req.session[database].userId) {
    return res.redirect('login')
  }
  next();
});

router.get('/:database', function (req, res, next) {
  res.render('admin');
});

module.exports = router;