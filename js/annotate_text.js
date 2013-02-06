/*
	Эта функция вносит аннотации в текст
*/
function annotate(txt, points, count_of_points)
{
	if (count_of_points != 0) qsort(points, 0, count_of_points-1); //если есть аннотации, сортируем их
	
	var r = 255; //дефолтный цвет - белый
	var g = 255;
	var b = 255;
	var cat = ""; //здесь будет хранить список категорий
	var result = "<span id='map_0' onmouseup='javascript: show_options(event);' style='background: transparent;'>"; //открывающий span
	var str = 'map_0'; //id первого span'a
	map[str] = 0; //позиция первого span'a относительно начала текста
	var j = 0; //счетчик points[]
	var end = txt.length; //длина текста
	for (var i = 0; i < end; i++)
	{
		while (points[j] && i == points[j]['position']) //если попали на одну из точек аннотации
		{
			result += "</span>"; //закрываем предыдущий блок
			if (points[j]['type'] == 0) //если наша точка - начало аннотации
			{
				if (cat != '') //добавляем в список название категории
				{
					cat += "\n" + points[j]['category'];
				}
				else 
				{
					cat += points[j]['category'];
				}
				r = points[j]['r']*r/255; //умножаем цвет фона
				g = points[j]['g']*g/255;
				b = points[j]['b']*b/255;
				var clr; //переменная, которая будет хранить цвет
				var clss = ""; //переменная, которая будет хранить текст
				if (Math.abs(r-255) > 0.1 || Math.abs(g-255) > 0.1 || Math.abs(b-255) > 0.1) //избавляемся от погрешностей
				{
					clr = GetColor(r, g, b); //получаем цвет в формате #XXXXXX
					if (IsDark(r, g, b)) //если цвет достаточно темный
					{
						clss += "class='highlighted_span white_text'"; //присваиваем блоку класс white_text, задающий светлый цвет шрифта 
					}
					else clss = "class='highlighted_span'"; //присваиваем блоку класс highlighted_span, задающий рамку вокруг аннотации
				}
				else
				{
					clr = "transparent"; //если цвет белый, заменяем его на прозрачный
				}
				result += "<span id='map_"+(j+1)+"' "+clss+" onmouseup='javascript: show_options(event);' style='background: "+clr+";' title='"+cat+"'>"; //добавляем
				str = 'map_'+(j+1); //id нового span'a
				map[str] = i; //присваиваем позицию
			}
			else
			{
				cat = delete_cat(cat, points[j]['category']); //удаляем из списка лишнюю категорию
				r = r*255/points[j]['r']; //обратное умножение цвета
				g = g*255/points[j]['g'];
				b = b*255/points[j]['b'];
				var clr;
				var clss = "";
				if (Math.abs(r-255) > 0.1 || Math.abs(g-255) > 0.1 || Math.abs(b-255) > 0.1)
				{
					clr = GetColor(r, g, b);
					if (IsDark(r, g, b))
					{
						clss += "class='highlighted_span white_text'";
					}
					else clss = "class='highlighted_span'";
				}
				else 
				{
					clr = "transparent";
				}
				result += "<span  id='map_"+(j+1)+"' "+clss+" onmouseup='javascript: show_options(event);' style='background: "+clr+";' title='"+cat+"'>";
				str = 'map_'+(j+1);
				map[str] = i;
			}
			j++;
		}
		result += txt.charAt(i); //добавляем в result следующий символ из текста
	}
	result += "</span>"; //закрываем последний блок
	//alert(result);
	return result; //возвращаем результат
}