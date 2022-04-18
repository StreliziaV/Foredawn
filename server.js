const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const fs = require("fs");
const path = require("path");
const os = require("os");
const multer = require("multer");
const upload = multer({
    dest: 'dest/'
});
const app = express();
app.engine('html', require('express-art-template'))
app.use('/public/', express.static('./public/'))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.render('file.html')
})
var my_v_code = 0;
var temp_user = undefined;

//数据库
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pascal',
    database: 'server'
});
connection.connect();

//随机6位数
function createSixNum() {
    var Num = "";
    for (var i = 0; i < 6; i++) {
        Num += Math.floor(Math.random() * 10);
    }
    return Num;
};

// 允许跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 处理http请求，解析
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/email', (req, res) => {
    my_v_code = createSixNum();
    // res.send({v_code: my_v_code.toString()});
    console.log(req.query.email);

    let transporter = nodemailer.createTransport({
        // host: 'smtp.ethereal.email',
        service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
        port: 465, // SMTP 端口
        secureConnection: true, // 使用了 SSL
        auth: {
            user: '1779598903@qq.com',
            // 这里密码不是qq密码，是你设置的smtp授权码
            pass: 'gtzxxfhhtaryfhig',
        }
    });

    let mailOptions = {
        from: '"Foredawn" <1779598903@qq.com>', // sender address
        to: req.query.email, // list of receivers
        subject: 'Hello', // Subject line
        // 发送text或者html格式
        // text: 'Hello world?', // plain text body
        html: '<b>you code is: ' + my_v_code + '</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
    });
})

app.get('/verify', (req, res) => {

    //查询用户名是否被占用
    const sqlStr1 = 'select * from user where username = ?';
    var param = [req.query.username];
    connection.query(sqlStr1, param, function(err, results) {
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            res.send({ flag: 0 });
            return;
        }
        if (results.length > 0) {
            console.log('The username has been used.');
            res.send({ flag: 1 });
            return;
        }
        if (req.query.v_code == my_v_code.toString()) {

            const sqlStr2 = 'insert into user (username, password, email, photo, isAdmin) value (?,?,?,?,?)'
            var params = [req.query.username, req.query.password, req.query.email, './image/user.png', false];
            connection.query(sqlStr2, params, function(err, results) {
                if (err) {
                    console.log('[INSERT ERROR] - ', err.message);
                    res.send({ flag: 0 });
                    return;
                }
                if (results.affectedRows !== 1) {
                    console.log('Fail to sign in.');
                    res.send({ flag: 0 });
                    return;
                }
                res.send({ flag: 2 });
            });

            my_v_code = 0;

        } else {
            res.send({ flag: 0 });
        }
    });


})

app.get('/login', (req, res) => {

    //查询用户名是否存在
    const sqlStr1 = 'select * from user where username = ?';
    var param = [req.query.username];
    connection.query(sqlStr1, param, function(err, results) {
        temp_user = results[0];
        if (err) {
            console.log('[INSERT ERROR] - ', err.message);
            temp_user = undefined;
            res.send({ flag: 0 });
            return;
        }
        if (results.length < 1) {
            console.log('The username is not exist.');
            temp_user = undefined;
            res.send({ flag: 1 });
            return;
        }
        //密码是否正确
        const sqlStr2 = 'select password from user where username = ?';
        var param = [req.query.username];
        connection.query(sqlStr2, param, function(err, results) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                temp_user = undefined;
                res.send({ flag: 0 });
                return;
            }
            if (results[0].password != req.query.password) {
                console.log('Wrong password.');
                temp_user = undefined;
                res.send({ flag: 2 });
                return;
            }
            //检查是否为管理员
            const sqlStr3 = 'select isAdmin from user where username = ?';
            var param = [req.query.username];
            connection.query(sqlStr3, param, function(err, results) {
                if (err) {
                    console.log('[INSERT ERROR] - ', err.message);
                    temp_user = undefined;
                    inner_flag = 0;
                    res.send({ flag: 0 });
                    return;
                }
                if (results[0].isAdmin == 1) {
                    res.send({ flag: 3 });
                } else {
                    res.send({ flag: 4 });
                }
            });
        });
    });


})

app.get('/my', (req, res) => {
    if (req.query.flag == 0) {
        res.send({
            current_user: temp_user,
        });
    }

    temp_user = undefined;

    if (req.query.flag == 2) {
        temp_user = req.query.current_user;
    }

    if (req.query.flag == 3) {
        var new_pwd = req.query.new;

        //修改密码
        const sqlStr6 = 'update user set password = ? where username = ?';
        var param = [new_pwd, req.query.current_user.username];
        connection.query(sqlStr6, param, function(err, results) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                res.send({ v: 0 });
                return;
            }
            if (results.affectedRows == 0) {
                console.log('Fail to modify password.');
                res.send({ v: 0 });
                return;
            }
            res.send({ v: 1 });
        });

    }
})

app.post('/picture', upload.single('imges'), (req, res) => {
    var imges = req.file
    fs.readFile(imges.path, (err, data) => {
        if (err) {
            console.log("Fail to upload.")
            return;
        }
        var imgesori = imges.originalname
        var radname = Date.now() + parseInt(Math.random() * 999)
        var oriname = imgesori.lastIndexOf('.')
        var hzm = imgesori.substring(oriname, oriname.length)
        var pic = radname + hzm
            //console.log(imges.path);
            //console.log('./dest/' + pic);
        fs.writeFile('./dest/' + pic, data, (err) => {
            if (err) {
                console.log("Image write failure.")
                res.send({
                    code: -1,
                    msg: "Fail to upload!"
                })
                return
            }

            const couter = os.networkInterfaces()
            for (var cm in couter) {
                var cms = couter[cm]
            }

            var picPath = './dest/' + pic;
            var sqlStr4 = "update user set photo = ? where id = ?";
            //console.log(req.body.user_id);
            connection.query(sqlStr4, [picPath, req.body.user_id], (err) => {
                if (err) {
                    console.log('[INSERT ERROR] - ', err.message)
                }
                res.send({
                    code: 200,
                    msg: "Upload successfully!",
                    urls: picPath
                })
            })
        })
    })
})

app.get('/admin', (req, res) => {
    if (req.query.command == 'show_all_user') {
        const sqlStr1 = 'select * from user';
        var param = [];
        connection.query(sqlStr1, param, function(err, results) {
            if (err) {
                console.log('[show_all_user_error] - ', err.message);
                res.send({ dataset: null });
                return;
            }
            if (results.length == 0) {
                console.log('[show_all_user] - no row return');
                res.send({ dataset: 'no_row_return' });
                return;
            }
            res.send({
                dataset: results,
                current_user: temp_user
            })
        });
    } else if (req.query.command == 'modify_password') {
        const sqlStr5 = 'update user set password = ? where username = ?';
        var param = [req.query.new, req.query.username];
        connection.query(sqlStr5, param, function(err, results) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                res.send({ v: 0 });
                return;
            }
            if (results.affectedRows == 0) {
                console.log('Fail to modify password.');
                res.send({ v: 0 });
                return;
            }
            res.send({ v: 1 });
        });
    }
})

app.get('/game', (req, res) => {
    if (temp_user != undefined) {
        const sqlStr1 = 'select * from savefile where user_id = ?';
        var param = [temp_user.id];
        connection.query(sqlStr1, param, function(err, results) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                res.send({ f: 0 });
                return;
            }
            res.send({
                current_user: temp_user,
                result: results,
            });
            temp_user = undefined;
        });
    } else {
        res.send({
            current_user: temp_user,
            result: []
        })
    }
})

app.get('/center', (req, res) => {
    temp_user = req.query.current_user;
    res.send({});
})

app.get('/save', (req, res) => {

    const sqlStr1 = 'delete from savefile where user_id = ? and location = ?';
    var param = [req.query.user_id, req.query.location];
    connection.query(sqlStr1, param, function(err) {
        const sqlStr2 = 'insert into savefile (user_id, save_name, nickname, scene, location, hasring) value (?,?,?,?,?,?)';
        var param = [req.query.user_id, req.query.save_name, req.query.nickname, req.query.scene, req.query.location, req.query.hasring];
        connection.query(sqlStr2, param, function(err) {
            if (err) {
                console.log('[INSERT ERROR] - ', err.message);
                res.send({ f: 0 });
                return;
            }
            res.send({ f: 1 });
        });
    });
})

app.listen(8080, () => {
    console.log('127.0.0.1:8080');
})