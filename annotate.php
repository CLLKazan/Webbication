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
		<script src="js/text_range.js"></script>
		<script src="js/showcontextmenu.js"></script>
		<script src="js/showeditmode.js"></script>
		<script src="js/showcomplexannotation.js"></script>
		
		<!--Context-menu-->
		<link rel="stylesheet" type="text/css" href="js/context-menu/context-menu.css">
		<script src="js/context-menu/context-menu.js"></script>
		<!--/Context-menu-->
		
		<script>
			window.onload = function() {
				textObject.id = <?php echo $id; ?>;
				textObject.init();
				palette.init(textObject.categories);
				document.getElementById("palette_button").onclick = function() {
					palette.toggleVisibility();
				};
				var context_menu = new ContextMenu();
				document.getElementById("text").oncontextmenu = function(event) {
					showContextMenu(event, this, context_menu, textObject);
				};
				document.getElementById("window").onclick = function() {
					event.stopPropagation();
				};
				document.getElementById("close_window_button").onclick = function(event) {
					document.getElementById("wall").style.display = "none";
				};
				document.getElementById("wall").onclick = function() {
					this.style.display = "none";
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
						
						<div id="edit_options" style="display: none;">
							<form id="edit_form">
								<select class="categories_list" data-param="cat">
								</select>
								<input id="save_button" type="submit" value="Сохранить">
							</form>
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
			
			<div id="wall" style="display: none;">
				<div id="window">
					<div id="window_header">
						<a id="close_window_button">
							<img src='css/img/exit_button.png'>
						</a>
					</div>
					<div id="table_div">
						<table id="complex_annotation">
						</table>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>	
				