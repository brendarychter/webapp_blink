<?php
	// INCLUYO EL ARCHIVO DE CONEXIÓN A LA BASE DE DATOS
 	$conexion = @mysqli_connect("localhost", "root", "", "blink");
 	//$conexion = @mysqli_connect("localhost", "m6000758_blink", "lu43seGIza", "m6000758_blink");
	// LA FUNCION PUEDE ESTAR EN UN ARCHIVO EXTERNO DE FUNCIONES GENERALES DEL SITIO
	// RECIBE COMO PARÁMETRO EL OBJETO $FILE Y DEVUELVE EL NOMBRE DEL ARCHIVO O LA PALABRA "error" SI NO PUDO GUARDARLO

 	// PREGUNTO SI VENGO DEL SUBMIT DEL FORMULARIO
	if(isset($_POST["submit"])){

		// LEVANTO ALGUNOS DATOS DEL FORM

		$name_es = mysqli_real_escape_string($conexion,$_POST["titulo_es"]);
		$name_en = mysqli_real_escape_string($conexion,$_POST["titulo_en"]);
		$table_name = $_POST["table"];
		$id = $_POST["id_name"];
		
		// LEVANTO EL NOMBRE DEL ARCHIVO USANDO LA FUNCION subir_imagen DECLARADA ARRIBA
		$imagen = subir_imagen($_FILES["imagen"]);
		$file = str_replace(' ', '%20', $file);

		if($imagen=="error"){
			echo "Error. Hubo un error con la imagen, por favor revisar";
		}
		else{

			// CONTINUO CON EL RESTO DE MI CÓDIGO...

			$sql = "insert into fotos (nombre_es, img, table_name, section, id_name, nombre_en) values ('$name','$imagen','$table_name', '$section', '$id_name', '$nombre_en')";
			
			// IMPRIMO LA CONSULTA SÓLO PARA DEBUG
			echo $sql;

			if(mysqli_query($conexion,$sql)){
				echo "Los datos se guardaron exitosamente!";
			}
			else{
				echo "Error. La consulta a la BBDD no se puede ejecutar.";
			}
		}
	}
	function subir_imagen($file){

		// VALIDO QUE NO ME LLEGUE EL FORMULARIO VACIO.
		if($file && $file["name"]!=""){

			// DEFINO CUÁL VA A SER LA URL DE MI SITIO WEB, Y LA CARPETA DONDE SE GUARDARÁN LAS IMÁGENES (ESTO DEBERÍA ESTAR EN UN ARCHIVO EXTERNO DE CONFIGURACIÓN)
			//$direccion_web = "http://www.blinkapp.com.ar/uploads/";
			$direccion_web = "http://localhost/uploads/";
			$nombre_carpeta = "../../../uploads/";
 			chmod("../../../uploads/", 0755);
			
			// DEFINICIONES INTERNAS PARA CONTROL
			$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		    $charactersLength = strlen($characters);
		    $randomString = '';
		    for ($i = 0; $i < 10; $i++) {
		        $randomString .= $characters[rand(0, $charactersLength - 1)];
		    }

			$target_file = $nombre_carpeta . basename($file["name"]);
			$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
			$checkFile = getimagesize($file["tmp_name"]);
			$uploadOk = true;

			// VERIFICO QUE EL TIPO DE ARCHIVO CORRESPONDA A UNA IMAGEN VÁLIDA.
		    if($checkFile === false || ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif")) {
		        echo "Error. El archivo no es una imagen valida.";
		        $uploadOk = false;
		    }

		    // VERIFICO SI EL ARCHIVO YA EXISTE EN EL SERVIDOR
			if(file_exists($target_file)) {
			    echo "Error. El archivo ya existe."; // EN CASO DE QUERER RENOMBRARLO ANTES DE SUBIR, SE PUEDE AGREGAR UN STRING RANDOM A LA CADENA $target_file
			    $uploadOk = false;
			}
			
			// VERIFICO QUE EL TAMAÑO DEL ARCHIVO NO SEA MAYOR DE 1MB
			// if ($file["size"] > 1000000) {
			//     echo "Error. El archivo es mayor de 1MB";
			//     $uploadOk = false;
			// }

			// SI PASÓ TODAS LAS VALIDACIONES, INTENTO SUBIR EL ARCHIVO AL SERVIDOR
			if($uploadOk){
			    if(move_uploaded_file($file["tmp_name"], $target_file)){
			    	
			    	// SI LO PUDE SUBIR BIEN, DEVUELVO LA URL COMPLETA DEL ARCHIVO QUE ACABO DE SUBIR
			    	return $direccion_web.basename($file["name"]);
			    }
			}
		}

		// SI LLEGUÉ A ESTA LÍNEA SIGNIFICA QUE EN ALGÚN LUGAR EL CÓDIGO FALLÓ, ENTONCES DEVUELVO EL ERROR.
		return "error";
	}

	
	
?>