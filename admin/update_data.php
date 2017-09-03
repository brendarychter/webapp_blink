<?php
	session_start();
	require_once("connection.php");
    $connection = new connection;
	header("Access-Control-Allow-Origin: *");
    
    if(!mysqli_connect_error()){
		$user = $_POST["user"];
		$pass = $_POST["pass"];
		$mail = $_POST["mail"];
		$tel = $_POST["tel"];
		$id = $_POST["id"];
		$errorMail = '-Ya existe un usuario registrado con ese mail. Utilice otro-';


		$consulta = "SELECT * FROM users WHERE mail = '$mail' AND userID != '$id'";
		$response = mysqli_query($connection->connected, $consulta);


		if(!mysqli_num_rows($response)>=1){

			$consulta2 = "SELECT * FROM users WHERE username = '$user' AND userID != '$id'";
			$response2 = mysqli_query($connection->connected, $consulta2);

			$errorUsername = '-Ya existe un usuario registrado con ese nombre. Escoja otro-';
			$success = '-Se ha registrado correctamente. Aguarde un instante-';

			if(!mysqli_num_rows($response2)>=1){
				$sql = "update users SET username='$user', password='$pass', mail='$mail', phoneNumber='$tel'  where userID='$id'";
				if(mysqli_query($connection->connected, $sql)){

					$responseArray = array('type' => 'success', 'message' => $success, 'username' => $user, 'password' => $pass, 'mail' => utf8_encode($mail), 'phoneNumber' => $tel, 'active' => '1');
				}
			}else{
				$responseArray = array('type' => 'errorName', 'message' => $errorUsername);
			}
		}else{
			$responseArray = array('type' => 'errorMail', 'message' => $errorMail);
		}

		$encoded = json_encode($responseArray);
		echo $encoded;

	}
?>