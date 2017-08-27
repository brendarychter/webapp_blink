<?php
	require_once("connection.php");
	header("Access-Control-Allow-Origin: *");
    $connection = new connection;

    if(!mysqli_connect_error()){
    	$idGroup = $_POST["idGroup"];
		$consulta = "select * from texts inner join users on users.userID = texts.idUser where idGroup = '$idGroup'";
		$response = mysqli_query($connection->connected,$consulta);

		while($obj = mysqli_fetch_object($response)){
			if($obj->active){
				$matriz[] = array('idText' => $obj->idText, 'texto' => utf8_encode($obj->texto), 'idUser' => $obj->idUser, 'idGroup' => $obj->idGroup, 'datetimeText' => $obj->datetimeText, 'username' => $obj->username, 'photo' => $obj->photo);
			}
		}
		$datos = json_encode($matriz);
		echo $datos;
	}else{
		echo "error en conexion";
	}
?>