<?php
	require_once "php/allow_entry.php";
	
	function mysql_fix_strings($s)
	{
		$s = strip_tags($s);
		if (get_magic_quotes_gpc()) $s = stripslashes($s);
		return mysql_real_escape_string($s);
	}
	
	$id = mysql_fix_strings($_GET['id']);
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<link rel="stylesheet" type="text/css" href="css/edit.css">
		<script>
			id = <?php echo $id; ?>;
		</script>
		<script src="js/update_document.js"></script>
		<script src="js/redirrect_to_catalog.js"></script>
		<title>Text Annotation Project</title>
	</head>
	
	<body>
		
		<div id="wrapper">
		
			<div id="header">
				<div id="header_content">
					<div id="logo">
						<a id="link_logo" href="index.php">Text Annotation</a>
					</div>
					<div id="user_menu">
						<p id="username"><?php echo $_SESSION['username']; ?></p>
						<a id="exit_button" href="php/exit.php"><img src="css/img/exit_button.png"></a>
					</div>
					
					<div id="tools">
						<a id="save_button" href="javascript: update_document();">Сохранить</a>
					</div>
					
				</div>
			</div>
						
			<div id="content">
				<div id="page">
					<?php	
						require_once "php/mysql_entry.php";
							
						$query = "SELECT title, doc_text, creation_time FROM document WHERE id=".$id.";";
						$result = mysql_query($query);
						$row = mysql_fetch_row($result);
						mysql_close();
							
						echo "<p id='title'>".$row[0]."</p>";
						echo "<p id='creation_time'>".$row[2]."</p>";
							
						echo "<textarea placeholder='Text' id='text'>".$row[1]."</textarea>";
					?>
				</div>
			</div>
			
			<div id="footer">
				<p id="project_name">KFU ITIS. 2013 (c)</p>
			</div>
			
		</div>
	</body>
</html>	
				