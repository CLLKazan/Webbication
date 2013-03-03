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

	$(function() {
		$.contextMenu({
			selector: '#text .plain_text',
			build: function($trigger, e) {
				var sel = getRangeObject(); //объект выделение
	        	if (sel) {
					selection_point1 = get_offset(sel.startContainer, sel.startOffset); //получаем позиции начала и конца выделения
					selection_point2 = get_offset(sel.endContainer, sel.endOffset);
				}
		        if (sel && sel.toString() != "") {
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
		        else {
			        return; 
		        }
	        }
		});
	})

	$(function() {
		$.contextMenu({
			selector: '#text .simple_annotation',
			build: function($trigger, e) {
	        	var sel = getRangeObject(); //объект выделение
				if (sel) {
					selection_point1 = get_offset(sel.startContainer, sel.startOffset); //получаем позиции начала и конца выделения
					selection_point2 = get_offset(sel.endContainer, sel.endOffset);
				}
		        if (sel && sel.toString() != "") {
			        return {
				        items: {
				        	"add": {
						        name: "add annotation",
						        icon: "add",
						        items: submenu_items
					        },
					        "edit": {
					        	name: "edit",
					        	icon: "edit",
					        	callback: function(key, opt) {
						        	edit_annotation_by_pos(map[$(this).attr("id")]);
					        	}
				        	},
					        "delete": {
						        name: "delete",
						        icon: "delete",
						        callback: function(key, opt) {
						        	delete_annotation_by_pos(map[$(this).attr("id")]);
						        }
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
				        	"edit": {
					        	name: "edit",
					        	icon: "edit",
					        	callback: function(key, opt) {
						        	edit_annotation_by_pos(map[$(this).attr("id")]);
					        	}
				        	},
					        "delete": {
						        name: "delete",
						        icon: "delete",
						        callback: function(key, opt) {
						        	delete_annotation_by_pos(map[$(this).attr("id")]);
						        }
					        },
					        "show_complex_annotation": {
						        name: "show complex annotation",
						        callback: function(key, opt) {
						        	var str = $(this).attr("id");
						        	var n = str.substr(str.indexOf("_")+1)*1;
						        	show_complex_annotation(map["map_"+n], map["map_"+(n+1)]);
						        }
						    }
				        }
			        }
		        }
	        }
		});
	})
	$(function(){
	    $.contextMenu({
	        selector: '#text .complex_annotation', 
	        build: function($trigger, e) {
	        	var sel = getRangeObject(); //объект выделение
				if (sel) {
					selection_point1 = get_offset(sel.startContainer, sel.startOffset); //получаем позиции начала и конца выделения
					selection_point2 = get_offset(sel.endContainer, sel.endOffset);
				}
				
				var str = $trigger.attr("id");
				var n = str.substr(str.indexOf("_")+1)*1;
				
		        if (sel && sel.toString() != "") {
			        return {
				        items: {
				        	"annotations": {
					        	name: "annotations",
					        	items: get_annotations_list(selection_point1, selection_point2)
				        	},
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
				        	"annotations": {
					        	name: "annotations",
					        	items: get_annotations_list(map["map_"+n], map["map_"+(n+1)])
				        	},
					        "show_complex_annotation": {
						        name: "show complex annotation",
						        callback: function(key, opt) {
						        	var str = $(this).attr("id");
						        	var n = str.substr(str.indexOf("_")+1)*1;
						        	show_complex_annotation(map["map_"+n], map["map_"+(n+1)]);
						        }
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