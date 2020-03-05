var express = require('express');
var router = express.Router();

var fs = require('fs')
var multer = require('multer')

var dir = 'uploads/images/';
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true }, err => {
        console.log(err);
    });
}

// Setting up Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/images/');
    }
});

// upload.single('flag')
const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


function isAuthenticated(req, res, next) {
    if (req.session.user)
        return next()
    else
        return res.redirect('/users/login')
}


var Event = require('../../app/Controller/Event')

router.get('/add',isAuthenticated, Event.getAddEvent);

router.post('/add',isAuthenticated, upload.single('cover'), Event.postAddEvent);

router.get('/published',isAuthenticated, Event.getPublishEvent)

router.get('/unpublished',isAuthenticated, Event.getUnpublishEvent)

router.get('/view/:reference',isAuthenticated, Event.viewEvent)

module.exports = router;
