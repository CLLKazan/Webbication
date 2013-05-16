function showComplexAnnotation(annotations, textobj) {
	var wall = document.getElementById("wall");
		
	if (annotations.length == 0) {
		wall.style.display = "none";
		return;
	}
	
	var start = -1, end = -1;
	for (var i = 0; i < annotations.length; i++) {
		if (start == -1 || annotations[i]["start_offset"] <= start) {
			start = annotations[i]["start_offset"];
		}
		if (end == -1 || annotations[i]["end_offset"] >= end) {
			end = annotations[i]["end_offset"];
		}
	}
	
	var highlightAnnotation = function(annotation, str, start) {
		var result = "<span class='invisible'>" + str.substr(0, annotation["start_offset"]-start) + "</span>";
		result += "<span style='color: rgb("+annotation["red"]+","+annotation["green"]+","+annotation["blue"]+");'>"+str.substr(annotation["start_offset"]-start, annotation["end_offset"]-annotation["start_offset"])+"</span>";
		result += "<span class='invisible'>"+str.substr(annotation["end_offset"]-start);
		return result;
	};
	
	var complex_annotation = textobj.getTextRange(start, end);
		
	var table = document.getElementById("complex_annotation");
	//console.log(table);
	table.innerHTML = "<tr><td class='annotation'>"+complex_annotation+"</td><td class='edit_annotation'></td><td class='delete_annotation'></td></tr>";
	
	for (var i = 0; i < annotations.length; i++) {
		var tr = document.createElement("tr");
		
		var annotation = document.createElement("td");
		annotation.className = "annotation";
		annotation.innerHTML = highlightAnnotation(annotations[i], complex_annotation, start);
		tr.appendChild(annotation);
		
		var edit = document.createElement("td");
		edit.className = "edit_annotation";
		var select = document.createElement("select");
		select.setAttribute("data-param", "cat");
		select.setAttribute("data-index", i);
		select.addEventListener("change", function() {
			var ix = this.getAttribute("data-index");
			textobj.saveChanges(annotations[ix], this);
			var cat = this.options[this.selectedIndex].value;
			for (var j = 0; j < textobj.categories.length; j++) {
				if (parseInt(textobj.categories[j]["id"]) == parseInt(cat)) {
					annotations[ix]["category_id"] = textobj.categories[j]["id"];
					annotations[ix]["category_name"] = textobj.categories[j]["name"];
					annotations[ix]["red"] = textobj.categories[j]["red"];
					annotations[ix]["green"] = textobj.categories[j]["green"];
					annotations[ix]["blue"] = textobj.categories[j]["blue"];
					break;
				}
			}
			showComplexAnnotation(annotations, textobj);
		});
		select.innerHTML = textobj.createCategorySelect(annotations[i]["category_id"]);
		edit.appendChild(select);
		tr.appendChild(edit);
		
		var del = document.createElement("td");
		del.className = "delete_annotation";
		var a = document.createElement("a");
		a.className = "delete_button";
		a.setAttribute("data-id", annotations[i]["id"]);
		a.setAttribute("data-index", i);
		a.addEventListener("click", function() {
			var params = new Array();
			params.push({
				"name": "ann_id",
				"value": this.getAttribute("data-id")
			});
			textobj.updateAnnotation(params, "delete");
			annotations.splice(this.getAttribute("data-index"),1);
			showComplexAnnotation(annotations, textobj);
		});
		a.innerHTML = "<img src='css/img/delete_annotation.png'>";
		del.appendChild(a);
		tr.appendChild(del);
		
		table.appendChild(tr);
	}
	
	wall.style.display = "";
}