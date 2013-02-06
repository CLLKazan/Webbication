/*
	Эта функция парсит из сплошного текста аннотации и их аттрибуты
*/

function parse_annotations()
{
	if (this.readyState == 4)
	{
		if (this.status == 200)
		{
			if (this.responseText != null)
			{
				var str = this.responseText; //текст, возвращенный php скриптом
				responseArray = str.split("s693ncsl"); //разделяем его на части (между ними текст s693ncsl) и получаем массив responseArray
				count_of_points = responseArray[0]*1; //кол-во концов и начал аннотаций
				for (var i = 0; i < count_of_points/2; i++)
				{
					points.push({'position': responseArray[i*17+1]*1, 'type': responseArray[i*17+2]*1, 'category': responseArray[i*17+3], 'r': responseArray[i*17+4]*1, 'g': responseArray[i*17+5]*1, 'b': responseArray[i*17+6]*1}); //добавляем позицию в points[]
					//type: 0 означает, что позиция - начало какой-то аннотации
					points.push({'position': responseArray[i*17+7]*1, 'type': responseArray[i*17+8]*1, 'category': responseArray[i*17+9], 'r': responseArray[i*17+10]*1, 'g': responseArray[i*17+11]*1, 'b': responseArray[i*17+12]*1}); //добавляем позицию в points[]
					//type: 1 означает, что позиция - конец какой-то аннотации
					annotations.push({'start': responseArray[i*17+13]*1, 'end': responseArray[i*17+14]*1, 'category': responseArray[i*17+15], 'id': responseArray[i*17+16]*1, 'cat_id': responseArray[i*17+17]*1}); //добавляем аннотацию в annotations[]				
				}
			}
		}
	}	
}