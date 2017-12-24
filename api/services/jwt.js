'use strict'
var jwt = require('jwt-simple')
var moment = require('moment')
var Constants = require('../constants');

var jwtfunctions = {}
jwtfunctions.createToken = (user) => {
    var payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    }
    return jwt.encode(payload, Constants.jwt.key)

}


module.exports = jwtfunctions