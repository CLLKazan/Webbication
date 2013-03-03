/*
	Ajax вызов php скрипта удаления аннотации
*/

function delete_annotation(ann_id)
{
	var request = AjaxRequest(); //создание переменной ajax
	
	params = "id="+ann_id+"&doc="+id; //параметры
	request.open("POST", "php/delete_annotation.php", false); //подключаемся к серверу
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); //heider'ы указывающие, что параметры будут переданы методом POST
	request.setRequestHeader("Content-length", params.length);
	request.setRequestHeader("Connection", "close");
	
	request.onreadystatechange = re_annotate; //функция, вызываемая после изменения состояния запроса
	
	request.send(params); //отправляем параметры
}

function delete_annotation_by_pos(pos) {
	for (var i = 0; i < count_of_points/2; i++)
	{
		if (annotations[i]['start'] <= pos+0.5 && annotations[i]['end'] >= pos+0.5) //если pos+0.5 между началом и концом аннотации
		{
			delete_annotation(annotations[i]['id']);
			return;
		}
	}
}