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
			var document_text = document.getElementById("text"); //получаем дескриптор блока, в котором будет аннотированный текст
			document_text.innerHTML = annotate(text, points, count_of_points); //помещаем в него текст с внесенными аннотациями
			if (document.getElementById('add_menu').style.display == "block") //если меню добавления аннотации все еще видно, закрываем
			{
				close_menu();
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