/*
	Эта функция отрисовывает окно сложной аннотации
*/

function show_complex_annotation(pos)
{
	var $wall = $(document.createElement("div"));
	$("body").append($wall);
	$wall.attr("id", "wall");
	$wall.click(function(event) {
		$("#window").fadeToggle(50, "swing", function () {
			$("#wall").remove();
		});
	});
	
	var $window = $(document.createElement("div"));
	$wall.append($window);
	$window.attr("id", "window");
	$window.css("opacity", "0");
	$window.click(function(event) {
		event.stopPropagation();
	});
	
	var $window_header = $(document.createElement("div"));
	$window.append($window_header);
	$window_header.attr("id", "window_header");
	
	var $close_window_button = $(document.createElement("a"));
	$window_header.append($close_window_button);
	$close_window_button.attr("id", "close_window_button");
	$close_window_button.append("<img src='css/img/exit_button.png'>");
	$close_window_button.children().click(function(event) {
		$("#window").fadeToggle(50, "swing", function () {
			$("#wall").remove();
		});
	});
	
	var $table_div = $(document.createElement("div"));
	$window.append($table_div);
	$table_div.attr("id", "table_div");
	
	var $table = $(document.createElement("table"));
	$table_div.append($table);
	$table.attr("id", "complex_annotation");
	
	fill_window(pos);
	
	$window.fadeTo(50, 1, "swing");
}

