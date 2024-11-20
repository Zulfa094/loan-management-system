const mongoose = require('mongoose')

const serviceSchema = new mongoose.Schema({})

const Service = mongoose.model('Service', serviceSchema)
module.exports = Service
