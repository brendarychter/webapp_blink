<?php
	session_start();
	require_once("connection.php");
    $connection = new connection;

	//database connection
	//VALIDAR QUE DEVUELVA TRUE
	if(isset($_POST['username']) && isset($_POST['password'])){
		$username = $_POST["username"];
		$password = $_POST["password"];
		$mail = $_POST["mail"];
		$consulta = "INSERT INTO users WHERE username = '$username' AND password = '$password'";
		$response = mysqli_query($connection->connected,$consulta);

		while($obj = mysqli_fetch_object($response)){
			$matriz = array('username' => $obj->username, 'password' => $obj->password, 'mail' => utf8_encode($obj->mail), 'phoneNumber' => $obj->phoneNumber, 'userID' => $obj->userID);
		}
		$datos = json_encode($matriz);
		echo $datos;
	}
?>