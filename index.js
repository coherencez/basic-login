'use strict'
const {Router} = require('express')
  ,    bcrypt = require('bcrypt')
  ,    route = Router()

route.get('/', (req,res) => {
  res.send('<h1>Hello from the routing page</h1>')
})
  module.exports = route
