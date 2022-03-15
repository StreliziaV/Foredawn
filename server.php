<?php
    // $host = 'localhost';
    // $user = 'root';
    // $password = '';
    // $database = 'phpapps';
    // $link=new mysqli($host,$user,$password,$database);

    // if ($link->connect_error){

    //     die("连接失败：".$link->connect_error);

    // }

    // $sql="select * from user";

    // $res=$link->query($sql);

    // $data=$res->fetch_all();

    // var_dump($data);

    $id = $_GET["id"];
    $password = $_GET["password"];
    $judge = 0;
    if ($id == 1) $judge = 1;
    echo $judge;


?>
