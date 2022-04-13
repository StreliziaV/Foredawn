const express = require('express')
const app = express()
//将cors注册为全局中间件
const cors = require('cors')
app.use(cors())

//只能解析application/x-www-form-urlencoded格式的表单数据
app.use(express.urlencoded({ extended: false }))

//封装res.cc()
app.use(function(req, res, next) {
    res.cc = function(err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        })
    }
    next()
})

//关于Token
const expressJWT = require('express-jwt')
const config = require('.config')
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api/] }))

//导入并使用用户路由模块
const userRouter = require('./router/user')
app.use('./api', userRouter)
//导入并使用用户信息路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)

//关于err
app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') return res.cc('Authentication failed.')
    return res.cc(err)
})

//3007是端口号,只要空闲就可
app.listen(3007, function() {
    console.log('api server running at http://127.0.0.1:3007')
})