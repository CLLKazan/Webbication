function showContextMenu(event, parent, textobj, container) {
	var items = new Array();
	var selection = new getRangeObject();
	var selToString = selection.toString();
	var annotations;
	var start, end;
	if (!selection.startContainer || !selToString || selToString.length == 0) {
		//console.log(container);
		start = parseInt(container.getAttribute("data-position"));
		end = start+container.textContent.length;
		//console.log(start+" "+end);
		annotations = textobj.getAnnotationsList(start, end, 0); 
		if (annotations.length == 0) {
			items.push({
				"name": "no options",
				"action": function() {
					console.log("no options");
				},
			});
			textobj.context_menu.showMenu(event, parent, items);
			return;
		}
	}
	else {
		console.log(selection);
		start = parseInt(selection.startContainer.parentNode.getAttribute("data-position"))+selection.startOffset;
		end = parseInt(selection.endContainer.parentNode.getAttribute("data-position"))+selection.endOffset;
		annotations = textobj.getAnnotationsList(start, end, 1);
		items.push({
			"name": "add annotation",
			"items": new Array()
		});
		var last = items.length-1;
		for (var i = 0; i < textobj.categories.length; i++) {
			items[last].items.push({
				"name": textobj.categories[i]["name"],
				"data": {
					"id": textobj.categories[i]["id"],
				},
				"action": function() {
					var params = new Array();
					params.push({
						"name": "start",
						"value": start,
					});
					params.push({
						"name": "end",
						"value": end,
					});
					params.push({
						"name": "cat",
						"value": this.data["id"],
					});
					textobj.updateAnnotation(params, "add");
				}
			});
		}
	}
	if (annotations.length == 1) {
		items.push({
			"name": "edit",
			"data": {
				"ann": annotations[0],
			},
			"action": function() {
				showEditMode(this.data["ann"], textobj);
				//console.log(this.data["id"]+" edited");
			}
		});
		items.push({
			"name": "delete",
			"data": {
				"id": annotations[0]["id"],
			},
			"action": function() {
				var params = new Array();
				params.push({"name": "ann_id", "value": this.data["id"]});
				textobj.updateAnnotation(params, "delete");
			}
		});
	}
	else if (annotations.length > 0) {
		items.push({
			"name": "annotations",
			"items": new Array(),
		});
		var last = items.length-1;
		var getMenuItem = function(annotation, text) {
			var str = text.getTextRange(annotation["start_offset"], annotation["end_offset"]);
			if (str.length > 15) {
				str = "["+annotation["category_name"]+"]["+str.length+"] "+str.substr(0, 17)+"...";
			}
			else {
				str = "["+annotation["category_name"]+"]"+str;
			}
			return str;
		};
		for (var i = 0; i < annotations.length; i++) {
			items[last].items.push({
				"name": getMenuItem(annotations[i], textobj),
				"items": [
					{"name": "edit",
					"data": {
						"ann": annotations[i]
					},
					"action": function() {
						showEditMode(this.data["ann"], textobj);
						//console.log(this.data["id"]+" edited");
					}},
					{"name": "delete",
					"data": {
						"id": annotations[i]["id"]
					},
					"action": function() {
						var params = new Array();
						params.push({"name": "ann_id", "value": this.data["id"]});
						textobj.updateAnnotation(params, "delete");	
					}
				}]
			});		
		}
		items.push({
			"name": "show complex annotation",
			"data": {
				"annotations": annotations
			},
			"action": function() {
				showComplexAnnotation(this.data["annotations"], textobj);
				//console.log(this.data["annotations"]);
			}
		});
	}
	textobj.context_menu.showMenu(event, parent, items);
}