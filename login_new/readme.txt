邮箱发送检测方法：
终端输入：npm install
（不要删除json文件）

填写email_server.js中你自己的邮箱（邮箱有两处需要填写），和smtp授权码，保存

终端输入：node email_server.js
此时你的计算机已经有一个服务器在运行

打开sign_in.html
输入正确的邮箱地址，就会有相应的验证码发送到邮箱，输入正确邮箱后，会跳转至登录界面

