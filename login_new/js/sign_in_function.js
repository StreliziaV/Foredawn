var verify_code = undefined;
var email_btn = document.getElementById('emailcore');
var verify_btn = verify_btn = document.getElementById('sign_in_btn');

function isEmail(strEmail) {
    if (strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) return true;
    else return false;
}

//countdown and send email
function countdown() {
    var time = 60;
    var email = document.getElementById('email').value; //获取输入框的邮箱
    if (!isEmail(email)) {
        alert('please enter valid email address');
        return;
    }

    //将用户名和邮箱发到后台
    $.get('http://127.0.0.1:8080/email', {
            email: email,
        },
        function(data) {
            console.log(data)
            verify_code = data.v_code;
        }
    )
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
    if (user_code.length != 6) {
        alert('please enter correct verify code');
        return;
    }
    if (user_code != verify_code) {
        alert('please enter correct verify code');
        return;
    }
    verify_btn.value = 'verify success';
    verify_code = undefined;
    setTimeout(window.location = 'index.html', 500);

}

var email_btn = document.getElementById('emailcore');
email_btn.addEventListener('click', countdown);

verify_btn.addEventListener('click', verify);