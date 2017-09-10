<?php 
	class connection{
		private $server = "localhost";
		private $user = "root";
		private $pass = "";
		private $bbdd = "blink";
		public $connected;

		// private $server = "localhost";
		// private $user = "m6000758_blink";
		// private $pass = "lu43seGIza";
		// private $bbdd = "m6000758_blink";
		// public $connected;
		
		function __construct(){
			$this->connected = @mysqli_connect($this->server, $this->user, $this->pass, $this->bbdd);
		}

	}
?>