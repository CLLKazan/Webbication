<?php
	require_once "allow_entry.php";
	function mysql_fix_strings($s)
	{
		$s = strip_tags($s);
		if (get_magic_quotes_gpc()) $s = stripslashes($s);
		return mysql_real_escape_string($s);
	}
	
	$id = mysql_fix_strings($_POST['ann_id']);
	$doc_id = mysql_fix_strings($_POST['doc']);
	
	session_start();
	$author = $_SESSION['user'];
	
	require_once "mysql_entry.php";
	
	$query = "DELETE FROM annotation WHERE id=".$id.";";
	mysql_query($query);
	$query = "UPDATE document SET modification_author=".$author.", modification_time=NOW() WHERE id=".$doc_id.";";
	mysql_query($query);
	mysql_close();
?>