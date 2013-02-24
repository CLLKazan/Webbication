/*
	Эта функции вызывается при загрузке страницы. Она создает все основное содержимое страницы.
*/
function fill()
{
	get_document(); //ajax-запрос получения документа и мета-данных
	get_annotations(); //ajax-запрос получения аннотаций (annotations[]) и позиций начал и концов аннотаций(points[])
	get_categories(); //ajax-запрос получения категорий (categories[])
	fill_palette(); //заполняем палитру
	$("#title").text(title); //заполняем заголовок
	$("#creation_time").text(date); //заполняем время создания
	annotate(text, points, count_of_points); //заполняем текст аннотациями и выводим его на страницу
	
	var submenu_items = new Object();
	for (var i = 0; i < count_of_categories; i++)
	{
		submenu_items[categories[i]['id']] = {
			name: categories[i]["name"],
			callback: function(key, opt) {
				add_annotation(key);
			}
		};
	}
	$(function(){
	    $.contextMenu({
	        selector: '#text span', 
	        build: function($trigger, e) {
	        	var sel = getRangeObject(); //объект выделение
				selection_point1 = get_offset(sel.startContainer, sel.startOffset); //получаем позиции начала и конца выделения
				selection_point2 = get_offset(sel.endContainer, sel.endOffset);
		        if (get_count_of_annotations(selection_point1) > 0 || get_count_of_annotations(selection_point2) > 0) {
			        return {
				        items: {
				        	"add": {
						        name: "add annotation",
						        icon: "add",
						        items: submenu_items
					        },
					        "show_complex_annotation": {
						        name: "show complex annotation",
						        callback: function(key, opt) {
						        	show_complex_annotation(selection_point1, selection_point2);
						        }
						    }
				        }
				    }
		        }
		        else {
			        return {
				        items: {
					        "add": {
						        name: "add annotation",
						        icon: "add",
						        items: submenu_items
					        }
				        }
			        }
		        }
	        }
	    });
	    
	});

	//удаляем рамочки на IE
	/*var browser = navigator.userAgent;
	if (browser.indexOf("MSIE")+1) {
		$(".highlighted_span").css("border", "none");
	}*/
}