<?php
	session_start();
	
	if ($_SESSION['user'])
	{
		header("Location: catalog.php");
		exit;
	}
?>