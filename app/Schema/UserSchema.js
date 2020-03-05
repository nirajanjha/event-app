'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema ({
	reference: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
    },
    password: {
		type: String,
		required: true
    },
    name: {
		type: String,
		required: true
	},
	phoneNo: {
		type: String,
		required: true
	},
	disable: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: true
});

module.exports = mongoose.model('User', UserSchema);