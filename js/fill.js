/*
	Эта функции вызывается при загрузке страницы. Она создает все основное содержимое страницы.
*/

function fill()
{
	get_document(); //ajax-запрос получения документа и мета-данных
	get_annotations(); //ajax-запрос получения аннотаций (annotations[]) и позиций начал и концов аннотаций(points[])
	get_categories(); //ajax-запрос получения категорий (categories[])
	fill_palette(); //заполняем палитру
	$("#title").text(title); //заполняем заголовок
	$("#creation_time").text(date); //заполняем время создания
	annotate(text, points, count_of_points); //заполняем текст аннотациями и выводим его на страницу
}