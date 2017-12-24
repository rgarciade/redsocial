'use strict'

var express = require('express')
var UserController = require('../controllers/usercontroller')

var api = express.Router();

api.post('/register', UserController.saveUser)
api.post('/loging', UserController.loginguUser)

module.exports = api;