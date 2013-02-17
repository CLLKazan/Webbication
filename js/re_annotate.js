/*
	Эта функция вызывает инициализацию глобальных массивов annotations[] и points[]
*/

function re_annotate()
{
	if (this.readyState == 4)
	{
		if (this.status == 200)
		{
			get_annotations(); //получаем из базы все аннотации, связанные с текстом
			annotate(text, points, count_of_points); //аннотируем текст
			if ($("#add_menu")) //если меню добавления аннотации все еще видно, закрываем
			{
				$("#add_menu").fadeOut(50, "swing", function () {
					$("#add_menu").remove();
				});
			}
			if ($("#wall")) //если открыто окно сложных аннотаций, обновляем его содержимое
			{
				fill_window(selection_point1);
			}
			if (this.responseText == null)
			{
				alert("Something is wrong!");
			}
		}
	}
}