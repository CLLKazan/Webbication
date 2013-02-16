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
				$("#add_menu").fadeOut("fast", "swing", function () {
					$("#add_menu").remove();
				});
			}
			if (document.getElementById('wall').style.display == "block") //если открыто окно сложных аннотаций, обновляем его содержимое
			{
				show_complex_annotation(selection_point1);
			}
			if (this.responseText == null)
			{
				alert("Something is wrong!");
			}
		}
	}
}