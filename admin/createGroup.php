<?php
	require_once("connection.php");
	header("Access-Control-Allow-Origin: *");
    $connection = new connection;


    
    if(!mysqli_connect_error()){
    	//chequear que no exista el nombre del grupo
    	$group = $_POST["groupName"];
    	$id = $_POST["id"];
    	$errorNombreGrupo = '-Ya existe un grupo con ese nombre, elija otro-';

		$query = "SELECT * FROM groups WHERE groupName = '$group'";;
		$response = mysqli_query($connection->connected, $query);
		$responseArray = [];
		if(!mysqli_num_rows($response)>=1){
			$consulta = "INSERT INTO groups (groupName) VALUES ('$group')";

			if (mysqli_query ($connection->connected, $consulta)) {
				
				$consulta3 = "INSERT INTO modules (groupName, idUser) VALUES ('$group', '$id')";
				
				if (mysqli_query ($connection->connected, $consulta3)) {
					$responseArray = array('type' => 'success', 'message' => 'ok');
				}

			} else {
			    echo "Error en la creacion del grupo.";
			}
		}else{
			$responseArray = array('type' => 'errorNameGroup', 'message' => $errorNombreGrupo);
		}

		$encoded = json_encode($responseArray);
		echo $encoded;
	}
?>