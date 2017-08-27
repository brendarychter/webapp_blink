<?php
	require_once("connection.php");
	header("Access-Control-Allow-Origin: *");
    $connection = new connection;
    
    if(!mysqli_connect_error()){
    	//chequear que no exista el nombre del grupo
    	$idGroup = $_POST["idGroup"];
    	$idUser = $_POST["userID"];
    	$text = $_POST["text"];
    	$datetime = gmdate("Y-m-d H:i:s");;

	    $consulta = "INSERT INTO texts (idGroup, idUser, texto, datetimeText) VALUES ('$idGroup', '$idUser', '$text', '$datetime')";
		if (mysqli_query ($connection->connected, $consulta)) {
			$responseArray = array('type' => 'success', 'message' => 'ok');
		}

		$encoded = json_encode($responseArray);
		echo $encoded;
	}
?>