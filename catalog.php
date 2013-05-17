<?php
	require_once "php/allow_entry.php";
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<link rel="stylesheet" type="text/css" href="css/reset.css">
		<link rel="stylesheet" type="text/css" href="css/textMain.css">
		<link rel="stylesheet" type="text/css" href="css/catalog.css">
		<title>Catalogue</title>
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
						<a id="add_button" href="new_document.php">Добавить</a>	
					</div>
					
				</div>
			</div>
						
			<div id="content">
				<div id="page">
					<table id="catalog">
						<?php
							$page = 0;
							if (!$_GET['page'])
							{
								$page = 1;
							}
							else
							{
								$page = strip_tags($_GET['page']);
							}
							require_once "php/fill_catalog.php";
						?>
					</table>
					
					<div id="pagination">
						<?php
							if ($page > 1)
							{
								echo "<a id='previous' href='catalog.php?page=".($page-1)."'>&larr;</a>";
							}
							if ($page != 1) echo "<span id='current_page'>".$page."</span>";
							if ($page*20 < $limit) 
							{
								echo "<a id='next' href='catalog.php?page=".($page+1)."'>&rarr;</a>";
							}
						?>
					</div>
				</div>
			</div>
			
			<div id="footer">
				<p id="project_name">KFU ITIS. 2013 (c)</p>
			</div>
			
		</div>
	</body>
</html>	
				