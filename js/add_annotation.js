/*
	Эта функция передает аттрибуты аннотации php скрипту для ее сохранения
*/
function add_annotation(cat)
{	
	var start, end; //начало и конец аннотации
	
	if (selection_point1 > selection_point2) //т.к. выделять можно слева направо и наоборот, инициализируем start и end соответствующе
	{
		start = selection_point2;
		end = selection_point1;
	}
	else if (selection_point1 < selection_point2)
	{
		start = selection_point1;
		end = selection_point2;
	}
	else if (selection_point1 === selection_point2) //если выделение нулевое, выходим
	{
		return;
	}
	
	var request = AjaxRequest(); //создаем переменную Ajax
	
	params = "id="+id+"&start="+start+"&end="+end+"&cat="+cat; //подготовливаем параметры
	request.open("POST", "php/add_annotation.php", false); //соединяемся с php скриптом
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); //необходимые heider'ы для передачи методом POST 
	request.setRequestHeader("Content-length", params.length);
	request.setRequestHeader("Connection", "close");
	
	request.onreadystatechange = re_annotate; //при изменении состояния запроса будет вызываться функция re_annotate();
	
	request.send(params); //отправляем параметры
}