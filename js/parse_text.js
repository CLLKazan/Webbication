/*
	Эта функция парсит текст документа и его метаданные
*/

function parse_text()
{
	if (this.readyState == 4)
	{
		if (this.status == 200)
		{
			if (this.responseText != null)
			{
				var str = this.responseText; //текст, возвращенный php скриптом
				responseArray = str.split("s693ncsl"); //разделяем его на массив строк
				title = responseArray[0];
				date = responseArray[1];
				text = responseArray[2];
			}
		}
	}	
}