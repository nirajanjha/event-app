'use strict'
 
/**
 * Reference Generator
 * @returns { String } - Alphanumeric String
 */
module.exports.generateReference = () => {
	var mask = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var result = '';
    var length = 10;

    for (var i = length; i > 0; --i) result += mask[Math.floor(Math.random() * mask.length)];
    
    return result;
}
