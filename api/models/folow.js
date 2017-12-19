'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var FolowSchema = schema({
    user: { type: Schema.ObjetId, ref: 'User' },
    followed: { type: Schema.ObjetId, ref: 'User' }
})
module.exports = mongoose.model('Publication', FolowSchema)