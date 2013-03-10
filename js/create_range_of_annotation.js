function create_range_of_annotation(start, end) {	
	var root = document.getElementById("text").firstChild;
	var rng;
	var sel;
	var browser = navigator.userAgent;
	if (browser.indexOf("MSIE")+1) {
		rng = root.createTextRange();
		rng.collapse(true);
		rng.moveStart("character", start);
		rng.moveEnd("character", end);
		rng.select();
	}
	else {
		rng = document.createRange();
		rng.setStart(root, start);
		rng.setEnd(root, end);
		sel = window.getSelection();
		sel.removeAllRanges();
		sel.addRange(rng);
	}
}