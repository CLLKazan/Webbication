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
		<link rel="stylesheet" type="text/css" href="css/annotate.css">
		<script src="js/textobject.js"></script>
		<script src="js/palette.js"></script>		
		<script>
			window.onload = function() {
				textObject.id = <?php echo $id; ?>;
				textObject.init();
				palette.init(textObject.categories);
				document.getElementById("palette_button").onclick = function() {
					//console.log("it works!");
					palette.toggleVisibility();
				};
			};
		</script>
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
						<a id="palette_button">Палитра</a>
						
						<div id="palette">
						</div>
					</div>
					
				</div>
			</div>
						
			<div id="content">
				<div id="page">
					<p id="title"></p>
					<p id="creation_time"></p>
					
					<pre id="text"></pre>
				</div>
			</div>
			
			<div id="footer">
				<p id="project_name">KFU ITIS. 2013 (c)</p>
			</div>
		</div>
	</body>
</html>	
				