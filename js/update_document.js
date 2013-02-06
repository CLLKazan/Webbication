/*
	Ajax запрос сохранения изменений в документе
*/

function update_document() 
{
	var text_textarea = document.getElementById("text");
	var text = text_textarea.value; //получаем отредактированный текст документа
	
	var request = new XMLHttpRequest();//ajax переменная
	
	params = "id="+id+"&text="+text; //параметры
	request.open("POST", "php/update_document.php", false); //соединяемся с сервером
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); //heider'ы, указывающие, что параметры будут переданы методом POST
	request.setRequestHeader("Content-length", params.length);
	request.setRequestHeader("Connection", "close");
	
	request.onreadystatechange = redirrect_to_catalog; //функция, вызываемая при изменении состояния запроса
	
	request.send(params); //отправляем параметры
}