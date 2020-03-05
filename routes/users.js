var express = require('express');
var router = express.Router();

var User = require('../app/Controller/User')

router.get('/login/', function(req,  res, next ) {
  res.render('admin/login',);
});

router.get('/signup/', function(req,  res, next ) {
  res.render('admin/signup',);
});

router.post('/signup', User.register);

router.post('/login', User.login);

module.exports = router;
