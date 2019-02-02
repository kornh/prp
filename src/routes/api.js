var express = require('express');
var router = express.Router();
var query = require('../middleware/query');

router.get('/:database/:module?/:id?', function (req, res, next) {
  query.getData(req.params, function(err, data){
    res.json(data);
  });
});

router.post('/:database/:module?/:id?', function (req, res, next) {
  query.setData(req.params, req.body, function(err, data){
    res.json(data);
  });
});

module.exports = router;