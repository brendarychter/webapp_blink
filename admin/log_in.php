<?php
	session_start();
	require_once("connection.php");
	header("Access-Control-Allow-Origin: *");
    $connection = new connection;

    if(!mysqli_connect_error()){
		if(isset($_POST['username']) && isset($_POST['password'])){
			$username = $_POST["username"];
			$password = $_POST["password"];
			// $consulta = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
			// $response = mysqli_query($connection->connected, $consulta);
			// $matriz = array();

			// if($response = mysqli_query($connection->connected, $consulta)){
			// 	if(mysqli_num_rows($response)>=1){
			// 		while($obj = mysqli_fetch_object($response)){
			// 			$matriz = array('username' => $obj->username, 'password' => $obj->password, 'mail' => utf8_encode($obj->mail), 'phoneNumber' => $obj->phoneNumber, 'userID' => $obj->userID, 'active' => $obj->active);
			// 		}
			// 	}else{
	  //       		$matriz = array('userID'=>0);
			// 	}
			// }
			// $datos = json_encode($matriz);
			echo $username;
		}else{
			echo "data not setted";
		}
	}else{
		echo "error en conexion";
	}
?>