function showContextMenu(event, parent, menu, textobj) {
	var items = new Array();
	var selection = new getRangeObject();
	var selToString = selection.toString();
	var annotations;
	var start, end;
	if (!selToString || selToString.length == 0) {
		var container = this;
		start = parseInt(container.parentNode.getAttribute("data-position"));
		end = start+container.textContent.length;
		annotations = textobj.getAnnotationsList(start, end); 
		if (annotations.length == 0) {
			items.push({
				"name": "no options",
				"action": function() {
					console.log("no options");
				},
			});
			return;
		}
	}
	else {
		start = parseInt(selection.startContainer.parentNode.getAttribute("data-position"))+selection.startOffset;
		end = parseInt(selection.endContainer.parentNode.getAttribute("data-position"))+selection.endOffset;
		annotations = textobj.getAnnotationsList(start, end);
		items.push({
			"name": "add annotations",
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
					textobj.addAnnotation(start, end, this.data["id"]);
				}
			});
		}
	}
	if (annotations.length != 0) {
		items.push({
			"name": "annotations",
			"items": new Array(),
		});
		var last = items.length-1;
		for (var i = 0; i < annotations.length; i++) {
			items[last].items.push({
				"name": annotations[i]["id"], //TODO
				"items": [
					{"name": "edit",
					"data": {
						"id": annotations[i]["id"]
					},
					"action": function() {
						//TODO
						console.log(this.data["id"]+" edited");
					}},
					{"name": "delete",
					"data": {
						"id": annotations[i]["id"]
					},
					"action": function() {
						//TODO
						console.log(this.data["id"]+" deleted");
				}}]
			});		
		}
		items.push({
			"name": "show complex annotation",
			"data": {
				"annotations": annotations
			},
			"action": function() {
				//TODO
				console.log(this.data["annotations"]);
			}
		});
	}
	menu.showMenu(event, parent, items);
}