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
			$("#text").text("");
			$("#header").unbind(".edit_ann");
			/*$("#text").unbind("mouseleave");
			$("#text").unbind("mouseenter");*/
			annotate(text, points, count_of_points); //аннотируем текст
			if ($("#edit_options")) {
				$("#edit_options").remove();
			}
			/*if ($("#add_menu")) //если меню добавления аннотации все еще видно, закрываем
			{
				$("#add_menu").fadeOut(50, "swing", function () {
					$("#add_menu").remove();
				});
			}*/
			if ($("#wall")) //если открыто окно сложных аннотаций, обновляем его содержимое
			{
				fill_window();
			}
			if (this.responseText == null)
			{
				alert("Something is wrong!");
			}
			/*var browser = navigator.userAgent;
			if (browser.indexOf("MSIE")+1) {
				location.reload();
			}*/
		}
	}
}