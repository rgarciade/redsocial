'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var FolowSchema = schema({
    emitter: { type: Schema.ObjetId, ref: 'User' },
    receiver: { type: Schema.ObjetId, ref: 'User' },
    text: String,
    created_at: String
})
module.exports = mongoose.model('Publication', FolowSchema)