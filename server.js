'use strict'
const express = require('express')
  ,   session = require('express-session')
  ,bodyParser = require('body-parser')
  ,RedisStore = require('connect-redis')(session)
  ,       app = express()
  ,      port = process.env.PORT || 3000
  ,    routes = require('./index')

// environment setup
app.set('port', port)
app.set('view engine', 'pug')

// middlewarez
app.use(session({
  store: new RedisStore(),
  secret: 'loginapphaha'
}))
app.use((req,res,next) => {
  app.locals.user = req.session.email
  next()
})
app.use(bodyParser.urlencoded({extendable: false}))

app.use(routes)

app.listen(port, () => {
  console.log(`Now listening on port ${port}`);
})
