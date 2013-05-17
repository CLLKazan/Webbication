<?php
	
	echo "<tr>";
	echo "<td class='document_title'><p class='table_header'>Title</p></td>";
	
	echo "<td class='author'>";
		echo "<p class='authors_name'>Creation<br>author</p>";
	echo "</td>";
	
	echo "<td class='author'>";
		echo "<p class='authors_name'>Modification<br>author</p>";
	echo "</td>";
	
	echo "<td class='edit_button'></td>";
	echo "</tr>";
	
	require_once "php/mysql_entry.php";
	
	$query = "SELECT COUNT(*) FROM document;";
	$result = mysql_query($query);
	$row = mysql_fetch_row($result);
	$limit = $row[0];
	
	$query = "SELECT id, title, creation_author, creation_time, modification_author, modification_time, uid FROM document ORDER BY modification_time DESC LIMIT ".(($page-1)*20).", 20;";
	$result = mysql_query($query);
	
	$rows = mysql_num_rows($result);
	for ($i = 0; $i < $rows; $i++)
	{
		$row = mysql_fetch_row($result);
		
		$subquery = "SELECT COUNT(*) FROM annotation WHERE doc_id=".$row[0].";";
		$subres = mysql_query($subquery);
		$count = mysql_fetch_row($subres);
		
		$subquery = "SELECT username FROM USER WHERE id=".$row[2].";";
		$subres = mysql_query($subquery);
		$creation_author = mysql_fetch_row($subres);
		
		$subquery = "SELECT username FROM USER WHERE id=".$row[4].";";
		$subres = mysql_query($subquery);
		$modification_author = mysql_fetch_row($subres);

		echo "<tr>";
		echo "<td class='document_title'><a href='annotate.php?id=".$row[0]."'>".$row[1]."</a><br><span class='uid'>".$row[6]."</span></td>";
		
		echo "<td class='author'>";
			echo "<p class='authors_name'>".$creation_author[0]."</p>";
			$time = explode(" ", $row[3]);
			echo "<p class='time'>".$time[0]."<br>".$time[1]."</p>";
		echo "</td>";
		
		echo "<td class='author'>";
			echo "<p class='authors_name'>".$modification_author[0]."</p>";
			$time = explode(" ", $row[5]);
			echo "<p class='time'>".$time[0]."<br>".$time[1]."</p>";
		echo "</td>";
				
		if ($count[0] == 0)
		{
			echo "<td class='edit_button'><a href='edit.php?id=".$row[0]."'><img src='css/img/edit_button.png'></a></td>";
		}
		else
		{
			echo "<td class='edit_button'><a><img src='css/img/not_edit_button.png'></a></td>";
		}
		
		echo "</tr>";
	}
	mysql_close();
?>