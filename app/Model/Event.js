'user strict'

var Schema = require('../Schema/EventSchema')

/**
 * Save Basic
 * @param reference(String)
 * @param title(String)
 */
module.exports.saveBasic = async (
    reference,
    title,
    creator,
    venue,
    startDate,
    endDate,
    eventTime,
    description,
    publish,
    cover
) => {
    
    var data = new Schema({
        reference: reference,
        eventTitle: title,
        eventCreator: creator,
        venue: venue,
        startDate : startDate,
        endDate : endDate,
        eventTime : eventTime,
        publish : publish,
        description: description,
        cover: cover,
    })

    return await data.save()

}


/**
 * General | find by reference
 */
module.exports.findByReference = async (
    reference
) => {

    return await Schema.findOne({reference: reference})

}


/**
 * Admin | All Unpublished events
 */
module.exports.findUnpublishEvent = async() => {

    return await Schema.find({
        publish : false,
    })
}


/**
 * General | All Published events
 */
module.exports.findPublishEvent = async() => {

    return await Schema.find({
        publish : true,
    })
}