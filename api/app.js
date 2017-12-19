'use strict'

var express = require('express')
var bodyParser = require('body-parser')


var app = express()
//cargar rutas
var user_routes = require('./routes/user')

//middlewarw
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//routes
app.use('/api', user_routes)

//exports
module.exports = app