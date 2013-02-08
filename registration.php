<?php
	require_once "php/logged_in_redirrect.php";
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<link rel="stylesheet" href="css/reset.css">
		<link rel="stylesheet" type="text/css" href="css/textMain.css">
		<link rel="stylesheet" type="text/css" href="css/registration.css">
		<title>Register on WebbicatiOn</title>
	</head>
	
	<body>
		
		<div id="wrapper">
		
			<div id="header">
				<div id="header_content">
					<div id="logo">
						<a id="link_logo" href="index.php">WebbicatiOn</a>
					</div>
				</div>
			</div>
						
			<div id="content">
				<div id="page">
					<p id="title" class="floating">Регистрация нового пользователя</p>
					<p id="error" class="floating">
						<?php
							$error = strip_tags($_GET['err']);
							
							if ($error == 1)
							{
								echo "Пользователь с таким именем или email уже существует.";
							}
							elseif ($error == 2)
							{
								echo "Слишком короткий пароль или логин. Нужно 6 и более символов.";
							}
							elseif ($error == 3)
							{
								echo "Присутствуют недопустимые символы в логине или пароле.";
							}
							elseif ($error == 4)
							{
								echo "Некорректный адрес почтового ящика.";
							}
						?>
					</p>
					<form id="registration_form" method="POST" action="php/add_user.php">
						<div class="place">
						<p class="floating">Логин должен состоять из 6-16 символов.<br> Допустимые символы: "a-z", "A-Z", "0-9", "-", "_".<br>
							<input id="form_name" class="floating" placeholder="login" type="text" name="login" maxlength="16">
						</p>
					    </div>
						<div class="place">
						<p class="floating">Пароль также должен состоять из 6-16 символов. <br> Допустимые символы: "a-z", "A-Z", "0-9", "-", "_".<br>
							<input id="form_pass" class="floating" placeholder="password" type="password" name="pass" maxlength="16">
						</p> </div>
						<div class="place">
						<p class="floating">Email:<br>
							<input id="form_mail" class="floating" placeholder="email" type="text" name="email">
						</p></div>
						<div class="place" id="submit_place">
						<p class="floating">После нажатия кнопки "Зарегистрироваться" Вам на почту придет сообщение с просьбой подтвердить регистрацию. <br>Пройдите по указанной там ссылке.<br>
						<input class="floating" type="submit" id="submit_button" value="Зарегистрироваться">
						</p>
						</div>
					</form>
				</div>
			</div>
			
			<div id="footer">
				<p id="project_name">KFU ITIS. 2013 (c)</p>
			</div>
			
		</div>
	</body>
</html>	
				