/*
	Аjax запрос получения аннотация, связанных с текстом
*/ 

function get_annotations()
{
	if (points[0]) //если массив points[] не пустой
	{ 
		points = new Array(); //очищаем
	}
	if (annotations[0]) //аналогично annotations[]
	{
		annotations = new Array();
	}	
	var request = new XMLHttpRequest(); //создаем ajax переменную
	
	params = "id="+id; //параметры
	request.open("POST", "php/get_annotations.php", false); //соединяемся с сервером
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); //heider'ы, указывающие, что параметры будут отправлены методом POST
	request.setRequestHeader("Content-length", params.length);
	request.setRequestHeader("Connection", "close");
	
	request.onreadystatechange = parse_annotations; //функция, вызываемая при изменении состояния запроса
	
	request.send(params); //отправляем параметры
}