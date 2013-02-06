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
	
	$split = 's693ncsl';
	
	$query = "SELECT start_offset, end_offset, category, id FROM annotation WHERE doc_id=".$id.";";
	$result = mysql_query($query);
	$count = mysql_num_rows($result);
						
	echo 2*$count.$split;

	for ($i = 0; $i < $count; $i++)
	{
		$row = mysql_fetch_row($result);
		$subquery = "SELECT name, red, green, blue FROM categories WHERE id=".$row[2].";";
		$subres = mysql_query($subquery);
		$meta = mysql_fetch_row($subres);
							
		echo $row[0].$split."0".$split.$meta[0].$split.$meta[1].$split.$meta[2].$split.$meta[3].$split;
		echo $row[1].$split."1".$split.$meta[0].$split.$meta[1].$split.$meta[2].$split.$meta[3].$split;
		echo $row[0].$split.$row[1].$split.$meta[0].$split.$row[3].$split.$row[2].$split;
	}
	mysql_close();
?>