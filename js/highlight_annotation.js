/*
	Эта функция выделяет одну аннотацию в тексте
*/

function highlight_annotation(ann, start, end)
{
	var length = text.length;
	var result = "<span class='invisible'>"; //текст, не относящийся к аннотации бледно-серого цвета
	for (var i = 0; i < length; i++)
	{
		if (i >= start && i < end)
		{
			if (i == ann['start'])
			{
				result += "</span><span class='highlighted'>"; //текст аннотации выделен темным цветом
			}
			if (i == ann['end'])
			{
				result += "</span><span class='invisible'>";
			}	
			result += text.charAt(i);
		}
	}
	result += "</span>";
	return result;
}