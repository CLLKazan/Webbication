<?php
	include_once "allow_entry.php";
						
	require_once "mysql_entry.php";
	
	//$split = 's693ncsl';
						
	$query = "SELECT id, name, red, green, blue FROM categories;";
	$result = mysql_query($query);
	$num = mysql_num_rows($result);
	
	//echo $num.$split;
	
	for ($i = 0; $i < $num; $i++)
	{
		$row = mysql_fetch_row($result);
		$category[$i]->id = $row[0];
		$category[$i]->name = $row[1];
		$category[$i]->red = $row[2];
		$category[$i]->green = $row[3];
		$category[$i]->blue = $row[4];
	}
	echo json_encode($category);
	mysql_close();
?>

	
	
	
