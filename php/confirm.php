<?php
	$hash = strip_tags($_GET['sum']);
	//echo $hash;
	
	require_once "mysql_entry.php";
	
	$query = "SELECT id FROM USER WHERE hash='".$hash."';";
	$result = mysql_query($query);
	$row = mysql_fetch_row($result);
	
	if (!$row[0])
	{
		header("Location: ../index.php");
		mysql_close();
		exit;
	}
	else
	{
		$query = "UPDATE USER SET hash='allow' WHERE id=".$row[0].";";
		mysql_query($query);
		$query = "SELECT username FROM USER WHERE id=".$row[0].";";
		$result = mysql_query($query);
		$username = mysql_fetch_row($result);
		mysql_close();
		session_start();
		$_SESSION['user'] = $row[0];
		$_SESSION['username'] = $username[0];
		header("Location: ../catalog.php");
	}
?>
	