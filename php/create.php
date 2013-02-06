<?php
	require_once "allow_entry.php";
	function mysql_fix_strings($s)
	{
		$s = strip_tags($s);
		if (get_magic_quotes_gpc()) $s = stripslashes($s);
		return mysql_real_escape_string($s);
	}
		
	$text = mysql_fix_strings($_POST["text"]); //очищаем от html тегов текст
	$title = mysql_fix_strings($_POST["title"]); //и заголовок
	
	if (strcmp($title, "") == 0) //если заголовок пустой, назначаем ему untitled
	{
		$title = "untitled";
	}
	
	session_start();
	$author_id = $_SESSION['user'];
	
	$uid = 'NEWS_MESSAGE'.time(); //временно, пока не будет сделано UID
		
	require_once "mysql_entry.php";
	
	$query = "INSERT INTO document(uid, title, doc_text, creation_author, creation_time, modification_author) VALUES('".$uid."', '".$title."', '".$text."', '".$author_id."', NULL, '".$author_id."');";
	if ($text)
	{
		mysql_query($query);
		echo mysql_error();
	}
	mysql_close();
?>
	
	