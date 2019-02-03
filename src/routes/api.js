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
  auth.api(database, req.body, function (err, userId) {
    if (err) return res.json(err);
    req.session[database].userId = userId;
    var response = codes['0002'];
    response.userId = userId;
    return res.json(response);
  })
});

/** Exit if not logged in */
router.use('/:database', function (req, res, next) {
  var database = req.params.database
  if (!req.session[database].userId) {
    return res.json(codes['0001'])
  }
  next();
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