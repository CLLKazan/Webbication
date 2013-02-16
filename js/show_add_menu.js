/*
	Эта функция отрисовывает меню добавления аннотации
*/

function show_add_menu(event)
{
	if ($("#add_menu")) $("#add_menu").remove();
	var $add_menu = $(document.createElement("div"));
	$("body").append($add_menu);
	$add_menu.css("opacity", "0");
	$add_menu.css({
		top: event.clientY + "px",
		left: event.clientX + "px"
	});
	$add_menu.attr("id", "add_menu");
	var $form = $(document.createElement("form"));
	$add_menu.append($form);
	$form.attr("id", "properties");
	$form.attr("action", "javascript: add_annotation();");
	var $select = $(document.createElement("select"));
	$form.append($select);
	$select.attr("id", "list_of_categories");
	
	fill_categories(document.getElementById('list_of_categories')); //заполняем блок select списком категорий
	
	var $input = $(document.createElement("input"));
	$form.append($input);
	$input.attr("type", "submit");
	$input.attr("value", "Добавить");
	var $a = $(document.createElement("a"));
	$add_menu.append($a);
	$a.attr("id", "close_menu");
	$a.click(function () {
		$("#add_menu").fadeOut("fast", "swing", function () {
			$("#add_menu").remove();
		});
	});
	$a.append("<img src='css/img/exit_button.png'>");
	$add_menu.fadeTo("fast", 1,"linear");
	
}