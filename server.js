'use strict'
const express = require('express')
  ,   session = require('express-session')
  ,bodyParser = require('body-parser')
  ,RedisStore = require('connect-redis')(session)
  ,  {connect} = require('./db/database')
  ,       app = express()
  ,      port = process.env.PORT || 3000
  ,    routes = require('./index')

// environment setup
app.set('port', port)
app.set('view engine', 'pug')
app.use(express.static('public'))
app.locals.title = 'BASIC LOGIN'

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
// error handling
app.use((err,req,res,next) => {
  res.sendStatus(err.status || 500)
  console.error(`[${new Date().toString()}] ${req.method} ${req.url}`)
  console.error(err.stack)
  next()
})
app.use(routes)
// connect to db then initiate server on port 3000
connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Now listening on port ${port}`);
    })
  })
  .catch(console.error)

