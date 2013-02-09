/*
	Ajax запрос получения документа и его метаданных
*/

function get_document()
{
	var request = AjaxRequest(); //ajax переменная
	
	params = "id="+id; //параметры
	request.open("POST", "php/get_document.php", false); //соединяемся с сервером
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); //heider'ы, указывающие, что параметры будут переданы методом POST
	request.setRequestHeader("Content-length", params.length);
	request.setRequestHeader("Connection", "close");
	
	request.onreadystatechange = parse_text; //функция, вызываемая при изменении состояния запроса
	
	request.send(params); //отправляем параметры
}