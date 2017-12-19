'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var publicationSchema = schema({
    text: String,
    file: String,
    created_at: String,
    user: { type: Schema.ObjetId, ref: 'User' }
})
module.exports = mongoose.model('Publication', publicationSchema)