var textObject = {
		id: "",
		document: new Object(),
		annotations: new Object(),
		categories: new Object(),
		
		update: function() {
			this.getPostData("php/get_document.php", "id="+this.id, "document");
			this.getPostData("php/get_annotations.php", "id="+this.id, "annotations");
			this.getPostData("php/get_categories.php", "", "categories");
		},
		
		getPostData: function(url, params, object) {
			var ajaxRequest;
		    try
		    {
		        ajaxRequest = new XMLHttpRequest(); //стандартный способ
		    }
		    catch (e)
		    {
		        try
		        {
		            ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP"); //для IE
		        }
		        catch (e)
		        {
		            try
		            {
		                ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP"); //тоже IE
		            }
		            catch (e)
		            {
		                alert("Ваш браузер не поддерживает AJAX"); //Браузер не поддерживает Ajax
		                document.location.href = "catalog.php";
		                return false;
		            }
		        }
		    }
		    
		    ajaxRequest.open("POST", url, false);
		    ajaxRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			ajaxRequest.setRequestHeader("Content-length", params.length);
			ajaxRequest.setRequestHeader("Connection", "close");
			
			ajaxRequest.send(params);
			
			if (ajaxRequest.status == 200) {
				this[object] = JSON.parse(ajaxRequest.responseText);
			}
			else this[object] = undefined;
		},
		
		annotateText: function() {
			var points = new Array();
			for (var i = 0; i < this.annotations.length; i++) {
				points.push({
					"position": parseInt(this.annotations[i]["start_offset"]), 
					"type": 0,
					"category": this.annotations[i]["category_name"],
					"r": this.annotations[i]["red"],
					"g": this.annotations[i]["green"],
					"b": this.annotations[i]["blue"]
				});
				points.push({
					"position": parseInt(this.annotations[i]["end_offset"]), 
					"type": 1,
					"category": this.annotations[i]["category_name"],
					"r": this.annotations[i]["red"],
					"g": this.annotations[i]["green"],
					"b": this.annotations[i]["blue"]
				});
			}
			points.sort(function(a, b) {
				if (a["position"] > b["position"]) {
					return 1;
				}
				else if (a["position"] < b["position"]) {
					return -1;
				}
				else {
					if (a["type"] > b["type"]) {
						return 1;
					}
					else if (a["type"] < b["type"]) {
						return -1;
					}
					else {
						return 0;
					}
				}
			});
			
			var isDark = function(r, g, b) {
				if (0.213*(r/255) + 0.715*(g/255) + 0.072*(b/255) < 0.6) {
					return true;
				}
				else return false;
			};
			
			var getColor = function(r, g, b) {
			 	r = parseInt(r);
				g = parseInt(g);
				b = parseInt(b);
				var rs = "", gs = "", bs = "";
				if (r < 16) {
					rs = "0"+Number(r).toString(16);
				}
				else {
					rs = Number(r).toString(16)
				}
				if (g < 16) {
					gs = "0"+Number(g).toString(16);
				}
				else {
					gs = Number(g).toString(16)
				}
				if (b < 16) {
					bs = "0"+Number(b).toString(16);
				}
				else {
					bs = Number(b).toString(16)
				}
				var result = "#"+rs+gs+bs;
				return result;
			};
			
			var deleteCategory = function (str, cat) {
				var res = ''; 
				var arr = str.split('\n'); 
				var i;
				var add;
				var k = 0;
				for (i = 0; i < arr.length; i++) {
					if (arr[i].charAt(arr[i].length-1) == "\n") {
						arr[i] = arr[i].substr(0, arr[i].length-1);
					}
					if (arr[i] == cat && k == 0) {
						add = '';
						k++;
					}
					else {
						add = arr[i]+"\n";
					}
					res += add;
				}
				res = res.substr(0, res.length-1);
				return res;
			};

			
			var r = g = b = 255;
			var category = "";
			var category_count = 0;
			var j = 0;
			var end = this.document.text.length;
			var classes = ["plain_text", "highlighted_span", "white_text"];
			var result = "<span class='"+classes[0]+"' data-position='"+0+"'>";
			
			for (var i = 0; i < end; i++) {
				while (points[j] && i == points[j]["position"]) {
					result += "</span>";
					var span_class;
					var bg_color;
					var data_position = i;
					if (points[j]["type"] == 0) {
						if (category != "") {
							category += "\n";
						}
						category += points[j]["category"];
						category_count++;
						r = points[j]['r']*r/255;
						g = points[j]['g']*g/255;
						b = points[j]['b']*b/255;
						bg_color = getColor(r, g, b);
						span_class = classes[1];
						if (isDark(r, g, b)) {
							span_class += " " + classes[2];
						}
					}
					else {
						category = deleteCategory(category, points[j]["category"]);
						category_count--;
						if (category_count == 0) {
							span_class = classes[0];
							bg_color = "transparent";
							r = 255;
							g = 255;
							b = 255;
						}
						else {
							r = r*255/points[j]['r'];
							g = g*255/points[j]['g'];
							b = b*255/points[j]['b'];
							bg_color = getColor(r, g, b);
							span_class = classes[1];
							if (isDark(r, g, b)) {
								span_class += " "+classes[2];
							}
						}
					}
					result += "<span class='"+span_class+"' data-position='"+data_position+"' title='"+category+"' style='background-color: "+bg_color+";'>";
					j++;
				}
				result += this.document.text.charAt(i);
			}
			return result;
		},
		
		showDocumentMetaData: function() {
			var title = document.getElementById("title");
			var creation_time = document.getElementById("creation_time");
			title.textContent = this.document.title;
			creation_time.textContent = this.document.creation_time;
		},
		
		showAnnotatedText: function() {
			var text = document.getElementById("text");
			text.innerHTML = this.annotateText();
		},
		
		init: function() {
			this.update();
			this.showDocumentMetaData();
			this.showAnnotatedText();
		},
		
		getAnnotationsList: function(start, end) {
			var ann = new Array();
			for (var i = 0; i < this.annotations.length; i++) {
				if (this.annotations[i]["start_offset"] <= start && this.annotations[i]["end_offset"] >= start) {
					ann.push(this.annotations[i]);
				}
				else if(end && this.annotations[i]["start_offset"] <= end && this.annotations[i]["end_offset"] >= end) {
					ann.push(this.annotations[i]);
				}
			}
			return ann;
		},
		
		updateAnnotation: function(params, mode) {
			var url;
			if (!mode || mode == "add") {
				url = "php/add_annotation.php";
			}
			else if (mode == "update") {
				url = "php/update_annotation.php";
			}
			else if (mode == "delete") {
				url = "php/delete_annotation.php";
			}
			else {
				return;
			}
			
 			var ajaxRequest;
		    try
		    {
		        ajaxRequest = new XMLHttpRequest(); //стандартный способ
		    }
		    catch (e)
		    {
		        try
		        {
		            ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP"); //для IE
		        }
		        catch (e)
		        {
		            try
		            {
		                ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP"); //тоже IE
		            }
		            catch (e)
		            {
		                alert("Ваш браузер не поддерживает AJAX"); //Браузер не поддерживает Ajax
		                document.location.href = "catalog.php";
		                return false;
		            }
		        }
		    }
		    
		    var p = "doc="+this.id;
		    for (var i = 0; i < params.length; i++) {
			    p += "&"+params[i]["name"]+"="+params[i]["value"];
		    }
		    		    
		    ajaxRequest.open("POST", url, false);
		    ajaxRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			ajaxRequest.setRequestHeader("Content-length", p.length);
			ajaxRequest.setRequestHeader("Connection", "close");
			
			ajaxRequest.send(p);
			
			if (ajaxRequest.status == 200) {
				this.update();
				this.showAnnotatedText();
			}
			else console.log("error");
		},
		
		getTextRange: function(start, end) {
			var length = this.document.text.length;
			var result = "";
			for (var i = 0; i < length; i++) {
				if (i >= start && i < end) {	
					result += this.document.text.charAt(i);
				}
			}
			return result;
		},		
};