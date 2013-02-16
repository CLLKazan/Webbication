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
		<script src="js/jquery.js"></script>
		<script src="js/text_range.js"></script>
		<script>
			id = <?php echo $id; ?>;
		</script>
		<script src="js/ajax.js"></script>
		<script src="js/global_variables.js"></script>
		<script src="js/delete_annotation.js"></script>
		<script src="js/get_annotations.js"></script>
		<script src="js/parse_annotations.js"></script>
		<script src="js/get_document.js"></script>
		<script src="js/parse_text.js"></script>
		<script src="js/get_categories.js"></script>
		<script src="js/parse_categories.js"></script>
		<script src="js/add_annotation.js"></script>
		<script src="js/re_annotate.js"></script>
		<script src="js/get_offset.js"></script>
		<script src="js/annotate_text.js"></script>
		<script src="js/IsDark.js"></script>
		<script src="js/GetColor.js"></script>
		<script src="js/qsort.js"></script>
		<script src="js/delete_cat.js"></script>
		<script src="js/show_options.js"></script>
		<script src="js/get_count_of_annotations.js"></script>
		<script src="js/show_complex_annotation.js"></script>
		<script src="js/close_window.js"></script>
		<script src="js/highlight_annotation.js"></script>
		<script src="js/get_complex_annotation.js"></script>
		<script src="js/show_add_menu.js"></script>
		<script src="js/update_annotation.js"></script>
		<script src="js/fill.js"></script>
		<script src="js/fill_categories.js"></script>
		<script src="js/fill_palette.js"></script>
		<title>Text Annotation Project</title>
	</head>
	
	<body onLoad="fill();">
		
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
						<a id="palette_button" onclick="javascript: $('#palette').slideToggle('fast', 'swing');">Палитра</a>
						
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
			
			<div id="wall" style="display: none;">
				<div id="window">
					<div id="window_header">
						<a id="close_window_button" href="javascript: close_window();"><img src="css/img/exit_button.png"></a>
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
				