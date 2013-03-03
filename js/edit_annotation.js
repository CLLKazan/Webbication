function edit_annotation(ann_id) {
	var $text = $("#text");
	$text.children().remove();
	$text.text(text);
	
	var edit_ann; 
	for (var i = 0; i < count_of_points/2; i++) {
		if (annotations[i]['id'] == ann_id) {
			edit_ann = annotations[i];
			break;
		}
	}
	
	create_range_of_annotation(edit_ann);
	show_edit_options(edit_ann);
	
	$("#edit_options").mouseover(function() {
		var sel = getRangeObject(); //объект выделение
		selection_point1 = sel.startOffset; //получаем позиции начала и конца выделения
		selection_point2 = sel.endOffset;
		if (selection_point1 === selection_point2) {
			$("#save_button").prop("disabled", "disabled");
		}
		else {
			$("#save_button").prop("disabled", "");
		}
	});
}

function edit_annotation_by_pos(pos) {
	for (var i = 0; i < count_of_points/2; i++)
	{
		if (annotations[i]['start'] <= pos+0.5 && annotations[i]['end'] >= pos+0.5) //если pos+0.5 между началом и концом аннотации
		{
			edit_annotation(annotations[i]['id']);
			return;
		}
	}
}