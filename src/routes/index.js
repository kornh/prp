var express = require('express');
var router = express.Router();

var apiRouter = require('./api');

router.use('/api', apiRouter);

router.get('*', function (req, res, next) {
	res.render('error', {message:"Page not found", error:{status:'Error 404',stack:""}});
});

module.exports = router;