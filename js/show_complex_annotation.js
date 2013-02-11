/*
	Эта функция отрисовывает окно сложной аннотации
*/

function show_complex_annotation(pos)
{
	var wall = document.getElementById("wall"); //получаем дискриптор блока div#wall (темный фон, закрывающий все окно браузера)
	wall.style.display = "block"; //делаем его видимым
	var childs = new Array(); //здесь будут храниться побочные аннотации, которые расположены в позиции, на которую указывает курсор (pos)
	var k = 0; //кол-во побочных аннотаций
	var min = 1000000000; //инициализация
	var max = -1000000000;
	for (var i = 0; i < count_of_points/2; i++)
	{
		if (annotations[i]['start'] <= pos && annotations[i]['end'] >= pos) //если pos находится между концом и началом аннотации
		{
			if (annotations[i]['start'] < min) min = annotations[i]['start']; //запоминаем самую левую точку
			if (annotations[i]['end'] > max) max = annotations[i]['end']; //запоминаем самую правую точку
			childs[k] = annotations[i]; //добавляем аннотацию в побочные
			k++;
		}
	}
	if (k == 0) //если не осталось аннотаций в данной точке, закрываем окно
	{
		wall.style.display = "none";
		return;
	}
	var table = document.getElementById("complex_annotation"); //получаем дескриптор таблицы сложных аннотаций
	var result = "<tr><td class='annotation'>"+get_complex_annotation(min, max)+"</td><td class='edit_annotation'></td><td class='delete_annotation'></td></tr>"; //верхняя строка таблицы
	for (var i = 0; i < k; i++)
	{
		result += "<tr>";
		result += "<td class='annotation'>"+highlight_annotation(childs[i], min, max)+"</td>";
		result += "<td class='edit_annotation'>"+"<form action='javascript: update_annotation("+childs[i]['id']+");'><select id='sel_"+childs[i]['id']+"'></select><input type='submit' value='Обновить'></form>"+"</td>"; //форма редактирования типа аннотации
		result += "<td class='delete_annotation'><a class='delete_button' href='javascript: delete_annotation("+childs[i]['id'] +");'><img src='css/img/delete_annotation.png'></a></td>"; //кнопка удаления аннотации
		result += "</tr>";
	}
	table.innerHTML = result; //заполняем таблицу
	for (var i = 0; i < k; i++)
	{
		fill_categories(document.getElementById("sel_"+childs[i]['id']), childs[i]['cat_id']); //заполняем блоки selection списками категорий
	}
}

