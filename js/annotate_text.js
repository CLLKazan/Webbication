/*
	Эта функция вносит аннотации в текст
*/
function annotate(txt, points, count_of_points)
{
	var $text = $("#text");
	$("#text > span").remove(); //очищаем все внутри
	if (count_of_points != 0) {
		qsort(points, 0, count_of_points-1); //если есть аннотации, сортируем их
	}
	
	var r = 255; //дефолтный цвет - белый
	var g = 255;
	var b = 255;
	var cat = ""; //здесь будет хранить список категорий
	var $span = $(document.createElement("span"));
	$text.append($span);
	var str = 'map_0'; //id первого span'a
	$span.attr("id", str);//открывающий span
	/*$span.mouseup(function(event) {
		show_options(event);
	});*/
	$span.css("background-color", "transparent");
	map[str] = 0; //позиция первого span'a относительно начала текста
	var j = 0; //счетчик points[]
	var end = txt.length; //длина текста
	var result = "";
	for (var i = 0; i < end; i++)
	{
		while (points[j] && i == points[j]['position']) //если попали на одну из точек аннотации
		{
			$span.html(result); //записываем текст в предыдущий блок
			result = "";
			//result += "</span>"; //закрываем предыдущий блок
			if (points[j]['type'] == 0) //если наша точка - начало аннотации
			{
				$span = $(document.createElement("span"));
				$text.append($span);
				/*$span.mouseup(function(event) {
					show_options(event);
				});*/
				if (cat != '') //добавляем в список название категории
				{
					cat += "\n" + points[j]['category'];
				}
				else 
				{
					cat += points[j]['category'];
				}
				$span.attr("title", cat);
				r = points[j]['r']*r/255; //умножаем цвет фона
				g = points[j]['g']*g/255;
				b = points[j]['b']*b/255;
				if (Math.abs(r-255) > 0.1 || Math.abs(g-255) > 0.1 || Math.abs(b-255) > 0.1) //избавляемся от погрешностей
				{
					$span.css("background-color", GetColor(r, g, b)); //получаем цвет в формате #XXXXXX
					$span.addClass("highlighted_span");
					if (IsDark(r, g, b)) //если цвет достаточно темный
					{
						$span.addClass("white_text"); 
					}
				}
				else
				{
					$span.css("background-color", "transparent");
				}
				str = 'map_'+(j+1); //id нового span'a
				$span.attr("id", str);
				map[str] = i; //присваиваем позицию
			}
			else
			{
				$span = $(document.createElement("span"));
				$text.append($span);
				/*$span.mouseup(function(event) {
					show_options(event);
				});*/
				cat = delete_cat(cat, points[j]['category']); //удаляем из списка лишнюю категорию
				if (cat == '') {
					$span.removeAttr("title");
				}
				else $span.attr("title", cat);
				r = r*255/points[j]['r']; //обратное умножение цвета
				g = g*255/points[j]['g'];
				b = b*255/points[j]['b'];
				if (Math.abs(r-255) > 0.1 || Math.abs(g-255) > 0.1 || Math.abs(b-255) > 0.1)
				{
					$span.css("background-color", GetColor(r, g, b));
					$span.addClass("highlighted_span");
					if (IsDark(r, g, b)) //если цвет достаточно темный
					{
						$span.addClass("white_text"); 
					}
				}
				else 
				{
					$span.css("background-color", "transparent");
				}
				str = 'map_'+(j+1); //id нового span'a
				$span.attr("id", str);
				map[str] = i; //присваиваем позицию
			}
			j++;
		}
		result += txt.charAt(i); //добавляем в result следующий символ из текста
	}
	$span.html(result);
	//result += "</span>"; //закрываем последний блок
	//alert(result);
	//return result; //возвращаем результат
}