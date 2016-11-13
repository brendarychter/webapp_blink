<?php
	//database connection
	$host = "localhost";
 	$user = "m6000758_cckonex";
 	$pass = "lu43seGIza";
 	$bd = "m6000758_cckonex";
	//if( $link = mysqli_connect("localhost", "m6000758_cckonex", "lu43seGIza", "m6000758_cckonex")){
 	
//localhost", "root", "", "Knx"
	// Create connection
	$conn = mysqli_connect("localhost", "m6000758_cckonex", "lu43seGIza", "m6000758_cckonex");
	// Check connection
	if ($conn->connect_error) {
	    die("Connection failed: " . $conn->connect_error);
	} 

	$username = $_POST["name-form"];
	$lastname = $_POST["lastname"];
	$mail = $_POST["mail-form"];
	$dni = $_POST["dni"];
	$cuotas = $_POST["mail_sign_in"];
	$tarjeta = $_POST["mail_sign_in"];
	$numerocelular = $_POST["phone-number"];
	$cantidad = $_POST["mail_sign_in"];
	$pago = $_POST["mail_sign_in"];
	$numerotarjeta = $_POST["mail_sign_in"];
	$codigoseguridad = $_POST["mail_sign_in"];


	$sql = "INSERT INTO Compras (name, lastname, DNI, cuotas, pago, numero_tarjeta, codigo_sec, cantidad, mobilephone, mail)
	VALUES ('$username', '$lastname', '$dni', $cuotas', '$pago', $numerotarjeta', '$codigoseguridad', '$cantidad', '$numerocelular', '$mail')";


	if ($conn->query($sql) === TRUE) {
	    echo "Redirect";
	} else {
	    echo "Error: " . $sql . "<br>" . $conn->error;
	}

?>