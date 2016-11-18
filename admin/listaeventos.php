<?php
	//database connection

	//("mysql.hostinger.com.ar", "u341454716_knx", "982451n-", "u341454716_knx")
	//if( $link = mysqli_connect("localhost", "m6000758_cckonex", "lu43seGIza", "m6000758_cckonex"))
	if( $link = mysqli_connect("localhost", "m6000758_cckonex", "lu43seGIza", "m6000758_cckonex")){
		$consulta = "SELECT * FROM Eventos";	
		$response = mysqli_query($link, $consulta);
		//Converting data to json format
		$matriz = array();
		while($obj = mysqli_fetch_object($response)){
			$matriz[] = array('id_event' => $obj->id_event, 'photo' => utf8_encode($obj->photo), 'event_name' => utf8_encode($obj->event_name), 'price' => $obj->price, 'location' => utf8_encode($obj->location), 'description' => utf8_encode($obj->description), 'sub_description' => utf8_encode($obj->description_2), 'date_time' => $obj->date_time);
		}
		$datos = json_encode(array_values($matriz));
		echo $datos;
	}else{
		echo("no se conecto");
	}
?>