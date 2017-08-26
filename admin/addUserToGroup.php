<?php
	require_once("connection.php");
	header("Access-Control-Allow-Origin: *");
    $connection = new connection;
    
    if(!mysqli_connect_error()){
    	//chequear que no exista el nombre del grupo
    	$idGgroup = $_POST["groupID"];
    	$id = $_POST["id"];

	    $consulta4 = "INSERT INTO modules (idGroup, idUser, idType) VALUES ('$idGroup', '$id', 1)";
		if (mysqli_query ($connection->connected, $consulta4)) {
			$responseArray = array('type' => 'success', 'message' => 'ok');
		}

		$encoded = json_encode($responseArray);
		echo $encoded;
	}
?>