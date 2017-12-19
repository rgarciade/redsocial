'use strict'

var User = require('../models/user')

function home(req, res) {
    res.status(200).send({ message: 'home' })
}
function pruebas(req, res) {
    res.status(200).send({ message: 'pruebaa' })
}

module.exports = {
    home,
    pruebas
} 
