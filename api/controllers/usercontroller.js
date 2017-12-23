'use strict'
var bcrypt = require('bcrypt-nodejs')
var User = require('../models/user')
var functions = require('../common/functions')

function home(req, res) {
    res.status(200).send({ message: 'home' })
}
function pruebas(req, res) {
    res.status(200).send({ message: 'pruebaa' })
}
function saveUser(req, res) {
    var params = req.body
    var user = new User
    if (params.name && params.surname && params.nick && params.email && params.password) {
        user.name = params.name
        user.surname = params.surname
        user.nick = params.nick
        user.email = params.email
        user.role = 'ROLE_USER'
        user.image = null

        bcrypt.hash(params.password, null, null, (err, hash) => {
            user.password = hash
            user.save((err, userStore) => {
                if (err) {
                    functions.reserror(err, res)
                } else if (userStore) {
                    res.status(200).send({ message: 'usuario creado', user: userStore })
                } else {
                    res.status(404).send({ message: 'no se ha registrado el usuario' })
                }
            })
        })

    } else {
        functions.reserror('Envia los campos necesarios', res)
    }

}

module.exports = {
    home,
    pruebas,
    saveUser
} 
