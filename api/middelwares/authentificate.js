'use strict'

var jwt = require('jwt-simple')
var moment = require('moment')
var Constants = require('../constants');


exports.ensureAuth = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status('403').send({ message: 'La peticion no tiene la cabecera de authentificacion' })
    }
    var token = req.headers.authorization.replace(/['"]+/g, '')

    try {
        var payload = jwt.decode(token, Constants.jwt.key)
        if (payload.ext <= moment().unix()) {
            return res.status(401).send({
                message: 'el token a expirado'
            })
        }
    } catch (ex) {
        return res.status(401).send({
            message: 'el token no es valido'
        })
    }
    req.user = payload

    next()
}