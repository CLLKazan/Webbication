var palette = {
	categories: new Object(),
	
	init: function(cat) {
		this.categories = cat;
		var result = "<table>";
		for (var i = 0; i < this.categories.length; i++) {
			result += "<tr><td class='category_color' style='background-color: rgb("+this.categories[i]["red"]+","+this.categories[i]["green"]+","+this.categories[i]["blue"]+");'></td><td class='category_name'>"+this.categories[i]["name"]+"</td></tr>";
		}
		result += "</table>";
		document.getElementById("palette").innerHTML = result;
	},
	
	toggleVisibility: function() {
		var DOMObj = document.getElementById("palette");
		if (DOMObj.style.height == "0px" || DOMObj.style.height == "") {
			setTimeout(function() {
				DOMObj.style.height = "500px";
			}, 0);
		}
		else {
			setTimeout(function() {
				DOMObj.style.height = "0";
			}, 0);
		}
	}	
};