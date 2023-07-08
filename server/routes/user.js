const express = require('express')
const {userSignUp, userLogIn} = require('../controllers/userController')

const router = express.Router()

//Signup
router.post('/signup', userSignUp)

//Login
router.post('/login', userLogIn)

module.exports = router