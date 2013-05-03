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
	
	
	$query = "SELECT start_offset, end_offset, category, id FROM annotation WHERE doc_id=".$id.";";
	$result = mysql_query($query);
	$count = mysql_num_rows($result);

	for ($i = 0; $i < $count; $i++)
	{
		$row = mysql_fetch_row($result);
		$subquery = "SELECT name, red, green, blue FROM categories WHERE id=".$row[2].";";
		$subres = mysql_query($subquery);
		$meta = mysql_fetch_row($subres);
		
		$annotations[$i]->start_offset = $row[0];
		$annotations[$i]->end_offset = $row[1];
		$annotations[$i]->id = $row[3];
		$annotations[$i]->category_id = $row[2];
		$annotations[$i]->category_name = $meta[0];
		$annotations[$i]->red = $meta[1];
		$annotations[$i]->green = $meta[2];
		$annotations[$i]->blue = $meta[3];
	}
	mysql_close();
	echo json_encode($annotations);
?>