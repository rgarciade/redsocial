'use strict'
var bcrypt = require('bcrypt-nodejs')
var User = require('../models/user')
var functions = require('../common/functions')
var jwtfunctions = require('../services/jwt')

function saveUser(req, res) {
    var params = req.body
    var user = new User

    if (params.name && params.surname && params.nick && params.email && params.password) {
        user.name = params.name
        user.surname = params.surname
        user.nick = params.nick
        user.email = params.email
        user.password = params.password
        user.role = 'ROLE_USER'
        user.image = null

        //comprovar usuario

        User.find({
            $or: [
                { email: user.email.toLowerCase() },
                { nick: user.nick.toLowerCase() }
            ]
        }).exec((err, users) => {

            if (err) return functions.reserror('error en la peticion de usuarios', res)
            if (users && users.length > 0) {
                return res.status(200).send({ message: 'El usuario ya existe' })
            } else {
                createUser(res, user)
            }

        })
    } else {
        functions.reserror('Envia los campos necesarios', res)
    }
}
function loginguUser(req, res) {
    var params = req.body

    var email = params.email
    var password = params.password

    User.findOne({ email: email }, (err, user) => {
        if (err) return functions.reserror(err, res)
        if (user) {
            bcrypt.compare(password, user.password, (err, check) => {
                if (check) {
                    if (params.gettoken) {
                        return res.status(200).json(jwtfunctions.createToken(user))
                    } else {
                        user.password = undefined
                        return res.status(200).json(user)
                    }
                } else {
                    return functions.reserror('error en el loging', req)
                }
            })
        } else {
            return functions.reserror('no existe el usuario', res)
        }
    })
}
function createUser(res, user) {
    //encriptar y añadir usuario
    bcrypt.hash(user.password, null, null, (err, hash) => {
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
}

module.exports = {
    saveUser,
    loginguUser
} 
