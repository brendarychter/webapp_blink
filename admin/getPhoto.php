<?php
	session_start();
	require_once("connection.php");
	header("Access-Control-Allow-Origin: *");
    $connection = new connection;

    if(!mysqli_connect_error()){
		$id = $_POST["id"];
		$consulta = "SELECT photo FROM users WHERE userID = '$id'";
		$response = mysqli_query($connection->connected, $consulta);
		$matriz = array();

		if($response = mysqli_query($connection->connected, $consulta)){
			if(mysqli_num_rows($response)>=1){
				while($obj = mysqli_fetch_object($response)){
					$matriz = array('photo' =>$obj->photo);
				}
			}
		}
		$datos = json_encode($matriz);
		echo $datos;
	}else{
		echo "error en conexion";
	}
?>