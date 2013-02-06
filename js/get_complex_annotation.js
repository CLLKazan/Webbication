/*
	возвращает текст сложной аннотации
*/

function get_complex_annotation(start, end)
{
	var length = text.length;
	var result = "";
	for (var i = 0; i < length; i++)
	{
		if (i >= start && i < end) //заполняет переменную частью текста с позиции start до end
		{	
			result += text.charAt(i);
		}
	}
	return result;
}
