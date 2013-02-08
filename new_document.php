<?php
	require_once "php/allow_entry.php";
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<link rel="stylesheet" type="text/css" href="css/new_document.css">
		<script src="js/save_document.js"></script>
		<script src="js/redirrect_to_catalog.js"></script>
		<title>New Document</title>
	</head>
	
	<body>
		
		<div id="wrapper">
		
			<div id="header">
				<div id="header_content">
					<div id="logo">
						<a id="link_logo" href="index.php">WebbicatiOn</a>
					</div>
					<div id="user_menu">
						<p id="username"><?php echo $_SESSION['username']; ?></p>
						<a id="exit_button" href="php/exit.php"><img src="css/img/exit_button.png"></a>
					</div>
					
					<div id="tools">
						<a id="save_button" href="javascript: save_document();">Сохранить</a>
					</div>
					
				</div>
			</div>
						
			<div id="content">
				<div id="page">
					<textarea placeholder="Title" id="title"></textarea>
					<textarea placeholder="Text" id="text"></textarea>
				</div>
			</div>
			
			<div id="footer">
				<p id="project_name">KFU ITIS. 2013 (c)</p>
			</div>
			
		</div>
	</body>
</html>	
				