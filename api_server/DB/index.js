const mysql = require('mysql')

const DB = mysql.createPool({
    host: '127.0.0.1',   //这个代表本机，之后可换成服务器
    user: 'root',
    password: '1234', //自己随便设
    database: 'server'
})

module.exports = DB