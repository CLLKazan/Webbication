<?php
	$db_hostname = "localhost";
	$db_database = "annotations";
	$db_username = "admin";
	$db_password = "retrylicey10mitis112101";
	
	$db_server = mysql_connect($db_hostname, $db_username, $db_password);
	if (!$db_server) die("Невозможно подключиться к mysql!".mysql_error());
	
	mysql_select_db($db_database) or die("Not opened");
	mysql_query ("set character_set_client='utf8'"); 
	mysql_query ("set character_set_results='utf8'"); 
	mysql_query ("set collation_connection='utf8_general_ci'");
?>