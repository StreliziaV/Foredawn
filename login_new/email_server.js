const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();

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
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 处理http请求，解析
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/email', (req, res) => {
    var my_v_code = createSixNum();
    res.send({v_code: my_v_code.toString()});
    console.log(req.query.email);

    let transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
    port: 465, // SMTP 端口
    secureConnection: true, // 使用了 SSL
    auth: {
        user: '填写你自己的邮箱',
        // 这里密码不是qq密码，是你设置的smtp授权码
        pass: '输入你的smtp授权码',
    }
    });

    let mailOptions = {
    from: '"Foredawn" <填写你自己的邮箱>', // sender address
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

app.listen(8080, () => {
    console.log('127.0.0.1:8080');
})