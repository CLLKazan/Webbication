/*
	Ajax запрос сохранения документа
*/

function save_document()
{
	var title_textarea = document.getElementById("title");
	var title = title_textarea.value; //получаем заголовок документа
	var text_textarea = document.getElementById("text");
	var text = text_textarea.value; //получаем текст документа
	var uid_textarea = document.getElementById("uid");
	var uid = uid_textarea.value; //получаем UID
	
	var request = AjaxRequest(); //ajax переменная
	if (!request)
	{
		alert("Failed!");
		return;
	}
	
	params = "text="+text+"&uid="+uid+"&title="+title; //параметры
	request.open("POST", "php/save_new_document.php", false); //соединяемся с сервером 
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); //heider'ы, указывающие, что параметры будут переданы методом POST
	request.setRequestHeader("Content-length", params.length);
	request.setRequestHeader("Connection", "close");
	
	request.onreadystatechange = redirrect_to_catalog; //функция, вызываемая при изменении состояния запроса
	
	request.send(params); //отправляем параметры
}