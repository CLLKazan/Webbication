<?php
	require_once "php/logged_in_redirrect.php";
?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<link rel="stylesheet" type="text/css" href="css/registration.css">
		<title>Text Annotation Project</title>
	</head>
	
	<body>
		
		<div id="wrapper">
		
			<div id="header">
				<div id="header_content">
					<div id="logo">
						<a id="link_logo" href="index.php">Text Annotation</a>
					</div>
				</div>
			</div>
						
			<div id="content">
				<div id="page">
					<p id="title">Регистрация нового пользователя</p>
					<p id="error">
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
						<p>Логин должен состоять из 6-16 символов. Допустимые символы: "a-z", "A-Z", "0-9", "-", "_".<br>
							<input placeholder="login" type="text" name="login">
						</p>
						<p>Пароль также должен состоять из 6-16 символов. Допустимые символы: "a-z", "A-Z", "0-9", "-", "_".<br>
							<input placeholder="password" type="password" name="pass">
						</p>
						<p>Email:<br>
							<input placeholder="email" type="text" name="email">
						</p>
						<p>После нажатия кнопки "Зарегистрироваться" Вам на почту придет сообщение с просьбой подтвердить регистрацию. Пройдите по указанной там ссылке.</p>
						<input type="submit" value="Зарегистрироваться">
					</form>
				</div>
			</div>
			
			<div id="footer">
				<p id="project_name">KFU ITIS. 2013 (c)</p>
			</div>
			
		</div>
	</body>
</html>	
				