'use strict'
const  mongoose = require('mongoose')
  ,   MONGODB_URL = process.env.TEST || 'mongodb://localhost:27017/basic-login'

mongoose.Promise = Promise

module.exports.connect = () => mongoose.connect(MONGODB_URL)
module.exports.disconnect = () => mongoose.disconnect()
