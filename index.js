'use strict'
const {Router} = require('express')
  ,     bcrypt = require('bcrypt')
  ,       User = require('./db/user')
  ,      route = Router()


route.get('/', (req,res) => {
  res.render('index')
})
route.post('/', (req,res) => {
	if(logout) {
		req.session.destroy(err => {
      if(err) throw err
      res.redirect('/login')
    })
	}
})

route.get('/login', (req,res) => {
  res.render('login', {title: 'Please login below'})
})

route.post('/login', ({ body },res,err) => {
	// handle db call
	// handle redirect
	User
		.findOne(body)
		.then(dbUser => {
			if(dbUser) {
				if(body.password === dbUser.password) {
					res.render('index', {user: true})
				} else {
					res.render('login', {title: 'Email or password incorrect. Please try again'})
				}
			}
			else {
				res.render('login', {title: 'user not found'})
			}
		})
		.catch(err)
	// encrypt??
})

route.get('/register', (req,res) => {
	res.render('register', {title: 'Register New Account'})
})

route.post('/register', ({ body },res, err) => {
	// create user in db
	// redirect to login page
	User
		.create(body)
		.then(() => res.redirect('/login'))
		.catch(err)
})

module.exports = route
