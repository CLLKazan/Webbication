/*
	Эта функция заполняет блок select списком категорий. Опционально какая-то категория выбрана по умолчанию.
*/

function fill_categories(ObjSel, cat) //ObjSel - объект выделения, cat - id категории, которую нужно сделать выбранной по умолчанию
{
	var result = "";
	if (!cat) //если не присутствует параметр cat
	{
		result = "<option value='0' selected>Выберите аннотацию</option>";
		for (var i = 0; i < count_of_categories; i++)
		{
			result += "<option value='"+categories[i]['id']+"'>"+categories[i]['name']+"</option>";
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
		result = "<option value='"+cat+"' selected>"+name+"</option>";
		for (var i = 0; i < count_of_categories; i++)
		{
			if (categories[i]['id'] != cat) result += "<option value='"+categories[i]['id']+"'>"+categories[i]['name']+"</option>";
		}
	}
	ObjSel.innerHTML = result;
}