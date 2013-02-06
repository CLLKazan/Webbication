<?php
	require_once "php/logged_in_redirrect.php";
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<link rel="stylesheet" type="text/css" href="css/index.css">
		<title>Text Annotation Project</title>
	</head>
	
	<body>
		
		<div id="wrapper">
		
			<div id="header">
				<div id="header_content">
					<div id="logo">
						<a id="link_logo" href="#">Text Annotation</a>
					</div>
					
					<div id="tools">
						<a id="palette_button" href="#">Палитра</a>						
					</div>
					
				</div>
			</div>
						
			<div id="content">
				<div id="page">
				</div>
			</div>
			
			<div id="footer">
				<p id="project_name">KFU ITIS. 2013 (c)</p>
			</div>
			
			<div id="wall">
				<div id="window">
					<div id="window_header">
						<p id="window_header_title">Text Annotation</p>
					</div>
					<div id="form_div">
						<form id="login" method="POST" action="php/login.php">
							<p>Username:</p>
							<input type="text" name="login">
							<p>Password:</p>
							<input type="password" name="pass"><br><br>
							<input type="submit" value="Войти">
						</form>
						
						<p>Если вы еще не прошли <a href="registration.php">регистрацию</a>, чтобы войти в систему, вам нужно ее пройти.</p>
					</div>
				</div>
			</div>		
		</div>
	</body>
</html>	
				