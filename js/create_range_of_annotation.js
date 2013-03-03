function create_range_of_annotation(edit_ann) {	
	var root = document.getElementById("text").firstChild;
	var rng;
	var sel;
	var browser = navigator.userAgent;
	if (browser.indexOf("MSIE")+1) {
		rng = root.createTextRange();
		rng.collapse(true);
		rng.moveStart("character", edit_ann["start"]);
		rng.moveEnd("character", edit_ann["end"]);
		rng.select();
	}
	else {
		rng = document.createRange();
		rng.setStart(root, edit_ann["start"]);
		rng.setEnd(root, edit_ann["end"]);
		sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(rng);
	}
}