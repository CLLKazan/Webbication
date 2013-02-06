/*
	Эта функция возвращает кол-во аннотаций, расположенных в позиции курсора
*/

function get_count_of_annotations(pos)
{
	var k = 0; //счетчик аннотаций
	for (var i = 0; i < count_of_points/2; i++)
	{
		if (annotations[i]['start'] <= pos && annotations[i]['end'] >= pos) //если pos между началом и концом аннотации
		{
			k++; //увеличиваем счетчик
		}
	}
	return k; //возвращаем количество
}