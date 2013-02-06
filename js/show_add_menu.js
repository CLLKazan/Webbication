/*
	Эта функция отрисовывает меню добавления аннотации
*/

function show_add_menu(event)
{
	var add_menu = document.getElementById('add_menu'); //дескриптор блока меню добавления
	add_menu.style.display = "block"; //делаем его видимым
	add_menu.style.top = event.clientY + "px"; //присваиваем координаты по курсору
	add_menu.style.left = event.clientX + "px";
	fill_categories(document.getElementById('list_of_categories')); //заполняем блок select списком категорий
}