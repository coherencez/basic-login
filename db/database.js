'use strict'
const  mongoose = require('mongoose')
  ,   MONGODB_URL = process.env.MOGODB_URL

mongoose.Promise = Promise

module.exports.connect = () => mongoose.connect(MONGODB_URL)
module.exports.disconnect = () => mongoose.disconnect()
