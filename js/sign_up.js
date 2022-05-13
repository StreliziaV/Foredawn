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

    //username and password should not be empty
    if (!username || !password) {
        alert('Please enter both username and password.');
        return
    }

    // check whether the password is less than 8 bits
    if (password.length < 8) {
        alert('The password is not strong enough.');
        return
    }

    var time = 60;
    var email = document.getElementById('email').value; //get email
    if (!isEmail(email)) {
        alert('please enter valid email address');
        return;
    }

    // send the username and email to the back-end
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
            $('#emailcore').attr("disabled", false); //enable
        } else {
            $('#emailcore').attr("disabled", true); //disable
        }
    }
    //excute one time per second
    mytime = setInterval(function() {
        subs();
    }, 1000)
}

function verify() {
    var user_code = document.getElementById('v_code').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // check whether the identifying code is 6 bits
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

    // Act according to status
    // excute after myajax end
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