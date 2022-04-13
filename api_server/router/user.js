const express = require('express')
const router = express.Router()
const user_handler = require('../router_handler/user')

//register
router.post('/register', user_handler.register)
//login
router.post('/login', user_handler.login)

module.exports = router