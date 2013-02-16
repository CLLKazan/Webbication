/*
	Эта функция заполняет палитру с категориями
*/

function fill_palette()
{
	var table = $(document.createElement("table"));
	$("#palette").append(table);
	for (var i = 0; i < count_of_categories; i++) {
		//alert("fill_palette!");
		var tr = $(document.createElement("tr")); //создаем строку таблицы
		table.append(tr); //добавляем ее в таблицу
		var td = $(document.createElement("td")); //создаем ячейку
		tr.append(td); //кидаем ее в строку таблицы
		td.addClass("category_color"); //добавляем класс
		td.css("background-color", GetColor(categories[i]['r'], categories[i]['g'], categories[i]['b'])); //определяем цвет для нее
		td = $(document.createElement("td")); //создаем еще одну ячейку
		tr.append(td); //добавляем в строку
		td.addClass("category_name"); //добавляем ей класс
		td.text(categories[i]['name']); //записываем в ячейку текст
	}
}