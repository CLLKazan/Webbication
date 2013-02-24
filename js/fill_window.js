function fill_window(pos1, pos2) {
	var childs = new Array(); //здесь будут храниться побочные аннотации, которые расположены в позиции, на которую указывает курсор (pos)
	var k = 0; //кол-во побочных аннотаций
	var min = 1000000000; //инициализация
	var max = -1000000000;
	for (var i = 0; i < count_of_points/2; i++)
	{
		if (annotations[i]['start'] <= pos1 && annotations[i]['end'] >= pos1) //если pos1 находится между концом и началом аннотации
		{
			if (annotations[i]['start'] < min) min = annotations[i]['start']; //запоминаем самую левую точку
			if (annotations[i]['end'] > max) max = annotations[i]['end']; //запоминаем самую правую точку
			childs[k] = annotations[i]; //добавляем аннотацию в побочные
			k++;
		}
		else if (annotations[i]['start'] <= pos2 && annotations[i]['end'] >= pos2) //если pos2 находится между концом и началом аннотации
		{
			if (annotations[i]['start'] < min) min = annotations[i]['start']; //запоминаем самую левую точку
			if (annotations[i]['end'] > max) max = annotations[i]['end']; //запоминаем самую правую точку
			childs[k] = annotations[i]; //добавляем аннотацию в побочные
			k++;
		}
		else if (annotations[i]['start'] >= pos1 && annotations[i]['start'] <= pos2) { //если начало находится между pos1 и pos2
			if (annotations[i]['start'] < min) min = annotations[i]['start']; //запоминаем самую левую точку
			if (annotations[i]['end'] > max) max = annotations[i]['end']; //запоминаем самую правую точку
			childs[k] = annotations[i]; //добавляем аннотацию в побочные
			k++;
		}
		else if (annotations[i]['start'] >= pos2 && annotations[i]['start'] <= pos1) { //если начало находится между pos1 и pos2
			if (annotations[i]['start'] < min) min = annotations[i]['start']; //запоминаем самую левую точку
			if (annotations[i]['end'] > max) max = annotations[i]['end']; //запоминаем самую правую точку
			childs[k] = annotations[i]; //добавляем аннотацию в побочные
			k++;
		}
	}
	if (k == 0) //если не осталось аннотаций в данной точке, закрываем окно
	{
		$("#window").fadeToggle(50, "swing", function () {
			$("#wall").remove();
		});
		return;
	}
	
	$("#complex_annotation tr").remove();
	
	var $table = $("#complex_annotation");
	
	var $tr = $(document.createElement("tr"));
	$table.append($tr);
	
	var $td = $(document.createElement("td"));
	$tr.append($td);
	$td.addClass("annotation");
	$td.text(get_complex_annotation(min, max));
	
	$td = $(document.createElement("td"));
	$tr.append($td);
	$td.addClass("edit_annotation");
	
	$td = $(document.createElement("td"));
	$tr.append($td);
	$td.addClass("delete_annotation");
	
	for (var i = 0; i < k; i++)
	{
		$tr = $(document.createElement("tr"));
		$table.append($tr);
		
		$td = $(document.createElement("td"));
		$tr.append($td);
		$td.addClass("annotation");
		$td.html(highlight_annotation(childs[i], min, max));
		
		$td = $(document.createElement("td"));
		$tr.append($td);
		$td.addClass("edit_annotation");
		
		var $form = $(document.createElement("form"));
		$td.append($form);
		$form.attr("action", "javascript: update_annotation("+childs[i]['id']+");");
		
		var $select = $(document.createElement("select"));
		$form.append($select);
		$select.attr("id", "sel_"+childs[i]["id"]);
		fill_categories($select, childs[i]["cat_id"]);
		
		var $input = $(document.createElement("input"));
		$form.append($input);
		$input.attr("type", "submit");
		$input.attr("value", "Обновить");
		
		$td = $(document.createElement("td"));
		$tr.append($td);
		$td.addClass("delete_annotation");
		
		var $a = $(document.createElement("a"));
		$td.append($a);
		$a.addClass("delete_button");
		var delFunc;
		$a.on("click", delFunc = function() {
			var ann_id = arguments.callee.id;
			delete_annotation(ann_id);
		});
		delFunc.id = childs[i]["id"];
		$a.append("<img src='css/img/delete_annotation.png'>");
	}
}