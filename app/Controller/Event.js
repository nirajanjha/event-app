var ReferenceGenerator = require('../Helpers/ReferenceGenerator');
var Event = require('../Model/Event')

var fs = require('fs')

/**
 *  ADMIN | get event add page
 */
exports.getAddEvent = async (req, res, next) => {
	try {
		res.render('admin/event/add',{user: req.session.user});
	} catch (e) {
		console.log(e)
	}
}

exports.postAddEvent = async (req, res, next) => {
	try {
        // Reference generate and check for uniqueness
        var reference = '';
		var found = false;

		var slug = ReferenceGenerator.generateReference()
		var list = await Event.findByReference(slug)

		if (list) {

			while(!found) {

				var slug = ReferenceGenerator.generateReference()
				list = await Event.findByReference(slug);
				
				if(!user){
					found = true
				}
				
			}
			
			reference = slug
			
		} else {

			reference = slug;
		
        }
        
        if (req.body.publish == 'on') {
			var publish = true;
		} else {
			var publish = false;
        }

        var cover = req.file.filename + '.jpg'

		fs.rename(req.file.path, req.file.path + '.jpg', function (err) {
			if (err) {
				req.flash('red', "Error in renaming thumbnail image.!! MUT001");
			}
		});

        // for testing 
        var creator = "Rajiv Ranjan"
        
        var data = await Event.saveBasic(
			reference,
			req.body.title,
            creator,
            req.body.venue,
            req.body.start_date,
            req.body.end_date,
            req.body.event_time,
			req.body.description,
            publish,
            cover

		)
        if (data) {
            res.render('admin/event/add' ,  {user: req.session.user, msg:"Event Saved Succesfully." })
            // res.send("Saved To database")
		} else {
			res.render('admin/event/add' ,  {user: req.session.user, msg:"Something Went Wrong" })
		}
	} catch (e) {
		console.log(e)
	}
}

/**
 *  General | give publish events to normal users
 */
exports.getEvents = async (req, res, next) => {
	try {
		var items = await Event.findPublishEvent();

		if (items) {
            res.render('index', { items: items})
            // res.send(items)
		}
	} catch (e) {
		console.log(e)
	}
}

/**
 *  ADMIN | show publish list
 */
exports.getPublishEvent = async (req, res, next) => {
	try {
		var items = await Event.findPublishEvent();

		if (items) {
            res.render('admin/event/list', { items: items,user: req.session.user})
            // res.send(items)
		}
	} catch (e) {
		console.log(e)
	}
}

/**
 *  ADMIN | show unpublish list
 */
exports.getUnpublishEvent = async (req, res, next) => {
	try {
		var items = await Event.findUnpublishEvent();

		if (items) {
            res.render('admin/event/list', { items: items, user: req.session.user})
            // res.send(items)
		}
	} catch (e) {
		console.log(e)
	}
}

/**
 *  Admin | View event admin
 */
exports.viewEvent = async (req, res, next) => {

	var item =  await Event.findByReference(req.params.reference)

	res.render('admin/event/view', { item: item, user: req.session.user})

}

/**
 *  Admin | View event admin
 */
exports.viewEventDetail = async (req, res, next) => {

	var item =  await Event.findByReference(req.params.reference)

	res.render('view_event', { item: item,})

}