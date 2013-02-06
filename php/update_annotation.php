<?php
	require_once "allow_entry.php";
	function mysql_fix_strings($s)
	{
		$s = strip_tags($s);
		if (get_magic_quotes_gpc()) $s = stripslashes($s);
		return mysql_real_escape_string($s);
	}
	$id = mysql_fix_strings($_POST['id']);
	$ann_id = mysql_fix_strings($_POST['ann_id']);
	$cat = mysql_fix_strings($_POST['cat']);
	
	session_start();
	$author = $_SESSION['user'];
	
	include_once 'mysql_entry.php';
		
	$query = "UPDATE annotation SET category=".$cat.", modification_author=".$author." WHERE id=".$ann_id.";";
	mysql_query($query);
	$query = "UPDATE document SET modification_author=".$author." WHERE id=".$id.";";
	mysql_query($query);
	mysql_close();
	echo "OK";
?>
