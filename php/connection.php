<?php
	//database connection
	$host = "localhost";
 	$user = "m6000758_cckonex";
 	$pass = "lu43seGIza";
 	$bd = "m6000758_cckonex";
	//if( $link = mysqli_connect("localhost", "m6000758_cckonex", "lu43seGIza", "m6000758_cckonex")){
 	
	if( $link = mysqli_connect("localhost", "blink", "", "blink")){
		$user_name = $_POST["user_name"];
    	$password = $_POST["password"];
     
    	$consulta = "SELECT * FROM users WHERE username = '$user_name' AND password = '$password'";	
		$response = mysqli_query($link, $consulta);
		//Converting data to json format
		$matriz = array();
		while($obj = mysqli_fetch_object($response)){
			$matriz[] = array('username' => $obj->username, 'password' => $obj->password);
			// , 'user_photo' => utf8_encode($obj->user_photo), 'mail' => $obj->mail
		}
		$datos = json_encode(array_values($matriz));
		echo $datos;

	}else{
		echo("no se conecto");
	}
?>