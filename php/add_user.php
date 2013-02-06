<?php
	function mysql_fix_strings($s)
	{
		if (get_magic_quotes_gpc()) $s = stripslashes($s);
		return mysql_real_escape_string($s);
	}
	
	$login = mysql_fix_strings($_POST['login']);
	$pass = mysql_fix_strings($_POST['pass']);
	$email = mysql_fix_strings($_POST['email']);
	
	if (strlen($login) < 6 || strlen($pass) < 6)
	{
		//echo $login.strlen($login).$pass.strlen($pass);
		header("Location: ../registration.php?err=2");
		exit;
	}
	
	if (!preg_match("/^[a-z0-9_-]{6,16}$/",$login) || !preg_match("/^[a-z0-9_-]{6,16}$/",$pass))
	{
		header("Location: ../registration.php?err=3");
		exit;
	}
	
	if (!preg_match("/^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/",$email) || strlen($email) < 3)
    {
    	header("Location: ../registration.php?err=4");
    	exit;
    }
    	
	$sum = md5($login.$password.date("r"));
	
	require_once "mysql_entry.php";
	
	$query = "SELECT id FROM USER WHERE username='".$login."' OR email='".$email."';";
	$result = mysql_query($query);
	$row = mysql_fetch_row($result);
	if ($row['id'])
	{
		header("Location: ../registration.php?err=1");
		mysql_close();
		exit;
	}
	
	$query = "INSERT INTO USER(username, pass, email, hash) VALUES('".$login."','".$pass."','".$email."','".$sum."');";
	mysql_query($query);
	mysql_close();
	
	//для этого нужно создавать на сервере почтовый домен, это нужно уже заливать на хостинг
	$message="На Ваш почтовый ящик был зарегистрирован пользователь в системе аннотирования. Если это были Вы, подтвердите свой email, пройдя по ссылке: <a href='http://localhost:8888/TextAnnotationProject/php/confirm.php?sum=".$sum."'>перейти</a>";
	
	//mail($email,"Активация аккаунта",$message,"Content-Type: text/html; charset=utf-8","From: annotation.system@annsystem.ru");
	
	//header("Location: ../../index.php");
	//заглушка с автоактивацией аккаунта
	header("Location: confirm.php?sum=".$sum);
?> 
	