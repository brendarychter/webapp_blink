<?php
	//database connection

	//("mysql.hostinger.com.ar", "u341454716_knx", "982451n-", "u341454716_knx")
	//if( $link = mysqli_connect("localhost", "m6000758_cckonex", "lu43seGIza", "m6000758_cckonex"))
	if( $link = mysqli_connect("localhost", "m6000758_cckonex", "lu43seGIza", "m6000758_cckonex")){
		$consulta = "SELECT * FROM puntos_de_venta";	
		$response = mysqli_query($link, $consulta);
		//Converting data to json format
		$matriz = array();
		while($obj = mysqli_fetch_object($response)){
			$matriz[] = array('id_point' => $obj->id_point, 'namepoint' => utf8_encode($obj->name_point), 'street' => utf8_encode($obj->street), 'longitude' => $obj->longitude, 'latitude' => $obj->latitude, 'open_time' => $obj->open_time, 'close_time' => $obj->close_time);
		}
		$datos = json_encode(array_values($matriz));
		echo $datos;

	}else{
		echo("no se conecto");
	}
?>