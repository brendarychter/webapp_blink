<?php
	session_start();
	require_once("connection.php");
    $connection = new connection;

	if(isset($_POST['username']) && isset($_POST['password'])){
		$username = $_POST["username"];
		$password = $_POST["password"];
		$consulta = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
		$response = mysqli_query($connection->connected, $consulta);

		if($response = mysqli_query($connection->connected, $consulta)){
			if(mysqli_num_rows($response)>=1){
				while($obj = mysqli_fetch_object($response)){
					$matriz = array('username' => $obj->username, 'password' => $obj->password, 'mail' => utf8_encode($obj->mail), 'phoneNumber' => $obj->phoneNumber, 'userID' => $obj->userID, 'active' => $obj->active);
				}
			}else{
        		$matriz = array('userID'=>0);
			}
		}
		$datos = json_encode($matriz);
		echo $datos;
	}
?>