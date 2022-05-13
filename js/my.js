var current_user = undefined;
var log_out = document.getElementById('logout');
var modify = document.getElementById('modify');
var back_to_game = document.getElementById('game');
var photo = document.getElementById('photo');

// display the user information as soon as openning the page
window.onload = function() {
    var status = false;
    var flag_value = 0;
    // ajax
    var myajax = $.ajax({
        url: "http://127.0.0.1:8080/my",
        data: {
            flag: flag_value,
        },
        type: "get",
        success: function(data) {
            status = true;
            current_user = data.current_user;
        }
    });

    // Act according to status
    // excute after myajax end
    $.when(myajax).done(function() {
        if (status) {
            if (current_user == undefined) {
                alert('Fail to get userinfo. Please login!');
                setTimeout("window.location = 'index.html'", 500);
                return;
            } else {
                flag = 1;
                photo.src = current_user.photo;
                document.getElementById('username').innerText = current_user.username;
                document.getElementById('email').innerText = current_user.email;
            }
            console.log(current_user)
        }
    });
}

// logout
function logout() {
    current_user = undefined;
    window.location = 'index.html';
}

// jump to the game page
function backtogame() {
    var status = false;
    flag_value = 2;
    // ajax
    var myajax = $.ajax({
        url: "http://127.0.0.1:8080/my",
        data: {
            flag: flag_value,
            current_user: current_user,
        },
    });
    setTimeout("window.location = 'game.html'", 500);
}

// modify the password with old password and valid new password
function modify_pwd() {
    old_pwd = document.getElementById('old').value;
    new_pwd = document.getElementById('new').value;
    verif = document.getElementById('verif').value;

    if (new_pwd != verif) {
        alert('Please verify your new password again.');
        return;
    } else if (old_pwd != current_user.password) {
        alert('Wrong old password.');
        return;
    } else if (new_pwd.length < 8) {
        alert('New password is not strong enough.');
        return;
    } else {
        var status = false;
        flag_value = 3
            // ajax
        var myajax = $.ajax({
            url: "http://127.0.0.1:8080/my",
            data: {
                flag: flag_value,
                new: new_pwd,
                current_user: current_user,
            },
            type: "get",
            success: function(data) {
                status = true;
                verify_flag = data.v;
            }
        });

        // Act according to status
        // excute after myajax end
        $.when(myajax).done(function() {
            if (status) {
                if (verify_flag = 0) {
                    alert('Fail to modify password.');
                    return;
                }
                verify_flag = 0;
                alert('Modify successfully!');
                document.getElementById('old').value = ''
                document.getElementById('new').value = ''
                document.getElementById('verif').value = ''
            }
        });
    }

    var time = 60;
    var mytime = null;

    function subs() {
        time--;
        $('#modify').attr("value", "Please wait for " + time + " seconds");
        $('#modify').attr("color", 'red');
        if (time === 0) {
            time = 60;
            clearInterval(mytime);
            $('#modify').attr("value", "modify");
            $('#modify').attr("disabled", false); //enable
        } else {
            $('#modify').attr("disabled", true); //disable
        }
    }
    // excute ome time per second
    mytime = setInterval(function() {
        subs();
    }, 1000)
}

//upload photo
$(function() {
    // ajax
    function update(url, formdata, callback) {
        $.ajax({
            url: url,
            type: "POST",
            data: formdata,
            dataType: "json",
            processData: false, // jQuery does not process the data
            contentType: false,
            success: function(data) {
                callback(data)
            },
            error: function(err) {
                console.log("Server failure.", err);
                $("#text").text("Server failure. Please upload again!")
            }

        })
    }
    // call when excuting input
    $("#pic").change(function() {
        var imgSize = 4000000
        var zzz = /\.(jpg|png|jpeg|bmp)/i
        var str = this.files[0].name
        var sizes = this.files[0].size
        var last = str.lastIndexOf('.')
        var jq = str.substring(last, last.length).toLowerCase();
        if (zzz.test(jq) && sizes <= imgSize) {

            var url = "http://127.0.0.1:8080/picture"
            var imgFiles = $("#pic")[0].files[0]
            var formdata = new FormData()
            formdata.append("imges", imgFiles)
            formdata.append("user_id", current_user.id)
            update(url, formdata, function(data) {
                console.log(data)
                if (data.code < 0) {
                    $("#text").text(data.msg)
                }
                $("#text").text(data.msg)
                console.log(data.urls);
                photo.src = data.urls;
                current_user.photo = data.urls;
            })

        } else {
            alert("Please select a photo in proper format and smaller than 4M ")
        }
    })
})

// display the path of uploaded file
$("#pic").change(function() {
    $("#text").html($("#pic").val());
})

log_out.addEventListener('click', logout);
back_to_game.addEventListener('click', backtogame);
modify.addEventListener('click', modify_pwd);