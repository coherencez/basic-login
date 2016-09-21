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
app.locals.body = {}

// middlewarez
app.use(session({
  store: new RedisStore(),
  secret: 'loginapphaha',
  resave: false,
  saveUninitialized: true
  // cookie: { secure: true }
}))
app.use((req,res,next) => {
  app.locals.user = req.session.email
  next()
})
app.use(bodyParser.urlencoded({extended: false}))
// error handling
app.use((err,{method, url, headers: {'user-agent': agent}},res,next) => {
  if(process.env.NODE_ENV === 'production') {
    res.sendStatus(err.status || 500)
  } else {
    res.set('Content-Type', 'text/plain').send(err.stack)
  }

  const timeStamp     = new Date()
  const statusCode    = res.statusCode
  const statusMessage = res.statusMessage

  console.error(
       `[${timeStamp}] "${`${method} ${url}`}" Error (${statusCode}): "${statusMessage}"`
     )
  console.error(err.stack)
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

