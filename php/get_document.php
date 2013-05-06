<?php
	include_once "allow_entry.php";
	
	function mysql_fix_strings($s)
	{
		$s = strip_tags($s);
		if (get_magic_quotes_gpc()) $s = stripslashes($s);
		return mysql_real_escape_string($s);
	}
						
	$id = mysql_fix_strings($_POST['id']);
						
	require_once "mysql_entry.php";
						
	$query = "SELECT title, creation_time, doc_text FROM document WHERE id=".$id.";";
	$result = mysql_query($query);
	$row = mysql_fetch_row($result);
	
	$document->text = $row[2];
	$document->title = $row[0];
	$document->creation_time = $row[1];
	
	echo json_encode($document);
								
	mysql_close();
?>