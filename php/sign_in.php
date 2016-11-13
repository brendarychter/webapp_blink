<?php
	//database connection
	$host = "localhost";
 	$user = "m6000758_cckonex";
 	$pass = "lu43seGIza";
 	$bd = "m6000758_cckonex";
	//if( $link = mysqli_connect("localhost", "m6000758_cckonex", "lu43seGIza", "m6000758_cckonex")){

	// Create connection
	$conn = mysqli_connect("localhost", "blink", "", "blink");
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 

	$user_sign_in = $_POST["usuario_sign_in"];
	$pass_sign_in = $_POST["password_sign_in"];
	$email_sign_in = $_POST["mail_sign_in"];


	$sql = "INSERT INTO users (username, password, mail)
	VALUES ('$user_sign_in', '$pass_sign_in', '$email_sign_in')";


	if ($conn->query($sql) === TRUE) {
	    echo "Usuario registrado correctamente. Redireccionando a la home";
	} else {
	    echo "Error: " . $sql . "<br>" . $conn->error;
	}

?>