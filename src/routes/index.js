var express = require('express');
var router = express.Router();

var apiRouter = require('./api');

router.use('/api', apiRouter);

router.get('*', function (req, res, next) {
	res.send("Error 404: Page not Found");

});

module.exports = router;