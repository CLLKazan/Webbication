function show_edit_options(edit_ann) {
	/*if ($("#palette").css("display") == "block") {
		$('#palette').slideToggle('fast', 'swing');
	}
	$("#palette_button").css("display", "none");*/
	
	var $tools = $("#tools");
	var $edit_options = $(document.createElement("div"));
	$tools.append($edit_options);
	$edit_options.attr("id", "edit_options");
	
	var $edit_form = $(document.createElement("form"));
	$edit_options.append($edit_form);
	$edit_form.attr("id", "edit_form");
	$edit_form.attr("action", "javascript: update_annotation("+edit_ann['id']+", true);");
	//$edit_form.attr("action", "javascript: alert("+edit_ann['id']+");");
	
	var $select = $(document.createElement("select"));
	$edit_form.append($select);
	$select.attr("id", "sel_"+edit_ann["id"]);
	$select.addClass("categories_list");
	fill_categories($select, edit_ann["cat_id"]);
	
	var $input = $(document.createElement("input"));
	$edit_form.append($input);
	$input.attr("id", "save_button");
	$input.attr("type", "submit");
	$input.attr("value", "Сохранить");
}