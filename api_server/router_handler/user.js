const db = require('../DB/index')
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.register = function(req, res){
    const userinfo = req.body

    //username和password不能为空
    if (!userinfo.username || !userinfo.password){
        return res.send({status: 1, message: 'Please enter both username and password.'})
    }
    
    //查询用户名是否被占用
    const sqlStr1 = 'select * from users where username = ?'
    db.query(sqlStr1, userinfo.username, function(err, results){
        if (err){
            return res.cc(err)
        }
        if (results.length > 0){
            return res.cc('The username has been used.')
        }
    })

    //密码是否少于8位
    if (userinfo.password.length < 8){
        return res.cc('The password is not strong enough.')
    }

    //插入新用户
    const sqlStr2 = 'insert into users set ?'
    db.query(sqlStr2, {username: userinfo.username, password: userinfo.password}, function(err, results){
        if (err) {
            return res.cc(err)
        }
        if (results.affectedRows !== 1) {
            return res.cc('Fail to sign in. Please retry after a while.')
        }
        res.cc('Sign in successfully!', 0)
    })
}

exports.login = function(req, res){
    const userinfo = req.body

    //username和password不能为空
    if (!userinfo.username || !userinfo.password){
        return res.send({status: 1, message: 'Please enter both username and password.'})
    }
    
    //查询用户信息
    const sqlStr3 = 'select * from users where username = ?'
    db.query(sqlStr3, userinfo.username, function(err, results){
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('Fail to login.')
        if (userinfo.password !== results[0].password) return res.cc('Wrong password.')
    })

    const user = {...results[0], password: '', user_pic: ''}
    //对用户的信息进行加密，生成Token字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {expiresIn: config.expiresIn})
    res.send({
        status: 0,
        message: 'Sign up successfully!',
        token: 'Bearer ' + tokenStr
    })
}