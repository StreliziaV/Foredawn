function verify() {
    var id = document.getElementById('id');
    var password = document.getElementById('password');
    var idv = id.value;
    var passwordv = password.value;
    var xmlhttp;
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var user_info = xmlhttp.responseText;
            var value = user_info.split(" ");
            if (value == 1) window.alert("pass 1");
            else window.alert("no pass");
        }
    }
    xmlhttp.open("GET", "server.php?id=" + String(idv) + "&password=" + String(passwordv), true);
    xmlhttp.send();
}