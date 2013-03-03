<?php
	require_once "allow_entry.php";
	function mysql_fix_strings($s)
	{
		$s = strip_tags($s);
		if (get_magic_quotes_gpc()) $s = stripslashes($s);
		return mysql_real_escape_string($s);
	}
	$ann_id = mysql_fix_strings($_POST['ann_id']);
	$id = mysql_fix_strings($_POST['id']);
	
	$start = mysql_fix_strings($_POST['start']);
	$end = mysql_fix_strings($_POST['end']);
	$cat = mysql_fix_strings($_POST['cat']);
	
	session_start();
	$author = $_SESSION['user'];
	
	include_once 'mysql_entry.php';
		
	if ($start && $end) {
		$query = "UPDATE annotation SET start_offset=".$start.", end_offset=".$end.", category=".$cat.", modification_author=".$author.", modification_time=NOW() WHERE id=".$ann_id.";";
	}
	else {
		$query = "UPDATE annotation SET category=".$cat.", modification_author=".$author.", modification_time=NOW() WHERE id=".$ann_id.";";
	}
	mysql_query($query);
	//echo mysql_error();
	$query = "UPDATE document SET modification_author=".$author." modification_time=NOW() WHERE id=".$id.";";
	mysql_query($query);
	mysql_close();
	echo "OK";
?>
