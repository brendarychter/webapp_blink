<?php
	require_once("connection.php");
 	$connection = new connection;

	//VALIDAR QUE DEVUELVA TRUE
	$id = $_POST["id"];
	$query = "select * from modules inner join groups on groups.idGroup = modules.idGroup where modules.idUser = '$id'";
	$response = mysqli_query($connection->connected, $query);
	$matriz = [];

	if($response = mysqli_query($connection->connected, $query)){
		if(mysqli_num_rows($response)>=1){
			while($obj = mysqli_fetch_object($response)){
				$matriz[] = array('idModule' => $obj->idModule, 'idGroup' => $obj->idGroup, 'groupName' => $obj->groupName);
			}
		}
	}
	$datos = json_encode($matriz);
	echo $datos;

?>