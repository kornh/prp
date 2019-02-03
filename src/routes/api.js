var express = require('express');
var router = express.Router();
var query = require('../middleware/query');
var auth = require('../middleware/auth');
var codes = require('../config/status-code');


/** Auth user in */
router.post('/:database/login', function (req, res, next) {
  var database = req.params.database
  if (req.session[database].userId) { //User already authed in
    var response = codes['0003'];
    response.userId = req.session[database].userId;
    return res.json(response)
  }
  auth.user(database, req.body, function (err, userId, isAdmin) {
    if (err) return res.json(err);
    req.session[database].userId = userId;
    req.session[database].isAdmin = isAdmin;
    var response = codes['0002'];
    response.userId = userId;
    return res.json(response);
  })
});

/** Exit if not logged in */
router.use('/:database', function (req, res, next) {
  var database = req.params.database
  if (!req.session[database].userId) return res.json(codes['0001'])
  next();
});

router.use('/:database/:module', function (req, res, next) {
  if (req.params.module.charAt(0) == "_") return res.json(codes['0008']);
  next();
});

router.use('/:database/app', function (req, res, next) {
  var database = req.params.database
  if (!req.session[database].isAdmin) return res.json(codes['0007']);
  next();
});

router.get('/:database/app', function (req, res, next) {
  var options = ["user"];
  res.json(options);
})

router.get('/:database/app/user', function (req, res, next) {
  req.params.module = '_app.user'
  query.getData(req.params, function (err, data) {
    data.forEach(function (item) {
      delete item.password;
    })
    res.json(data);
  });
});

router.post('/:database/app/user', function (req, res, next) {
  req.params.module = '_app.user'
  req.body.password = auth.hashString(req.body.password);
  query.setData(req.params, req.body, function (err, data) {
    res.json({
      userId: data[0]
    })
  });
});

router.get('/:database/:module?/:id?', function (req, res, next) {
  query.getData(req.params, function (err, data) {
    res.json(data);
  });
});

router.post('/:database/:module?/:id?', function (req, res, next) {
  query.setData(req.params, req.body, function (err, data) {
    res.json(data);
  });
});

module.exports = router;