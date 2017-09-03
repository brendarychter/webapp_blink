<?php
	require_once("connection.php");
	header("Access-Control-Allow-Origin: *");
    $connection = new connection;

    if(!mysqli_connect_error()){
    	$idGroup = $_POST["idGroup"];

		$query = "select * from modules inner join users on users.userID = modules.idUser where modules.idGroup = '$idGroup'";
		$response = mysqli_query($connection->connected, $query);

		while($obj = mysqli_fetch_object($response)){
			$matriz[] = array('username' => $obj->username, 'phoneNumber' => $obj->phoneNumber, 'photo' => $obj->photo, 'userID' => $obj->userID);
		}
		$datos = json_encode($matriz);
		echo $datos;
	}else{
		echo "error en conexion";
	}
?>