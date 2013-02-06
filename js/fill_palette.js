/*
	Эта функция заполняет палитру с категориями
*/

function fill_palette()
{
	var palette = document.getElementById("palette");
	var html = "<table>"; //создаем таблицу
	for (var i = 0; i < count_of_categories; i++)
	{
		html += "<tr>";
		html += "<td class='category_color' bgcolor='#"+Number(categories[i]['r']).toString(16)+Number(categories[i]['g']).toString(16)+Number(categories[i]['b']).toString(16)+"'></td>"; //ячейка таблицы с фоном, соответствующим категории
		html += "<td class='category_name'>"+categories[i]['name']+"</td>";
		html += "</tr>";
	}
	html += "</table>";
	palette.innerHTML = html; //заполняем
}