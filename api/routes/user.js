'use strict'


var express = require('express')
var UserController = require('../controllers/usercontroller')

var api = express.Router();
var md_auth = require('../middelwares/authentificate')



function prueba(req, res) {
    return res.status(200).send({ message: 'prueba ok' })
}


api.post('/register', UserController.saveUser)
api.post('/loging', UserController.loginguUser)
api.post('/pruebas', md_auth.ensureAuth, prueba)


module.exports = api;