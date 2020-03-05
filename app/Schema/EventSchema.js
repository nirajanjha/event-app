'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var EventSchema = new Schema ({
	reference: {
		type: String,
		required: true,
		unique: true
	},
	eventTitle: {
		type: String,
		required: true
	},
	eventCreator: {
		type: String,
	},
	// Can put Type Date in date 
	startDate: {
		type: String,
	},
	endDate: {
		type: String,
	},
	eventTime: {
		type: String
	},
	venue: {
		type: String,
	},
	cover: {
		type: String,
	},
	description: {
		type: String,
	},
    publish: {
		type: Boolean,
		default: false
	},
	cover: {
		type: String,
	},
	drop: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('Event', EventSchema);