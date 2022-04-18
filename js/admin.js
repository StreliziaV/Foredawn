var current_user = undefined;
var request_result = undefined;
var modify = document.getElementById('modify');
var log_out = document.getElementById('logout');
var update = document.getElementById('update');
username = document.getElementById('username');
new_pwd = document.getElementById('new');
verif = document.getElementById('verif');
var display_zone = document.getElementById('display_zone');

//显示user list
window.onload = function() {
    var status = false;
    // ajax
    var myajax = $.ajax({
        url: "http://127.0.0.1:8080/admin",
        data: {
            command: 'show_all_user',
        },
        type: "get",
        success: function(data) {
            status = true;
            request_result = data.dataset;
            current_user = data.current_user;
        }
    });

    // 根据 status 的状态 进行后续操作
    // myajax 请求完毕时执行
    $.when(myajax).done(function() {
        if (status) {
            if (current_user == undefined) {
                alert('Please login!');
                setTimeout("window.location = 'index.html'", 500);
                return;
            } else {
                if (request_result == null) {
                    alert('Database error, please check.');
                    return;
                }
                if (request_result == 'no_row_return') {
                    display_zone.innerHTML = '<table>no_row_return</table>'
                    return;
                }
                for (var i = 0; i < request_result.length; i++) {
                    var new_tr = document.createElement("tr");

                    //插入
                    var new_td1 = document.createElement("td");
                    new_td1.innerHTML = request_result[i].id;
                    new_tr.appendChild(new_td1);
                    var new_td2 = document.createElement("td");
                    new_td2.innerHTML = request_result[i].username;
                    new_tr.appendChild(new_td2);
                    var new_td3 = document.createElement("td");
                    new_td3.innerHTML = request_result[i].password;
                    new_tr.appendChild(new_td3);
                    var new_td4 = document.createElement("td");
                    new_td4.innerHTML = request_result[i].email;
                    new_tr.appendChild(new_td4);
                    var new_td5 = document.createElement("td");
                    if (request_result[i].isAdmin == 1) {
                        new_td5.innerHTML = 'Yes'
                    } else {
                        new_td5.innerHTML = 'No'
                    }
                    new_tr.appendChild(new_td5);

                    display_zone.appendChild(new_tr);
                }
            }
        }
    });
}

//登出
function logout() {
    current_user = undefined;
    window.location = 'index.html';
}

//修改密码
function modify_pwd() {

    if (new_pwd.value != verif.value) {
        alert('Please verify your new password again.');
        return;
    } else if (new_pwd.value.length < 8) {
        alert('New password is not strong enough.');
        return;
    } else {
        var status = false;
        // flag_value = 3
        // ajax
        var myajax = $.ajax({
            url: "http://127.0.0.1:8080/admin",
            data: {
                // flag: flag_value,
                new: new_pwd.value,
                username: username.value,
                command: 'modify_password'
            },
            type: "get",
            success: function(data) {
                status = true;
                verify_flag = data.v;
            }
        });

        // 根据 status 的状态 进行后续操作
        // myajax 请求完毕时执行
        $.when(myajax).done(function() {
            if (status) {
                if (verify_flag = 0) {
                    alert('Fail to modify password.');
                    return;
                }
                verify_flag = 0;
                alert('Modify successfully!');
                username.value = '';
                new_pwd.value = '';
                verif.value = '';
            }
        });
    }
}

//更新
function update_info() {
    var status = false;
    // ajax
    var myajax = $.ajax({
        url: "http://127.0.0.1:8080/admin",
        data: {
            command: 'show_all_user',
        },
        type: "get",
        success: function(data) {
            status = true;
            request_result = data.dataset;
        }
    });

    // 根据 status 的状态 进行后续操作
    // myajax 请求完毕时执行
    $.when(myajax).done(function() {
        if (status) {
            if (request_result == null) {
                alert('Database error, please check.');
                return;
            }
            if (request_result == 'no_row_return') {
                display_zone.innerHTML = '<table>no_row_return</table>'
                return;
            }
            display_zone.innerHTML = '<table id="display_zone"><tr><th> User_id</th><th> Username</th><th> Password</th><th> Email</th><th> IsAdmin</th></tr> </table>'
            console.log(display_zone)
            for (var i = 0; i < request_result.length; i++) {

                var new_tr = document.createElement("tr");

                //插入
                var new_td1 = document.createElement("td");
                new_td1.innerHTML = request_result[i].id;
                new_tr.appendChild(new_td1);
                var new_td2 = document.createElement("td");
                new_td2.innerHTML = request_result[i].username;
                new_tr.appendChild(new_td2);
                var new_td3 = document.createElement("td");
                new_td3.innerHTML = request_result[i].password;
                new_tr.appendChild(new_td3);
                var new_td4 = document.createElement("td");
                new_td4.innerHTML = request_result[i].email;
                new_tr.appendChild(new_td4);
                var new_td5 = document.createElement("td");
                if (request_result[i].isAdmin == 1) {
                    new_td5.innerHTML = 'Yes'
                } else {
                    new_td5.innerHTML = 'No'
                }
                new_tr.appendChild(new_td5);

                display_zone.appendChild(new_tr);
            }
        }
    });
}

modify.addEventListener('click', modify_pwd);
log_out.addEventListener('click', logout);
update.addEventListener('click', update_info);