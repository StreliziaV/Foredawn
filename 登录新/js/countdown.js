function countdown() {
    var time = 60;
    var user_name = $('#form-username').val(); //获取输入的账户名
    var email = $('#email').val(); //获取输入框的邮箱

    //将用户名和邮箱发到后台
    $.get('/api/email', {
            email: email,
            user_name: user_name
        },
        function(data) {
            console.log(data)
        }
    )

    //设置一个定时，一秒执行一次
    var mytime = setInterval(function() {
        subs();
    }, 1000)

    function subs() {
        time--;
        $('#emialcore').attr("value", "Please wait for" + time + "seconds");
        if (time === 0) {
            clearInterval(mytime);
            $('#emialcore').attr("value", "Send identifying code");
            $('#emialcore').attr("disabled", false); //按键可用
        } else {
            $('#emialcore').attr("disabled", true); //按键不可用
        }
    }
}