<?php
	require_once "php/logged_in_redirrect.php";
?>
<!DOCTYPE html>  
<html>
<head>
	<meta http-equiv="Content-type" content="text/html;charset=UTF-8">
	<link rel="stylesheet" href="css/reset.css">
	<link rel="stylesheet" href="css/text4login.css">
	<link rel="stylesheet" href="css/index.css">
	<title> Вход </title>
</head>
<body>
	<div id="background"></div>
	<div id="mid">
		<div id="mid_back">
			<div id="mid_centered_window">
				<!--      L   -->
				
				<!--    R   -->
				<div id="mid_login_window">
					<div id="login">
					<form  method="POST" action="php/login.php">
							<input type="text" name="login" id="login_place" autocomplete="off" placeholder="Username" maxlength="16">
							<input type="password" name="pass" id="password_place" class="second_row" placeholder="Password" maxlength="16">
							<input type="submit" value="Sign in" id="submit_button" class="second_row">
					</form>
						<div id="ll">
							<div id="reg_text"><a href="registration.php" class="login_links" id="reg_link"> Register </a></div>
							<div id="rem_password"><a href="twitter.com" class="login_links" id="remember"> Forgot password?</a> </div>
						</div>
					</div>
				</div>
				<!--   E of R -->
				<div id="mid_logo_window">
						<h1 id="welcome"> Welcome to </h1>
						<p>
						<h1 id="welcome2">WebbicatiOn</h1>
						<p>
						<h2 id="slogan1" class="titles"> Yet Another <u>One</u> Web-based</h2>
						<p>
						<h2 id="slogan2" class="titles"> Text Annotation Tool</h2>
					</div>
			</div>
		</div>
	</div>

</body>
</html>