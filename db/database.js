'use strict'
const  mongoose = require('mongoose')
  ,   MONGO_URI = process.env.MOGODB_URL || 'mongodb://localhost:27017/basic-login'

mongoose.Promise = Promise

module.exports.connect = () => mongoose.connect(MONGO_URI)
module.exports.disconnect = () => mongoose.disconnect()
