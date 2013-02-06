<?php
	include_once "allow_entry.php";
						
	require_once "mysql_entry.php";
	
	$split = 's693ncsl';
						
	$query = "SELECT id, name, red, green, blue FROM categories;";
	$result = mysql_query($query);
	$num = mysql_num_rows($result);
	
	echo $num.$split;
	
	for ($i = 0; $i < $num; $i++)
	{
		$row = mysql_fetch_row($result);
		echo $row[0].$split.$row[1].$split.$row[2].$split.$row[3].$split.$row[4].$split;
	}
	mysql_close();
?>

	
	
	
