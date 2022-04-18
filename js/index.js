var login_flag = 0;
var sign_up_btn = document.getElementById('sign_up_btn');
var sign_in_btn = document.getElementById('sign_in_btn');

function sign_up() {
    setTimeout("window.location = 'sign_up.html'", 500);
}

function sign_in() {

    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    //username和password不能为空
    if (!username || !password) {
        alert('Please enter both username and password.');
        return
    }

    //密码是否少于8位
    if (password.length < 8) {
        alert('Wrong password.');
        return
    }

    var status = false;
    // ajax
    var myajax = $.ajax({
        url: "http://127.0.0.1:8080/login",
        data: {
            username: username,
            password: password,
        },
        type: "get",
        success: function(data) {
            status = true;
            login_flag = data.flag;
        }
    });

    // 根据 status 的状态 进行后续操作
    // myajax 请求完毕时执行
    $.when(myajax).done(function() {
        if (status) {
            console.log(typeof login_flag);
            if (login_flag == 0) {
                alert('Fail to login.');
                return;
            } else if (login_flag == 1) {
                alert('The username is not exist.');
                return;
            } else if (login_flag == 2) {
                alert('Wrong password.');
                return;
            } else if (login_flag == 3) {
                login_flag = 0;
                alert('Login successfully!');
                setTimeout("window.location = 'admin.html'", 500);
            } else {
                login_flag = 0;
                alert('Login successfully!');
                setTimeout("window.location = 'game.html'", 500);
            }
        }
    });

}

sign_in_btn.addEventListener('click', sign_in);
sign_up_btn.addEventListener('click', sign_up);