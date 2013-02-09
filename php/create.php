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
	$uid = mysql_fix_strings($_POST["uid"]); //и uid
	
	if (strcmp($title, "") == 0) //если заголовок пустой, назначаем ему untitled
	{
		$title = "untitled";
	}
	
	session_start();
	$author_id = $_SESSION['user'];
			
	require_once "mysql_entry.php";
	
	$query = "SELECT COUNT(*) FROM document WHERE uid='".$uid."' OR (LOCATE('".$uid."', uid)=1 AND SUBSTRING(uid, LENGTH('".$uid."')+1) REGEXP '^_[0-9]+');"; //проверяем, сколько существует документ, uid которых удовлетворяет следующим требованиям: uid либо равен данному, либо вида uid_123
	$result = mysql_query($query);
	$count = mysql_fetch_row($result);
	
	if ($count[0] != 0) //если существуют записи с uid этого класса
	{
		$uid = $uid."_".$count[0]; //добавляем номер
	}
	
	$query = "INSERT INTO document(uid, title, doc_text, creation_author, creation_time, modification_author) VALUES('".$uid."', '".$title."', '".$text."', '".$author_id."', NULL, '".$author_id."');";
	if ($text)
	{
		mysql_query($query);
		echo mysql_error();
	}
	mysql_close();
?>
	
	