<?php
	function mysql_fix_strings($s)
	{
		$s = strip_tags($s);
		if (get_magic_quotes_gpc()) $s = stripslashes($s);
		return mysql_real_escape_string($s);
	}
	
	$id = mysql_fix_strings($_POST['id']);
	
	$text = mysql_fix_strings($_POST["text"]); //очищаем от html тегов текст
	$title = mysql_fix_strings($_POST["title"]); //и заголовок

	session_start();
	$author_id = $_SESSION['user'];	
	
	require_once "mysql_entry.php";
	
	$query = "UPDATE document SET doc_text='".$text."', modification_author=".$author_id." WHERE id=".$id.";";
	if ($text) mysql_query($query);
	mysql_close();
?>	