<?php
	require_once "allow_entry.php";
	function mysql_fix_strings($s)
	{
		$s = strip_tags($s);
		if (get_magic_quotes_gpc()) $s = stripslashes($s);
		return mysql_real_escape_string($s);
	}
	$id = mysql_fix_strings($_POST['doc']);
	
	$start = mysql_fix_strings($_POST['start']);
	$end = mysql_fix_strings($_POST['end']);
	$cat = mysql_fix_strings($_POST['cat']);
	
	session_start();
	$author = $_SESSION['user'];
	
	if ($start != $end)
	{
		include_once 'mysql_entry.php';
		
		$query = "INSERT INTO annotation(start_offset, end_offset, doc_id, category, creation_author, creation_time, modification_author) VALUES(".$start.", ".$end.", ".$id.", ".$cat.", ".$author.", NULL, ".$author.");";
		mysql_query($query);
		$query = "UPDATE document SET modification_author=".$author.", modification_time=NOW() WHERE id=".$id.";";
		mysql_query($query);
		echo $query;
		mysql_close();
		echo "OK";
	}
?>