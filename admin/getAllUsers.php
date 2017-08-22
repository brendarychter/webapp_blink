<?php
	require_once("connection.php");
	header("Access-Control-Allow-Origin: *");
    $connection = new connection;

    if(!mysqli_connect_error()){
		$consulta = "SELECT * FROM users";
		$response = mysqli_query($connection->connected,$consulta);

		while($obj = mysqli_fetch_object($response)){
			$matriz[] = array('name' => $obj->name, 'username' => $obj->username, 'password' => $obj->password, 'userID' => $obj->userID, 'mail' => $obj->mail, 'phoneNumber' => $obj->phoneNumber, 'datetime' => $obj->datetime, 'active' => $obj->active, 'photo' => $obj->photo);
		}
		$datos = json_encode($matriz);
		echo $datos;
	}else{
		echo "error en conexion";
	}
?>