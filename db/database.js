'use strict'
const  mongoose = require('mongoose')
  ,   MONGO_URI = 'mongodb://localhost:27017/basic-login'

mongoose.Promise = Promise

module.exports.connect = () => mongoose.connect(MONGO_URI)
module.exports.disconnect = () => mongoose.disconnect()

