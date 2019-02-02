var express = require('express');
var router = express.Router();

var apiRouter = require('./api');

router.use('/api', apiRouter);


module.exports = router;