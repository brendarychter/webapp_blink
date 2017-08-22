


<?php
	require_once("connection.php");
 	$connection = new connection;

	$query = "INSERT INTO groups (groupName) VALUES ('$this->groupName')";
	if (mysqli_query ($connection->connected, $query)) {
		$query2= "SELECT idGroup FROM groups WHERE groupName='$this->groupName'";
		
		$query = "INSERT INTO modules (groupName) VALUES ('$this->groupName')";
	    $this->getGroupsByUser($connection, $userID);
	} else {
	    echo "Error en la creacion del grupo.";
	}

?>

<!-- //Primero notificación. Si acepta.
		public function addUserToGroup($connection, $userID, $idGroup){
			$query = "INSERT INTO modules (idUser, idGroup) VALUES ('$userID', '$idGroup')";
		} -->