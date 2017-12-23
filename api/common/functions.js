'use strict'
var functions = {}
functions.reserror = (err, res) => {
    res.status(500).send({ message: err })
}
module.exports = functions
