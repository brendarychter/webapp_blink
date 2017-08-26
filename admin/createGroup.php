<?php
	require_once("connection.php");
	header("Access-Control-Allow-Origin: *");
    $connection = new connection;


    
    if(!mysqli_connect_error()){
    	//chequear que no exista el nombre del grupo
    	$group = $_POST["groupName"];
    	$id = $_POST["id"];
    	$usersList = $_POST["usersList"];
    	$errorNombreGrupo = '-Ya existe un grupo con ese nombre, elija otro-';
    	//$arrayIDS = $_POST["array_ids"];
		$query = "SELECT * FROM groups WHERE groupName = '$group'";;
		$response = mysqli_query($connection->connected, $query);
		$responseArray = [];
		if(!mysqli_num_rows($response)>=1){
			$consulta = "INSERT INTO groups (groupName) VALUES ('$group')";

			if (mysqli_query ($connection->connected, $consulta)) {
				$consulta2 = "SELECT * FROM groups WHERE groupName = '$group'";
				
				if($response2 = mysqli_query($connection->connected, $consulta2)){
					if(mysqli_num_rows($response2)>=1){
						while($obj = mysqli_fetch_object($response2)){
							$idGroup = $obj->idGroup;
						}
						//for loop con cada id seleccionado

						foreach ($usersList as $value) {
						    $consulta4 = "INSERT INTO modules (idGroup, idUser, idType) VALUES ('$idGroup', '$value', 1)";
							if (mysqli_query ($connection->connected, $consulta4)) {
								$responseArray = array('type' => 'success', 'message' => 'ok');
							}
						}
						
					}
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