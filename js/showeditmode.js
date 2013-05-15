function showEditMode(edit_ann, textobj) {
	document.getElementById("palette").style.display = "none";
	document.getElementById("palette_button").style.display = "none";
	document.getElementById("edit_options").style.display = "";
	
	var form = document.getElementById("edit_form");
	form.setAttribute("action", "javascript: console.log('save');");
	
	var select = form.getElementsByTagName("select")[0];
	select.innerHTML = textobj.createCategorySelect(edit_ann["category_id"]);
	
	textobj.showPlainText();
	textobj.createSelection(edit_ann["start_offset"], edit_ann["end_offset"]);
	
	var button = document.getElementById("save_button");
	
	var checkSelection = function() {
		var selection = new getRangeObject();
		var selToString = selection.toString();
		if (!selToString || selToString.length == 0) {
			button.setAttribute("disabled", "disabled");
		}
		else {
			button.removeAttribute("disabled");
		}
	}
	
	document.addEventListener("mousemove", checkSelection);
	document.addEventListener("keypress", checkSelection);
	
	var click = function() {
		textobj.saveChanges(edit_ann, this, "extended");
		document.removeEventListener("mousemove", checkSelection);
		document.removeEventListener("keypress", checkSelection);
		
		document.getElementById("palette").style.display = "";
		document.getElementById("palette_button").style.display = "";
		document.getElementById("edit_options").style.display = "none";
		
		this.removeEventListener("click", click);
	};

	button.addEventListener("click", click);
} 