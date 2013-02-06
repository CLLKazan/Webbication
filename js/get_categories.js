/*
	Ajax запрос получения списка категорий и их аттрибутов
*/

function get_categories()
{
	var request = new XMLHttpRequest(); //ajax переменная
	
	request.open("GET", "php/get_categories.php", false); //соединяемся с сервером. Т.к. параметров нет, отправляем запрос методом GET
	request.onreadystatechange = parse_categories; //функция, вызываемая при изменении состояния запроса
	request.send(null); //отправляем параметры (null)
}

