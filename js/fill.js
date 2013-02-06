/*
	Эта функции вызывается при загрузке страницы. Она создает все основное содержимое страницы.
*/

function fill()
{
	get_document(); //ajax-запрос получения документа и мета-данных
	get_annotations(); //ajax-запрос получения аннотаций (annotations[]) и позиций начал и концов аннотаций(points[])
	get_categories(); //ajax-запрос получения категорий (categories[])
	fill_palette(); //заполняем палитру
	var document_title = document.getElementById("title"); 
	document_title.innerHTML = title; //заполняем заголовок
	var document_date = document.getElementById("creation_time");
	document_date.innerHTML = date; //заполняем время создания
	var document_text = document.getElementById("text");
	document_text.innerHTML = annotate(text, points, count_of_points); //заполняем текст аннотациями и выводим его на страницу
}