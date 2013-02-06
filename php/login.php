<?php
	$login = mysql_fix_strings($_POST['login']);
	$pass = mysql_fix_strings($_POST['pass']);
	
	require_once 'mysql_entry.php';
	
	$query = "SELECT id, hash, username FROM USER  WHERE username='".$login."' AND pass='".$pass."';";	
	$result = mysql_query($query);
	$row = mysql_fetch_row($result);
	mysql_close($db_database);
	
	if (!$row[0] || strcmp($row[1], "allow") != 0)
	{
		header("Location: ../index.php");
	}
	else
	{
		session_start();
		$_SESSION['user'] = $row[0];
		$_SESSION['username'] = $row[2];
		header("Location: ../catalog.php");
	}
	
	function mysql_fix_strings($s)
	{
		if (get_magic_quotes_gpc()) $s = stripslashes($s);
		return mysql_real_escape_string($s);
	}	
?>
	
	