'use strict'

var mongoose = require('mongoose')
var Constants = require('./constants');
var app = require('./app');
var port = Constants.App.port
//connection Database
mongoose.Promise = global.Promise;
mongoose.connect(Constants.Database.route, { useMongoClient: true })
    .then(() => {
        console.log("con okk")
        app.listen(port, () => {
            console.log('servidor corriendo en puerto:' + port)
        })

    })
    .catch(() => {
        console.log('error en la conexion, ejecute nodemond')
    })



