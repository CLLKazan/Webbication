/*
	Эта функция парсит из сплошного текста список категорий с аттрибутами
*/

function parse_categories()
{
	if (this.readyState == 4)
	{
		if (this.status == 200)
		{
			if (this.responseText != null)
			{
				var str = this.responseText; //текст, возвращенный php скриптом
				responseArray = str.split("s693ncsl"); //разделяем его на массив строк
				count_of_categories = responseArray[0]*1; //кол-во категорий
				for (var i = 0; i < count_of_categories; i++)
				{
					categories.push({'id': responseArray[i*5+1]*1, 'name': responseArray[i*5+2], 'r': responseArray[i*5+3], 'g': responseArray[i*5+4], 'b': responseArray[i*5+5]}); //добавляем категорию в массив ctegories[]
				}
			}
		}
	}	
}