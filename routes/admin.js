var express = require('express');
var router = express.Router();

function isAuthenticated(req, res, next) {
	if (req.session.user)
		return next()
	else 
		return res.redirect('/users/login')
}
var Event = require('../app/Controller/Event')
/* GET */
router.get('/', isAuthenticated, Event.getPublishEvent );

module.exports = router;