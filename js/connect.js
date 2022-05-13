var current_user = undefined
var save = undefined
var starter = document.getElementById('starter');

// get current_user & load save list
window.onload = function() {
    var status = false;
    // ajax
    var myajax = $.ajax({
        url: "http://127.0.0.1:8080/game",
        type: "get",
        success: function(data) {
            status = true;
            current_user = data.current_user;
            save = data.result;
        }
    });

    // Act according to status
    // excute after myajax end
    $.when(myajax).done(function() {
        if (status) {
            console.log('connect' + current_user)
            if (current_user == undefined) {
                alert('Fail to get userinfo. Please login!');
                setTimeout("window.location = 'index.html'", 500);
                return;
            }
            if (save != undefined) {
                // load the game materials
                for (var i = 0; i <= save.length - 1; i++) {
                    saved[save[i].location - 1] = save[i].scene;
                    saved2[save[i].location - 1] = save[i].hasring;
                    saved3[save[i].location - 1] = save[i].nickname;
                    var k = save[i].location;
                    switch (k) {
                        case 1:
                            location1.innerHTML = save[i].save_name;
                            break;
                        case 2:
                            location2.innerHTML = save[i].save_name;
                            break;
                        case 3:
                            location3.innerHTML = save[i].save_name;
                            break;
                        case 4:
                            location4.innerHTML = save[i].save_name;
                            break;
                        case 5:
                            location5.innerHTML = save[i].save_name;
                            break;
                        case 6:
                            location6.innerHTML = save[i].save_name;
                            break;
                        case 7:
                            location7.innerHTML = save[i].save_name;
                            break;
                        case 8:
                            location8.innerHTML = save[i].save_name;
                            break;
                        case 9:
                            location9.innerHTML = save[i].save_name;
                            break;
                        case 10:
                            location10.innerHTML = save[i].save_name;
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    });
}

// jump to personnel center
function center() {
    var status = false;
    // ajax
    var myajax = $.ajax({
        url: "http://127.0.0.1:8080/center",
        data: {
            current_user: current_user,
        },
        type: "get",
        success: function(data) {
            status = true;
        }
    });

    // Act according to status
    // excute after myajax end
    $.when(myajax).done(function() {
        if (status) {
            setTimeout("window.location = 'my.html'", 500);
        }
    });
}

// the save savefiles in DB application sending to the back-end
function save_data(location, scene, save_name, hasring, nickname) {
    var status = false;
    // ajax
    var myajax = $.ajax({
        url: "http://127.0.0.1:8080/save",
        data: {
            user_id: current_user.id,
            location: location,
            scene: scene,
            save_name: save_name,
            hasring: hasring,
            nickname: nickname
        },
        type: "get",
        success: function(data) {
            status = true;
            flag = data.f;
        }
    });

    // Act according to status
    // excute after myajax end
    $.when(myajax).done(function() {
        if (status) {
            if (f = 0) {
                alert('Fail to save.');
            }
            alert('Save successfully!');
        }
    });
}

starter.children[2].addEventListener('click', center);