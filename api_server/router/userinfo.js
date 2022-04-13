const express = require('express')
const router = express.Router()
const userinfo_handler = require('../router_handler/userinfo')

//获取用户基本信息
router.get('/userinfo', userinfo_handler.getUserInfo)
router.post('/userinfo', userinfo_handler.updateUserInfo)
router.post('/updatepwd', userinfo_handler.updatePassword)
router.post('/update/avatar'), userinfo_handler.updateAvatar

module.exports = router