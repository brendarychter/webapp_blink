<?php
	require_once("connection.php");
	header("Access-Control-Allow-Origin: *");
    $connection = new connection;

    if(!mysqli_connect_error()){
    	$idGroup = $_POST["idGroup"];
    	$idList = $_POST["idList"];

    	$query = "select * from users where userID NOT IN (".implode(',',$idList).")";
		if($response = mysqli_query($connection->connected, $query)){
			if(mysqli_num_rows($response)>=1){
					while($obj = mysqli_fetch_object($response)){
						$matriz[] =  array('username' => $obj->username, 'phoneNumber' => $obj->phoneNumber, 'photo' => $obj->photo, 'userID' => $obj->userID);
					}
			}
		}

		$datos = json_encode($matriz);
		echo $datos;
	}else{
		echo "error en conexion";
	}
?>