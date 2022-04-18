var verify_flag = 0;
var email_btn = document.getElementById('emailcore');
var verify_btn = document.getElementById('sign_up_btn');

function isEmail(strEmail) {
    if (strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) return true;
    else return false;
}

//countdown and send email
function countdown() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    //username和password不能为空
    if (!username || !password) {
        alert('Please enter both username and password.');
        return
    }

    //密码是否少于8位
    if (password.length < 8) {
        alert('The password is not strong enough.');
        return
    }

    var time = 60;
    var email = document.getElementById('email').value; //获取输入框的邮箱
    if (!isEmail(email)) {
        alert('please enter valid email address');
        return;
    }

    //将用户名和邮箱发到后台
    $.get('http://127.0.0.1:8080/email', {
        email: email,
    })
    var mytime = null;

    function subs() {
        time--;
        $('#emailcore').attr("value", "Please wait for " + time + " seconds");
        $('#emailcore').attr("color", 'red');
        if (time === 0) {
            time = 60;
            clearInterval(mytime);
            $('#emailcore').attr("value", "Send identifying code");
            $('#emailcore').attr("disabled", false); //按键可用
        } else {
            $('#emailcore').attr("disabled", true); //按键不可用
        }
    }
    //设置一个定时，一秒执行一次
    mytime = setInterval(function() {
        subs();
    }, 1000)
}

function verify() {
    var user_code = document.getElementById('v_code').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    //验证码是否非6位
    if (user_code.length != 6) {
        alert('please enter correct verify code');
        return;
    }

    var status = false;
    // ajax
    var myajax = $.ajax({
        url: "http://127.0.0.1:8080/verify",
        data: {
            v_code: user_code,
            username: username,
            password: password,
            email: document.getElementById('email').value
        },
        type: "get",
        success: function(data) {
            status = true;
            verify_flag = data.flag;
        }
    });

    // 根据 status 的状态 进行后续操作
    // myajax 请求完毕时执行
    $.when(myajax).done(function() {
        if (status) {
            console.log(typeof verify_flag);
            if (verify_flag == 0) {
                alert('Please check the info again.');
                return;
            } else if (verify_flag == 1) {
                alert('The username has been used.');
                return;
            }
            verify_flag = 0;
            alert('Sign in successfully!');
            setTimeout("window.location = 'index.html'", 500);
        }
    });


}

email_btn.addEventListener('click', countdown);
verify_btn.addEventListener('click', verify);