/*
	Эта функция вызывается при событии onmouseup блока span в тексте документа.
	Она выбирает, какое окно нужно отрисовывать и вызывает функцию его создания.
*/

function show_options(event) //параметр event нужен для того, чтобы получить координаты, в которых нужно отрисовывать меню добавления аннотации.
{
	sel = window.getSelection(); //объект выделение 
	selection_point1 = get_offset(sel.anchorNode, sel.anchorOffset); //получаем позиции начала и конца выделения
	selection_point2 = get_offset(sel.focusNode, sel.focusOffset);
	if (selection_point1 === selection_point2 && get_count_of_annotations(selection_point1) > 0) //если ничего не выделено (т.е. произошел просто клик мышью по тексту) и в данной позиции присутствую аннотации
	{
		show_complex_annotation(selection_point1); //отрисовываем окно сложной аннотации
	}
	else if (selection_point1 !== selection_point2) //если же выделение содержит текст
	{
		show_add_menu(event); //отрисовываем меню добавления аннотации
	}
}

