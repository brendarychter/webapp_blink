<?php
	session_start();
	require_once("connection.php");
    $connection = new connection;
	header("Access-Control-Allow-Origin: *");
    
    if(!mysqli_connect_error()){
		$username = $_POST["user"];
		$password = $_POST["pass"];
		$mail = $_POST["mail"];
		$tel = $_POST["tel"];
		$name = $_POST["name"];
		$datetime = $_POST["datetime"];

		$errorMail = '-Ya existe un usuario registrado con ese mail. Utilice otro-';


		$consulta = "SELECT * FROM users WHERE mail = '$mail'";
		$response = mysqli_query($connection->connected, $consulta);


		if(!mysqli_num_rows($response)>=1){

			$consulta2 = "SELECT * FROM users WHERE username = '$username'";
			$response2 = mysqli_query($connection->connected, $consulta2);

			$errorUsername = '-Ya existe un usuario registrado con ese nombre. Escoja otro-';
			$success = '-Se ha registrado correctamente. Aguarde un instante-';

			if(!mysqli_num_rows($response2)>=1){
				$sql = "insert into users (username, password, mail, name, phoneNumber, datetime, active) values ('$username','$password','$mail', '$name', '$tel', '$datetime', '1')";
				if(mysqli_query($connection->connected, $sql)){

					$responseArray = array('type' => 'success', 'message' => $success, 'username' => $username, 'password' => $password, 'mail' => utf8_encode($mail), 'phoneNumber' => $tel, 'active' => '1');
				}
			}else{
				$responseArray = array('type' => 'errorName', 'message' => $errorUsername);
			}
		}else{
			$responseArray = array('type' => 'errorMail', 'message' => $errorMail);
		}

		$encoded = json_encode($responseArray);
		echo $encoded;

		// $consulta = "INSERT INTO users WHERE username = '$username' AND password = '$password'";
		// $response = mysqli_query($connection->connected,$consulta);

		// while($obj = mysqli_fetch_object($response)){
		// 	$matriz = array('username' => $username, 'password' => $obj->password, 'mail' => utf8_encode($obj->mail), 'phoneNumber' => $obj->phoneNumber, 'userID' => $obj->userID);
		// }
		// $datos = json_encode($matriz);
		// echo $datos;
	}
?>