'user strict'

var Schema = require('../Schema/UserSchema')

/**
 * Save Basic user
 * 
 * @param {String} reference
 * @param {String} username
 * @param {String} email
 * @param {String} password
 * @param {String} name
 * @param {String} phoneNo
 * 
 */

module.exports.saveBasic = async (
    reference,
    username,
    email,
    password,
    name,
    phoneNo
) => {
    
    var data = new Schema({
        reference: reference,
        username: username,
        email: email,
        password: password,
        name: name,
        phoneNo: phoneNo
    })

    return await data.save()

}

module.exports.findExistingUsers = async (
    email,
    phoneNo,
    username
) => {

    return await Schema.find({$or:[{email: email}, {phoneNo: phoneNo}, {username: username}]})

}   


module.exports.findByReference = async (
    reference
) => {

    return await Schema.findOne({reference: reference})

}   

module.exports.findByUsername= async (
    username
) => {

    return await Schema.findOne({username: username})

}  
 