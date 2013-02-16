/*
	Эта функция заполняет блок select списком категорий. Опционально какая-то категория выбрана по умолчанию.
*/

function fill_categories(ObjSel, cat) //ObjSel - объект selection, cat - id категории, которую нужно сделать выбранной по умолчанию
{
	var $sel = $(ObjSel);
	$sel.children().remove();
	if (!cat) //если не присутствует параметр cat
	{
		var $option = $(document.createElement("option"));
		$sel.append($option);
		$option.attr("value", "0");
		$option.prop("selected", "selected");
		$option.text("Выберите категорию");
		for (var i = 0; i < count_of_categories; i++)
		{
			$option = $(document.createElement("option"));
			$sel.append($option);
			$option.attr("value", categories[i]['id']);
			$option.text(categories[i]['name']);
		}
	}
	else //если присутствует параметр cat
	{
		var name = "";
		for (var i = 0; i < count_of_categories; i++)
		{
			if (categories[i]['id'] == cat)
			{
				name = categories[i]['name'];
			}
		}
		var $option = $(document.createElement("option"));
		$sel.append($option);
		$option.append("value", cat);
		$option.text(name);
		$option.prop("selected", "selected");
		for (var i = 0; i < count_of_categories; i++)
		{
			if (categories[i]['id'] != cat) {
				$option = $(document.createElement("option"));
				$sel.append($option);
				$option.attr("value", categories[i]['id']);
				$option.text(categories[i]['name']); 
			}
		}
	}
}