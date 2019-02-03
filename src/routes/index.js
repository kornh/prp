var express = require('express');
var router = express.Router();

/** Set session data */
router.use('/:page/:database', function (req, res, next) {
	var database = req.params.database
	if (!req.session[database])
		req.session[database] = {};
	next();
});

var adminRouter = require('./admin');
var apiRouter = require('./api');

router.use('/admin', adminRouter);
router.use('/api', apiRouter);


module.exports = router;