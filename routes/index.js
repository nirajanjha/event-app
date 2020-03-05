var express = require('express');
var router = express.Router();


var Event = require('../app/Controller/Event')


/* GET home page. */
router.get('/', Event.getEvents);


/* GET only published events */
router.get('/view/:reference', Event.viewEventDetail)


module.exports = router;
