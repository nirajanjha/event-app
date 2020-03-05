'use strict'

var ReferenceGenerator = require('../Helpers/ReferenceGenerator');
var UserModel = require('../Model/User')
var bcrypt = require('bcryptjs')

exports.register = async (req, res, next) => {

    var err = {
        type: '',
        msg: ''
    }

    var data = await UserModel.findExistingUsers(req.body.email, req.body.phoneNo, req.body.username)

    if(data.length > 0) {

		err = {
			type: 'Error',
			message: 'User Already exists'
        }
        
        return res.render('admin/signup', {msg: "User Exists"})
        
	} else {


        if ( req.body.password == req.body.passwordConf){

            bcrypt.hash(req.body.password, 10, async (err, hash) => {

                if (err) {

                    return res.render('admin/signup', { title: 'Register', msg: 'Something went wrong in hashing'})

                }

                else {

                    var reference = ''
                    var found = false

                    var slug = ReferenceGenerator.generateReference()
                    var user = await UserModel.findByReference(slug)

                    if (user) {

                        while(!found) {

                            var slug = ReferenceGenerator.generateReference()
                            user = await UserModel.findByReference(slug);
                            
                            if(!user){
                                found = true
                            }
                            
                        }
                        
                        reference = slug
                        
                    } else {

                        reference = slug;
                        
                    }

                    try {

                        await UserModel.saveBasic(
                            reference,
                            req.body.username,
                            req.body.email,
                            hash,
                            req.body.name,
                            req.body.phoneNo
                        )

                    } catch (e) {

                        console.log(e)

                        return res.render('admin/signup', { title: 'Register', msg: 'Something went wrong in saving'})

                    }

                    return res.redirect('/users/login/')

                }

            })

        } else {

            return res.render('admin/signup', { title: 'Register', msg: 'Passwords didn\'t match'})

        }

    }

}

exports.login = async (req, res, next ) => {

    try {    

        var user =  await UserModel.findByUsername(req.body.username)

        if(user == null) {

            return res.render('admin/login', { title: 'Login', msg: 'No such user found'});

        } else {
            bcrypt.compare(req.body.password, user.password, (err, result) => {

                if (result) {

                    req.session.user = user;

                    return res.redirect('/admin');

                }
                else{

                    return res.render('admin/login', { title: 'Login', msg: 'Incorrect password'});

                }

            })

        }
    
    } catch (e) {

        return res.render('admin/login', { title: 'Login', msg: 'Something went wrong'})

    }
}


