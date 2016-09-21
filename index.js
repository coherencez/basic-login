'use strict'
const {Router} = require('express')
  ,     bcrypt = require('bcrypt')
  ,       User = require('./db/user')
  ,      route = Router()

route.post('*', ({body: {logout}},res) => {
	if(logout) {
		res.redirect('/')
	}
})

route.get('/', (req,res) => {
  res.render('index')
})

route.get('/login', (req,res) => {
  res.render('login', {title: 'Please login below'})
})

route.post('/login', (req,res) => {
	// handle db call
	// handle redirect
	// encrypt??
})

route.get('/register', (req,res) => {
	res.render('register', {title: 'Register New Account'})
})

route.post('/register', ({body},res, err) => {
	// create user in db
	// redirect to login page
	User
		.create(body)
		.then(() => res.redirect('/login'))
		.catch(err)
})

module.exports = route
